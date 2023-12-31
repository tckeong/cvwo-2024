package handlers

import (
	"github.com/gin-gonic/gin"
	"github.com/tckeong/cvwo-2024/internal/models"
	"net/http"
)

func CreateThreadHandler(c *gin.Context) {
	var body struct {
		Title    string `json:"title" binding:"required"`
		Content  string `json:"content" binding:"required"`
		ImgLink  string `json:"imgLink"`
		Tags     string `json:"tags"`
		AuthorID uint   `json:"userID" binding:"required"`
	}

	if err := c.Bind(body); err != nil {
		c.JSON(http.StatusBadRequest, ReturnMessage("Invalid request body", err, nil))

		return
	}

	// create the thread
	err := models.CreateThread(body.Title, body.Content, body.ImgLink, body.Tags, body.AuthorID)

	if err != nil {
		c.JSON(http.StatusBadRequest, ReturnMessage("Invalid request body", err, nil))

		return
	}

	c.JSON(http.StatusOK, ReturnMessage("Thread created successfully", nil, nil))
}
