// node server which will handle soclket to connection
const io =require("socket.io")(8000)

const users ={}

// if any new user joined we call it let other user connected to the server know
io.on('connection', socket =>{
    socket.on('new-user-joined', name =>{
        // console.log("new user", name);
       users[socket.id]=name;
       socket.broadcast.emit('user-joined', name);
    });

    // if somesone send a message , brodcast it to other people
    socket.on('send', message =>{
        socket.broadcast.emit('receive',{message:message,name: users[socket.id]})
    });
    // if some leves the chat let other know
        socket.on('disconnect', message =>{
            socket.broadcast.emit('left',users[socket.id]);
            delete users[socket.id];
        
    
    });

})