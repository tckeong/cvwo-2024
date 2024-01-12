package errorLog

import (
	"log"
	"os"
)

var (
	Logger *log.Logger
)

// LoggerInit is a public method that initializes the logger.
func LoggerInit() {
	// relative path to go.mod
	filePath := "./cmd/server/log/error.log"

	file, err := os.OpenFile(filePath, os.O_APPEND|os.O_CREATE|os.O_WRONLY, 0644)

	if err != nil {
		panic(err.Error())
	}

	Logger = log.New(file, "ERROR: ", log.Ldate|log.Ltime|log.LstdFlags|log.Lshortfile)
}

// ErrorHandler is a public method that handles errors.
// It will accept an error, if it is not nil, it will log the error.
// If it is nil, it will do nothing.
// Finally, it will return the error.
func ErrorHandler(err error) error {
	if err != nil {
		Logger.Println(err)
	}

	return err
}
