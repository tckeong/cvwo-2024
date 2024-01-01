package repository

import (
	"github.com/tckeong/cvwo-2024/internal/initializers"
	"github.com/tckeong/cvwo-2024/internal/models"
	"time"
)

func GetCommentsByPostID(postID uint) ([]models.Comment, error) {
	var comments []models.Comment
	err := initializers.DB.Where("post_id = ?", postID).Find(&comments).Error
	return comments, err
}

func CreateComment(content string, authorName string, authorID, postID uint) error {
	comment := models.Comment{
		Content:     content,
		AuthorID:    authorID,
		AuthorName:  authorName,
		CreatedTime: time.Now(),
		PostID:      postID,
	}

	return initializers.DB.Create(&comment).Error
}
