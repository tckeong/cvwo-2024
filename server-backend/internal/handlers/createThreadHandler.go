package handlers

import (
	"github.com/gin-gonic/gin"
	"github.com/tckeong/cvwo-2024/internal/handlers/messages"
	"github.com/tckeong/cvwo-2024/internal/models"
	"github.com/tckeong/cvwo-2024/internal/repository"
	"net/http"
)

// CreateThreadHandler handles the POST request to /thread.
// request body: { title, content, img_link, tags }
func CreateThreadHandler(c *gin.Context) {
	var body struct {
		Title   string `json:"title" binding:"required"`
		Content string `json:"content" binding:"required"`
		ImgLink string `json:"img_link"`
		Tags    string `json:"tags"`
	}

	if err := c.Bind(&body); err != nil {
		c.JSON(http.StatusBadRequest, messages.ReturnMessage("Invalid request body", err, nil))

		return
	}

	author := c.Keys["user"].(*models.User)

	// create the thread
	err := repository.CreateThread(body.Title, body.Content, body.ImgLink, body.Tags, author.ID, author.Username)

	if err != nil {
		c.JSON(http.StatusBadRequest, messages.ReturnMessage("Invalid request body", err, nil))

		return
	}

	c.JSON(http.StatusOK, messages.ReturnMessage("Thread created successfully", nil, nil))
}
