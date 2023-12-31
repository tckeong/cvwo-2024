package models

import "github.com/tckeong/cvwo-2024/internal/initializers"

type User struct {
	ID       uint   `gorm:"primaryKey" json:"id"` // set id as primary key
	Username string `gorm:"unique" json:"username"`
	Password string `json:"password"`
}

func SearchUserByName(username string) (*User, error) {
	user := new(User)
	err := initializers.DB.First(user, "username = ?", username).Error
	return user, err
}

func SearchUserByID(userID uint) (*User, error) {
	user := new(User)
	err := initializers.DB.First(user, userID).Error
	return user, err
}

func CreateUser(username, password string) error {
	user := User{
		Username: username,
		Password: password,
	}

	// save the user to the database
	return initializers.DB.Create(user).Error
}
