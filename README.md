# Backend API Project

Welcome to the DPDZero Task! This task aims to provide a robust and scalable backend system for handling user registration, data storage, retrieval, update, and deletion. It is built using Node.js, Express.js, TypeScript, and MySQL with Sequelize.

## Table of Contents

<!--ts-->

- [Framework](#framework)
- [Database Schema](#database-schema)
- [Instructions to Run](#instructions-to-run)
- [Setup Instructions](#setup-instructions)
<!--te-->

# Framework

The backend is developed using the following technologies and frameworks:

- **`Node.js`** : A runtime environment that allows us to run JavaScript on the server side.
- **`Express.js`** : A popular web application framework for building APIs and web applications.
- **`TypeScript`** : A superset of JavaScript that adds static types and other features to enhance code quality and maintainability.
- **`Sequelize`** : A promise-based ORM (Object-Relational Mapping) for Node.js that allows us to interact with the MySQL database using TypeScript.

# Database Schema

The MySQL database schema includes the following tables:

**`Users`** : Stores user registration information.

```yml
id (Primary Key, Auto Increment)
username
email
password
full_name
age
gender
```

**`Data`** : Stores key-value pairs for data storage.

```yml
id (Primary Key, Auto Increment)
key
value
```

# Instructions to Run

To run the code locally, follow these steps:

1. Make sure you have Node.js and MySQL installed on your machine.

2. Clone this repository:

```yml
git clone https://github.com/NiyatiPanchal/DPDZero-Task.git
```

3. Navigate to the project directory:

```yml
cd DPDZero-Task
```

4. Install dependencies using npm or yarn:

```yml
npm install
```

5. Create a **`.env`** file in the root directory and add the following environment variables:

```yml
DB_HOST=your_database_host
DB_USER=your_database_username
DB_PASSWORD=your_database_password
DB_NAME=your_database_name
PORT=5000
```

6. Run the server:

```yml
npm start
```

7. The server should now be running on http://localhost:5000.

# Setup Instructions

Follow these instructions to set up the project from scratch:

1. Install Node.js and MySQL on your machine.

2. Create a new MySQL database with the name specified in your .env file.

3. Clone this repository:

```yml
git clone https://github.com/NiyatiPanchal/DPDZero-Task.git
```

4. Navigate to the project directory:

```yml
cd DPDZero-Task
```

5. Install dependencies using npm or yarn:

```yml
npm install
```

6. Create a .env file in the root directory and add the necessary environment variables (see [Instructions to Run](#instructions-to-run)).

7. Run the database migrations to create the necessary tables:
   To do that create **`config.json`** file using this command and add db credentials in it.
   ```yml
   npx sequelize-cli init
   ```
   Now, run this command to create tables in database.

```yml
npx sequelize-cli migration:generate --name create-data
npx sequelize-cli migration:generate --name create-user
```

8. Run the server:

```yml
npm start
```

9. The server should now be running on http://localhost:5000.
