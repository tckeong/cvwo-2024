package main

import (
	"github.com/tckeong/cvwo-2024/internal/router"
)

func main() {
	app := router.InitServer()
	app.Run()
}
