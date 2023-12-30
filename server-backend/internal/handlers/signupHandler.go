package handlers

import (
	"github.com/gin-gonic/gin"
	"github.com/tckeong/cvwo-2024/internal/initializers"
	"github.com/tckeong/cvwo-2024/internal/models"
	"golang.org/x/crypto/bcrypt"
	"net/http"
)

func SignUpHandler(c *gin.Context) {
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

	// hash the password
	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(body.Password), bcrypt.DefaultCost)

	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"error": "Internal server error",
			"info":  err.Error(),
		})

		return
	}

	// create a new user
	user := models.User{
		Username: body.Username,
		Password: string(hashedPassword),
	}

	// save the user to the database
	err = initializers.DB.Create(user).Error

	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "Failed to create user",
		})

		return
	}

	c.JSON(http.StatusOK, gin.H{
		"message": "User created successfully",
	})
}
