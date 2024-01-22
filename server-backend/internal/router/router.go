package router

import (
	"fmt"
	"os"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"github.com/tckeong/cvwo-2024/internal/handlers"
	"github.com/tckeong/cvwo-2024/internal/initializers"
	"github.com/tckeong/cvwo-2024/internal/middlewares"
)

// Server is a struct that contains a pointer to a gin.Engine.
type Server struct {
	router *gin.Engine
}

func init() {
	gin.SetMode(gin.ReleaseMode)
	initializers.InitConfigs()
}

// InitServer is a public method that initializes the router.
// It is return a pointer to a Server struct that can be used to run the router.
func InitServer() *Server {
	server := &Server{
		router: gin.Default(),
	}

	server.initConfig()

	return server
}

// initConfig is a private method that initializes the router's configuration.
// It is called by InitServer().
// It is private because it is not exported.
// It mounts all the handlers to the relevant routes.
func (s *Server) initConfig() {
	router := s.router

	// CORS configuration
	// allow the frontend to access the backend
	router.Use(cors.New(cors.Config{
		AllowOrigins:     []string{os.Getenv("FRONTEND_URL_1"), os.Getenv("FRONTEND_URL_2")},
		AllowMethods:     []string{"GET", "POST", "PUT", "DELETE"},
		AllowHeaders:     []string{"Origin", "Content-Type"},
		AllowCredentials: true,
	}))

	// default path of the API
	defaultPath := "/api/"

	// set up the APIs
	s.setupUsersAPI(defaultPath)
	s.setupThreadsAPI(defaultPath)
	s.setupCommentsAPI(defaultPath)
	s.setupAuthAPI(defaultPath)
}

// setupUsersAPI is a private method that initializes the router's configuration for the users API.
func (s *Server) setupUsersAPI(defaultPath string) {
	router := s.router

	// GET METHODS
	// Get the user's threads, need token to verify user
	router.GET(defaultPath+"user_thread/:token", middlewares.AuthCheck, handlers.GetThreadsByUserHandler)
	// Get the user's liked threads, need token to verify user
	router.GET(defaultPath+"like/:token", middlewares.AuthCheck, handlers.GetLikeByUserHandler)

	// POST METHODS
	// Create new user
	router.POST(defaultPath+"signup", handlers.SignUpHandler)

	// PUT METHODS
	// Update user's liked threads, need token to verify user
	router.PUT(defaultPath+"like/:token", middlewares.AuthCheck, handlers.LikeThreadsHandler)

}

// setupThreadsAPI is a private method that initializes the router's configuration for the threads API.
func (s *Server) setupThreadsAPI(defaultPath string) {
	router := s.router

	// GET METHODS
	// Get all threads
	router.GET(defaultPath+"all", handlers.GetAllThreadHandler)
	// Get a specific thread by thread_id
	router.GET(defaultPath+"thread/:thread_id", handlers.GetThreadHandler)

	// POST METHODS
	// Create new thread, need token to verify user
	router.POST(defaultPath+"thread/:token", middlewares.AuthCheck, handlers.CreateThreadHandler)
	// Search threads by keywords
	router.POST(defaultPath+"search", handlers.SearchThreadsHandler)

	// PUT METHODS
	// Edit a thread, need token to verify user
	router.PUT(defaultPath+"thread/:token", middlewares.AuthCheck, handlers.EditThreadHandler)

	// DELETE METHODS
	// Delete a thread, need token to verify user
	router.DELETE(defaultPath+"thread/:token", middlewares.AuthCheck, handlers.DeleteThreadHandler)

}

func (s *Server) setupCommentsAPI(defaultPath string) {
	router := s.router

	// GET METHODS
	// Get all comments
	router.GET(defaultPath+"comments/:thread_id", handlers.GetAllCommentsHandler)
	// Get a specific comment by comment_id
	router.GET(defaultPath+"comment/:comment_id", handlers.GetCommentsHandler)

	// POST METHODS
	// Create new comment, need token to verify user
	router.POST(defaultPath+"comment/:token", middlewares.AuthCheck, handlers.AddCommentHandler)

	// PUT METHODS
	// Edit a comment, need token to verify user
	router.PUT(defaultPath+"comment/:token", middlewares.AuthCheck, handlers.UpdateCommentHandler)

	// DELETE METHODS
	// Delete a comment, need token to verify user
	router.DELETE(defaultPath+"comment/:token", middlewares.AuthCheck, handlers.DeleteCommentHandler)
}

func (s *Server) setupAuthAPI(defaultPath string) {
	router := s.router

	//GET METHODS
	// Logout, need token to verify user, delete the user from the users map when the user logs out
	router.GET(defaultPath+"logout/:token", middlewares.AuthCheck, middlewares.Logout)

	// POST METHODS
	// Login, need username and password
	router.POST(defaultPath+"login", middlewares.LoginCheck, handlers.LoginHandler)

}

// Run is a public method that runs the router.
func (s *Server) Run() {
	port := ":" + os.Getenv("PORT")

	defer func() {
		if r := recover(); r != nil {
			fmt.Println("Server is shutting down...")
		}
	}()

	fmt.Println("Server is running at PORT" + port + "...")

	if err := s.router.Run(port); err != nil {
		panic(err)
	}
}
