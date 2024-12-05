const validateDoctorOrUser = require("../helpers/isLoginDoctorOrUser")

class HomepageController {
    static async homepage(req, res) {
        try {
            let getRole = ''

            if (req.session.user) {
                const { id, role } = req.session.user
                getRole = role
            }
            let doctorOrUser = validateDoctorOrUser(req)

            res.render('homepage', { getRole, doctorOrUser })
        } catch (error) {
            res.send(error)
        }
    }
}

module.exports = HomepageController