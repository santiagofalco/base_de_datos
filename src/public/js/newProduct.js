let productForm = document.getElementById('productForm');

const handleSubmit = (e, form, route) => {
    e.preventDefault();
    let formData = new FormData(form);
    let obj = {};
    formData.forEach((value, key) => obj[key] = value);
    fetch(route, {
        method: 'POST',
        body: JSON.stringify(obj),
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(res => res.json()).then(json => console.log(json))
}
productForm.addEventListener('submit', (e) => handleSubmit(e, e.target, '/'))


socket.on('productList', data => {
    let noProductMsg = document.getElementById('noProductMessage')
    if (noProductMsg) {
        noProductMsg.remove()
    }
    let productoItem = document.getElementById('tabla')
    let tbody = productoItem.getElementsByTagName('tbody')[0]
    let content = tbody.innerHTML
    tbody.innerHTML = content+ `<tr><td>${data.name}</td><td>${data.price}</td><td><img class="imagen" src="${data.thumbnail}"></td></tr>`
})
