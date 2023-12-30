package handlers

import (
	"github.com/golang-jwt/jwt/v5"
	"golang.org/x/crypto/bcrypt"
	"net/http"
	"os"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/tckeong/cvwo-2024/internal/initializers"
	"github.com/tckeong/cvwo-2024/internal/models"
)

const TokenPeriod = time.Hour * 24

func LoginHandler(c *gin.Context) {
	// get the username and password from the request body
	var body struct {
		Username string `json:"username" binding:"required"`
		Password string `json:"password" binding:"required"`
	}

	if c.Bind(body) != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "Invalid request body",
		})

		return
	}

	// check if the username and password is valid
	user := new(models.User)
	initializers.DB.First(user, "username = ?", body.Username)

	if user.ID == 0 {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "Invalid username",
		})

		return
	}

	err := bcrypt.CompareHashAndPassword([]byte(user.Password), []byte(body.Password))

	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "Invalid password",
		})

		return
	}

	// generate jwt token
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
		"sub": user.ID,
		"exp": time.Now().Add(TokenPeriod).Unix(),
	})

	tokenString, err := token.SignedString([]byte(os.Getenv("SECRET_KEY")))

	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"error": "Failed to generate token",
		})

		return
	}

	// return the jwt token
	c.SetSameSite(http.SameSiteLaxMode)
	c.SetCookie("Authorization", tokenString, int(TokenPeriod.Seconds()), "", "", true, true)

	c.JSON(http.StatusOK, gin.H{
		"message": "Login successful",
	})
}
