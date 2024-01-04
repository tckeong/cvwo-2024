package models

import (
	"gorm.io/gorm"
)

type Thread struct {
	gorm.Model
	Title      string    `json:"title"`
	Content    string    `json:"content"`
	ImgLink    string    `json:"imgLink"`
	Author     User      `gorm:"foreignKey:AuthorID"`
	AuthorID   uint      `json:"authorID"`
	AuthorName string    `json:"authorName"`
	LikedBy    UintArray `gorm:"type:text" json:"likedBy"`
	Tags       string    `gorm:"type:text" json:"tags"`
}
