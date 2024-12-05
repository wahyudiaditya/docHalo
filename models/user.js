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

    static async checkRegister(username, password) {
      const getUser = await User.findOne({
        where: {
          username
        }
      })
      let getErrors = {
        name: 'errorLogin',
        msg: []
      }
      if (getUser) {
        getErrors.msg.push('Username sudah ada, tolong pakai username lain')
      } else if (password.length < 8) {
        getErrors.msg.push('Password minimum 8 karakter')
      }

      if (getErrors.msg.length > 0) {
        throw getErrors
      }

      return getUser
    }

    async formatNameUser(id) {
      const user = await User.findByPk(id, {
        include: sequelize.models.UserProfile
      })
      return `${user.firstName} ${user.lastName}`
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
        cekUsername(value) {
          if (value.length < 5) {
            throw new Error('Username minimum 5 karakter')
          }
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      notEmpty: {
        msg: 'Email tidak boleh kosong'
      },
      notNull: {
        msg: 'Email tidak boleh kosong'
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      notEmpty: {
        msg: 'Password tidak boleh kosong'
      },
      notNull: {
        msg: 'Password tidak boleh kosong'
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