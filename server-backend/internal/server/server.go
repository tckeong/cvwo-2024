package server

import (
	"fmt"
	"github.com/gin-gonic/gin"
)

type Server struct {
	router *gin.Engine
}

// InitServer is a public method that initializes the server.
// It is return a pointer to a Server struct that can be used to run the server.
func InitServer() *Server {
	server := &Server{
		router: gin.Default(),
	}

	server.initConfig()

	return server
}

// initConfig is a private method that initializes the server's configuration.
// It is called by InitServer().
// It is private because it is not exported.
// It mounts all the controllers to the relevant routes.
func (s *Server) initConfig() {
	router := s.router

	defaultPath := "/api/"

	router.GET(defaultPath, func(c *gin.Context) {
		c.JSON(200, gin.H{
			"message": "Hello, World!",
		})
	})
}

// Run is a public method that runs the server.
func (s *Server) Run(port string) {
	port = ":" + port

	defer func() {
		if r := recover(); r != nil {
			fmt.Println("Server is shutting down...")
		}
	}()

	if err := s.router.Run(port); err != nil {
		panic(err)
	}
}
