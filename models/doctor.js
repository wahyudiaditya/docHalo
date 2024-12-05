'use strict';
const {
  Model
} = require('sequelize');
const bcrypt = require('bcrypt');

module.exports = (sequelize, DataTypes) => {
  class Doctor extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Doctor.belongsToMany(models.User, {
        through: 'Appointment'
      })
    }

    static async checkLogin(username, password) {
      const getDoctor = await Doctor.findOne({
        where: {
          username
        }
      })
      let getErrors = {
        name: 'errorLogin',
        msg: []
      }
      if (!getDoctor) {
        getErrors.msg.push('Username or password invalid')
      } else {
        const isPasswordValid = await bcrypt.compare(password, getDoctor.password)
        if (!isPasswordValid) {
          getErrors.msg.push('Username or password invalid')
        }
      }

      if (getErrors.msg.length > 0) {
        throw getErrors
      }

      return getDoctor
    }

    get formatName() {
      return `Dr. ${this.firstName} ${this.lastName}`
    }
  }
  Doctor.init({
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    specialization: DataTypes.STRING,
    contactNumber: DataTypes.STRING,
    username: DataTypes.STRING,
    password: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Doctor',
  });
  return Doctor;
};