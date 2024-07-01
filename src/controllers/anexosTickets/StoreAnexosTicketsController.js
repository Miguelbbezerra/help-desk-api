import { AppDataSource } from "../../app-data-source.js";
import { AnexosTicketSchema } from "../../schema/anexosTickets.js";
import multer from "multer";
import path from "path";

// Configuração do multer para upload de arquivos
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.resolve('src/uploads/')); // Defina a pasta de destino dos uploads
    },
    filename: (req, file, cb) => {
        const timestamp = new Date().toISOString().replace(/[-T:.Z]/g, '');
        const originalName = path.basename(file.originalname, path.extname(file.originalname));
        const extension = path.extname(file.originalname);
        cb(null, `${timestamp}_${originalName}${extension}`);
    }
});

const upload = multer({ storage: storage });

export class StoreAnexosTicketsController {
    async store(req, res) {
        try {
            const file = req.file;
            const body = req.body;

            if (!file) {
                return res.status(400).json({ message: "File not provided" });
            }

            // Criação da URL completa para acessar a imagem
            const imageUrl = `${req.protocol}://${req.get('host')}/uploads/${file.filename}`;

            const anexosTicketsDto = {
                ticketId: body.ticketId,
                img: imageUrl // Armazena a URL completa da imagem
            };

            const anexosTicketsRepository = AppDataSource.getRepository(AnexosTicketSchema);
            const result = await anexosTicketsRepository.save(anexosTicketsDto);

            res.status(201).json(result);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
}

// Middleware de upload de arquivo para a rota
export const uploadMiddleware = upload.single('img');
