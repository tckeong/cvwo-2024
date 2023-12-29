package main

import (
	"fmt"
	"github.com/tckeong/cvwo-2024/internal/server"
)

func main() {
	app := server.InitServer()
	fmt.Println("Server is running...")
	app.Run("8000")
}
