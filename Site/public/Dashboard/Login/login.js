const formElement = document.getElementById('form')
const idElement = document.getElementById('id')
const passwordElement = document.getElementById('password')

formElement.addEventListener('submit', async(event) => {
    event.preventDefault()
    
    const id = idElement.value
    const password = passwordElement.value

    const response = await fetch('https://api.daalbot.xyz/get/users/secret', {
        method: 'GET',
        mode: 'cors',

        headers: {
            id: id,
            password: password
        }
    })

    const data = await response.json()

    if (data.code == 200) {
        localStorage.setItem('userSecret', data.secret)
        localStorage.setItem('userId', id)

        window.location.href = '/Dashboard/Select'
    } else {
        console.log(data)
    }
})