import { Router } from 'express';
import { crearCancion, deleteCancion, getCanciones, updateCancion } from '../controllers/cancion.controller.js';
import upload from '../middlewares/upload.js'

const router = Router();

router.route("/crearCancion").post(
    upload.single('cancion_file'),
    crearCancion);
router.route("/getCancion").get(getCanciones);
router.route('/updateCancion/:id').patch(updateCancion);
router.route('/deleteCancion/:id').delete(deleteCancion);


export default router;