require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const infoCardRoutes = require('./routes/infoCardRoutes');
const authRoutes = require('./routes/auth')

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// MongoDB 연결
require('./config/db');

// API 라우팅
app.use('/api/info-cards', infoCardRoutes);
app.use('/auth', authRoutes);
app.listen(5000, '0.0.0.0', () => {
    console.log(`Server running on port 5000`);
});
