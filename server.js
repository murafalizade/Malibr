const express = require('express');
const dotenv = require('dotenv');
const graphqlHTTP = require('express-graphql').graphqlHTTP;
const schema = require('./schema');
const resolvers = require('./resolvers');
const app = express();
const mongoose = require('mongoose');
const server = require('http').Server(app)
const { graphqlUploadExpress} = require('graphql-upload')

dotenv.config();
const url = `mongodb+srv://muradUser:${process.env.DATABASE_PASSWORD}@malibrdataset.t5f4k.mongodb.net/malibr-database?retryWrites=true&w=majority`
const PORT = 8080;
const cors = require('cors');
app.use(cors());

try {
    mongoose.connect(url, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true
    });
    console.log("Connect is succesfull")
}
catch {
    console.log("Connect is failed");
}
app.use(express.static('public'))
app.use('/graphql', graphqlUploadExpress({ maxFileSize: 10000000, maxFiles: 10 }), new graphqlHTTP({
    schema: schema,
    rootValue: resolvers,
    graphiql: true
}))
app.get('/',(req,res)=>{
    res.send("hello")

})

server.listen(PORT, () => console.log(`http://localhost:${PORT}`))