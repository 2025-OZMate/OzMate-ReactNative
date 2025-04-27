const mongoose = require('mongoose');

//스키마
const infoCardSchema = new mongoose.Schema({
    ImgUrl: String,
    title: String,
    description: String,
    category: String,
});

const InfoCard = mongoose.model('InfoCard', infoCardSchema);
module.exports = InfoCard;
