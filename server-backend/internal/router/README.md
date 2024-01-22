# CVWO 2024 API

This project is a RESTful API built with Go and Gin framework.

## API Endpoints

### User API

- `GET /user_thread/:token`: Get the user's threads, need token to verify user
  - required: `params: token`
  - response: `status: 200, body: { value: (threadsID) uint[] }`
- `GET /like/:token`: Get the user's liked threads, need token to verify user
  - required: `params: token`
  - response: `status: 200, body: { value: (likes) uint[] }`
- `POST /signup`: Create new user
  - required: `body: { username: string, password: string }`
  - response: `status: 200, body: { value: null }`
- `PUT /like/:token`: Update user's liked threads, need token to verify user
  - required: `params: token, body: { value: (likes) uint[] }`

### Threads API

- `GET /all`: Get all threads
  - required: `none`
  - response: `status: 200, body: { value: (threadsID) uint[] }`
- `GET /thread/:thread_id`: Get a specific thread by thread_id
  - required: `params: thread_id`
  - response: `status: 200, body: { value: Thread }`
- `POST /thread/:token`: Create new thread, need token to verify user
  - required: `params: token, body: { title: string, content: string, img_link: string, tags: string }`
  - response: `status: 200, body: { value: null }`
  - 
- `POST /search`: Search threads by keywords
  - required: `body: { keywords: string }`
  - response: `status: 200, body: { value: (threadsID) uint[] }`
- `PUT /thread/:token`: Edit a thread, need token to verify user
  - required: `params: token, body: { title: string, content: string, img_link: string, tags: string }`
  - response: `status: 200, body: { value: null }`
- `DELETE /thread/:token`: Delete a thread, need token to verify user
  - required: `params: token`
  - response: `status: 200, body: { value: null }`

### Comments API

- `GET /comments/:thread_id`: Get all comments
  - required: `params: thread_id`
  - response: `status: 200, body: { value: (commentsID) uint[] }`
- `GET /comment/:comment_id`: Get a specific comment by comment_id
  - required: `params: comment_id`
  - response: `status: 200, body: { value: Comment }`
- `POST /comment/:token`: Create new comment, need token to verify user
  - required: `params: token, body: { thread_id: number, content: string }`
  - response: `status: 200, body: { value: null }`
- `PUT /comment/:token`: Edit a comment, need token to verify user
  - required: `params: token, body: { comment_id: number, content: string }`
  - response: `status: 200, body: { value: null }`
- `DELETE /comment/:token`: Delete a comment, need token to verify user
    - required: `params: token, body: { comment_id: number }`
    - response: `status: 200, body: { value: null }`

### Auth API

- `GET /logout/:token`: Logout, need token to verify user
  - required: `params: token`
  - response: `status: 200, body: { value: null }`
- `POST /login`: Login, need username and password
  - required: `body: { username: string, password: string }`
  - response: `status: 200, body: { value: ReturnUser }`
