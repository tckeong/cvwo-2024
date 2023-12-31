package initializers

import (
	"github.com/tckeong/cvwo-2024/internal/models"
	"log"
)

func SyncDatabase() {
	err := DB.AutoMigrate(&models.User{}, &models.Thread{}, &models.Comment{})

	if err != nil {
		log.Fatalln(err)
	}
}
