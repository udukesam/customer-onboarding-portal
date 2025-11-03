import express from 'express';
const router = express.Router();

const mockCRMData = [];

router.post('/addClient', (req, res) => {
  const client = req.body;
  mockCRMData.push(client);
  res.json({ message: 'Client added to CRM successfully', client });
});

router.get('/clients', (req, res) => res.json(mockCRMData));
export default router;
