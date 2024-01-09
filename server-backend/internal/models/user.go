package models

// User is a struct that represents a user in the database.
type User struct {
	ID       uint      `gorm:"primaryKey"` // set id as primary key
	Username string    `gorm:"unique" json:"username"`
	Password string    `json:"password"`
	Likes    UintArray `gorm:"type:text" json:"likes"`
}
