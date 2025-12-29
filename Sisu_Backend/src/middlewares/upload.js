import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';

//usar directorios con "type": module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

//Configurar almacenamiento
const storage = multer.diskStorage({
    destination : function (req, file, cb){
        //Se guardan en la carpeta upload
        cb(null, path.join(__dirname, '../../uploads'));
    },
    filename: function(req, file, cb){
        //Se quitan los espacios y se cambian por "__"
        const cleanName = file.originalname.replace(/\s+/g, '-');
        //renombramiento del archivo para evitar se duplique
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null , uniqueSuffix + '-' + file.originalname);
    } 
});

const upload = multer({ storage: storage});

export default upload;