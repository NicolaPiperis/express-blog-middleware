const express = require("express");
const router = express.Router();
const postsController = require('../controllers/post');

// index
router.get("/", postsController.index);

// richiamo la create, funzione definita nel controller, quando scriviamo nell'url '/create'
router.get('/create', postsController.create);

router.post('/', postsController.store);

// richiamiamo la show attraverso il dato slug presente nel database
router.get("/post/:slug", postsController.show);

router.get("/post/:slug/download", postsController.download);

router.delete("/:slug", postsController.destroy)


module.exports = router;