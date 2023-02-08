if (localStorage.getItem('userSecret') === null) {
    window.location.href = '/Dashboard/Login';
} else {
    window.location.href = '/Dashboard/Select';
}