package handlers

import "github.com/gin-gonic/gin"

func ReturnMessage(message string, errorMessage error, returnValue any) gin.H {
	if errorMessage != nil {
		return gin.H{
			"message": message,
			"error":   errorMessage.Error(),
		}
	} else {
		if returnValue == nil {
			return gin.H{
				"message": message,
			}
		}

		return gin.H{
			"message": message,
			"value":   returnValue,
		}
	}
}
