package handlers

import (
	"github.com/gin-gonic/gin"
	"github.com/tckeong/cvwo-2024/internal/models"
	"net/http"
)

// GetThreadHandler accept the thread id and return the relevant thread
func GetThreadHandler(c *gin.Context) {
	var body struct {
		ThreadID uint `json:"threadID" binding:"required"`
	}

	if err := c.Bind(body); err != nil {
		c.JSON(http.StatusBadRequest, ReturnMessage("Invalid request body", err, nil))

		return
	}

	thread, err := models.GetThreadByID(body.ThreadID)

	if err != nil {
		c.JSON(http.StatusBadRequest, ReturnMessage("Invalid request body", err, nil))

		return
	}

	c.JSON(http.StatusOK, ReturnMessage("Thread retrieved successfully", nil, thread))
}
