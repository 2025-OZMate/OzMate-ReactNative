const mongoose = require('mongoose');

// MongoDB 연결
mongoose.connect('mongodb+srv://w2316:r67ki4P4SpTGeuED@cluster0.qr1dt.mongodb.net/', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log('MongoDB 연결됨'))
    .catch(err => console.log('MongoDB connection error: ', err));
