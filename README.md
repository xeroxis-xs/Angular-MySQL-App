# Full Stack Angular App

This is a full stack Angular application built with Angular Material for the frontend, Node.js, Express.js for the backend, and MySQL for the database. The purpose of this app is to demonstrate a full stack application utilizing Angular, Node.js, Express.js, and MySQL.

## Installation

To install all the required packages, run the following command:

```bash
npm install
```

## Backend Server

To start the backend server, run the following command:

```bash
npm run server
```

This will serve the backend server using Express.js. The server will connect to MySQL and run an interval to request data from data.gov.sg API and store the response into the MySQL database. Additionally, the backend server provides RESTful API endpoints and CRUD functionality.

Make sure that your MySQL Database is set up according to the variables configured in `backend/db.js` and tables are set up according to `backend/createTable.sql`.

## Frontend Server

To start the frontend server, run the following command:

```bash
ng serve
```

The frontend of this application is built using Angular Material, a UI component library for Angular. It provides a set of pre-built and customizable UI components that follow the Material Design guidelines.

## Usage

Once the backend server is running, you can access the application by opening the frontend in a web browser with http://localhost:4200.

## Acknowledgments

- [Angular](https://angular.io/)
- [Angular Material](https://material.angular.io/)
- [Node.js](https://nodejs.org/)
- [Express.js](https://expressjs.com/)
- [MySQL](https://www.mysql.com/)
