package middlewares

import (
	"github.com/gin-gonic/gin"
	"github.com/tckeong/cvwo-2024/internal/errorLog"
	"github.com/tckeong/cvwo-2024/internal/handlers/messages"
	"github.com/tckeong/cvwo-2024/internal/models"
	"net/http"
)

var users map[string]struct{} = make(map[string]struct{})

// LoginCheck checks if the user is logged in.
// it is a middleware for all login handler
func LoginCheck(c *gin.Context) {
	body := new(models.Body)

	if err := c.Bind(body); errorLog.ErrorHandler(err) != nil {
		c.JSON(http.StatusBadRequest, messages.ReturnMessage("Invalid request body", err, nil))

		return
	}

	username := body.Username

	if _, ok := users[username]; ok {
		c.AbortWithStatusJSON(http.StatusBadRequest, gin.H{
			"message": "user is already logged in",
		})

		return
	}

	c.Set("body", body)
	c.Next()
}

func SetLogin(username string) {
	users[username] = struct{}{}
}
