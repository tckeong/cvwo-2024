package handlers

import (
	"github.com/gin-gonic/gin"
	"github.com/tckeong/cvwo-2024/internal/errorLog"
	"github.com/tckeong/cvwo-2024/internal/handlers/messages"
	"github.com/tckeong/cvwo-2024/internal/repository"
	"golang.org/x/crypto/bcrypt"
	"net/http"
)

// SignUpHandler handles the POST request to /signup.
// request body: { username, password] }
func SignUpHandler(c *gin.Context) {
	// get the username and password from the request body
	var body struct {
		Username string `json:"username" binding:"required"`
		Password string `json:"password" binding:"required"`
	}

	if err := c.Bind(&body); errorLog.ErrorHandler(err) != nil {
		c.JSON(http.StatusBadRequest, messages.ReturnMessage("Invalid request body", err, nil))

		return
	}

	// hash the password
	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(body.Password), bcrypt.DefaultCost)

	if errorLog.ErrorHandler(err) != nil {
		c.JSON(http.StatusInternalServerError, messages.ReturnMessage("Failed to hash password", err, nil))

		return
	}

	// create a new user
	err = repository.CreateUser(body.Username, string(hashedPassword))

	if errorLog.ErrorHandler(err) != nil {
		c.JSON(http.StatusBadRequest, messages.ReturnMessage("Failed to create user, please use another username",
			err, nil))

		return
	}

	c.JSON(http.StatusOK, messages.ReturnMessage("User created successfully", nil, nil))
}
