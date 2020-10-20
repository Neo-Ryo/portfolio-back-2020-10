const express = require('express')
const counts = express.Router()

const Counts = require('../Models/Counts')

const uuid = "ff976a39-4c5b-4016-925a-3d525513a351"

counts.get('/', async (req, res) => {
    try {
        const count = await Counts.findCreateFind({ where : { uuid }})
        res.status(200).json(count)
    } catch (error) {
        res.status(400).json(error)
    }
})

counts.put(`/views`, async (req, res) => {
    try {
        const count = await Counts.findByPk(uuid)
        count.increment(['views'])
        res.status(200).json(count)
    } catch (error) {
        res.status(400).json(error.message)
    }
})

counts.put(`/likes`, async (req, res) => {
    try {
        const count = await Counts.findByPk(uuid)
        count.increment(['likes'])
        res.status(200).json(count)
    } catch (error) {
        res.status(400).json(error.message)
    }
})

module.exports = counts
