const socket =io('http://localhost:8000');

// get  dom elements in a respective js variable
const form =document.getElementById('send-container');
const messageInput=document.getElementById('messageInp');
const  messageContainer =document.querySelector('.container')
// audio that will play on receving messages
var audio =new Audio('ting.mp3');

// function which will append info to the container
const append = (message,position)=>{
    const messageElement =document.createElement('div');
    messageElement.innerText =message;
    messageElement.classList.add('message');
    messageElement.classList.add(position);
    messageContainer.append(messageElement);
    if(position =='left'){
    audio.play();
}
}

// ask new user for his name
const name =prompt("enter your name to join");
socket.emit('new-user-joined', name);
// if a new user joined received event from the server 
socket.on('user-joined', name=>{
append(`${name}: joiend the chat`,'right')
})
// if  server send message received it
socket.on('receive', data=>{
    append(`${data.name}: ${data.message}`,'left')
    })
// if user leves the chat append the info to the container
    socket.on('left', name=>{
        append(`${name}: left the chat`,'right')
        });
// if the form submitted send the server mwssage
        form.addEventListener('submit',(e)=>{
            e.preventDefault();
            const message=messageInput.value
            append(`you: ${message}`,'right');
            socket.emit('send',message);
            messageInput.value='';
        })