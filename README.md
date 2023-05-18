# Assignment Employee Table
A React application that displays employee info and allows creation / edition / deletion of employees.

## Environment
MySQL Ver 8.0.33

Node v18.16.0

npm 9.5.1


## Installation
1. Clone git repository:

    `git clone https://github.com/way1998/assignment-employee-table.git`

2. Install dependencies for React client:

    `cd client`
    `npm install --legacy-peer-deps`

3. Install dependencies for Express api:

    `cd ../api`
    `npm install`

4. Run init_db.sql to initialize database with data provided (Please use a user with privilege to create database and user):

    `cd ..`
    `mysql -u <username> -p < init_db.sql`

## Run
1. Run start.sh to start both frontend and backend:

    `./start.sh`

2. (Wait 30 secs) Open browser, go to "http://localhost:3000" and enjoy the app!


## API reference
baseURL: http://localhost:3001/

| Path | Method | Sample Input | Sample Output | Description |
|---|---|---|---|---|
| /employees  | GET |   | {"employees": [{"id": 1, "first_name": "Lewis", "last_name": "Burson", "salary": 40700}, ...]}  | Get a list of all employees  |
| /employees  | POST  | {"firstName": "Hello", "lastName": "World", "salary": 100000}  | {"msg": "Employee updated successfully"}  | Add a new employee   |
| /employees/:id  | PUT  | {"firstName": "Lewis", "lastName": "Burson", "salary": 40800}  | {"msg": "Employee updated successfully"}  | Edit an employee |
| /employees/:id  | DELETE  |   | {"msg": "Employee updated successfully"}  | Delete an employee |

## Database reference
database: assignment_employee_table

table: employee

| id  | first_name  | last_name  | salary  |
|---|---|---|---|
| int | varchar | varchar | int|
| auto increment| not null  | not null  | not null  |
| primary key |   |   |   |
| 1  | Lewis  | Burson  | 40700  |