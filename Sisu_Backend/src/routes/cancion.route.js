import { Router } from 'express';
import { crearCancion, deleteCancion, getCanciones, updateCancion } from '../controllers/cancion.controller.js';
import { authRequired } from "../middlewares/auth.js"
import upload from '../middlewares/upload.js'

const router = Router();

router.route("/crearCancion").post(authRequired,
    upload.single('cancion_file'),
    crearCancion);
router.route("/getCancion").get(authRequired,getCanciones);
router.route('/updateCancion/:id').patch(authRequired,upload.single('cancion_file'),
updateCancion);
router.route('/deleteCancion/:id').delete(authRequired,deleteCancion);


export default router;