package configs

import (
	"github.com/tckeong/cvwo-2024/internal/models"
	"log"
)

// SyncDatabase is a method to create or open the table in the database.
func SyncDatabase() {
	err := DB.AutoMigrate(&models.User{}, &models.Thread{}, &models.Comment{})

	if err != nil {
		log.Fatalln(err)
	}
}
