function validateIsLogin(req) {
    let isLogin = false
    if (req.session.user || req.session.doctor) {
        isLogin = true
    }
    return isLogin
}

module.exports = validateIsLogin