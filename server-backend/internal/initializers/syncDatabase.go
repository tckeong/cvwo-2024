package initializers

import (
	"github.com/tckeong/cvwo-2024/internal/models"
	"log"
)

func SyncDatabase() {
	err := DB.AutoMigrate(&models.User{})

	if err != nil {
		log.Fatalln(err)
	}
}
