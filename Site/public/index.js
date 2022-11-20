const ServerAmountElement = document.getElementById('serverAmount');

const API = 'http://178.62.73.54:3000/api';

if (ServerAmountElement) {
    const serverAmount = fetch(`${API}/get/general/serverAmount`)
        .then(res => res.json())
        .then((data) => {
            console.log(data);
            ServerAmountElement.innerText = data.serverAmount.toString();
        })
}