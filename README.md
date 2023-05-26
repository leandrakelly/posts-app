# Posts-app

![gif](https://github.com/leandrakelly/posts-app/blob/main/app%20demonstration.gif)

This repository contains the frontend and backend applications for a Posts App crud project challenge.
The frontend is built using React and TypeScript with PostreSQL as database, while the backend is built using Express, Graphql with Typescript and Prisma. Together, these applications provide a seamless user experience.

## Project Description
🚀 The **Simple Posts App project** is a web-based application that provides the user a simple interface to use for create, view, edit and delete posts and also register and login.

## Technology Stack
🚀 The Posts applications are built using the following technologies:

**Frontend:**

- React ⚛️: A JavaScript library for building user interfaces.
- TypeScript 🟦: A statically typed superset of JavaScript that enhances code quality and developer productivity.
- Ant Design 🐜: A UI library with a set of customizable components for building modern and responsive user interfaces.
- Relay 🌐: A popular library for making requests with Graphql
- React Router DOM 🌐: A library for routing and navigation in React applications.

**Backend:**

- Express 🦅: A Node.js library for building server-side applications.
- TypeScript 🟦: A statically typed superset of JavaScript that enhances code quality and developer productivity.
- Prisma 💎: An open-source database toolkit for TypeScript and Node.js that simplifies database access and management.
- PostgreSQL 🐘: A powerful open-source relational database management system.
- Jest 🃏: A JavaScript testing framework for writing unit tests and running test suites.
- Docker 🐳: A platform for packaging, distributing, and running applications in containers.
- Supertest 📝: A powerful and expressive JavaScript library for API testing.
## Prerequisites

Before running this application, ensure that you have the following dependencies installed:

- Node.js (version >= 14.0.0)
- npm (version >= 6.0.0) or Yarn (version >= 1.0.0) - Yarn preferred

## Frontend Installation

Follow these steps to install and set up the frontend application:

1. Clone the repository to your local machine:

```javascript
git clone <repository-url>
```

2. Navigate to the project directory:

```
cd client
```

3. Install the dependencies using npm or Yarn:

```
npm install
```
or
```
yarn install
```

## Frontend Usage

To start the frontend application, use the following command:

```
npm start
```
or
```
yarn start
```

This will start the development server and launch the application in your default browser. The application will automatically reload if you make any changes to the source code.

## Frontend Testing

The frontend application includes unit tests to ensure its stability and reliability. To run the tests, execute the following command:

```
npm test
```
or
```
yarn test
```

This will launch the test runner and display the test results in the console.

## Frontend Linting

To lint the source code and ensure it adheres to the defined coding standards, you can run the linting script:

```
npm run lint
```
or
```
yarn lint
```

This will check your code for any potential issues or violations of the defined rules.

## Frontend Building for Production

To build the application for production, use the following command:

```
npm run build
```
or
```
yarn build
```

This will create an optimized and minified version of the application in the `build` directory. You can then deploy this version to a web server or hosting platform of your choice.

## Frontend Additional Scripts

- `npm run format`: Formats the source code using Prettier.
- `npm run test:coverage`: Runs tests and generates a coverage report.

## Backend Installation
Follow these steps to install and set up the backend application:

Navigate to the backend directory:
```
cd server
```
Install the dependencies using npm or Yarn:

```
npm install
```
or
```
yarn install
```
## Backend Usage
First, you will have to start the docker container and then run the migrations to the application work properly. Just use the commands:

```
yarn docker:start-db
```
or

```
npm docker:start-db
```

and then:
```
yarn prisma:migrate-deploy
```
or

```
npm prisma:migrate-deploy
```


To start the backend application, use the following command:

```
npm dev
```
or

```
yarn dev
```
This will start the backend server in development mode and make it ready to handle incoming requests.

## Backend Testing
The backend application includes tests to ensure its functionality is working as expected. To run the unit tests, execute the following command:

```
npm test
```
or
```
yarn test
```
This will launch the test runner and display the test results in the console.

## License

This project is licensed under the [MIT License](LICENSE).

---

Thank you for using the Apps crud application.
