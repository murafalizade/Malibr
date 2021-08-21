const mongoose = require('mongoose');
const shortid = require('shortid');


const Messages = mongoose.model('message', new mongoose.Schema({
    id: { type: String, default: shortid.generate() },
    senderId: { type: String, required: true },
    recipientId: { type: String, required: true },
    messages: { type: String,required: true },
    createDate: { type: Date, default: Date.now() }
}));


module.exports = Messages;