const mongoose = require('mongoose');
const shortid = require('shortid');
// const NotificationModel = require('./natificationModel')
// const courseModel = require('./courseModel')


const extendSchema = require('mongoose-extend-schema');

const studentSchema = new mongoose.Schema({
    id: { type: String, default: shortid.generate() },
    userId: { type: String, default: shortid.generate() },
    firstName: {type:String,required:true},
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    isAdmin: { type: Boolean, default: false },
    notifications: [],
    subject: [],
    isTeacher: {type:Boolean,default:false}
});



const teacherSchema = extendSchema(studentSchema, {
    courses: [],
    bio:String,
    speacilist:String,
    picture_url: String,
    video_url: String,
    stars:{type:Number,default:0},
    income:{type:Number,default:0},
    experience:String,
    accepted:{type:String,default:"pending"}
});


const student = mongoose.model('students', studentSchema);
const teacher = mongoose.model('teachers', teacherSchema);

module.exports ={student,teacher};