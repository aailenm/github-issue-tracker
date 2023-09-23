## Project structure
The repository contains both the client and the server components

Client: This is a small React application with a single page (Home) that displays a list of issues. As requested, issues can filtered by username.

Server: The server is built in Node.js using Express.js. It provides two endpoints:

GET /api/users
GET /api/issues?who=:username


## Project set up

To run the application on your local environment, follow these steps:
1. Install dependencies: Navigate to the root folder and install dependencies by running
```
npm install
```

2. Start the environment: start both the server and client by running the following command in the project's root folder:
```
npm start 
```

3. That's it! After a few seconds, the server and client will be up and running on your local machine!

## Env variables 
In the /server/.env file, you will find two environment variables that specify the organization and repository name from which the issues are retrieved. Feel free to change with them to see how the project responds.

