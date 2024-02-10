const express = require('express');
const router = express.Router();
const dataController = require('../controllers/dataControllers');


router.post('/registerInstructor', dataController.registerInstructor);
router.get('/instructores', dataController.getInstructores);

router.post('/registerAprendiz', dataController.registerAprendiz);
router.get('/aprendices', dataController.getAprendices);

router.post('/loginInstructor', dataController.loginInstructor);


module.exports = router;
