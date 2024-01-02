const express = require('express');
const config = require('../config/config');
const sequelizeInit = require('../config/index');
const sequelize = require('../config/sequelize');
const routes = require('../routes');

const startServer = () => {
  const app = express();

  app.use(routes);
  sequelizeInit();
  sequelize.authenticate()
    .then(() => {
      console.log('Connected to the database');
    })
    .catch((error) => {
      console.error('Error connecting to database:', error);
    });

  // Configurar modelos
  sequelize.sync({ alter: true }) // Sincronizar modelos com o banco de dados
    .then(() => {
      console.log('Models synchronized with the database');
    })
    .catch((error) => {
      console.error('Error synchronizing models with the database:', error);
    });

  const PORT = config.server.port;
  app.listen(PORT, () => { console.log(`Server running on port ${PORT}`); });
};

module.exports = { startServer };
