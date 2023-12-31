package handlers

import (
	"github.com/gin-gonic/gin"
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

	if err := c.Bind(body); err != nil {
		c.JSON(http.StatusBadRequest, ReturnMessage("Invalid request body", err, nil))

		return
	}

	// hash the password
	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(body.Password), bcrypt.DefaultCost)

	if err != nil {
		c.JSON(http.StatusInternalServerError, ReturnMessage("Failed to hash password", err, nil))

		return
	}

	// create a new user
	err = models.CreateUser(body.Username, string(hashedPassword))

	if err != nil {
		c.JSON(http.StatusBadRequest, ReturnMessage("Failed to create user", err, nil))

		return
	}

	c.JSON(http.StatusOK, ReturnMessage("User created successfully", nil, nil))
}
