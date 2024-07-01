import fs from 'fs';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url'; // Importa a função fileURLToPath para manipular URL

import { AppDataSource } from "../../app-data-source.js";
import { AnexosTicketSchema } from "../../schema/anexosTickets.js";

// Obtém o diretório atual do arquivo
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export class DeleteAnexosTicketsController {
    async delete(req, res) {
        try {
            const body = req.body;
            const id = req.params.id;
            const anexosTicketsRepository = AppDataSource.getRepository(AnexosTicketSchema);
            const result = await anexosTicketsRepository.update(id, { ...body });

            if (result.affected === 1) {
                const anexosTickets = await anexosTicketsRepository.findOne({ where: { id: id } });

                if (anexosTickets && anexosTickets.img) {
                    const imgURL = anexosTickets.img;
                    const nomeArquivo = path.basename(imgURL); // Extrai apenas o nome do arquivo da URL

                    // Construir o caminho absoluto do arquivo na pasta src/uploads
                    // const caminhoAbsoluto = path.join(__dirname, '..', '..', 'src', 'uploads', nomeArquivo);
                    const caminhoAbsoluto = `src/uploads/${nomeArquivo}`;

                    // Verificar se o arquivo existe antes de tentar excluir
                    if (fs.existsSync(caminhoAbsoluto)) {
                        // Deletar o arquivo
                        fs.unlinkSync(caminhoAbsoluto);
                    }

                    return res.status(200).json(anexosTickets);
                } else {
                    return res.status(404).json({ message: "Anexo de ticket não encontrado ou campo 'img' não definido" });
                }
            } else {
                return res.status(400).json({ message: "Erro ao deletar o anexo de ticket" });
            }
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }
}
