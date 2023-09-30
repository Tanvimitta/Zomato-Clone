const express = require('express')
const app = express()
const mongoose = require('mongoose')
const AppRouter = require('./routes/AppRoutes');
const cors = require('cors')

//enable cors
app.use(cors());

//enable post data
app.use(express.json());// allow row i.e json data
app.use(express.urlencoded({ extended: false })); // enable form data

app.use("/api",AppRouter)

const PORT = 3040;
const MONGO_DB_URI = 'mongodb://127.0.0.1:27017/edureka';
mongoose.connect(MONGO_DB_URI).then(()=> {
    console.log("db connected successfully");
    app.listen(PORT,()=>{
        console.log("server is running on port: ",PORT);
    }) 
}).catch(()=>{
    console.log(error);
})
