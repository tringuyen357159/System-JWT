const express = require('express')
const router = express.Router();
const verifyToken = require('../middleware/auth')
const StudentController = require('../controller/StudentController');

router.post('/create',verifyToken ,StudentController.handleCreateStudent)
router.put('/update/:id',verifyToken ,StudentController.handleUpdateStudent)
router.get('/getAll',verifyToken ,StudentController.handleFetchStudent)
router.delete('/delete/:id',verifyToken ,StudentController.handleDeleteStudent)
router.get('/find/:id',verifyToken ,StudentController.handleFindStudent)

module.exports = router