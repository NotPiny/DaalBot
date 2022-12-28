const loginButton = document.getElementById('login');

loginButton.addEventListener('click', () => {
    localStorage.setItem('uid', 'sampleU1D');
    console.log(localStorage.getItem('uid'));
    alert(`You have been logged in!`);
})