package models

type User struct {
	ID       uint   `gorm:"primaryKey" json:"id"` // set id as primary key
	Username string `gorm:"unique" json:"username"`
	Password string `json:"password"`
	Likes    []uint `gorm:"type:integer[]" json:"likes"`
}
