const config = require('./config.json');
require('./legacy/launch.js'); 
require('./logs.js');
// require('./localhost/launch');
require('./XP/message.js');
require('./custom/launch.js');
require('./automod/automod.js');
require('./vortex/vortex.js');
require('./buttons/ticket.js');
require('./logging/load.js');
require('./db-setup.js');
require('./events/join.js');
require('./events/messageCreate.js');
// require('./heartbeat.js');
// setTimeout(() => {
//     require('child_process').exec(`start "" "${config.botPath}\\Batch/pulse.bat"`); // Opens a new process so it doesn't go down with the main process
// }, 1000 * 3); // Starts pulse after 3 seconds to make sure that heartbeat is running first
require('./hidden/launch.js');
require('./interactions/load.js');
require('./events/channelCreate.js');
require('./V14/index.js')