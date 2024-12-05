const { UserProfile, User, Doctor, Appointment } = require("../models")
const validateDoctorOrUser = require('../helpers/isLoginDoctorOrUser')
const { Op } = require('sequelize')

class UserController {
    static async profie(req, res) {
        try {
            const { userId } = req.params
            const userProfile = await UserProfile.findOne({
                where: {
                    UserId: userId
                }
            })
            res.render('user/profile', { userId, userProfile })
        } catch (error) {
            res.send(error)
        }
    }

    static async addProfile(req, res) {
        try {
            const { userId } = req.params
            const { error } = req.query
            const userProfile = await User.findOne({
                attributes: { exclude: ['password'] },
                where: {
                    id: userId
                }
            })
            res.render('user/createProfile', { userProfile, error })
        } catch (error) {
            res.send(error)
        }
    }

    static async saveAddedProfile(req, res) {
        try {
            const { userId } = req.params
            const { firstName, lastName, gender, address, phoneNumber, bornDate } = req.body
            await UserProfile.create({ firstName, lastName, gender, address, phoneNumber, bornDate, UserId: userId })
            res.redirect(`/user/${userId}/profiles`)
        } catch (error) {
            const { userId } = req.params
            if (error.name === 'SequelizeValidationError') {
                const err = error.errors.map(el => {
                    return el.message
                })
                res.redirect(`/user/${userId}/profiles/add?error=${err}`)
                return
            }
            res.send(error)
        }
    }

    static async editProfile(req, res) {
        try {
            const { userId } = req.params
            const { error } = req.query
            const userProfile = await User.findOne({
                include: {
                    model: UserProfile
                },
                attributes: { exclude: ['password'] },
                where: {
                    id: userId
                }
            })
            res.render('user/editProfile', { userProfile, error })
        } catch (error) {
            res.send(error)
        }
    }

    static async saveEditProfile(req, res) {
        try {
            const { userId } = req.params
            const { firstName, lastName, gender, address, phoneNumber, bornDate } = req.body
            await UserProfile.update({ firstName, lastName, gender, address, phoneNumber, bornDate },
                {
                    where: {
                        id: userId
                    }
                }
            )
            res.redirect(`/user/${userId}/profiles`)
        } catch (error) {
            const { userId } = req.params
            if (error.name === 'SequelizeValidationError') {
                const err = error.errors.map(el => {
                    return el.message
                })
                res.redirect(`/user/${userId}/profiles/edit?error=${err}`)
                return
            }
            res.send(error)
        }
    }

    static async getAllDoctor(req, res) {
        try {
            const { userId } = req.params
            const { name, specialization } = req.query
            const isUserProfileValid = await User.findOne({
                include: {
                    model: UserProfile
                },
                where: {
                    id: userId
                },
                attributes: { exclude: ['password'] }
            })
            let doctorOrUser = validateDoctorOrUser(req)
            let options
            if (name) {
                options = {
                    where: {
                        [Op.or]: [{
                            firstName: {
                                [Op.iLike]: `%${name}%`
                            }
                        }, {
                            lastName: {
                                [Op.iLike]: `%${name}%`
                            }
                        }]

                    }
                }
            } else if (specialization) {
                options = {
                    where: {
                        specialization: {
                            [Op.iLike]: `%${specialization}%`
                        }
                    }
                }
            }
            let doctors = await Doctor.findAll(options)

            res.render('doctor/makeAppointment', { doctors, doctorOrUser, isUserProfileValid })
        } catch (error) {
            res.send(error)
        }
    }

    static async makeAppointment(req, res) {
        try {
            const { error } = req.query
            let doctorOrUser = validateDoctorOrUser(req)
            const doctor = await Doctor.findAll({
                attributes: ['id', 'firstName', 'lastName', 'specialization']
            })
            res.render('appointment/formAppointment', { doctorOrUser, doctor, error })
        } catch (error) {
            res.send(error)
        }
    }

    static async saveAppointment(req, res) {
        try {
            const { userId } = req.params
            const { DoctorId, appointmentDate } = req.body
            await Appointment.create({ DoctorId, appointmentDate, UserId: userId })
            res.redirect(`/user/${userId}/doctor`)
        } catch (error) {
            const { userId } = req.params
            if (error.name === 'SequelizeValidationError') {
                const err = error.errors.map(el => {
                    return el.message
                })
                res.redirect(`/user/${userId}/doctor/appointment?error=${err}`)
                return
            }
            res.send(error)
        }
    }

    static async listAppointmentUser(req, res) {
        try {
            const { userId } = req.params
            const { deleted } = req.query
            let doctorOrUser = validateDoctorOrUser(req)
            const appointmentUser = await User.findOne({
                include: {
                    model: Doctor,
                    attributes: { exclude: ['password'] }
                },
                attributes: { exclude: ['password'] },
                where: {
                    id: userId
                }
            })
            const getNameUser = await User.findOne({
                include: {
                    model: UserProfile
                },
                where: {
                    id: userId
                }
            })
            res.render('appointment/listAppointmentUser', { doctorOrUser, appointmentUser, getNameUser, deleted })
        } catch (error) {
            res.send(error)
        }
    }

    static async cancelAppointmentUser(req, res) {
        try {
            const { userId, id } = req.params

            const appointment = await Appointment.findOne({
                where: {
                    DoctorId: id,
                    UserId: userId,
                    status: { [Op.in]: ['pending', 'confirmed'] }
                },
            })
            await appointment.update({ status: 'cancel' });
            res.redirect(`/user/${userId}/doctor/listAppointment`)
        } catch (error) {
            res.send(error)
        }
    }


    static async deleteAppointment(req, res) {
        try {
            const { userId, id } = req.params

            const deletedAppointment = await User.findOne({
                include: {
                    model: Doctor,
                    where: {
                        id
                    },
                    attributes: { exclude: ['password'] }
                },
                where: {
                    id: userId
                },
                attributes: { exclude: ['password'] }
            })
            const dataDeleted = deletedAppointment.Doctors.map(el => {
                return {
                    name: el.formatName,
                    date: el.Appointment.formatAppointmentDate
                }
            })
            await Appointment.destroy({
                where: {
                    DoctorId: id,
                    UserId: userId,
                    status: 'cancel'
                },
            })
            res.redirect(`/user/${userId}/doctor/listAppointment?deleted=${dataDeleted[0].name};${dataDeleted[0].date}`)
        } catch (error) {
            res.send(error)
        }
    }


}

module.exports = UserController