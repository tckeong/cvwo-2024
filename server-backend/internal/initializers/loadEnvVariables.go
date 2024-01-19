package initializers

import (
	"github.com/joho/godotenv"
	"github.com/tckeong/cvwo-2024/internal/errorLog"
)

// LoadEnvVariables is a public method that loads the environment variables from the .env file.
func LoadEnvVariables(filePath string) {
	err := godotenv.Load(filePath)

	_ = errorLog.ErrorHandler(err)
}
