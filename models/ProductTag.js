// Importing the Model and DataTypes objects from Sequelize
const { Model, DataTypes } = require('sequelize');
// Importing the connection to the database from the config file
const sequelize = require('../config/connection');
// Importing the Product and Tag models to use as foreign keys
const Product = require('./Product');
const Tag = require('./Tag');

class ProductTag extends Model {}

ProductTag.init(
  {
    // define columns
    id:{
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
  product_id:{
    type: DataTypes.INTEGER,
    references: { model: Product, key: "id"}
    },
  tag_id:{
    type: DataTypes.INTEGER,
    references: { model: Tag, key: "id"}
    }
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'product_tag',
  }
);

module.exports = ProductTag;
