const mongoose = require('mongoose');

const blacklistTokenSchema = new mongoose.Schema({
    token:{
        type: String,
        required: [true, 'Token is required top be added in blacklist']
    }
},{
    timestamps: true
});


const tokenBlacklistModel = mongoose.model('blackListToken', blacklistTokenSchema);

module.exports = tokenBlacklistModel;