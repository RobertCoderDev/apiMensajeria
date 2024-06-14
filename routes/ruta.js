const {Router} = require('express');
const router = Router();
const multer = require("multer"); 
const controller = require("../controllers/controller");
const validatePhone = require('../middleware/validatePhone');


// const almacenamiento = multer.diskStorage({
//     destination: function(req, file, cb) {
//         cb(null, "./imagenes/articulos");
//     },

//     filename: function(req, file, cb) {
//         cb(null, "articulo" + Date.now() + file.originalname);
//     }
// })

// const subidas = multer({storage: almacenamiento})

// Ruta util

router.post("/save", validatePhone, controller.save);


router.get("/read", validatePhone, controller.read);


// router.post("/subir-imagen/:id", [subidas.single("file0")], ArticuloControlador.subir);


// router.get("/buscar/:busqueda", ArticuloControlador.buscador);

module.exports = router;