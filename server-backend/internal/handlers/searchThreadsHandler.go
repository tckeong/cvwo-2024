package handlers

import (
	"github.com/gin-gonic/gin"
	"github.com/tckeong/cvwo-2024/internal/models"
	"net/http"
	"strings"
)

func SearchThreadsHandler(c *gin.Context) {
	var body struct {
		Keywords string `json:"keywords"`
	}

	if err := c.Bind(body); err != nil {
		c.JSON(http.StatusBadRequest, ReturnMessage("Invalid request body", err, nil))

		return
	}

	// search the threads
	keywords := strings.Split(body.Keywords, " ")
	threads := make([]models.Thread, 0)

	for i := 0; i < len(keywords); i++ {
		result, err := models.GetThreadsByTag(keywords[i])

		if err == nil {
			threads = append(threads, result...)
			continue
		}

		result, err = models.GetThreadsByKeyword(keywords[i])

		if err == nil {
			threads = append(threads, result...)
		}
	}

	// return the threads
	c.JSON(http.StatusOK, ReturnMessage("Threads retrieved successfully", nil, threads))
}
