package models

import (
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
