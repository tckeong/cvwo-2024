package handlers

import (
	"github.com/gin-gonic/gin"
	"github.com/tckeong/cvwo-2024/internal/handlers/messages"
	"github.com/tckeong/cvwo-2024/internal/models"
	"github.com/tckeong/cvwo-2024/internal/repository"
	"net/http"
)

// AddCommentHandler handles the POST request to /comment.
// request body: { thread_id, content }
func AddCommentHandler(c *gin.Context) {
	var body struct {
		ThreadID uint   `json:"thread_id"`
		Content  string `json:"content"`
	}

	if err := c.Bind(&body); err != nil {
		c.JSON(http.StatusBadRequest, messages.ReturnMessage("Invalid request body", err, nil))

		return
	}

	author := c.Keys["user"].(*models.User)

	err := repository.CreateComment(body.Content, author.Username, author.ID, body.ThreadID)

	if err != nil {
		c.JSON(http.StatusBadRequest, messages.ReturnMessage("Invalid request body", err, nil))

		return
	}

	c.JSON(http.StatusOK, messages.ReturnMessage("Comment created successfully", nil, nil))
}
