package models

import (
	"github.com/tckeong/cvwo-2024/internal/initializers"
	"time"
)

type Thread struct {
	ID          uint      `gorm:"primaryKey"` // set id as primary key
	Title       string    `json:"title"`
	Content     string    `json:"content"`
	ImgLink     string    `json:"imgLink"`
	Author      User      `gorm:"foreignKey:AuthorID"`
	AuthorID    uint      `json:"authorID"`
	AuthorName  string    `json:"authorName"`
	CreatedTime time.Time `gorm:"type:date"`
	LikedBy     []uint    `gorm:"type:integer[]" json:"likedBy"`
	Tags        string    `gorm:"type:text" json:"tags"`
}

func GetAllThreads() ([]Thread, error) {
	var threads []Thread
	err := initializers.DB.Find(&threads).Error
	return threads, err
}

func GetThreadByID(id uint) (Thread, error) {
	var thread Thread
	err := initializers.DB.First(&thread, id).Error
	return thread, err
}

func GetThreadsByAuthorID(authorID uint) ([]Thread, error) {
	var threads []Thread
	err := initializers.DB.Where("author_id = ?", authorID).Find(&threads).Error
	return threads, err
}

func GetThreadsByKeyword(keyword string) ([]Thread, error) {
	var threads []Thread
	err := initializers.DB.Where("title LIKE ?", "%"+keyword+"%").Find(&threads).Error
	return threads, err
}

func GetThreadsByTag(tag string) ([]Thread, error) {
	var threads []Thread
	err := initializers.DB.Where("tags LIKE ?", "%"+tag+"%").Find(&threads).Error
	return threads, err
}

func CreateThread(title, content, imgLink string, tags string, authorID uint) error {
	user, err := SearchUserByID(authorID)

	if err != nil {
		return err
	}

	thread := Thread{
		Title:      title,
		Content:    content,
		ImgLink:    imgLink,
		AuthorID:   authorID,
		Tags:       tags,
		AuthorName: user.Username,
	}

	return initializers.DB.Create(&thread).Error
}

func UpdateThread(id uint, title, content, imgLink string, tags string, authorID uint) error {
	author, err := SearchUserByID(authorID)

	if err != nil {
		return err
	}

	thread := Thread{
		ID:         id,
		Title:      title,
		Content:    content,
		ImgLink:    imgLink,
		Tags:       tags,
		AuthorID:   authorID,
		AuthorName: author.Username,
	}

	return initializers.DB.Save(&thread).Error

}

func DeleteThread(id uint) error {
	return initializers.DB.Delete(&Thread{}, id).Error

}
