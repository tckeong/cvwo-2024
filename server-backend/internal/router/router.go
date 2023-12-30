package router

import (
	"fmt"
	"github.com/gin-gonic/gin"
	"github.com/tckeong/cvwo-2024/internal/handlers"
	"github.com/tckeong/cvwo-2024/internal/initializers"
	"os"
)

type Server struct {
	router *gin.Engine
}

func init() {
	// gin.SetMode(gin.ReleaseMode)
	initializers.LoadEnvVariables()
	initializers.ConnectToDB()
	initializers.SyncDatabase()
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

	defaultPath := "/api/"

	router.GET(defaultPath, handlers.IndexHandler)
	router.POST(defaultPath+"login", handlers.LoginHandler)
	router.POST(defaultPath+"signup", handlers.SignUpHandler)
}

// Run is a public method that runs the router.
func (s *Server) Run() {
	port := ":" + os.Getenv("PORT")

	defer func() {
		if r := recover(); r != nil {
			fmt.Println("Server is shutting down...")
		}
	}()

	if err := s.router.Run(port); err != nil {
		panic(err)
	}
}
