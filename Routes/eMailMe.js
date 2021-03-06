const express = require('express')
const xoauth2 = require('xoauth2')
require('dotenv').config()

const { EMAIL, EMAIL_PASS, CLIENT_ID, CLIENT_SECRET } = process.env

const nodemailer = require('nodemailer')

const sendMail = express.Router()

const transport = {
    service: 'gmail',
    host: 'smtp.gmail.com',
    port: 465,
    ssl: true,
    service: 'gmail',
    auth: {
        user: EMAIL,
        pass: EMAIL_PASS,
    },
}

let transporter = nodemailer.createTransport(transport)

sendMail.post('/', async (req, res) => {
    const { message, emailFrom, subject } = req.body

    const emailOption = {
        from: emailFrom,
        to: EMAIL,
        subject: subject,
        text: message,
    }

    try {
        transporter.verify((error, success) => {
            if (success) {
                console.log('Server is ready to take our messages')
            } else {
                console.log(error)
            }
        })
        transporter.sendMail(emailOption, (err, data) => {
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
