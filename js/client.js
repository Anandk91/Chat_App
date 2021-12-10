const socket = io('http://localhost:8000');

const form = document.getElementById('send-container');
const messageInput = document.getElementById('messageInp')
const messageContainer = document.querySelector(".container");

var audio = new Audio('ting.mp3');

const append = (message, position)=>{
  const messageElement = document.createElement('div');
  messageElement.innerText = message;
  messageElement.classList.add('message');
  messageElement.classList.add(position);
  messageContainer.append(messageElement);

//   var div = $(".container");
//   div.scrollTop(div.prop('scrollHeight'));

  if(position!='right' && position!='cen'){
    audio.play();
  }
}

form.addEventListener('submit', (e)=>{
    e.preventDefault();
    const message = messageInput.value;
    append(`You: ${message}`, 'right');
    socket.emit('send', message);
    messageInput.value = '';
})

const nam = prompt("Enter your name to join");
socket.emit('new-user-joined', nam);

socket.on('user-joined', name=>{
  append(`${name}: joined the chat`, 'cen')
});

socket.on('recieve', data=>{
  append(`${data.name}: ${data.message}`, 'left')
});

socket.on('left', name=>{
  append(`${name} left the chat`, 'cen');
})
