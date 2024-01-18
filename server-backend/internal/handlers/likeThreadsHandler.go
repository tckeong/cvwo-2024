package handlers

import (
	"github.com/gin-gonic/gin"
	"github.com/tckeong/cvwo-2024/internal/errorLog"
	"github.com/tckeong/cvwo-2024/internal/handlers/messages"
	"github.com/tckeong/cvwo-2024/internal/models"
	"github.com/tckeong/cvwo-2024/internal/repository"
	"net/http"
)

// LikeThreadsHandler handles the PUT request to /like.
// request body: { likes }
func LikeThreadsHandler(c *gin.Context) {
	user := c.Keys["user"].(*models.User)

	var body struct {
		ThreadsID []uint `json:"likes"`
	}

	if err := c.Bind(&body); errorLog.ErrorHandler(err) != nil {
		c.JSON(http.StatusBadRequest, messages.ReturnMessage("Invalid request body", err, nil))

		return
	}

	updateLike := body.ThreadsID
	deleteLike := make([]uint, 0)

	// if the request body is empty, delete all the likes
	if len(body.ThreadsID) == 0 {
		deleteLike = user.Likes
	} else {
		// if the request body is not empty, update the likes if the user likes is empty
		likes := user.Likes

		for i := range likes {
			found := false

			for j := range body.ThreadsID {
				if likes[i] == body.ThreadsID[j] {
					found = true

					break
				}
			}

			if !found {
				deleteLike = append(deleteLike, likes[i])
			}
		}
	}

	for i := range updateLike {
		err := repository.UpdateThreadLikeBy(updateLike[i], user.ID, false)

		if errorLog.ErrorHandler(err) != nil {
			c.JSON(http.StatusBadRequest, messages.ReturnMessage("Invalid request body", err, nil))

			return
		}
	}

	for i := range deleteLike {
		err := repository.UpdateThreadLikeBy(deleteLike[i], user.ID, true)

		if errorLog.ErrorHandler(err) != nil {
			c.JSON(http.StatusBadRequest, messages.ReturnMessage("Invalid request body", err, nil))

			return
		}
	}

	user.Likes = body.ThreadsID
	err := repository.UpdateUser(user)

	if errorLog.ErrorHandler(err) != nil {
		c.JSON(http.StatusBadRequest, messages.ReturnMessage("Invalid request body", err, nil))

		return
	}

	c.JSON(http.StatusOK, messages.ReturnMessage("Threads liked successfully", nil, nil))
}
