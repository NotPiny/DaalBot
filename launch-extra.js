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
require('./social/twitch.js')

// Automations
require('./automations/events.js')