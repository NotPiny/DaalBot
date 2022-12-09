window.onload = function () {
    const hasnumbers = new RegExp('[0-9]');
    if (localStorage.getItem('uid').match(hasnumbers)) {
        console.log(`User is logged in`);
        window.location.replace(`http://daalbot.xyz/Dashboard/Main`)
    } else {
        console.log(`User is not logged in`);
        window.location.replace(`https://daalbot.xyz/Dashboard/Login`);
    }
}