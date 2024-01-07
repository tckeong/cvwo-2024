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

func GetCommentsIDByPostID(postID uint) ([]uint, error) {
	comments, err := GetCommentsByPostID(postID)

	if err != nil {
		return nil, err
	}

	commentsID := make([]uint, len(comments))

	for i := 0; i < len(comments); i++ {
		commentsID[i] = comments[i].ID
	}

	return commentsID, nil
}

func GetCommentByID(id uint) (models.Comment, error) {
	var comment models.Comment
	err := initializers.DB.First(&comment, id).Error
	return comment, err
}

func UpdateCommentByID(id uint, content string) error {
	comment, err := GetCommentByID(id)

	if err != nil {
		return err
	}

	comment.Content = content

	return initializers.DB.Save(&comment).Error
}

func DeleteCommentByID(id uint) error {
	return initializers.DB.Delete(&models.Comment{}, id).Error
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
