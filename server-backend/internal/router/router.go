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
	// gin.SetMode(gin.ReleaseMode)
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
		AllowOrigins:     []string{os.Getenv("FRONTEND_URL")},
		AllowMethods:     []string{"GET", "POST", "PUT", "DELETE"},
		AllowHeaders:     []string{"Origin", "Content-Type"},
		AllowCredentials: true,
	}))

	// default path of the API
	defaultPath := "/api/"

	// GET METHODS
	router.GET(defaultPath+"all", handlers.GetAllThreadHandler)
	router.GET(defaultPath+"thread/:thread_id", handlers.GetThreadHandler)
	router.GET(defaultPath+"comments/:thread_id", handlers.GetAllCommentsHandler)
	router.GET(defaultPath+"comment/:comment_id", handlers.GetCommentsHandler)
	router.GET(defaultPath+"user_thread", middlewares.AuthCheck, handlers.GetThreadsByUserHandler)
	router.GET(defaultPath+"like", middlewares.AuthCheck, handlers.GetLikeByUserHandler)

	// POST METHODS
	router.POST(defaultPath+"login", handlers.LoginHandler)
	router.POST(defaultPath+"signup", handlers.SignUpHandler)
	router.POST(defaultPath+"thread", middlewares.AuthCheck, handlers.CreateThreadHandler)
	router.POST(defaultPath+"comment", middlewares.AuthCheck, handlers.AddCommentHandler)
	router.POST(defaultPath+"search", handlers.SearchThreadsHandler)

	// PUT METHODS
	router.PUT(defaultPath+"thread", middlewares.AuthCheck, handlers.EditThreadHandler)
	router.PUT(defaultPath+"like", middlewares.AuthCheck, handlers.LikeThreadsHandler)
	router.PUT(defaultPath+"comment/:comment_id", middlewares.AuthCheck, handlers.UpdateCommentHandler)

	// DELETE METHODS
	router.DELETE(defaultPath+"thread", middlewares.AuthCheck, handlers.DeleteThreadHandler)
	router.DELETE(defaultPath+"comment", middlewares.AuthCheck, handlers.DeleteCommentHandler)
}

// Run is a public method that runs the router.
func (s *Server) Run() {
	port := ":" + os.Getenv("PORT")

	defer func() {
		if r := recover(); r != nil {
			fmt.Println("Server is shutting down...")
		}
	}()

	fmt.Println("Server is running...")

	if err := s.router.Run(port); err != nil {
		panic(err)
	}
}
