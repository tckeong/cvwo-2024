package messages

import "github.com/gin-gonic/gin"

// ReturnMessage returns a gin.H with the message, error message and return value.
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
