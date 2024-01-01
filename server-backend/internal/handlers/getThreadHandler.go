package handlers

import (
	"github.com/gin-gonic/gin"
	"github.com/tckeong/cvwo-2024/internal/handlers/messages"
	"github.com/tckeong/cvwo-2024/internal/repository"
	"net/http"
	"strconv"
)

// GetThreadHandler handles the GET request to /thread/:thread_id.
// accept the thread id and return the relevant thread
// request body: { thread_id }
func GetThreadHandler(c *gin.Context) {
	threadID, err := strconv.ParseUint(c.Param("thread_id"), 10, 64)

	if err != nil {
		c.JSON(http.StatusBadRequest, messages.ReturnMessage("Invalid request body", err, nil))

		return
	}

	thread, err := repository.GetThreadByID(uint(threadID))

	if err != nil {
		c.JSON(http.StatusBadRequest, messages.ReturnMessage("Invalid request body", err, nil))

		return
	}

	c.JSON(http.StatusOK, messages.ReturnMessage("Thread retrieved successfully", nil, thread))
}
