# cvwo-2024

This is the project for cvwo 2024 interview.
This is a web forum project.

# Web Forum Project

Welcome to the Web Forum project!

### This web forum already deploy at: [https://webforum-client-9d35249bbdc9.herokuapp.com/](https://webforum-client-9d35249bbdc9.herokuapp.com/) using heroku

## Features

- **User Registration and Authentication**: Users can create accounts and log in to the forum.
- **Create and Participate in Discussions**: Users can create new discussion threads and participate in existing ones.
- **User Profiles**: Each user has a profile where they can manage their threads.
- **Search Feature**: Users can search the threads through the topics, tags, or user name.

## Technologies Used

- **Frontend**: Vite + React
- **Backend**: Golang
- **Database**: PostgreSQL

## Getting Started

To get started with the Web Forum project, follow these steps:
<br>
<br>
<span style="color:red"><small>_Note: You need to setup the .env file first **OR** setup the environment variables in docker-compose.yml file if you want to use docker to deploy the website_</small></span>

1. Clone the repository: `git clone https://github.com/tckeong/cvwo-2024.git`

2. Set up the database: Create and configure your database according to the backend technology used.

3. Start the website: Can setup both of the client and server according to the README.md in ./client-frontend and ./server-backend
   
   > **If you are using Docker:**
   > 
   > <small>*Note: Remember to disabled the LoadEnvVariables() function in internal/initializer/initConfigs.go*</small>
   > 
   > Just run:
   > 
   > ```bash
   > docker-compose up --build
   > ```

4. Open your web browser and navigate to `http://localhost:5173` (if you did not change the default port).

5. Your should be able to see the first page of the web forum now.

Feel free to modify this template to fit the specific details of your own project.
