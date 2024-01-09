package repository

import (
	"github.com/tckeong/cvwo-2024/internal/models"
	"github.com/tckeong/cvwo-2024/internal/repository/configs"
	"time"
)

// GetCommentsByPostID is a function that returns all the comments of a post.
func GetCommentsByPostID(postID uint) (*[]models.Comment, error) {
	comments := new([]models.Comment)
	err := configs.DB.Where("post_id = ?", postID).Find(comments).Error
	return comments, err
}

// GetCommentsIDByPostID is a function that returns all the comments' ID of a post.
// It calls GetCommentsByPostID to get all the comments of a post.
func GetCommentsIDByPostID(postID uint) ([]uint, error) {
	Comments, err := GetCommentsByPostID(postID)

	// Comments *[]models.Comment
	// comments []models.Comment
	comments := *Comments

	if err != nil {
		return nil, err
	}

	commentsID := make([]uint, len(comments))

	for i := 0; i < len(comments); i++ {
		commentsID[i] = comments[i].ID
	}

	return commentsID, nil
}

// GetCommentByID is a function that returns a comment by its ID.
func GetCommentByID(id uint) (*models.Comment, error) {
	comment := new(models.Comment)
	err := configs.DB.First(&comment, id).Error
	return comment, err
}

// UpdateCommentByID is a function that updates the content of a comment by its ID.
func UpdateCommentByID(id uint, content string) error {
	comment, err := GetCommentByID(id)

	if err != nil {
		return err
	}

	comment.Content = content

	return configs.DB.Save(comment).Error
}

// DeleteCommentByID is a function that deletes a comment by its ID.
func DeleteCommentByID(id uint) error {
	return configs.DB.Delete(&models.Comment{}, id).Error
}

// CreateComment is a function that creates a comment.
func CreateComment(content string, authorName string, authorID, postID uint) error {
	comment := models.Comment{
		Content:     content,
		AuthorID:    authorID,
		AuthorName:  authorName,
		CreatedTime: time.Now(),
		PostID:      postID,
	}

	return configs.DB.Create(&comment).Error
}
