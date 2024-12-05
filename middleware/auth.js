const isLoginUser = (req, res, next) => {
    if (!req.session.user) {
        let error = 'Please Login First!'
        return res.redirect('/login?error=' + error)
    }
    next()
}

const isLoginDockter = (req, res, next) => {
    if (!req.session.doctor) {
        let error = 'Please Login First!'
        return res.redirect('/login?error=' + error)
    }
    next()
}
const loginTrue = (req, res, next) => {
    if (req.session.user || req.session.doctor) {
        return res.redirect('/')
    }
    next()
}


module.exports = {
    isLoginUser,
    isLoginDockter,
    loginTrue
}
