package handlers

import (
	"github.com/gin-gonic/gin"
	"github.com/tckeong/cvwo-2024/internal/models"
	"net/http"
)

func GetAllComment(c *gin.Context) {
	var body struct {
		ThreadID uint `json:"thread_id"`
	}

	if err := c.Bind(body); err != nil {
		c.JSON(http.StatusBadRequest, ReturnMessage("Invalid request body", err, nil))

		return
	}

	comments, err := models.GetCommentsByPostID(body.ThreadID)

	if err != nil {
		c.JSON(http.StatusBadRequest, ReturnMessage("Invalid request body", err, nil))

		return
	}

	c.JSON(http.StatusOK, ReturnMessage("Comments retrieved successfully", nil, comments))
}
