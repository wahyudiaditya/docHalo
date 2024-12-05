const { UserProfile, User, Doctor } = require("../models")
const validateDoctorOrUser = require('../helpers/isLoginDoctorOrUser')

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

            let doctorOrUser = validateDoctorOrUser(req)
            let doctors
            if (doctorOrUser.role) {
                doctors = await Doctor.findAll()
            } else {
                doctors = await Doctor.findByPk(doctorOrUser.id)
            }

            res.render('doctor/makeAppointment', { doctors, doctorOrUser })
        } catch (error) {
            console.log(error)
            res.send(error)
        }
    }

    static async makeAppointment(req, res) {
        try {
            const doctor = await Doctor.findAll({
                attributes: ['id', 'firstName', 'lastName', 'specialization']
            })
            res.send(doctor)
        } catch (error) {
            res.send(error)
        }
    }
}

module.exports = UserController