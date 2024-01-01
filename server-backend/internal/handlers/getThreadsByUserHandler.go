package handlers

import (
	"github.com/gin-gonic/gin"
	"github.com/tckeong/cvwo-2024/internal/handlers/messages"
	"github.com/tckeong/cvwo-2024/internal/models"
	"github.com/tckeong/cvwo-2024/internal/repository"
	"net/http"
)

// GetThreadsByUserHandler handles the POST request to /userThreads.
func GetThreadsByUserHandler(c *gin.Context) {
	user := c.Keys["user"].(*models.User)

	threads, err := repository.GetThreadsByAuthorID(user.ID)

	if err != nil {
		c.JSON(http.StatusBadRequest, messages.ReturnMessage("Invalid request body", err, nil))

		return
	}

	c.JSON(http.StatusOK, messages.ReturnMessage("Threads retrieved successfully", nil, threads))
}