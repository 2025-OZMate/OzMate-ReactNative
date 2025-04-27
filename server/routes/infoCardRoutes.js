const express = require('express')
const router = express.Router()
const InfoCard = require('../models/InfoCard')

//모든 infocard 데이터 조회
router.get('/', async (req, res) => {
    try {
        const cards = await InfoCard.find()
    } catch (err) {
        res.status(500).json({ message: 'server error' })
    }
})
module.exports = router;

