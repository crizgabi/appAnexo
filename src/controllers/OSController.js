import { OSService } from "../services/OSService.js";

export const OSController = {
  async create(req, res) {
    try {
      const os = await OSService.create(req.body);
      res.status(201).json(os);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },

  async findAll(req, res) {
    try {
      const list = await OSService.findAll();
      res.json(list);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  async findById(req, res) {
    try {
      const os = await OSService.findById(req.params.id);
      res.json(os);
    } catch (err) {
      res.status(404).json({ error: err.message });
    }
  },

  async update(req, res) {
    try {
      const os = await OSService.update(req.params.id, req.body);
      res.json(os);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },

  async delete(req, res) {
    try {
      await OSService.delete(req.params.id);
      res.json({ message: "OS removida com sucesso" });
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }
};
