const mongoose = require('mongoose');
const shortid = require('shortid');

class Dating {
    constructor(startedTime, endedTime, days) {
        this.startedTime = startedTime
        this.endedTime = endedTime
        this.days = days
    }
};

const Course = mongoose.model('course', new mongoose.Schema({
    id: { type: String, default: shortid.generate() },
    teacherId: { type: String, required: true },
    title: { type: String, min: 3, max: 250, required: true },
    description: { type: String, min: 6, max: 250, required: true },
    picture: { type: String },
    beginDate: Date,
    dates: [],
    createDate: { type: Date, default: Date.now() },
    joincounter: { type: Number, default: 0 },
    category: {
        type:String,
        enum: ['WebDevelopment', 'Math' ,'DataScience','Music','Design']
    },
    Choice: {type:String,
        enum: ['Single', 'Group','Both'],
        default:'Single'
    },
    minStudentCount: { type: Number, default: 1 },
    maxStudentCount: { type: Number },
    priceSingle: { type: Number },
    priceGroup: { type: Number },
    joiner: []
}));


module.exports = Course;