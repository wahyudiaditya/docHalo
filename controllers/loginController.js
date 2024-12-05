const { User } = require('../models')
class LoginController {

    static async loginUser(req, res) {
        try {
            const { error } = req.query
            res.render('login/loginUser', { error })
        } catch (error) {
            res.send(error)
        }
    }

    static async saveLoginUser(req, res) {
        try {
            const { username, password } = req.body
            const isVlaidLogin = await User.checkLogin(username, password)
            if (isVlaidLogin) {
                req.session.user = { id: isVlaidLogin.id, role: isVlaidLogin.role, username: isVlaidLogin.username }
            }
            res.redirect('/')
        } catch (error) {
            if (error.name === 'errorLogin') {
                return res.redirect('/login?error=' + error.msg)
            }
            res.send(error)
        }
    }


    static async registerForm(req, res) {
        try {
            const { error } = req.query
            res.render('login/register', { error })
        } catch (error) {
            res.send(error)
        }
    }

    static async saveRegister(req, res) {
        try {
            const { username, password, email } = req.body
            await User.create({ username, password, email })
            res.redirect('/login')
        } catch (error) {
            if (error.name === 'SequelizeValidationError') {
                const err = error.errors.map(el => {
                    return el.message
                })
                return res.redirect('/login/register?error=' + err)
            }
            res.send(error)
        }
    }

    static logout(req, res) {
        try {
            req.session.destroy(err => {
                if (err) throw err
                res.redirect('/login')
            })
        } catch (error) {
            res.send(error)
        }
    }
}

module.exports = LoginController