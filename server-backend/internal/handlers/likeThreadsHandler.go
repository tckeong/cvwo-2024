package handlers

import (
	"github.com/gin-gonic/gin"
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

	if err := c.Bind(&body); err != nil {
		c.JSON(http.StatusBadRequest, messages.ReturnMessage("Invalid request body", err, nil))

		return
	}

	checkDeleted := func(threadID uint, likes []uint) bool {
		for i := range likes {
			if threadID == likes[i] {
				return true
			}
		}

		return false
	}

	for i := range body.ThreadsID {
		var err error

		if checkDeleted(body.ThreadsID[i], user.Likes) {
			err = repository.UpdateThreadLikeBy(body.ThreadsID[i], user.ID, true)
		} else {
			err = repository.UpdateThreadLikeBy(body.ThreadsID[i], user.ID, false)
		}

		if err != nil {
			c.JSON(http.StatusBadRequest, messages.ReturnMessage("Invalid request body", err, nil))

			return
		}
	}

	user.Likes = body.ThreadsID
	err := repository.UpdateUser(user)

	if err != nil {
		c.JSON(http.StatusBadRequest, messages.ReturnMessage("Invalid request body", err, nil))

		return
	}

	c.JSON(http.StatusOK, messages.ReturnMessage("Threads liked successfully", nil, nil))
}
