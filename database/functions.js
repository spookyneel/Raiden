const mongoose = require('mongoose');
const Ranks = require('../models/count');

const newUser = async (userId, guildId, username, XP) => {
    const newUser = await Ranks.create({
        userID: userId,
        guildID: guildId,
        username: username,
        xp: XP
    }).catch((err) => {
        console.log(err);
    });

    return newUser;
};

const deleteUser = async (userId, guildId) => {
    const user = await Ranks.findOne({ 
        userID: userId, 
        guildID: guildId
    });
    if (!user) return false;

    await Ranks.findOneAndDelete({
        userID: userId,
        guildID: guildId
    }).catch((err) => {
        console.log(err);
    });

    return user
};

const addXP = async (userId, guildId, username, XP) => {
    const user = await Ranks.findOne({
        userID: userId,
        guildID: guildId
    });
    if (!user) {
        await newUser(userId, guildId, username, 0)
    } else {
        let xp = user.xp + XP
        await Ranks.findOneAndUpdate({
            userID: userId,
        }, {
            xp: xp
        }).catch((err) => {
            console.log(err);
        });
    };
};

const deductXP = async (userId, guildId, XP) => {
    const user = await Ranks.findOne({
        userID: userId,
        guildID: guildId
    });
    if (!user) return false;

    let currentXP = user.xp;
    let deductedXP = currentXP - Number(XP);
    await Ranks.findOneAndUpdate({
        userID: userId,
        guildID: guildId
    }, {
        xp: deductedXP
    }).catch((err) => {
        console.log(err);
    });
};

const fetchUserStats = async (userId, guildId) => {
    const user = await Ranks.findOne({
        userID: userId,
        guildID: guildId
    });
    if (!user) return false;

    const stats = await Ranks.find({
        guildID: guildId
    }).sort([['xp', 'descending']]).exec();

    let position = stats.findIndex(i => i.userID === userId) + 1;
    return {user, position};
};

const fetchLeaderboard = async (guildId) => {
    const users = await Ranks.find({ guildID: guildId }).sort([['xp', 'descending']]).exec();
    return users;
}

module.exports = {
    deleteUser,
    addXP,
    deductXP,
    fetchUserStats,
    fetchLeaderboard
};