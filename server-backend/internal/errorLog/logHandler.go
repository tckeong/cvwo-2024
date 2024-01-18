package errorLog

import (
	"log"
	"os"
)

var (
	Logger *log.Logger
	output *log.Logger
)

// LoggerInit is a public method that initializes the logger.
func LoggerInit() {
	// relative path to go.mod
	// Specify the path of the folder you want to create
	dirPath := "./log"

	// Create the folder and any necessary parent directories with 0755 permissions
	err := os.MkdirAll(dirPath, 0755)
	if err != nil {
		// Handle the error if the folder creation fails
		log.Fatalln("Error creating directory")
	}

	filePath := "./log/error.log"

	file, err := os.OpenFile(filePath, os.O_APPEND|os.O_CREATE|os.O_WRONLY, 0644)

	if err != nil {
		panic(err.Error())
	}

	Logger = log.New(file, "ERROR: ", log.Ldate|log.Ltime|log.LstdFlags)
	output = log.New(os.Stdout, "ERROR: ", log.Ldate|log.Ltime|log.LstdFlags)
}

// ErrorHandler is a public method that handles errors.
// It will accept an error, if it is not nil, it will log the error.
// If it is nil, it will do nothing.
// Finally, it will return the error.
func ErrorHandler(err error) error {
	if err != nil {
		Logger.Println(err)
		output.Println(err)
	}

	return err
}
