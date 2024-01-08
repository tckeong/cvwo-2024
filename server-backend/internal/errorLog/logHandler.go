package errorLog

import (
	"log"
	"os"
)

var (
	Logger *log.Logger
)

func LoggerInit() {
	filePath := "./log/error.log"

	file, err := os.OpenFile(filePath, os.O_APPEND|os.O_CREATE|os.O_WRONLY, 0644)

	if err != nil {
		panic(err.Error())
	}

	Logger = log.New(file, "ERROR: ", log.Ldate|log.Ltime|log.LstdFlags|log.Lshortfile)
}

func LogError(err error) {
	Logger.Println(err.Error())
}
