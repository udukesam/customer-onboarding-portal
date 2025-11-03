import express from 'express';
const router = express.Router();

router.post('/verify', (req, res) => {
  const { name } = req.body;
  const status = Math.random() > 0.3 ? 'Verified' : 'Pending';
  res.json({ name, kycStatus: status });
});

export default router;
