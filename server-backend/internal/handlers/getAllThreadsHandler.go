package handlers

import (
	"github.com/gin-gonic/gin"
	"github.com/tckeong/cvwo-2024/internal/handlers/messages"
	"github.com/tckeong/cvwo-2024/internal/repository"
	"net/http"
)

// GetAllThreadHandler is a public method that handles the index route.
// request body: {}
func GetAllThreadHandler(c *gin.Context) {
	threadsID, err := repository.GetAllThreadsID()

	if err != nil {
		c.JSON(http.StatusInternalServerError, messages.ReturnMessage("Error retrieving threads", err, nil))

		return
	}

	c.JSON(200, messages.ReturnMessage("Threads retrieved successfully", nil, threadsID))
}
