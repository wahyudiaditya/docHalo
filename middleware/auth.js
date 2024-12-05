const isLogin = (req, res, next) => {
    if (!req.session.user) {
        let error = 'Please Login First!'
        return res.redirect('/login?error=' + error)
    }
    next()
}

const permissionAdmin = (req, res, next) => {
    if (req.session.user.role !== 'admin') {
        let error = 'You have no access'
        return res.redirect('/?error=' + error)
    }
    next()
}


module.exports = {
    isLogin,
    permissionAdmin
}
