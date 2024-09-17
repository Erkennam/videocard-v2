import express from "express";
import Videocard from "../models/videocard.js";

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const videocards = await Videocard.find();
    if (!videocards) {
      return res.status(400).json({ message: 'Видеокарты не найдены' });
    }
    res.json(videocards);
  } catch (error) {
    console.error('Ошибка при получении видеокарт:', error);
    res.status(500).json({ message: 'Ошибка сервера при получении видеокарт' });
  }
});

router.get('/:brand', async (req, res) => {
  try {
    const { brand } = req.params;
    const videocards = await Videocard.find({ brand });
    if (!videocards) {
      return res.status(400).json({ message: 'Видеокарты не найдены' });
    }
    res.json(videocards);
  } catch (error) {
    console.error('Ошибка при получении видеокарт:', error);
    res.status(500).json({ message: 'Ошибка сервера при получении видеокарт' });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.json('ошибка');
    }
    const find = await Videocard.findById(id);
    if (!find) {
      return res.status(400).json({ message: 'Видеокарты не найдены' });
    }
    res.json({ find });
  } catch (error) {
    console.error('Ошибка при получении видеокарт:', error);
    res.status(500).json({ message: 'Ошибка сервера при получении видеокарт' });
  }
});

router.get('/:page/:pageSize', async (req, res) => {
  try {
    const page = parseInt(req.params.page);
    const pageSize = parseInt(req.params.pageSize);
    const skip = (page - 1) * pageSize;
    const videocards = await Videocard.find().skip(skip).limit(pageSize);
    if (videocards.length === 0) {
      return res.status(404).json({ message: 'Карты не найдены' });
    }
    res.json(videocards);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Ошибка сервера' });
  }
});

export default router;
