// Import express and routes
const express = require('express');
const routes = require('./routes');
const sequelize = require('./config/connection');

// Import sequelize connection
const app = express();
const PORT = process.env.PORT || 3001;

// Set up middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Turn on routes
app.use(routes);

// Sync sequelize models to the database, then turn on the server
sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}!`);
  });
})