const express = require('express')
const router = express.Router()
const userController = require('../controllers/userController')

router.get('/', userController.Homepage)
router.post('/add', userController.Addpage)
router.get('/customer', userController.Customerpage)

router.get('/edit/:id', userController.editDetails)
router.put('/edit/:id', userController.updateDetails)
router.delete('/delete/:id', userController.deleteDetails)

module.exports = router;