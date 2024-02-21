const express = require('express');
const router = express.Router();
const dataController = require('../controllers/dataControllers');


router.post('/registerInstructor', dataController.registerInstructor);
router.get('/instructores', dataController.getInstructores);

router.post('/login', dataController.login);

router.post('/registerAprendiz', dataController.registerAprendiz);
router.get('/aprendices', dataController.getAprendices);

router.post('/registerHojaInspeccion', dataController.registerHojaInspeccion);

router.post('/registerComponenteChecklist', dataController.registerComponenteChecklist);
router.get('/componenteChecklist', dataController.getComponenteChecklist);

router.post('/registerCheckList', dataController.registerCheckList);
router.get('/getUltimosEstados', dataController.getUltimosEstados)

router.post('/crearMaquina',dataController.crearMaquina);
router.get('/maquinas', dataController.getMaquinas);

router.post('/crearTipoMaquina', dataController.crearTipoMaquina);
router.get('/tipoMaquinas', dataController.getTipoMaquinas);

router.get('/ordenDeTrabajo/:id_maquina', dataController.getOrdenTrabajoById);
router.get('/checklist/:id_maquina', dataController.getOrdenTrabajoById);
router.get('/hojaVida/:id_maquina', dataController.getHojaVidaById);

router.post('/registerOrdenTrabajo', dataController.registerOrdenTrabajo); //no va
router.get('/insumos', dataController.getInsumos); //no va

router.post('/crearCaracteristicasMotor',dataController.crearCaracteristicasMotor);
router.get('/GetCaracteristicasMotor',dataController.GetCaracteristicasMotor);

router.post('/crearHistorialReparaciones',dataController.crearHistorialReparaciones);
router.get('/GetHistorialReparaciones',dataController.GetHistorialReparaciones);

router.post('/registrarEquipo',dataController.registrarEquipo);
router.get('/GetDescripcion_equio',dataController.GetDescripcion_equio);

router.post('/crear_caracteristica_maquina',dataController.crear_caracteristica_maquina)
router.get('/GetCaracteristicasMaquina', dataController.GetCaracteristicasMaquina)



module.exports = router;
