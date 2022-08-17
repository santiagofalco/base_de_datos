const socket = io()

let useremail;


const chatBox = document.getElementById('chatBox')
const mailInput = document.getElementById('mailInput');

mailInput.addEventListener('keyup', (e) => {
    if (e.key === 'Enter' && e.target.value.trim() !== "") {
        useremail = e.target.value
        mailInput.setAttribute('disabled', true)
        chatBox.removeAttribute('disabled')

    }
})

/* Listeners*/

chatBox.addEventListener('keyup', e => {
    if (e.key === 'Enter') {
        if (chatBox.value.trim().length > 0) {
            socket.emit('message', {
                email: useremail,
                message: chatBox.value,
                hour: new Date(new Date().getTime()).toLocaleDateString() + ' ' + new Date(new Date().getTime()).toLocaleTimeString()
            })
            chatBox.value = ''
        }
    }

})

/*Listener Recibir mensajes */

socket.on('mensajes', data => {
    let mensajes = document.getElementById('mensajes')
    let linea_mensaje = ''
    data.forEach(message => {
        linea_mensaje = linea_mensaje + `<b style="color:blue">${message.email}</b><p style="color:brown">[${message.hour}]</p><i style="color:green">${message.message}</i></br>`
    });
    mensajes.innerHTML = linea_mensaje
})