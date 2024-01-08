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

// DeleteThreadHandler handles the DELETE request to /thread.
// request body: { thread_id }
func DeleteThreadHandler(c *gin.Context) {
	var body struct {
		ThreadID uint `json:"thread_id"`
	}

	if err := c.Bind(&body); err != nil {
		errorLog.LogError(err)

		c.JSON(http.StatusBadRequest, messages.ReturnMessage("Invalid request body", err, nil))

		return
	}

	curUser := c.Keys["user"].(*models.User)
	thread, err := repository.GetThreadByID(body.ThreadID)

	if err != nil || curUser.ID != thread.AuthorID {
		if err == nil {
			errorLog.LogError(errors.New("user is not the author of the thread"))
		} else {
			errorLog.LogError(err)
		}

		c.JSON(http.StatusBadRequest, messages.ReturnMessage("Invalid request body", err, nil))

		return
	}

	err = repository.DeleteThread(body.ThreadID)

	if err != nil {
		errorLog.LogError(err)

		c.JSON(http.StatusBadRequest, messages.ReturnMessage("Invalid request body", err, nil))

		return
	}

	c.JSON(http.StatusOK, messages.ReturnMessage("Thread deleted successfully", nil, nil))
}
