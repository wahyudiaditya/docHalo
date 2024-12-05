const express = require('express')
const app = express()
const port = 3003
const router = require('./routers/index')
const session = require('express-session')

app.use(express.static(__dirname + '/public'));
app.use(express.urlencoded({ extended: true }))
app.set('view engine', 'ejs')

app.use(session({
    secret: 'rahsiaa ngab',
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: false,
        sameSite: true
    },

}))

app.use(router)

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})