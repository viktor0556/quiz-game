# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Download 

These must be installed for the application:
npm install express sequelize pg pg-hstore dotenv cors

## Create .env file

For correct operation, it is necessary to create an .env file in the root directory of the project. The .env file must contain the following environment variables:
DB_NAME=yourdatabase
DB_USER=yourusername
DB_PASSWORD=yourpassword
DB_HOST=yourhost
PORT=yourport

Please create an .env file with the above data and place it in the root of your project. It is important not to share or publish this file as it may contain sensitive data.
