package initializers

import (
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
	"log"
	"os"
)

var DB *gorm.DB

// ConnectToDB is a public method that connects to the database.
func ConnectToDB() {
	var err error

	// data source name
	dsn := os.Getenv("DB")

	DB, err = gorm.Open(postgres.Open(dsn), &gorm.Config{})

	if err != nil {
		log.Fatalln("failed to connect database")
	}
}
