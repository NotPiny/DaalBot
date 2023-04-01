function logout() {
    localStorage.removeItem('userSecret');
    localStorage.removeItem('userId');
    window.location.href = '/Dashboard/Login';
}

function showUserSecret() {
    // Create a confirmation dialog
    const confirmation = confirm('Are you sure you want to show your user secret? Your user secret is the password your account uses to communicate with the DaalBot API. If you show your user secret to someone, they will be able to access your account and do anything you can do. If you are not sure what this means, do not show your user secret to anyone. If you are sure you want to show your user secret, click OK.');

    if (confirmation) {
        // Show the user secret
        alert(localStorage.getItem('userSecret'));
    }
}