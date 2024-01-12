FROM golang:1.22-rc-bookworm
WORKDIR /app
COPY . /app/
RUN go mod tidy
EXPOSE 8000
RUN go build -o main ./cmd/server/main.go
CMD [ "./main" ]
