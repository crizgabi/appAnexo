import { UploadService } from "../services/UploadService.js";

export class UploadController {
    static async upload(req, res) {
        try {
            const file = req.file;
            if (!file) {
                return res.status(400).json({ error: "Arquivo não enviado" });
            }

            const result = await UploadService.uploadImage(req.file);

            return res.status(201).json({
                message: "Arquivo enviado com sucesso",
                url: result.url,
            });

        } catch (err) {
            console.error(err);

            return res.status(500).json({
                error: err.message || "Erro ao enviar arquivo",
            });
        }
    }
}