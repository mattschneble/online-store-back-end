// Import the Model class and DataTypes object from Sequelize
const { Model, DataTypes } = require('sequelize');

// Import the connection to the database from the config file
const sequelize = require('../config/connection.js');

// Create a new Sequelize model for the Category table
class Category extends Model {}

//Initialize the Category model by extending off Sequelize's Model class
Category.init(
  {
    // define columns
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    category_name: {
      type: DataTypes.STRING,
      allowNull: false
    }
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'category',
  }
);

module.exports = Category;
