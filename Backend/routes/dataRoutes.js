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
router.get('/getUltimosEstados', dataController.getUltimosEstados);

router.post('/crearTipoMaquina', dataController.crearTipoMaquina);
router.get('/getTiposMaquina', dataController.getTiposMaquina);

router.post('/crearMaquina',dataController.crearMaquina);
router.get('/getMaquinas',dataController.getMaquinas);

router.post('/crearCaracteristicasMotor',dataController.crearCaracteristicasMotor);
router.get('/GetCaracteristicasMotor',dataController.GetCaracteristicasMotor);

router.post('/crearHistorialReparaciones',dataController.crearHistorialReparaciones);
router.get('/GetHistorialReparaciones',dataController.GetHistorialReparaciones);

router.post('/registrarEquipo',dataController.registrarEquipo);
router.get('/GetDescripcion_equio',dataController.GetDescripcion_equio);

router.post('/crear_caracteristica_maquina',dataController.crear_caracteristica_maquina)
router.post('/actualizar_funcion_maquina',dataController.actualizar_funcion_maquina)
router.get('/GetCaracteristicasMaquina', dataController.GetCaracteristicasMaquina)



module.exports = router; 