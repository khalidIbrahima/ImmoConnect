const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const passport = require('passport');
const authRoutes = require('./routes/auth.routes');
const propertyRoutes = require('./routes/property.routes');
const contractRoutes = require('./routes/contract.routes');
const paymentRoutes = require('./routes/payment.routes');
const reportRoutes = require('./routes/report.routes');
const messageRoutes = require('./routes/message.routes');

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(passport.initialize());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/properties', propertyRoutes);
app.use('/api/contracts', contractRoutes);
app.use('/api/payments', paymentRoutes);
app.use('/api/reports', reportRoutes);
app.use('/api/messages', messageRoutes);

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});