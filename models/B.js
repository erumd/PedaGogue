const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class B extends Model {}

B.init(
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
        modelName: 'b',
    }
);

module.exports = B;
