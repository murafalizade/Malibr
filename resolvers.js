const userModel = require('./models/userModel').student;
const teacherModel = require('./models/userModel').teacher;
const courseModel = require("./models/courseModel");
const notificationModel = require("./models/natificationModel");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const mailer = require('./middlewares/mailMiddleware');
const {
    GraphQLUpload
} = require('graphql-upload');
const path = require('path');
const fs = require('fs')
const resolvers = {
    //mutation
    registerUser: async ({ registerInfo }, res) => {
        const { firstName, lastName, email, password } = registerInfo;
        const currentUser = await userModel.findOne({ email });
        if (currentUser) {
            return "This email adress already have used, if you want login "
        }
        let { isAdmin } = registerInfo;
        !isAdmin ? isAdmin = false : null;
        console.log(isAdmin)
        // const { error } = validation.register(req.body)
        // if (error) return res.status(400).send(error.details[0].message)
        const account = {
            firstName,
            lastName,
            email,
            password: await bcrypt.hash(password, 10),
            isAdmin
        }
        const newUser = new userModel(account);
        const saveUser = await newUser.save();
        const token = await jwt.sign({ id: saveUser.userId, role: saveUser.isAdmin }, "asjdhahdahds");
        mailer(email, "Succes of Register", "We are congurtulation for register happy use \n Malibr.Inc");
        res.header('Header-Token', token);
        return saveUser.userId;
    },
    loginUser: async ({ loginInfo }, res) => {
        const { email, password } = loginInfo
        // const { error } = validation.login(req.body)
        // if (error) return res.status(400).send(error.details[0].message)
        const currentUser = await userModel.findOne({ email });
        if (currentUser) {
            const match = await bcrypt.compare(password, currentUser.password);
            if (match) {
                const token = await jwt.sign({ id: currentUser.userId, role: currentUser.isAdmin }, "asjdhahdahds")
                return token
            }
            else {
                return "something went wrong";
            }
        }
    },
    becomeTutor: async ({ tutorInfo }, res) => {
        const { userId, bio, speacilist,picture, video_url, experience } = tutorInfo;
        let currentUser = await userModel.findOne({ userId });
        let currentTeacher = await teacherModel.findOne({ userId });
        if (!currentUser) {
            return "Please register or login"
        }
        if (currentTeacher) {
            return "You are already teacher "
        }
        const { email, firstName, lastName, password } = currentUser;
        currentUser.isTeacher = true;
        const stream = picture.file.createReadStream();
        const pathname = path.join(__dirname, `/public/images/${picture.file.filename}`)
        await stream.pipe(fs.createWriteStream(pathname));
        const picture_url = `http://localhost:8080/images/${picture.file.filename}`
        const account = {
            isTeacher: currentUser.isTeacher,
            userId, email, firstName, lastName, password,
            bio, speacilist, picture_url, video_url, experience
        }
        console.log(account)
        const newTeacher = new teacherModel(account);
        const saveTeacher = await newTeacher.save();
        const token = await jwt.sign({ id: saveTeacher.userId, role: saveTeacher.isAdmin }, "asjdhahdahds");
        mailer(email, "Succes of Become Tutor", "We are congurtulation for tutor . we are soon accept your application \n Malibr.Inc");
        res.header('Header-Token', token);
        return saveTeacher.userId;
    },
    createCourse: async ({ courseInfo }) => {
        const { teacherId } = courseInfo
        let currentTeacher = await teacherModel.findOne({ userId: teacherId });
        if (!currentTeacher) {
            return "You are not teacher "
        }
        console.log(courseInfo);
        const newCourse = new courseModel(courseInfo);
        currentTeacher.courses.push(newCourse);
        await currentTeacher.save();
        await newCourse.save();
        return "succesfull"

    },
    createdNotification: async ({ notificationInfo }) => {
        const { senderId } = notificationInfo
        const currentUser = await userModel.findOne({ userId: senderId });
        if (!currentUser) {
            return 'User isnot defined'
        }
        const newNotification = new notificationModel(notificationInfo);
        currentUser.notifications.push(newNotification);
        await newNotification.save();
        await currentUser.save();
        mailer(currentUser.email, newNotification.title, newNotification.content);
        return "Succesfull"

    },
    seenNotification: async ({ id }) => {
        const currentNotif = await notificationModel.findOne({ id });
        currentNotif.seen = true;
        await currentNotif.save();
        console.log(currentNotif)
        return currentNotif;
    },
    Upload: GraphQLUpload,
    uploadFile: async ({ file }) => {

        const stream = file.file.createReadStream();
        const pathname = path.join(__dirname, `/public/images/${file.file.filename}`)
        await stream.pipe(fs.createWriteStream(pathname));
        return { url: `http://localhost:8080/images/${file.file.filename}`}

    },
    //query
    users: async () => {
        const allUsers = await userModel.find({})
        return allUsers
    },
    teachers: async () => {
        const allUsers = await teacherModel.find({})
        return allUsers
    },
    courses: async () => {
        const allCourse = await courseModel.find({})
        return allCourse
    }
}
module.exports = resolvers;

