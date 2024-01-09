package models

import (
	"time"
)

// Comment is a struct that represents a comment in the database.
type Comment struct {
	ID          uint      `gorm:"primaryKey"` // set id as primary key
	PostID      uint      `gorm:"index" json:"post_id"`
	Content     string    `gorm:"type:text" json:"content"`
	AuthorID    uint      `json:"author_id"`
	AuthorName  string    `json:"author_name"`
	CreatedTime time.Time `gorm:"type:date"`
	Author      User      `gorm:"foreignKey:AuthorID"`
}
