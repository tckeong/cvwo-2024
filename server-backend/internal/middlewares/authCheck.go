package middlewares

import (
	"github.com/gin-gonic/gin"
	"github.com/golang-jwt/jwt/v5"
	"github.com/tckeong/cvwo-2024/internal/initializers"
	"github.com/tckeong/cvwo-2024/internal/models"
	"net/http"
	"os"
	"time"
)

func AuthCheck(c *gin.Context) {
	// get the cookie from the request
	tokenString, err := c.Cookie("token")

	// if the cookie is not found, return an error
	if err != nil {
		c.AbortWithStatus(http.StatusUnauthorized)

		return
	}

	// check if the token is valid
	token, err := jwt.Parse(tokenString, func(token *jwt.Token) (interface{}, error) {
		if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok { // check if the signing method is HMAC
			return nil, jwt.ErrSignatureInvalid
		}

		return os.Getenv("SECRET_KEY"), nil
	})

	// if the cookie is valid, set the user id in the context
	if claim, ok := token.Claims.(jwt.MapClaims); ok && token.Valid {
		// check the expiry time of the token
		if float64(time.Now().Unix()) > claim["exp"].(float64) {
			c.AbortWithStatus(http.StatusUnauthorized)
			return
		}

		// find the user with the token sub
		var user models.User

		initializers.DB.First(&user, "id = ?", claim["sub"])

		if user.ID == 0 {
			c.AbortWithStatus(http.StatusUnauthorized)
			return
		}

		// attach to request context
		c.Set("user", user)

		// continue
		c.Next()
	} else {
		c.AbortWithStatus(http.StatusUnauthorized)

		return
	}
}
