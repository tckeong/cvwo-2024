package repository

import (
	"github.com/tckeong/cvwo-2024/internal/initializers"
	"github.com/tckeong/cvwo-2024/internal/models"
)

func SearchUserByName(username string) (*models.User, error) {
	user := new(models.User)
	err := initializers.DB.First(user, "username = ?", username).Error
	return user, err
}

func SearchUserByID(userID uint) (*models.User, error) {
	user := new(models.User)
	err := initializers.DB.First(user, userID).Error
	return user, err
}

func GetUserLikeByID(userID uint) ([]uint, error) {
	user := new(models.User)
	err := initializers.DB.First(user, userID).Error

	return user.Likes, err
}

func UpdateUser(user *models.User) error {
	return initializers.DB.Save(user).Error
}

func CreateUser(username, password string) error {
	user := &models.User{
		Username: username,
		Password: password,
	}

	// save the user to the database
	return initializers.DB.Create(user).Error
}
