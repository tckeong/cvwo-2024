package initializers

import (
	"github.com/tckeong/cvwo-2024/internal/errorLog"
	"github.com/tckeong/cvwo-2024/internal/repository"
)

func InitConfigs() {
	LoadEnvVariables()
	repository.ConnectToDB()
	SyncDatabase()
	errorLog.LoggerInit()
}
