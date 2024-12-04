'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UserHealthArticle extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  UserHealthArticle.init({
    UserId: DataTypes.INTEGER,
    ArticleId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'UserHealthArticle',
  });
  return UserHealthArticle;
};