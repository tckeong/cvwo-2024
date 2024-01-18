package middlewares

import (
	"github.com/gin-gonic/gin"
	"github.com/tckeong/cvwo-2024/internal/models"
)

// Logout is a middleware that logs the user out.
// It delete the user from the users map when the user logs out.
func Logout(c *gin.Context) {
	user := c.Keys["user"].(*models.User)

	delete(users, user.Username)

	c.Next()
}
