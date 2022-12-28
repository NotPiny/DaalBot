const serverAmountElement = document.getElementById('serverAmount');

function updateServerAmount() {
  fetch('https://api.daalbot.xyz/get/general/serverAmount', {
    mode: 'cors',
    method: 'GET',
  })
    .then(async(response) => {
      const data = await response.text();
      serverAmountElement.innerText = data;
    })
}

updateServerAmount();