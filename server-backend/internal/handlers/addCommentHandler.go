package handlers

import (
	"github.com/gin-gonic/gin"
	"github.com/tckeong/cvwo-2024/internal/models"
	"net/http"
)

func AddCommentHandler(c *gin.Context) {
	var body struct {
		ThreadID   uint   `json:"thread_id"`
		Content    string `json:"content"`
		AuthorName string `json:"author_name"`
		AuthorID   uint   `json:"author_id"`
	}

	if err := c.Bind(body); err != nil {
		c.JSON(http.StatusBadRequest, ReturnMessage("Invalid request body", err, nil))

		return
	}

	err := models.CreateComment(body.Content, body.AuthorName, body.AuthorID, body.ThreadID)

	if err != nil {
		c.JSON(http.StatusBadRequest, ReturnMessage("Invalid request body", err, nil))

		return
	}

	c.JSON(http.StatusOK, ReturnMessage("Comment created successfully", nil, nil))
}
