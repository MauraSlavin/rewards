
const express = require('express');
const compression = require('compression');
const db = require('./models');
const routes = require('./routes');

const app = express();

const PORT = process.env.PORT || 8080;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));
app.use(compression());

app.use('/', routes);

// Sync sequelize models then start Express app
// =============================================
// db.sequelize.sync({force: true}).then(() => {
db.sequelize.sync().then(() => {
// db.sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`App listening on PORT ${PORT}`);
  });
});
