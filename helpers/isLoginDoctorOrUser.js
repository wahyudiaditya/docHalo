function validateDoctorOrUser(req) {
    if (req.session.user) {
        return req.session.user
    } else if (req.session.doctor) {
        return req.session.doctor
    }
}

module.exports = validateDoctorOrUser