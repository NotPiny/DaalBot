const filePath = '/home/piny/.pm2/logs/Discord-error.log';
const fs = require('fs');

const fileData = fs.readFileSync(filePath, 'utf8');

const purgedLines = [
    '(node:194551) MaxListenersExceededWarning: Possible EventEmitter memory leak detected. 11 messageCreate listeners added to [Client]. Use emitter.setMaxListeners() to increase limit',
    '(Use `node --trace-warnings ...` to show where the warning was created)',
    '(node:194551) MaxListenersExceededWarning: Possible EventEmitter memory leak detected. 11 interactionCreate listeners added to [Client]. Use emitter.setMaxListeners() to increase limit'
];

let cleaned = fileData;

purgedLines.forEach(line => {
    cleaned = cleaned.replace(line, '');

    fs.writeFileSync(filePath, cleaned);
    console.log('Cleaned error logs');
});