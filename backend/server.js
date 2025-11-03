import express from 'express';
import cors from 'cors';
import crmRouter from './routes/crm.js';
import kycRouter from './routes/kyc.js';
import paymentRouter from './routes/payment.js';

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/crm', crmRouter);
app.use('/api/kyc', kycRouter);
app.use('/api/payment', paymentRouter);

app.get('/', (req, res) => res.send('Customer Onboarding API running...'));

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
