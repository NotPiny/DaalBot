const serverAmountElement = document.getElementById('serverAmount');

function updateServerAmount() {
  fetch('https://api.daalbot.xyz/get/general/serverAmount', {
    mode: 'no-cors'
  })
    .then(async(response) => {
        const data = await response.text();
        console.log(data);
        serverAmountElement.innerText = data;
    })
}

updateServerAmount();