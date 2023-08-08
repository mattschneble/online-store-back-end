// Import the Model class and DataTypes object from Sequelize
const { Model, DataTypes } = require('sequelize');

// Import the connection to the database from the config file
const sequelize = require('../config/connection.js');

// Create a new Sequelize model for the Tag table
class Tag extends Model {}

// Initialize the Tag model by extending off Sequelize's Model class
Tag.init(
  {
    // define columns
    id:{
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    tag_name:{
      type: DataTypes.STRING
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'tag',
  }
);

module.exports = Tag;
