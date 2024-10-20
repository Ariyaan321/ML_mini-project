const express = require('express')
const router = express.Router();
const {
    createData
} = require('../controllers/data')

// this is same as app.use('/') in app.js
router.post('/', createData)

module.exports = router;