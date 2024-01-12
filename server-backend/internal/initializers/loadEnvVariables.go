package initializers

import (
	"github.com/joho/godotenv"
	"log"
)

// LoadEnvVariables is a public method that loads the environment variables from the .env file.
func LoadEnvVariables(filePath string) {
	err := godotenv.Load(filePath)

	if err != nil {

		log.Fatalln("Error loading .env file")
	}
}
