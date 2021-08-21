const mongoose = require('mongoose');
const shortid = require('shortid');

const Notification = mongoose.model('notifications', new mongoose.Schema({
    id: { type: String, default: shortid.generate() },
    title:String,
    createDate:{type:Date,default:Date.now()},
    content:String,
    seen:{type:Boolean,default:false}
}));


module.exports = Notification;