package main

import (
	"fmt"
	"github.com/tckeong/cvwo-2024/internal/router"
)

func main() {
	app := router.InitServer()
	fmt.Println("Server is running...")

	app.Run()
}
