package handlers

import (
	"github.com/gin-gonic/gin"
	"github.com/tckeong/cvwo-2024/internal/errorLog"
	"github.com/tckeong/cvwo-2024/internal/handlers/messages"
	"github.com/tckeong/cvwo-2024/internal/repository"
	"net/http"
)

// UpdateCommentHandler handles the PUT request to /comment/:comment_id.
// request body: { comment_id, content }
func UpdateCommentHandler(c *gin.Context) {
	var body struct {
		CommentID uint   `json:"comment_id"`
		Content   string `json:"content"`
	}

	if err := c.Bind(&body); errorLog.ErrorHandler(err) != nil {
		c.JSON(http.StatusBadRequest, messages.ReturnMessage("Invalid request body", err, nil))

		return
	}

	err := repository.UpdateCommentByID(body.CommentID, body.Content)

	if errorLog.ErrorHandler(err) != nil {
		c.JSON(http.StatusBadRequest, messages.ReturnMessage("Invalid request body", err, nil))

		return
	}

	c.JSON(http.StatusOK, messages.ReturnMessage("Comment updated successfully", nil, nil))
}
