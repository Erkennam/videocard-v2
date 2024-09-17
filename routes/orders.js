import express from "express";
import Order from "../models/order.js";

const router = express.Router();

router.get('/:username', async (req, res) => {
  try {
    const { username } = req.params;
    const orders = await Order.find({ username });
    if (!orders || orders.length === 0) {
      return res.status(404).json({ message: 'Заказы не найдены' });
    }
    res.status(200).json(orders);
  } catch (err) {
    console.error('Ошибка получения заказов', err);
    res.status(500).json({ message: 'Ошибка сервера при получении заказов' });
  }
});

router.post('/', async (req, res) => {
  try {
    const newOrder = new Order(req.body);
    await newOrder.save();
    res.status(201).json({ message: 'Заказ успешно добавлен' });
  } catch (err) {
    console.error('Ошибка добавления заказа', err);
    res.status(500).json({ message: 'Ошибка сервера при добавлении заказа' });
  }
});

export default router;
