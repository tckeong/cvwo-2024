package initializers

import (
	"github.com/joho/godotenv"
	"log"
)

// LoadEnvVariables is a public method that loads the environment variables from the .env file.
func LoadEnvVariables() {
	err := godotenv.Load()

	if err != nil {
		log.Fatalln("Error loading .env file")
	}
}
