# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

![Képernyőkép ekkor: 2024-05-25 18-19-17](https://github.com/viktor0556/quiz-game/assets/134110891/50386036-6136-4a76-94fa-3695605be597)

![Képernyőkép ekkor: 2024-05-25 18-19-26](https://github.com/viktor0556/quiz-game/assets/134110![Kép![Képernyőkép ekkor: 2024-05-25 18-20-01](https://github.com/viktor0556/quiz-game/assets/134110891/f920addb-cea9-4a28-9abd-342ebec7e648)
ernyőkép ekkor: 2024-05-25 18-19-31](https://github.com/viktor0556/quiz-game/assets/134110891/bc3b9f21-f605-44d5-a60d-6a890b4be29c)
891/0ccb3d51-d710-4a54-aca8-407317810d14)

## Built with

- [React](https://react.dev/)
- [Vite](https://vitejs.dev)
- [Node](https://nodejs.org/en)

## Development

To get a local copy of the code, clone it using git:

```
git clone https://github.com/viktor0556/quiz-game.git
```

Install dependencies:

```
npm install
```

**Database setup:** The application uses PostgreSQL for database management. Make sure you have PostgreSQL installed on your system and create a database for the project.

## PostgreSQL initialization and database creation

1. Download: https://www.postgresql.org/download/
2. Create a database: Open a PostgreSQL service such as pgAdmin or psql. Log in with the appropriate user and then create a new database for the project.
3. Create tables: After you have created the database, create tables to store the necessary data. The following example shows how to create a simple question table:
```
CREATE TABLE questions (
    id SERIAL PRIMARY KEY,
    question TEXT NOT NULL,
    category TEXT NOT NULL,
    difficulty TEXT NOT NULL,
    answers JSONB NOT NULL
);

```
4. Setting environment variables: After you have created the database and tables, don't forget to set the project environment variables so that the application can connect to the database. For example:
```
DB_NAME=DB_NAME
DB_USER=DB_USER
DB_PASSWORD=DB_PASSWORD
DB_HOST=DB_HOST
```
These variables are usually stored in the .env file and must be set in the appropriate location to use them in the project.

Now, you can start a local web server by running:

```
cd frontend/ npm run dev
```
```
cd quiz-backend/ node server.js
```

And then open http://localhost:5173/ to view it in the browser.
