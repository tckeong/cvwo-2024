package handlers

import (
	"github.com/gin-gonic/gin"
	"github.com/tckeong/cvwo-2024/internal/errorLog"
	"github.com/tckeong/cvwo-2024/internal/handlers/messages"
	"github.com/tckeong/cvwo-2024/internal/repository"
	"net/http"
	"strconv"
)

// UpdateCommentHandler handles the PUT request to /comment/:comment_id.
// request body: { content }
func UpdateCommentHandler(c *gin.Context) {
	// get the comment id from request url
	commentID, err := strconv.ParseUint(c.Param("comment_id"), 10, 64)

	if errorLog.ErrorHandler(err) != nil {
		c.JSON(http.StatusBadRequest, messages.ReturnMessage("Invalid request body", err, nil))

		return
	}

	var body struct {
		Content string `json:"content"`
	}

	if err := c.Bind(&body); errorLog.ErrorHandler(err) != nil {
		c.JSON(http.StatusBadRequest, messages.ReturnMessage("Invalid request body", err, nil))

		return
	}

	err = repository.UpdateCommentByID(uint(commentID), body.Content)

	if errorLog.ErrorHandler(err) != nil {
		c.JSON(http.StatusBadRequest, messages.ReturnMessage("Invalid request body", err, nil))

		return
	}

	c.JSON(http.StatusOK, messages.ReturnMessage("Comment updated successfully", nil, nil))
}
