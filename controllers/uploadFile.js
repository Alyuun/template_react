import {pool} from "../config/database.js";

// Utiliser le middleware pour le téléchargement de fichiers
export default (req, res) => {
    
    const {id} = req.body;
    const avatar = req.body.files;
    console.log({avatar, data:req.body});
    const sql = "UPDATE users SET avatar = ? WHERE id = ?";
    const paramsSQL = [avatar, id];
    
    console.log(avatar);
    
    pool.query(sql, paramsSQL, (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).json({ error: 'Erreur lors de l\'enregistrement de l\'avatar.' });
        } else {
            console.log('Image enregistrée avec succès.');
            res.status(200).json({ success: true });
        }
    });
};
/*
const allowedExtensions = ['jpeg', 'jpg', 'png', 'gif'];
const imageDirectory = 'public/img';
const MAX_FIELD_SIZE = 20 * 1024 * 1024;
const sql = "UPDATE users SET avatar = ? WHERE id = ?"

const form = formidable({
  multiples: false,
  keepExtensions: true,
  encoding: 'utf-8',
  maxFieldsSize: MAX_FIELD_SIZE,
});

const checkAcceptedExtensions = (file) => {
    const type = file.mimetype.split('/').pop();
    return allowedExtensions.includes(type);
};

const uploadFile = async (req, res) => {
    form.parse(req, async (err, fields, files) => {
        if (err) {
            if (err.code === 'LIMIT_FIELD_SIZE') {
                return res.status(400).json({ error: `Le fichier dépasse la taille maximum autorisée de ${MAX_FIELD_SIZE / 1024 / 1024} Mo.` });
            }
            return res.status(500).json({ error: 'Le fichier ne peut pas être traité.' });
        }
        
        const {username} = fields
        
        const file = files.files;
        if (!file || file.size === 0) {
            return res.status(400).json({ error: 'Aucun fichier n\'a été téléchargé.' });
        }

        if (!checkAcceptedExtensions(file)) {
            return res.status(400).json({ error: 'Type de fichier non valide.' });
        }
    
        const newFilename = `${file.newFilename}`;
        const newPath = path.join(imageDirectory, newFilename);

        if (!fs.existsSync(imageDirectory)) {
            return res.status(500).json({ error: `Le dossier ${imageDirectory} n'existe pas.` });
        }

        try {
            await fs.promises.copyFile(file.filepath, newPath);
            asyncQuery(sql,[newFilename])
            return res.json({ success: true });
        } catch (e) {
            return res.status(500).json({ error: 'Le fichier ne peut pas être enregistré.' });
        }
    });
};

export default uploadFile;
*/