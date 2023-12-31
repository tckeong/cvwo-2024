package models

import (
	"github.com/tckeong/cvwo-2024/internal/initializers"
	"time"
)

type Comment struct {
	ID          uint   `gorm:"primaryKey"` // set id as primary key
	PostID      uint   `gorm:"index"`
	Content     string `gorm:"type:text"`
	AuthorID    uint
	AuthorName  string
	CreatedTime time.Time `gorm:"type:date"`
	Author      User      `gorm:"foreignKey:AuthorID"`
	Thread      Thread    `gorm:"foreignKey:PostID"`
}

func GetCommentsByPostID(postID uint) ([]Comment, error) {
	var comments []Comment
	err := initializers.DB.Where("PostID = ?", postID).Find(&comments).Error
	return comments, err
}

func CreateComment(content string, authorName string, authorID, postID uint) error {
	comment := Comment{
		Content:     content,
		AuthorID:    authorID,
		AuthorName:  authorName,
		CreatedTime: time.Now(),
		PostID:      postID,
	}

	return initializers.DB.Create(&comment).Error
}
