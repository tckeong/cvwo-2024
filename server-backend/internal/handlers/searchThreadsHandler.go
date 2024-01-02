package handlers

import (
	"github.com/gin-gonic/gin"
	"github.com/tckeong/cvwo-2024/internal/handlers/messages"
	"github.com/tckeong/cvwo-2024/internal/repository"
	"net/http"
	"strings"
)

// SearchThreadsHandler handles the POST request to /search.
// request body: { keywords }
func SearchThreadsHandler(c *gin.Context) {
	var body struct {
		Keywords string `json:"keywords"`
	}

	if err := c.Bind(&body); err != nil {
		c.JSON(http.StatusBadRequest, messages.ReturnMessage("Invalid request body", err, nil))

		return
	}

	// search the threads
	keywords := strings.Split(body.Keywords, ",")

	threadsID, err := repository.GetThreadsIDByKeywords(&keywords)

	if err != nil {
		c.JSON(http.StatusInternalServerError, messages.ReturnMessage("Get threads error", err, nil))

		return
	}

	// return the threads
	c.JSON(http.StatusOK, messages.ReturnMessage("Threads retrieved successfully", nil, threadsID))
}
