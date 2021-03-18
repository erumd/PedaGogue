const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class A extends Model {}

A.init(
    {
        name: {
        type: DataTypes.STRING,
        allowNull: false,
        },
    },
    {
        sequelize,
        timestamps: false,
        underscored: true,
        modelName: 'a',
    }
);

module.exports = A;
