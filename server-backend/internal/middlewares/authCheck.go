package middlewares

import (
	"errors"
	"github.com/gin-gonic/gin"
	"github.com/golang-jwt/jwt/v5"
	"github.com/tckeong/cvwo-2024/internal/errorLog"
	"github.com/tckeong/cvwo-2024/internal/repository"
	"net/http"
	"os"
	"time"
)

// AuthCheck checks if the user is authenticated
// if the user is authenticated, it will attach the user to the context
func AuthCheck(c *gin.Context) {
	// get the cookie from the request
	tokenString, err := c.Cookie("Authorization")

	// if the cookie is not found, return an error
	if errorLog.ErrorHandler(err) != nil {
		c.AbortWithStatus(http.StatusUnauthorized)

		return
	}

	// check if the token is valid
	token, err := jwt.Parse(tokenString, func(token *jwt.Token) (interface{}, error) {
		// check if the signing method is HMAC
		if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
			_ = errorLog.ErrorHandler(jwt.ErrSignatureInvalid)

			return nil, jwt.ErrSignatureInvalid
		}

		return []byte(os.Getenv("SECRET_KEY")), nil
	})

	if errorLog.ErrorHandler(err) != nil {
		c.AbortWithStatus(http.StatusUnauthorized)

		return
	}

	// if the cookie is valid, set the user id in the context
	if claim, ok := token.Claims.(jwt.MapClaims); ok {
		// check the expiry time of the token
		if float64(time.Now().Unix()) > claim["exp"].(float64) {
			_ = errorLog.ErrorHandler(errors.New("token expired for user" + claim["sub"].(string)))

			c.AbortWithStatus(http.StatusUnauthorized)

			return
		}

		// find the user with the token sub
		user, err := repository.SearchUserByID(uint(claim["sub"].(float64)))

		if errorLog.ErrorHandler(err) != nil {
			c.AbortWithStatus(http.StatusUnauthorized)

			return
		}

		// attach to request context
		c.Set("user", user)

		// continue
		c.Next()
	} else {
		_ = errorLog.ErrorHandler(errors.New("token invalid cannot be decoded"))

		c.AbortWithStatusJSON(http.StatusUnauthorized, gin.H{
			"error": "token invalid cannot be decoded",
		})

		return
	}
}
