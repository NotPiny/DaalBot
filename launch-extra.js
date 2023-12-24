const config = require('./config.json');
require('./legacy/launch.js'); 
require('./logs.js');
// require('./localhost/launch');
require('./XP/message.js');
require('./XP/levelupmessagebutton.js');
require('./custom/launch.js');
require('./automod/automod.js');
require('./vortex/vortex.js');
require('./buttons/ticket.js');
require('./logging/load.js');
require('./db-setup.js');
require('./events/join.js');
require('./events/messageCreate.js');
require('./interactions/load.js');
require('./events/channelCreate.js');
require('./V14/index.js')

// Premium
// require('./premium/boostdetection.js');
// require('./premium/activateserverpanel.js');

// Social links
require('./social/twitch.js');
require('./social/twitter.js'); // (unreliable due to having to scrape data from html)
require('./social/youtube.js');

// Monitoring
require('./monitoring/monitor.js');

// Modals
require('./modals/handler.js');

// Automations
require('./automations/launch.js');

// Internal server
require('./Server/index.js');

// Updates
require('./updates/files.js');

// Buttons
require('./buttons/handler.js');

// Dropdowns
require('./dropdown/handler.js');

// Context menus
require('./context/handler.js');