package initializers

import (
	"github.com/tckeong/cvwo-2024/internal/errorLog"
	"github.com/tckeong/cvwo-2024/internal/repository/configs"
)

// InitConfigs is a function that initializes all the configurations.
func InitConfigs() {
	// relative path to the go.mod file
	LoadEnvVariables("./cmd/server/.env")
	configs.ConnectToDB()
	configs.SyncDatabase()
	errorLog.LoggerInit()
}
