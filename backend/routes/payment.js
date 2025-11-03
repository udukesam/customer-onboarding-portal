import express from 'express';
const router = express.Router();

router.post('/initiate', (req, res) => {
  const { company, amount } = req.body;
  res.json({ company, amount, status: 'Payment processed successfully' });
});

export default router;
