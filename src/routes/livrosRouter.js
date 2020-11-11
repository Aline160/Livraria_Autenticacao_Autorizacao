const express = require ("express");
const router = express.Router();
const controller = require ("../controller/livrosController");

router.get ("/",controller.getAll);
router.get ("/livros", controller.getAll);
router.get('/titulo', controller.getByTitulo)
router.post ("/",controller.postLivros);
router.delete ("/",controller.deleteLivros);
router.put("/:id",controller.putLivros);


module.exports = router;