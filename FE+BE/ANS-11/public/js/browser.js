const form = document.querySelector('#form-info')
const name = document.querySelector('#name')
const email = document.querySelector('#email')
const password = document.querySelector('#password')

const sendData = (e) => {
    e.preventDefault()

    const userData = {
        name: name.value,
        email: email.value,
        password: password.value
    }
    axios.post('/userSignup', userData)   
     
    name.value = ''
    email.value = ''
    password.value = ''
}

document.querySelector('.btn').addEventListener('submit', (e) => sendData(e))