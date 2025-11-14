import { EquipmentService } from "../service/EquipamentService.js";

export const EquipmentController = {
  // GET /equipamentos
  getAll: async (req, res) => {
    try {
      const equipamentos = await EquipmentService.list();
    res.status(200).json(equipamentos);
  } catch (error) {
    console.error("Erro ao listar equipamentos:", error);
    res.status(500).json({ message: "Erro ao listar equipamentos", error: error.message });
  }
  },

  // GET /equipamentos/:id
  getById: async (req, res) => {
    try {
      const { id } = req.params;

      // expand pode vir como ?expand=historicoOs ou ?expand=historicoOs,outraCoisa
      const expand = req.query.expand || [];
      const osLimit = req.query.osLimit ? parseInt(req.query.osLimit, 10) : 10;
      const osOffset = req.query.osOffset ? parseInt(req.query.osOffset, 10) : 0;

      const equipamento = await EquipmentService.find(id, { expand, osLimit, osOffset });
      res.json(equipamento);
    } catch (err) {
      res.status(404).json({ error: err.message });
    }
  },

  // GET /equipamentos/cliente/:idCliente
  getByCustomerId: async (req, res) => {
    try {
      const { idCliente } = req.params;
      const equipamentos = await EquipmentService.listByCliente(idCliente);
      res.json(equipamentos);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  // POST /equipamentos
  create: async (req, res) => {
    try {
      const novo = await EquipmentService.create(req.body);
      res.status(201).json(novo);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },

  // PUT /equipamentos/:id
  update: async (req, res) => {
    try {
      const { id } = req.params;
      const atualizado = await EquipmentService.update(id, req.body);
      res.json(atualizado);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },

  // DELETE /equipamentos/:id
  delete: async (req, res) => {
    try {
      const resultado = await EquipmentService.delete(req.params.id);
      res.json(resultado);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },
};
