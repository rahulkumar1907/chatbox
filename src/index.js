const express = require('express');
const bodyParser = require('body-parser');
const route = require('./routes/route.js');
const { default: mongoose } = require('mongoose');
// const app = express();
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
io.on('connection', () =>{
    console.log('a user is connected')
  })

mongoose.connect("mongodb+srv://gautamku1122:Sae755%40gautam@gautam.p4ovs.mongodb.net/chatboxDatabase", {
    useNewUrlParser: true
})
.then( () => console.log("MongoDb is connected"))
.catch ( err => console.log(err) )


app.use('/', route)


app.listen(process.env.PORT || 4000, function () {
    console.log('Express app running on port ' + (process.env.PORT || 4000))
});
