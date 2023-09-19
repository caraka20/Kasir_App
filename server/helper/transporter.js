const nodemailer = require('nodemailer')

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'ariefrubani44@gmail.com', // Email Sender
        pass: 'qdztnionzkabxpgg' // Key Generate
    },
    tls: {
        rejectUnauthorized: false
    }
})
module.exports = transporter