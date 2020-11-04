const express = require('express')
const sequelize = require('./sequelize')
const cors = require('cors')

const app = express()

const PORT = process.env.PORT || 8000
const env = process.env.NODE_ENV

const counts = require('./Routes/counts.route')
const Counts = require('./Models/Counts')
const sendEmail = require('./Routes/eMailMe')

var corsOptions = {
    origin: 'https://portfolio-neko.herokuapp.com/',
    optionsSuccessStatus: 200 
  }

app.use(cors(corsOptions))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(express.static('public'))
app.use('/api/counts', counts)
app.use('/email', sendEmail)

app.get('/', function (req, res) {
    res.send('Welcome on my portfolio API')
})

const uuid = "ff976a39-4c5b-4016-925a-3d525513a351"
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
        console.log('Unable to reach DB!', error.message)
    }
}

if (process.env.NODE_ENV !== 'test') main()

