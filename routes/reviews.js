import express from "express";
import Review from "../models/review.js";

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const newReview = new Review(req.body);
    await newReview.save();
    res.status(201).json({ message: 'Отзыв успешно добавлен' });
  } catch (err) {
    console.error('Ошибка написания отзыва', err);
    res.status(500).json({ message: 'Ошибка сервера при написании отзыва' });
  }
});

router.get('/:product_Id', async (req, res) => {
  try {
    const { product_Id } = req.params;
    const reviews = await Review.find({ product_Id });
    if (!reviews || reviews.length === 0) {
      return res.status(404).json({ message: 'Отзывы не найдены' });
    }
    res.status(200).json(reviews);
  } catch (err) {
    console.error('Ошибка получения отзывов', err);
    res.status(500).json({ message: 'Ошибка сервера при получении отзывов' });
  }
});

router.delete('/:product_Id', async (req, res) => {
  try {
    const { product_Id } = req.params;
    await Review.findByIdAndDelete(product_Id);
    res.status(200).json({ message: 'Отзыв успешно удален' });
  } catch (err) {
    console.error('Ошибка удаления отзыва', err);
    res.status(500).json({ message: 'Ошибка сервера при удалении отзыва' });
  }
});

export default router;
