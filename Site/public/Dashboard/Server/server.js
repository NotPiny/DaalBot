const options = [
    {
        value: '1',
        path: './Roles',
    },
]

// Get "option" from the url string
const option = window.location.href.split('/')[window.location.href.split('/').length - 1].replace('?option=', '')

// Check if the option exists in the url
if (option === '') {
    return; // User has not selected an option yet
}

// Check that the option exists in the options array
if (!options.find((item) => item.value === option)) {
    alert('Invalid option');
    return;
}

// Get the path from the options array
const path = options.find((item) => item.value === option).path;

// Load the path
window.location.href = path;