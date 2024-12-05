const { User } = require('../models')
class LoginController {

    static async loginUser(req, res) {
        try {
            res.render('login/loginUser')
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
            res.render('login/register')
        } catch (error) {
            res.send(error)
        }
    }

    static async saveRegister(req, res) {
        try {
            const { username, password, email } = req.body
            const registerIsValid = await User.checkRegister(username, password)
            if (!registerIsValid) {
                await User.create({ username, password, email })
                res.redirect('/login')
            }
        } catch (error) {
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