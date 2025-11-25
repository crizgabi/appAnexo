import { TecnicoService } from "../services/TechnicalService.js";

export const TecnicoController = {
  async getAll(req, res) {
    try {
      const tecnicos = await TecnicoService.list();
      res.status(200).json(tecnicos);
    } catch (error) {
      res.status(500).json({
        message: "Erro ao listar técnicos",
        error: error.message
      });
    }
  },

  // async getById(req, res) {
  //   try {
  //     const { id } = req.params;
  //     const tecnico = await TecnicoService.getById(id);
  //     res.status(200).json(tecnico);
  //   } catch (error) {
  //     res.status(404).json({ message: error.message });
  //   }
  // }
};
