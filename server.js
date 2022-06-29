const express = require('express');
const mongoose =require('mongoose');
const bodyParser =require('body-parser');
const fileUpload =require("express-fileupload");
const morgan =require("morgan");
const cors =require("cors");
const path = require('path');

const app =express();
const users = require("./routes/api/users");
const blogs =require("./routes/api/blogs");

//bodyparser middleware
app.use(bodyParser.json());

//for cross origin sharing 
app.use(cors());

// enable files upload
app.use(fileUpload({
    createParentPath: true
}));

app.use(morgan('dev'));

//DB config
const db =require("./config/keys").mongoURI;
mongoose.connect(db)
    .then(()=>console.log("Connected..."))
    .catch(err => console.log(err));

app.use('/api/users', users);
app.use('/api/blogs', blogs);

app.use(express.static(path.join(__dirname+'/client/', 'build')));

app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname+'/client/', 'build', 'index.html'));
});


const port = process.env.PORT || 8000;

app.listen(port,() => console.log(`Server Started on port ${port}`))