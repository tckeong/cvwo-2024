package repository

import (
	"github.com/tckeong/cvwo-2024/internal/models"
	"github.com/tckeong/cvwo-2024/internal/repository/configs"
)

// SearchUserByName searches for a user by their username
func SearchUserByName(username string) (*models.User, error) {
	user := new(models.User)
	err := configs.DB.First(user, "username = ?", username).Error
	return user, err
}

// SearchUserByID searches for a user by their ID
func SearchUserByID(userID uint) (*models.User, error) {
	user := new(models.User)
	err := configs.DB.First(user, userID).Error
	return user, err
}

// GetUserLikeByID returns the likes of a user
func GetUserLikeByID(userID uint) ([]uint, error) {
	user := new(models.User)
	err := configs.DB.First(user, userID).Error

	return user.Likes, err
}

// UpdateUser updates the user in the database
func UpdateUser(user *models.User) error {
	return configs.DB.Save(user).Error
}

// CreateUser creates a new user in the database
func CreateUser(username, password string) error {
	user := &models.User{
		Username: username,
		Password: password,
	}

	// save the user to the database
	return configs.DB.Create(user).Error
}
