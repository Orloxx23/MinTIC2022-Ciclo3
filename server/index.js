const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const { Server } = require("socket.io");

const app = express();
const io = new Server({
    cors: {
        origin: "http://localhost:3000"
    }
});


dotenv.config();
mongoose.connect(process.env.MONGO_URL)
    .then(() => console.log("DB Connection Successfull!"))
    .catch((error) => {
        console.log(error);
    });

// Settings
app.set('port', process.env.PORT || 8800);

// Middlewares
app.use(morgan('dev'));
app.use(express.json());
app.use(cors());

// Routes
app.use('/api/sells', require('./routes/sells'));
app.use('/api/products', require('./routes/products'));
app.use('/api/users', require('./routes/users'));
app.use('/api/auth', require('./routes/auth'));

// Static files


// Starting the server
app.listen(app.get('port'), () => {
    console.log(`Server on port ${app.get('port')}`);
})

// Socket io

let onlineUsers = [];

const addNewUser = (email, socketId) => {
    !onlineUsers.some(user => user.email === email) && onlineUsers.push(email, socketId);
}

const removeUser = (socketId) => {
    onlineUsers = onlineUsers.filter(user => user.socketId !== socketId);
}

const getUser = (email) => {
    return onlineUsers.find(user => user.email === email);
}

io.on("connection", (socket) => {
    console.log("User " + socket.id + " connected")

    //io.emit("Notification", "Nuevo usuario");

    socket.on("newUser", (email) => {
        addNewUser(email, socket.id);
        console.log(email, socket.id);
    })

    socket.on("disconnect", () => {
        removeUser(socket.id);
    })
});

io.listen(5000);