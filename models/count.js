const mongoose = require('mongoose');
const { Schema } = require('mongoose');

const RanksSchema = new Schema({
    userID: String,
    guildID: String,
    username: String,
    xp: Number
});

module.exports = mongoose.model('Ranks', RanksSchema);