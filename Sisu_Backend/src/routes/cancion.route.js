import { Router } from 'express';
import { crearCancion, deleteCancion, getCanciones, updateCancion } from '../controllers/cancion.controller.js';

const router = Router();

router.route("/crearCancion").post(crearCancion);
router.route("/getCancion").get(getCanciones);
router.route('/updateCancion/:id').patch(updateCancion);
router.route('/deleteCancion/:id').delete(deleteCancion);


export default router;