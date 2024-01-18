package repository

import (
	"github.com/tckeong/cvwo-2024/internal/models"
	"github.com/tckeong/cvwo-2024/internal/repository/configs"
)

// GetAllThreads is a function that returns all the threads in the database.
func GetAllThreads() (*models.Threads, error) {
	threads := new(models.Threads)
	err := configs.DB.Find(threads).Error
	return threads, err
}

// GetAllThreadsID is a function that returns all the threads' ID in the database.
// It call GetAllThreads() and then extract the ID from the threads.
func GetAllThreadsID() ([][]uint, error) {
	Threads, err := GetAllThreads()

	if err != nil {
		return nil, err
	}

	// Threads *[]models.Thread
	// threads []models.Thread
	threads := *Threads

	threadsByDateID := make([]uint, len(threads))
	threadsByLikeID := make([]uint, len(threads))

	threads.SortByDate()

	for i := 0; i < len(threads); i++ {
		threadsByDateID[i] = threads[i].ID
	}

	threads.SortByLike()

	for i := 0; i < len(threads); i++ {
		threadsByLikeID[i] = threads[i].ID
	}

	return [][]uint{threadsByDateID, threadsByLikeID}, nil
}

// GetThreadByID is a function that returns a thread with the given ID.
func GetThreadByID(id uint) (*models.Thread, error) {
	thread := new(models.Thread)
	err := configs.DB.First(thread, id).Error
	return thread, err
}

// GetThreadsByAuthorID is a function that returns all the threads with the given author ID.
func GetThreadsByAuthorID(authorID uint) (*models.Threads, error) {
	threads := new(models.Threads)
	err := configs.DB.Where("author_id = ?", authorID).Find(threads).Error
	return threads, err
}

// GetThreadsIDByAuthorID is a function that returns all the threads' ID with the given author ID.
// It calls GetThreadsByAuthorID() and then extract the ID from the threads.
func GetThreadsIDByAuthorID(authorID uint) ([]uint, error) {
	Threads, err := GetThreadsByAuthorID(authorID)

	if err != nil {
		return nil, err
	}

	// Threads *[]models.Thread
	// threads []models.Thread
	threads := *Threads

	threads.SortByDate()

	threadsID := make([]uint, len(threads))

	for i := 0; i < len(threads); i++ {
		threadsID[i] = threads[i].ID
	}

	return threadsID, nil
}

// GetThreadsByKeywords is a function that returns all the threads with the given keywords.
func GetThreadsByKeywords(keywords *[]string) (*models.Threads, error) {
	keywordArray := *keywords
	query := ""

	for i := 0; i < len(keywordArray); i++ {
		query += "LOWER(title) LIKE LOWER('%" + keywordArray[i] + "%')" + " OR " +
			"LOWER(tags) LIKE LOWER('%" + keywordArray[i] + "%')" + " OR " +
			"LOWER(content) LIKE LOWER('%" + keywordArray[i] + "%')" + " OR " +
			"LOWER(author_name) LIKE LOWER('%" + keywordArray[i] + "%')"

		if i != len(keywordArray)-1 {
			query += " OR "
		}
	}

	threads := new(models.Threads)
	err := configs.DB.Where(query).Find(threads).Error
	return threads, err
}

// GetThreadsIDByKeywords is a function that returns all the threads' ID with the given keywords.
// It calls GetThreadsByKeywords() and then extract the ID from the threads.
func GetThreadsIDByKeywords(keywords *[]string) ([][]uint, error) {
	Threads, err := GetThreadsByKeywords(keywords)

	if err != nil {
		return nil, err
	}

	// Threads *[]models.Thread
	// threads []models.Thread
	threads := *Threads

	threadsByDateID := make([]uint, len(threads))
	threadsByLikeID := make([]uint, len(threads))

	threads.SortByDate()

	for i := 0; i < len(threads); i++ {
		threadsByDateID[i] = threads[i].ID
	}

	threads.SortByLike()

	for i := 0; i < len(threads); i++ {
		threadsByLikeID[i] = threads[i].ID
	}

	return [][]uint{threadsByDateID, threadsByLikeID}, nil
}

// CreateThread is a function that creates a thread with the given parameters.
func CreateThread(title, content, imgLink string, tags string, authorID uint, authorName string) error {
	thread := &models.Thread{
		Title:      title,
		Content:    content,
		ImgLink:    imgLink,
		AuthorID:   authorID,
		Tags:       tags,
		AuthorName: authorName,
	}

	return configs.DB.Create(thread).Error
}

// UpdateThread is a function that updates a thread with the given parameters.
func UpdateThread(id uint, title, content, imgLink string, tags string) error {
	thread := models.Thread{
		Title:   title,
		Content: content,
		ImgLink: imgLink,
		Tags:    tags,
	}

	return configs.DB.Model(&models.Thread{}).Where("id = ?", id).Updates(thread).Error
}

// UpdateThreadLikeBy is a function that updates a thread's likedBy with the given parameters.
func UpdateThreadLikeBy(threadID uint, userID uint, delete bool) error {
	thread, err := GetThreadByID(threadID)
	newLikedBy := make([]uint, 0, len(thread.LikedBy))

	if err != nil {
		return err
	}

	if delete {
		for i := range thread.LikedBy {
			// If the user is the one that is deleting the like, skip it.
			if thread.LikedBy[i] == userID {
				continue
			}

			newLikedBy = append(newLikedBy, thread.LikedBy[i])
		}
	} else {
		// Check if the user has already liked the thread.
		hasLiked := false

		for i := range thread.LikedBy {
			// If the user has already liked the thread, skip it.
			if thread.LikedBy[i] == userID {
				hasLiked = true
				break
			}
		}

		// If the user has not liked the thread, append the user to the likedBy.
		if !hasLiked {
			newLikedBy = append(thread.LikedBy, userID)
		}
	}

	thread.LikedBy = newLikedBy

	return configs.DB.Save(&thread).Error
}

// DeleteThread is a function that deletes a thread with the given ID.
func DeleteThread(id uint) error {
	return configs.DB.Delete(&models.Thread{}, id).Error
}
