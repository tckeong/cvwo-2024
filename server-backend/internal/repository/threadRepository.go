package repository

import (
	"github.com/tckeong/cvwo-2024/internal/initializers"
	"github.com/tckeong/cvwo-2024/internal/models"
)

func GetAllThreads() ([]models.Thread, error) {
	var threads []models.Thread
	err := initializers.DB.Find(&threads).Error
	return threads, err
}

func GetThreadByID(id uint) (models.Thread, error) {
	var thread models.Thread
	err := initializers.DB.First(&thread, id).Error
	return thread, err
}

func GetThreadsByAuthorID(authorID uint) ([]models.Thread, error) {
	var threads []models.Thread
	err := initializers.DB.Where("author_id = ?", authorID).Find(&threads).Error
	return threads, err
}

func GetThreadsByKeywords(keywords *[]string) ([]models.Thread, error) {
	keywordArray := *keywords
	query := ""

	for i := 0; i < len(keywordArray); i++ {
		query += "title LIKE '%" + keywordArray[i] + "%'" + " OR " + "tags LIKE '%" + keywordArray[i] + "%'"

		if i != len(keywordArray)-1 {
			query += " OR "
		}
	}

	var threads []models.Thread
	err := initializers.DB.Where(query).Find(&threads).Error
	return threads, err
}

func GetThreadsByTag(tag string) ([]models.Thread, error) {
	var threads []models.Thread
	err := initializers.DB.Where("tags LIKE '?'", "%"+tag+"%").Find(&threads).Error
	return threads, err
}

func CreateThread(title, content, imgLink string, tags string, authorID uint, authorName string) error {
	thread := models.Thread{
		Title:      title,
		Content:    content,
		ImgLink:    imgLink,
		AuthorID:   authorID,
		Tags:       tags,
		AuthorName: authorName,
	}

	return initializers.DB.Create(&thread).Error
}

func UpdateThread(id uint, title, content, imgLink string, tags string) error {
	thread, err := GetThreadByID(id)

	if err != nil {
		return err
	}

	thread.Title = title
	thread.Content = content
	thread.ImgLink = imgLink
	thread.Tags = tags

	return initializers.DB.Save(&thread).Error

}

func DeleteThread(id uint) error {
	return initializers.DB.Delete(&models.Thread{}, id).Error

}
