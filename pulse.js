const execSync = require('child_process').execSync;
require('dotenv').config();

const port = 7284 || process.env.PORT;

const check = () => {
    try {
        /**
         * Check if the server is running because if the server is not running it means that the main process is not running anymore
         * if the main process is not running anymore then we need to start a new process
         * 
         * (If you find a better way to do this or find a bug please let me know: Piny#1000)
         */
        const response = execSync(`curl http://localhost:${port}/daalbot/heartbeat`).toString();
        if (response.includes('I am alive')) {
            console.log('Pulse > Success');
        }
    } catch {
        console.log(`Pulse > Encountered an error, assuming that the main process is not running anymore, starting a new process`);
        execSync('start ./Batch/start.bat');
        process.exit(1);
    }
}

setInterval(check, 1000 * 5); // Checks every 5 seconds