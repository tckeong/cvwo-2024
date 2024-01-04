package handlers

import (
	"github.com/golang-jwt/jwt/v5"
	"github.com/tckeong/cvwo-2024/internal/handlers/messages"
	"github.com/tckeong/cvwo-2024/internal/repository"
	"golang.org/x/crypto/bcrypt"
	"net/http"
	"os"
	"time"

	"github.com/gin-gonic/gin"
)

const TokenPeriod = time.Hour * 24

// LoginHandler handles the POST request to /login.
// request body: { username, password }
func LoginHandler(c *gin.Context) {
	// get the username and password from the request body
	var body struct {
		Username string `json:"username" binding:"required"`
		Password string `json:"password" binding:"required"`
	}

	if err := c.Bind(&body); err != nil {
		c.JSON(http.StatusBadRequest, messages.ReturnMessage("Invalid request body", err, nil))

		return
	}

	// check if the username and password is valid
	user, err := repository.SearchUserByName(body.Username)

	if err != nil {
		c.JSON(http.StatusBadRequest, messages.ReturnMessage("Invalid username", err, nil))

		return
	}

	// compare the password with the saved password
	err = bcrypt.CompareHashAndPassword([]byte(user.Password), []byte(body.Password))

	if err != nil {
		c.JSON(http.StatusBadRequest, messages.ReturnMessage("Invalid password", err, nil))

		return
	}

	// generate jwt token
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
		"sub": user.ID,
		"exp": time.Now().Add(TokenPeriod).Unix(),
	})

	tokenString, err := token.SignedString([]byte(os.Getenv("SECRET_KEY")))

	if err != nil {
		c.JSON(http.StatusInternalServerError, messages.ReturnMessage("Failed to generate token", err, nil))

		return
	}

	// return the jwt token
	c.SetSameSite(http.SameSiteLaxMode)
	c.SetCookie("Authorization", tokenString, int(TokenPeriod.Seconds()), "", "", true, true)

	type ReturnUser struct {
		ID       uint   `json:"id"`
		Username string `json:"username"`
		Token    string `json:"token"`
	}

	returnUser := ReturnUser{
		ID:       user.ID,
		Username: user.Username,
		Token:    tokenString,
	}

	// set the user id and username in the session
	c.JSON(http.StatusOK, messages.ReturnMessage("Login successful", nil, returnUser))
}
