package initializers

import (
	"github.com/tckeong/cvwo-2024/internal/models"
	"github.com/tckeong/cvwo-2024/internal/repository"
	"log"
)

func SyncDatabase() {
	err := repository.DB.AutoMigrate(&models.User{}, &models.Thread{}, &models.Comment{})

	if err != nil {
		log.Fatalln(err)
	}
}
