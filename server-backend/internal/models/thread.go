package models

import (
	"gorm.io/gorm"
)

// Thread is a struct that represents a thread in the database.
type Thread struct {
	gorm.Model
	Title      string    `json:"title"`
	Content    string    `json:"content"`
	ImgLink    string    `json:"img_link"`
	Author     User      `gorm:"foreignKey:AuthorID"`
	AuthorID   uint      `json:"author_id"`
	AuthorName string    `json:"author_name"`
	LikedBy    UintArray `gorm:"type:text" json:"liked_by"`
	Tags       string    `gorm:"type:text" json:"tags"`
}
