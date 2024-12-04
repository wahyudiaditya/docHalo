const fs = require('fs')
const bcrypt = require('bcrypt');

let user = JSON.parse(fs.readFileSync('./data/user.json', 'utf-8')).map(async el => {
    const saltRounds = 8;
    const myPlaintextPassword = el.password;

    const hash = await bcrypt.hash(myPlaintextPassword, saltRounds)
    console.log(hash)

    return {
        username: el.username,
        email: el.email,
        role: el.role,
        password: hash,
        createdAt: new Date(),
        updatedAt: new Date(),
    }
})

