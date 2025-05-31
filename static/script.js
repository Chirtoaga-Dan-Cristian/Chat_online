const socket = io({
    auth:{
        cookie: document.cookie
    }
});
const form = document.getElementById('form');
const input = document.getElementById('input');
const messages = document.getElementById('messages');
const logout = document.getElementById('logout');

logout.addEventListener('click', (e)=>{
    document.cookie = 'token=; Max-Age=0';
    location.assign('/login');
});

socket.on('all_messages', function(msgArray){
    msgArray.forEach(msg=>{
        let item = document.createElement('li');
        item.textContent = msg.login +': '+ msg.content;
        messages.appendChild(item);
    });
    window.scrollTo(0, document.body.scrollHeight);
});

form.addEventListener('submit', function(e){
    e.preventDefault();
    if(input.value){
        socket.emit('new_message', input.value);
        input.value = '';
    }
});

socket.on('message', function(msg){
    let item = document.createElement('li');
    item.textContent = msg;
    messages.appendChild(item);
    window.scrollTo(0,document.body.scrollHeight);
});

// function changeNickname(){
//     let nickname = prompt('Introduceti un nickname:');
//     if(nickname){
//         socket.emit('set_nickname',nickname);
//     }
// }

// changeNickname();