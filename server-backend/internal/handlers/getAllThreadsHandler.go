package handlers

import (
	"github.com/gin-gonic/gin"
	"github.com/tckeong/cvwo-2024/internal/models"
	"net/http"
)

// GetAllThreadHandler is a public method that handles the index route.
func GetAllThreadHandler(c *gin.Context) {
	threads, err := models.GetTAllThreads()

	if err != nil {
		c.JSON(http.StatusInternalServerError, ReturnMessage("Error retrieving threads", err, nil))

		return
	}

	c.JSON(200, ReturnMessage("Threads retrieved successfully", nil, threads))
}
