const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const infoCardRoutes = require('./routes/infoCardRoutes');  // 라우트 파일 불러오기
const app = express();

const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// MongoDB 연결
require('./config/db');

// API 라우팅
app.use('/api/info-cards', infoCardRoutes);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
