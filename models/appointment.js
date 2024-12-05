'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Appointment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }

    get formatAppointmentDate() {
      const date = new Date(this.appointmentDate)

      const year = date.getFullYear()
      const month = String(date.getMonth() + 1).padStart(2, '0')
      const day = String(date.getDate()).padStart(2, '0')

      return `${day}-${month}-${year}`
    }

    get getDay() {
      const today = new Date();
      const dateFounded = new Date(this.appointmentDate);

      const differenceInMilliseconds = dateFounded - today;
      const differenceInDays = differenceInMilliseconds / (1000 * 60 * 60 * 24);

      return Math.floor(differenceInDays);
    }
  }
  Appointment.init({
    DoctorId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'DoctorId tidak boleh kosong'
        },
        notNull: {
          msg: 'DoctorId tidak boleh kosong'
        }
      }
    },
    UserId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'UserId tidak boleh kosong'
        },
        notNull: {
          msg: 'UserId tidak boleh kosong'
        }
      }
    },
    appointmentDate: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Appointment Date tidak boleh kosong'
        },
        notNull: {
          msg: 'Appointment Date tidak boleh kosong'
        },
        checkDay() {
          if (this.getDay < 1) {
            throw new Error('Anda hanya bisa menjadwalkan minimal 24 jam')
          }
        }
      }
    },
    status: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Appointment',
  });
  Appointment.beforeCreate((instance) => {
    instance.status = 'pending'
  })
  return Appointment;
};