package handlers

import (
	"github.com/gin-gonic/gin"
	"github.com/tckeong/cvwo-2024/internal/handlers/messages"
	"github.com/tckeong/cvwo-2024/internal/repository"
	"net/http"
	"strconv"
)

// GetAllCommentHandler handles the POST request to /comment.
func GetAllCommentHandler(c *gin.Context) {
	threadID, err := strconv.ParseUint(c.Param("thread_id"), 10, 64)

	if err != nil {
		c.JSON(http.StatusBadRequest, messages.ReturnMessage("Invalid request body", err, nil))

		return
	}

	comments, err := repository.GetCommentsByPostID(uint(threadID))

	if err != nil {
		c.JSON(http.StatusBadRequest, messages.ReturnMessage("Invalid request body", err, nil))

		return
	}

	c.JSON(http.StatusOK, messages.ReturnMessage("Comments retrieved successfully", nil, comments))
}
