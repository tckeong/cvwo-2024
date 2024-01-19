# Server

This is a Go project that uses the Gin framework and Docker for containerization.

### Build with:
- [Go](https://golang.org/) - The programming language used.
- [Gin](https://pkg.go.dev/github.com/gin-gonic/gin) - The web framework used.
- [Gorm](https://gorm.io/) - The Database ORM (Object Relational Map) used.
- [PostgreSQL](https://www.postgresql.org/) - The Database used.
- [Docker](https://www.docker.com/) - The container technology used for deploy the server.


## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.
<br>
<br>
<span style="color:red"><small>*Note: You need to setup the .env file first*</small></span>

### Prerequisites

- Go 1.22 or higher **OR**
- Docker

### Installing

A step by step series of examples that tell you how to get a development environment running.

1. Clone the repository
```bash
git clone https://github.com/tckeong/cvwo-2024.git
```

<br>

2. Navigate to the project directory
```bash
cd cvwo-2024/server-backend
```
<br>

> **If you are using Docker:**
> 
><small>*Note: Remember to disabled the LoadEnvVariables() function in internal/initializer/initConfigs.go*</small>
>
> Just run:
> 1. Build the Docker image
> ```bash
> docker build -t server-backend .
> ```
> 2. Run the Docker image
> ```bash
> docker run -p 8000:8000 server-backend
> ```

<br>

3. Install all the dependencies
```bash
go mod tidy
```

<br>

4. Run the server
```bash
go run ./cmd/server/main.go
```

<br>

5. Access to your backend api on http://localhost:8000/api (if you did not change the port)

<br>

### You should be able to access to the backend now