
class UserController {
    static async profie(req, res) {
        try {
            const { userId } = req.params
            res.render('user/profile')
        } catch (error) {
            res.send(error)
        }
    }
}

module.exports = UserController