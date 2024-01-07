package handlers

import (
	"github.com/gin-gonic/gin"
	"github.com/tckeong/cvwo-2024/internal/handlers/messages"
	"github.com/tckeong/cvwo-2024/internal/repository"
	"net/http"
)

// DeleteCommentHandler handles the DELETE request to /comment.
// request body: { comment_id }
func DeleteCommentHandler(c *gin.Context) {
	var body struct {
		CommentID uint `json:"comment_id"`
	}

	if err := c.Bind(&body); err != nil {
		c.JSON(http.StatusBadRequest, messages.ReturnMessage("Invalid request body", err, nil))

		return
	}

	err := repository.DeleteCommentByID(body.CommentID)

	if err != nil {
		c.JSON(http.StatusBadRequest, messages.ReturnMessage("Invalid request body", err, nil))

		return
	}

	c.JSON(http.StatusOK, messages.ReturnMessage("Comment deleted successfully", nil, nil))
}
