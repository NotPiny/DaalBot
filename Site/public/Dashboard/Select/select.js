if (localStorage.getItem('userSecret') === null) {
    window.location.href = '/Dashboard/Login';
} else {
    // User is logged in
    // Use the userSecret to get the user's servers
    
    (async () => {
        const response = await fetch(`https://api.daalbot.xyz/get/users/servers?id=${localStorage.getItem('userId')}`, {
            method: 'GET',
            mode: 'cors',

            headers: {
                secret: localStorage.getItem('userSecret')
            }
        })

        if (response.status == 200) {
            // Request was successful
            const data = await response.json();
            const servers = data.servers;

            const serverListElement = document.getElementById('server-list');

            servers.forEach(server => {
                serverListElement.innerHTML += `<div><b>${server.name.length > 18 ? `${server.name.substring(0, 15)}...` : server.name}</b><br/><image src=${server.icon == null ? '"https://pinymedia.web.app/daalbot/embed/thumbnail/logs/Guild.png"  style="height: 128px; width: 128px;"' : server.icon}><br/><br/><button onclick="window.location.href = '/Dashboard/Server?id=${server.id}'" class="manage-button">Manage</button></div>`
            });
        }
    })();
}