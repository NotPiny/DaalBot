// Code inside of this file is executed on every page of the site.

function main() {
    // This function is here to initialize some things and load other scripts.
    oldURLCheck();
    guide();
}

async function oldURLCheck() {
    // This function is here to check if the user is on an old URL and redirect them to the new one.
    if (window.location.hostname == 'daalbot-a.web.app') {
        window.location.replace(`https://daalbot.xyz${window.location.pathname.startsWith('/') ? window.location.pathname : `/${window.location.pathname}`}`);
    }
}

function isFirstTime() {
    // This function is here to check if the user is on the site for the first time.
    if (localStorage.getItem('firstTime') == null) {
        localStorage.setItem('firstTime', 'false');
        return true;
    } else {
        return false;
    }
}

function guide() {
    // This function is here to show the user a guide on how to use the site.
    if (isFirstTime()) {
        const answer = confirm('Welcome to DaalBot! Would you like to see a quick run-through of what DaalBot is and how to use it?');
        
        if (answer) {
            window.location.replace('/Welcome');
        } else {
            return;
        }
    }
}

main();