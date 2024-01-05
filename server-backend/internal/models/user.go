package models

type User struct {
	ID       uint      `gorm:"primaryKey" json:"id"` // set id as primary key
	Username string    `gorm:"unique" json:"username"`
	Password string    `json:"password"`
	Likes    UintArray `gorm:"type:text" json:"likes"`
}
