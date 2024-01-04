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

func GetAllThreadsID() ([]uint, error) {
	threads, err := GetAllThreads()

	if err != nil {
		return nil, err
	}

	threadsID := make([]uint, len(threads))

	for i := 0; i < len(threads); i++ {
		threadsID[i] = threads[i].ID
	}

	return threadsID, nil
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
		query += "LOWER(title) LIKE LOWER('%" + keywordArray[i] + "%')" + " OR " +
			"LOWER(tags) LIKE LOWER('%" + keywordArray[i] + "%')" + " OR " +
			"LOWER(content) LIKE LOWER('%" + keywordArray[i] + "%')"

		if i != len(keywordArray)-1 {
			query += " OR "
		}
	}

	var threads []models.Thread
	err := initializers.DB.Where(query).Find(&threads).Error
	return threads, err
}

func GetThreadsIDByKeywords(keywords *[]string) ([]uint, error) {
	threads, err := GetThreadsByKeywords(keywords)

	if err != nil {
		return nil, err
	}

	threadsID := make([]uint, len(threads))

	for i := 0; i < len(threads); i++ {
		threadsID[i] = threads[i].ID
	}

	return threadsID, nil
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

func UpdateThreadLikeBy(threadID uint, userID uint, delete bool) error {
	thread, err := GetThreadByID(threadID)

	if err != nil {
		return err
	}

	if delete {
		for i := range thread.LikedBy {
			if thread.LikedBy[i] == userID {
				thread.LikedBy = append(thread.LikedBy[:i], thread.LikedBy[i+1:]...)
			}
		}
	} else {
		flag := true

		for i := range thread.LikedBy {
			if uint(thread.LikedBy[i]) == userID {
				flag = false
				break
			}
		}

		if flag {
			thread.LikedBy = append(thread.LikedBy, userID)
		}
	}

	return initializers.DB.Save(&thread).Error
}

func DeleteThread(id uint) error {
	return initializers.DB.Delete(&models.Thread{}, id).Error

}
