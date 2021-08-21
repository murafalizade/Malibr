const buildSchema = require('graphql').buildSchema;
module.exports = buildSchema(`
scalar Date
enum Choice {
    Single
    Group
    Both
}
enum Category {
    WebDevelopment, Math ,Data Science,Music,Design
}
scalar Upload
type File{
    url:String
}
    type Course{
        id: ID,
        teacherId: ID,
        title: String!,
        description:String!, 
        picture:String,
        dates: [Date],
        joincounter:Int!,
        beginDate: Date,
        price:Int!,
        category: Category,
        minStudentCount:Int,
        maxStudentCount:Int,
        singleorgroup:Choice
        joiner: [User]
    }
    type Noticifation{
        id:ID!,
        title:String!,
        createDate:Date,
        content:String!,
        seen:Boolean!
    }

    type User{
        id:ID!,
        userId:ID!,
        firstName:String!,
        lastName: String!,
        email:String!,
        password:String!,
        isAdmin:Boolean!,
        notifications: [Noticifation]!,
        subject: [Course]!,
        isTeacher: Boolean!
    }
    type Teacher{
        id:ID!,
        userId:ID!,
        firstName:String!,
        lastName: String!,
        email:String!,
        password:String!,
        isAdmin:Boolean!,
        notifications: [Noticifation],
        subject: [Course]!,
        isTeacher: Boolean!,
        accepted: String!,
        courses: [Course],
        bio:String,
        speacilist:String,
        picture_url: String,
        video_url: String,
        stars:Int!,
        income:Int!,
        experience:String
    }
    input RegisterInfo {
        firstName:String!,
        lastName: String!,
        email:String!,
        password:String!,
        isAdmin:Boolean
    }
    
    input LoginInfo {
        email:String!,
        password:String!,
    }

    input TutorInfo{
        userId:ID!
        bio:String,
        speacilist:String,
        picture: Upload,
        experience:String
    }

    input CourseInfo{
        teacherId: ID!,
        title: String!,
        description:String!,
        spoken:String!,
        priceSingle:Int,
        priceGroup:Int,
        category: Category,
        keyWord:[String]
        singleorgroup:Choice
    }
    input NotificationInfo{
        senderId:ID!,
        title:String!,
        createDate:Date,
        content:String!,
    }

    input UpdateUserInfo{
        firstName:String,
        lastName: String,
        email:String,
        password:String
    }
    type seenUser{
        firstName:String,
        lastName: String,
    }

    type Query{
        users:[User]!
        teachers:[Teacher]!
        user(id:ID!):User
        userOwn(userId:ID!):User
        teacher(id:ID!):Teacher
        teacherOwn(userId:ID!):Teacher
        courses:[Course]!
        course(id:ID!):Course
        filterCourse:[Course]
        courseOwn(id:ID!,teacherId:ID!):Course
        notifications(senderid:ID!):[Noticifation]!
        notification(id:ID!,senderid:ID!):Noticifation
    }
    type Mutation{
        registerUser(registerInfo:RegisterInfo!):String
        loginUser(loginInfo:LoginInfo!):String
        becomeTutor(tutorInfo:TutorInfo):String
        createCourse(courseInfo:CourseInfo):String
        createdNotification(notificationInfo:NotificationInfo):String
        seenNotification(id:ID!):Noticifation
        joinCourse(courseId:ID!,userId:ID!,dates:Date):String
        updateUserProfile(userId:ID!,userInfo:UpdateUserInfo):User!
        giveStar(teacherId:ID!,point:Int):String
        uploadFile(file:Upload!):File
    }
`)