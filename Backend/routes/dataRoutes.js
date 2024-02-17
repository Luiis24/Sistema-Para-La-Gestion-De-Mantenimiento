const express = require('express');
const router = express.Router();
const dataController = require('../controllers/dataControllers');


router.post('/registerInstructor', dataController.registerInstructor);
router.post('/loginInstructor', dataController.loginInstructor);
router.get('/instructores', dataController.getInstructores);

router.post('/registerAprendiz', dataController.registerAprendiz);
router.post('/loginAprendiz', dataController.loginAprendiz);
router.get('/aprendices', dataController.getAprendices);

router.post('/registerHojaInspeccion', dataController.registerHojaInspeccion);

router.post('/registerComponenteChecklist', dataController.registerComponenteChecklist);
router.get('/componenteChecklist', dataController.getComponenteChecklist);

router.post('/registerCheckList', dataController.registerCheckList);
router.get('/getUltimosEstados', dataController.getUltimosEstados)

router.get('/insumos', dataController.getInsumos);

router.post('/crearMaquina',dataController.crearMaquina);
router.get('/maquinas', dataController.getMaquinas);

router.post('/crearTipoMaquina', dataController.crearTipoMaquina);
router.get('/tipoMaquinas', dataController.getTipoMaquinas);

router.get('/ordenDeTrabajo/:id_maquina', dataController.getOrdenTrabajoById);

router.post('/registerOrdenTrabajo', dataController.registerOrdenTrabajo);

router.get('/checklist/:id_maquina', dataController.getOrdenTrabajoById);

router.get('/hojaVida/:id_maquina', dataController.getHojaVidaById);


module.exports = router;
