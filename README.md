# members-only
 A simple app that use passport js for authentication and postgres database to store information. 
## Installation
### 1. Clone the repository
Get a copy of the repo
### 2. Install dependencies
In the root directory
```
npm install
```
### 3.Set up environment variables: 
Create .env file in the root directory and add the following 
```
PGHOST=  
PGDATABASE = 
PGUSER = 
PGPASSWORD = 
SESSIONSECRET = 
```
### 4. Start the server
In development
```
npm run dev
```
In production
```
npm run start
```
### 5. Access the application
Open your browser and navigate to http://localhost:3000
## Features
### Main Features
* Log in 
* Sign up
* Log out
### Admin
* Add Task
* View All Task
* Edit Task
* Delete Task
### Employee
* Add Task
* View All Task
