package models

import "time"

type Comment struct {
	ID          uint      `gorm:"primaryKey"` // set id as primary key
	PostID      uint      `gorm:"index"`
	Content     string    `gorm:"type:text"`
	AuthorName  string    `gorm:"type:text"`
	CreatedTime time.Time `gorm:"type:date"`
}
