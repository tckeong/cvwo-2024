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

// EditThreadHandler handles the PUT request to /thread.
// request body: { post_id, title, content, img_link, tags }
func EditThreadHandler(c *gin.Context) {
	var body struct {
		PostID  uint   `json:"post_id" binding:"required"`
		Title   string `json:"title" binding:"required"`
		Content string `json:"content" binding:"required"`
		ImgLink string `json:"img_link"`
		Tags    string `json:"tags"`
	}

	if err := c.Bind(&body); errorLog.ErrorHandler(err) != nil {

		c.JSON(http.StatusBadRequest, messages.ReturnMessage("Invalid request body", err, nil))

		return
	}

	curUser := c.Keys["user"].(*models.User)

	thread, err := repository.GetThreadByID(body.PostID)

	if errorLog.ErrorHandler(err) != nil || curUser.ID != thread.AuthorID {
		if err == nil {
			err := errors.New("user is not the author of the thread")
			_ = errorLog.ErrorHandler(err)
		}

		c.JSON(http.StatusBadRequest, messages.ReturnMessage("Invalid request body", err, nil))

		return
	}

	// update the thread
	err = repository.UpdateThread(body.PostID, body.Title, body.Content, body.ImgLink, body.Tags)

	if errorLog.ErrorHandler(err) != nil {
		c.JSON(http.StatusBadRequest, messages.ReturnMessage("Invalid request body", err, nil))

		return
	}

	c.JSON(http.StatusOK, messages.ReturnMessage("Thread updated successfully", nil, nil))
}
