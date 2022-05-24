const mongoose = require('mongoose');

const Mongo = () => {
    mongoose.connect(
        process.env.MONGO_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        }
    );
};

mongoose.connection.once('connected', () => {
    console.log('Connected to Mongo!');
});

mongoose.connection.once('error', (err) => {
    console.log('Couldn\'t connect to Mongo due to error: ' + err);
});

mongoose.connection.on('disconnected', () => {
    console.log('Disconnected from Mongo!');
});

module.exports = {
    Mongo
};