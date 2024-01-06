const express = require('express');
const router = express.Router();
const dataController = require('../controllers/dataControllers');


router.get('/Products', dataController.getProducts);
router.get('/usuarios', dataController.usuarios);
router.get('/detalles/:idproducto', dataController.getProductById);

router.post('/registerUser', dataController.registerUser);


router.post('/login', dataController.loginUser);

router.post('/registerProdutcs', dataController.registerProdutcs);

router.post('/formularioEnvio', dataController.formularioEnvio)
router.post('/compra', dataController.compra);
router.get('/ventas', dataController.ventasBike);
router.put('/actualizarStock', dataController.updateStock)


module.exports = router;
