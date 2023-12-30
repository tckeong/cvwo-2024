package handlers

import (
	"github.com/gin-gonic/gin"
)

// IndexHandler is a public method that handles the index route.
func IndexHandler(c *gin.Context) {
	c.JSON(200, gin.H{
		"message": "Hello, World!",
	})
}
