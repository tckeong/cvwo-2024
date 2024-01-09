package handlers

import (
	"github.com/gin-gonic/gin"
	"github.com/tckeong/cvwo-2024/internal/errorLog"
	"github.com/tckeong/cvwo-2024/internal/handlers/messages"
	"github.com/tckeong/cvwo-2024/internal/repository"
	"net/http"
	"strconv"
)

// GetAllCommentsHandler handles the POST request to /comment:thread_id.
// It returns all the comments of a thread
func GetAllCommentsHandler(c *gin.Context) {
	threadID, err := strconv.ParseUint(c.Param("thread_id"), 10, 64)

	if errorLog.ErrorHandler(err) != nil {
		c.JSON(http.StatusBadRequest, messages.ReturnMessage("Invalid request body", err, nil))

		return
	}

	comments, err := repository.GetCommentsIDByPostID(uint(threadID))

	if errorLog.ErrorHandler(err) != nil {
		c.JSON(http.StatusBadRequest, messages.ReturnMessage("Invalid request body", err, nil))

		return
	}

	c.JSON(http.StatusOK, messages.ReturnMessage("Comments retrieved successfully", nil, comments))
}
