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
router.get('/getMaquinas',dataController.getMaquinas);

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
router.post('/actualizar_funcion_maquina',dataController.actualizar_funcion_maquina)
router.get('/GetCaracteristicasMaquina', dataController.GetCaracteristicasMaquina)


const {
    getDescripcionEquipoById,
    getCaracteristicasMaquinaById,
    getCaracteristicasMotorById,
    getHistorialReparacionesById,
  } = require('../controllers/dataControllers.js');
  
  router.get('/getDescripcionEquipoById/:id_maquina', async (req, res) => {
    const id_maquina = req.params.id_maquina;
    try {
      const descripcionEquipo = await getDescripcionEquipoById(id_maquina);
      res.status(200).json(descripcionEquipo);
    } catch (error) {
      res.status(500).json({ error: 'Error al obtener la descripción del equipo por id_maquina' });
    }
  });
  
  router.get('/getCaracteristicasMaquinaById/:id_maquina', async (req, res) => {
    const id_maquina = req.params.id_maquina;
    try {
      const caracteristicasMaquina = await getCaracteristicasMaquinaById(id_maquina);
      res.status(200).json(caracteristicasMaquina);
    } catch (error) {
      res.status(500).json({ error: 'Error al obtener las características de la máquina por id_maquina' });
    }
  });
  
  router.get('/getCaracteristicasMotorById/:id_maquina', async (req, res) => {
    const id_maquina = req.params.id_maquina;
    try {
      const caracteristicasMotor = await getCaracteristicasMotorById(id_maquina);
      res.status(200).json(caracteristicasMotor);
    } catch (error) {
      res.status(500).json({ error: 'Error al obtener las características del motor por id_maquina' });
    }
  });
  
  router.get('/getHistorialReparacionesById/:id_maquina', async (req, res) => {
    const id_maquina = req.params.id_maquina;
    try {
      const historialReparaciones = await getHistorialReparacionesById(id_maquina);
      res.status(200).json(historialReparaciones);
    } catch (error) {
      res.status(500).json({ error: 'Error al obtener el historial de reparaciones por id_maquina' });
    }
  });



module.exports = router;
