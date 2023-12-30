package models

import "time"

type Thread struct {
	ID          uint `gorm:"primaryKey"` // set id as primary key
	Title       string
	Content     string
	ImgLink     string
	AuthorName  uint
	CreatedTime time.Time
	LikedBy     []uint   `gorm:"type:integer[]"`
	tags        []string `gorm:"type:text[]"`
}
