const form = document.getElementById('form');
const textarea = document.getElementById('text');

form.addEventListener('submit', (event) => {
    event.preventDefault();
    const text = `${textarea.value}`;

    console.log(text)

    // Replace all newlines with "<nl>"
    const newText = text.replace(/\r?\n|\r/g, '<nl>');

    console.log(newText)

    document.getElementById('output').innerText = `Result: ${newText}`;
})