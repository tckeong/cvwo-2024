package handlers

import (
	"github.com/gin-gonic/gin"
	"github.com/tckeong/cvwo-2024/internal/errorLog"
	"github.com/tckeong/cvwo-2024/internal/handlers/messages"
	"github.com/tckeong/cvwo-2024/internal/repository"
	"net/http"
	"strconv"
)

func GetUserLikeHandler(c *gin.Context) {
	userID, err := strconv.ParseUint(c.Param("user_id"), 10, 64)

	if err != nil {
		errorLog.LogError(err)

		c.JSON(http.StatusBadRequest, messages.ReturnMessage("Invalid request", err, nil))

		return
	}

	likes, err := repository.GetUserLikeByID(uint(userID))

	if err != nil {
		errorLog.LogError(err)

		c.JSON(http.StatusBadRequest, messages.ReturnMessage("Invalid request", err, nil))

		return
	}

	c.JSON(http.StatusOK, messages.ReturnMessage("Likes retrieved successfully", nil, likes))
}
