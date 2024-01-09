package handlers

import (
	"errors"
	"github.com/gin-gonic/gin"
	"github.com/tckeong/cvwo-2024/internal/errorLog"
	"github.com/tckeong/cvwo-2024/internal/handlers/messages"
	"github.com/tckeong/cvwo-2024/internal/models"
	"github.com/tckeong/cvwo-2024/internal/repository"
	"net/http"
)

// GetLikeByUserHandler handles the GET request to /like.
// accept the user id and return the relevant likes
func GetLikeByUserHandler(c *gin.Context) {
	user, ok := c.Keys["user"].(*models.User)

	if !ok {
		err := errors.New("user not found in context")

		_ = errorLog.ErrorHandler(err)

		c.JSON(http.StatusBadRequest, messages.ReturnMessage("Invalid request", err, nil))

		return
	}

	userID := user.ID
	likes, err := repository.GetUserLikeByID(userID)

	if errorLog.ErrorHandler(err) != nil {
		c.JSON(http.StatusBadRequest, messages.ReturnMessage("Invalid request", err, nil))

		return
	}

	c.JSON(http.StatusOK, messages.ReturnMessage("Likes retrieved successfully", nil, likes))
}
