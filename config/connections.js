// This is cleaner, learn this instead

const Sequelize = require("sequelize");
require("dotenv").config();

const connectionURI =
	process.env.JAWSDB_URL ||
	`mysql://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:3306/${process.env.DB_NAME}`;

const sequelize = new Sequelize(connectionURI);

module.exports = sequelize;
