const serverAmountElement = document.getElementById('serverAmount');

(async () => {
    try {
        const serverAmount = await fetch({
            method: 'GET',
            url: 'https://api.daalbot.xyz/get/general/serverAmount',
            mode: 'no-cors',
            port: 80,
        }).serverAmount;
        serverAmountElement.innerHTML = `<b>${serverAmount}</b>`;
    } catch {
        serverAmountElement.innerHTML = `<b>ERROR</b>`;
    }
})();