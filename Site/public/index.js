// const ServerAmountElement = document.getElementById('serverAmount');

// const API = 'https://api.daalbot.xyz:3000/api';

// if (ServerAmountElement) {
//     (async() => {
//         try {
//         const serverAmount = fetch(`${API}/get/general/serverAmount`)
//         .then(res => res.json())
//         .then((data) => {
//             console.log(data);
//             ServerAmountElement.innerText = data.serverAmount.toString();
//         })
//     } catch {
//         console.log('Error: Could not fetch server amount');
//     }
//     })();   
// }

// const unknownServers = document.getElementById('unknownServers');

// if (unknownServers) {
//     unknownServers.addEventListener('click', () => {
//         (() => {
//             const serverAmount = fetch(`${API}/get/general/serverAmount`)
//             .then(res => res.json())
//             .then((data) => {
//                 console.log(data);
//                 ServerAmountElement.innerText = data.serverAmount.toString();
//             })
//             .catch((err) => {
//                 console.log('Error: Could not fetch server amount');
//                 alert(`Error: Could not fetch server amount

// Details: 
// ${err}`);
//             })
//     })();
//   })
// }