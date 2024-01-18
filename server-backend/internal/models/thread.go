package models

import (
	"gorm.io/gorm"
	"sort"
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

type Threads []Thread

func (threads *Threads) lessByDate(i, j int) bool {
	date1 := (*threads)[i].CreatedAt
	date2 := (*threads)[j].CreatedAt
	return date2.After(date1)
}

func (threads *Threads) lessByLike(i, j int) bool {
	return len((*threads)[i].LikedBy) > len((*threads)[j].LikedBy)
}

func (threads *Threads) SortByDate() {
	sort.SliceStable(*threads, threads.lessByDate)
}

func (threads *Threads) SortByLike() {
	sort.SliceStable(*threads, threads.lessByLike)
}
