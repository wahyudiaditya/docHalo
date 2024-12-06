'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UserProfile extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      UserProfile.belongsTo(models.User, {
        foreignKey: 'UserId'
      })
    }
    get formatNameUser() {
      return `${this.firstName} ${this.lastName}`
    }

    formatBornDate() {
      const date = new Date(this.bornDate)

      const year = date.getFullYear()
      const month = String(date.getMonth() + 1).padStart(2, '0')
      const day = String(date.getDate()).padStart(2, '0')

      return `${year}-${month}-${day}`
    }

    formatBornDateforProfile() {
      const date = new Date(this.bornDate)

      const year = date.getFullYear()
      const month = String(date.getMonth() + 1).padStart(2, '0')
      const day = String(date.getDate()).padStart(2, '0')

      return `${day}-${month}-${year}`
    }

    get getAge() {
      const today = new Date()
      const dateFounded = new Date(this.bornDate)
      const ageInMilliseconds = today - dateFounded

      const ageInYears = ageInMilliseconds / (1000 * 60 * 60 * 24 * 365)
      return Math.floor(ageInYears)
    }
  }
  UserProfile.init({
    address: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Address tidak boleh kosong'
        },
        notNull: {
          msg: 'Address tidak boleh kosong'
        },
        cekAddress(value) {
          if (value.length < 5) {
            throw new Error('Address minimum 5 karakter')
          }
        }
      }
    },
    phoneNumber: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Phone Number tidak boleh kosong'
        },
        notNull: {
          msg: 'Phone Number tidak boleh kosong'
        },
        cekPhoneNumber(value) {
          if (value.length < 11) {
            throw new Error('Phone Number minimum 11 karakter')
          }
        }
      }
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'First Name tidak boleh kosong'
        },
        notNull: {
          msg: 'First Name tidak boleh kosong'
        },
        cekFirstName(value) {
          if (value.length < 5) {
            throw new Error('First Name minimum 5 karakter')
          }
        }
      }
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Last Name tidak boleh kosong'
        },
        notNull: {
          msg: 'Last Name tidak boleh kosong'
        },
        cekFirstName(value) {
          if (value.length < 5) {
            throw new Error('Last Name minimum 5 karakter')
          }
        }
      }
    },
    gender: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Gender tidak boleh kosong'
        },
        notNull: {
          msg: 'Gender tidak boleh kosong'
        }
      }
    },
    bornDate: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Born Date tidak boleh kosong'
        },
        notNull: {
          msg: 'Born Date tidak boleh kosong'
        },
        verifyAge() {
          if (this.getAge < 0) {
            throw new Error('Usia minimal 0 tahun')
          }
        }
      }
    },
    UserId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'UserProfile',
  });
  return UserProfile;
};