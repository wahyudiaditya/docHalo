const validateDoctorOrUser = require('../helpers/isLoginDoctorOrUser')
const validateIsLogin = require('../helpers/isLoginValidate')
const { Doctor, User, Appointment, UserProfile } = require('../models')
const { Op } = require('sequelize')
class DoctorController {

    static async loginDoctor(req, res) {
        try {
            res.render('login/loginDoctor')
        } catch (error) {
            res.send(error)
        }
    }

    static async saveLoginDoctor(req, res) {
        try {
            const { username, password } = req.body
            const isVlaidLogin = await Doctor.checkLogin(username, password)
            if (isVlaidLogin) {
                req.session.doctor = { id: isVlaidLogin.id, username: isVlaidLogin.username, name: `Dr. ${isVlaidLogin.firstName} ${isVlaidLogin.lastName}` }
            }
            res.redirect('/')
        } catch (error) {
            if (error.name === 'errorLogin') {
                return res.redirect('/login/doctor?error=' + error.msg)
            }
            res.send(error)
        }
    }

    static async getAllDoctor(req, res) {
        try {

            let doctorOrUser = validateDoctorOrUser(req)
            let doctors
            if (doctorOrUser.role) {
                doctors = await Doctor.findAll()
            } else {
                doctors = await Doctor.findByPk(doctorOrUser.id)
            }
            console.log(doctorOrUser)
            res.render('doctor/getAllDoctor', { doctors, doctorOrUser })
        } catch (error) {
            res.send(error)
        }
    }

    static async doctorAppointment(req, res) {
        try {
            const { id } = req.params
            let doctorOrUser = validateDoctorOrUser(req)
            const doctorAppointment = await Doctor.findByPk(+id, {
                attributes: { exclude: ['password'] },
                include:
                {
                    model: User,
                    include: {
                        model: UserProfile
                    },
                    attributes: { exclude: ['password'] }
                }
            })
            // res.send(doctorAppointment)
            res.render('appointment/listAppointment', { doctorAppointment, doctorOrUser })
        } catch (error) {
            res.send(error)
        }
    }

    static async doctorApprove(req, res) {
        try {
            const { id, userId } = req.params
            const appointment = await Appointment.findOne({
                where: {
                    DoctorId: id,
                    UserId: userId,
                    status: { [Op.ne]: 'confirmed' }
                },
            })
            await appointment.update({ status: 'confirmed' });
            res.redirect('/doctor/appointment/' + id)
        } catch (error) {
            res.send(error)
        }
    }
}

module.exports = DoctorController