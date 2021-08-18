const express = require('express')
const router = express.Router()

const hngController = require('../controllers/hngController')
// const { authorize } = require("../middlewares/middleware");

router.route('/resume').get(hngController.resume)
router.route('/contact').post(hngController.contact)

module.exports = router
