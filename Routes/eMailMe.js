const express = require('express')
require('dotenv').config()

const { EMAIL, EMAIL_PASS } = process.env

const nodemailer = require('nodemailer')

require('dotenv').config()

const sendMail = express.Router()

sendMail.post('/', async (req, res) => {
    const { message, emailFrom, subject } = req.body
    const transport = {
        service: 'gmail',   
        auth: {
            user: EMAIL,
            pass: EMAIL_PASS,
        },
    }

    const emailOption = {
        from: emailFrom,
        to: EMAIL,
        subject: subject,
        text: message,
    }

    try {
        const smtpTransport = nodemailer.createTransport(transport)
        await smtpTransport.verify((error, success) => {
            if (success) {
                console.log('Server is ready to take our messages')
            } else {
                console.log(error)
            }
        })
        await smtpTransport.sendMail(emailOption, (err, data) => {
            if (data) {
                res.status(201).send('email Send')
            } else {
                throw new Error(err)
            }
        })
        res.status(201).send('email Send')
    } catch (error) {
        res.status(422).json(error)
    }
})

module.exports = sendMail
