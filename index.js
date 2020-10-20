const express = require('express')
const sequelize = require('./sequelize')
const cors = require('cors')

const app = express()

const PORT = process.env.PORT || 8000
const env = process.env.NODE_ENV

const counts = require('./Routes/counts.route')
const Counts = require('./Models/Counts')
const sendEmail = require('./Routes/eMailMe')

app.use(cors())
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(express.static('public'))
app.use('/api/counts', counts)
app.use('/email', sendEmail)

app.get('/', function (req, res) {
    res.send('Welcome on my portfolio API')
})

const uuid = process.env.UUID
async function main() {
    try {
        await sequelize.sync()
        await sequelize.authenticate()
        await Counts.findCreateFind({ where: { uuid } })
        console.log(`Database ${process.env.DB_DATABASE} successfully joined`)
        app.listen(PORT, (err) => {
            if (err) throw new Error(err.message)
            env !== 'production' &&
                console.log(`Server is running on http://localhost:${PORT}`)
        })
    } catch (error) {
        console.log('Unable to reach DB!')
    }
}

if (process.env.NODE_ENV !== 'test') main()

module.exports = app
