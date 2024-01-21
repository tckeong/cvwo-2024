# Client

This is a react + vite project for the web forum client side.

### Build with:

- [TypeScript](https://www.typescriptlang.org/) - The programming language used.
- [Vite](https://vitejs.dev/) - The Frontend Tool.
- [React](https://react.dev/) - The Frontend Framework.
- [MUI](https://mui.com/) - The React Component Library used.
- [Docker](https://www.docker.com/) - The container technology used for deploy the website.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.
<br>
<br>
<span style="color:red"><small>_Note: You need to setup the .env file first_</small></span>

### Prerequisites

- Node v18.16.0 or higher **OR**
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
cd cvwo-2024/client-frontend
```

<br>

> **If you are using Docker:**
>
> 1. Build the Docker image
>
> ```bash
> docker build -t client-frontend .
> ```
>
> 2. Run the Docker image
>
> ```bash
> docker run -p 5173:5173 client-frontend
> ```

<br>

3. Install all the dependencies

```bash
npm install
```

<br>

4. Run the server

```bash
npm run dev
```

<br>

5. Open the browser and access to http://localhost:5173 (if you did not change the port, this is the vite + react default port)

<br>

### You should be able to access to the frontend website now
