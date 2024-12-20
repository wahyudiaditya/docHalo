'use strict';
const {
  Model
} = require('sequelize');
const bcrypt = require('bcrypt');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {

    static associate(models) {
      // define association here
      User.hasOne(models.UserProfile, {
        foreignKey: 'UserId'
      })
      User.belongsToMany(models.Doctor, {
        through: 'Appointment'
      })
    }

    static async checkLogin(username, password) {
      const getUser = await User.findOne({
        where: {
          username
        }
      })
      let getErrors = {
        name: 'errorLogin',
        msg: []
      }
      if (!getUser) {
        getErrors.msg.push('Username or password invalid')
      } else {
        const isPasswordValid = await bcrypt.compare(password, getUser.password)
        if (!isPasswordValid) {
          getErrors.msg.push('Username or password invalid')
        }
      }

      if (getErrors.msg.length > 0) {
        throw getErrors
      }

      return getUser
    }

  }
  User.init({
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Username tidak boleh kosong'
        },
        notNull: {
          msg: 'Username tidak boleh kosong'
        },
        async cekUsername(value) {
          if (value.length < 5) {
            throw new Error('Username minimum 5 karakter');
          }
          const existingUser = await User.findOne({ where: { username: value } });
          if (existingUser) {
            throw new Error('Username sudah ada tolong pakai username lain gan');
          }
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Email tidak boleh kosong'
        },
        notNull: {
          msg: 'Email tidak boleh kosong'
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Password tidak boleh kosong'
        },
        notNull: {
          msg: 'Password tidak boleh kosong'
        }
      },
      cekPassword(value) {
        if (value.length < 8) {
          throw new Error('Password minimum 8 karakter')
        }
      }
    },
    role: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
  });

  User.beforeCreate(async (instance) => {

    const saltRounds = 8;
    const myPlaintextPassword = instance.password;

    const hash = await bcrypt.hash(myPlaintextPassword, saltRounds)
    instance.password = hash
    instance.role = 'user'
  })
  return User;
};