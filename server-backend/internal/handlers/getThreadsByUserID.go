package handlers

import (
	"github.com/gin-gonic/gin"
	"github.com/tckeong/cvwo-2024/internal/models"
	"net/http"
)

func GetThreadsByUserID(c *gin.Context) {
	var body struct {
		UserID uint `json:"user_id"`
	}

	if err := c.Bind(body); err != nil {
		c.JSON(http.StatusBadRequest, ReturnMessage("Invalid request body", err, nil))

		return
	}

	threads, err := models.GetThreadsByAuthorID(body.UserID)

	if err != nil {
		c.JSON(http.StatusBadRequest, ReturnMessage("Invalid request body", err, nil))

		return
	}

	c.JSON(http.StatusOK, ReturnMessage("Threads retrieved successfully", nil, threads))
}
