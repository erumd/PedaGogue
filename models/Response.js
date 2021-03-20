const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Response extends Model {}

Response.init(
    {
        body:{
            type: DataTypes.STRING,
            allowNull: false
        }
    },
    {
        sequelize
    }
);

module.exports = Response;
