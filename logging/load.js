// Channels
require('./events/channelCreate.js');
require('./events/channelDelete.js');
require('./events/channelUpdate.js');

// Bans
require('./events/guildBanAdd.js');
require('./events/guildBanDelete.js');

// Members
require('./events/guildMemberAdd.js');
require('./events/guildMemberRemove.js');
require('./events/guildMemberUpdate.js');

// Messages
require('./events/messageDelete.js');
require('./events/messageDeleteBulk.js');
require('./events/messageUpdate.js');

// Roles
require('./events/roleCreate.js');
require('./events/roleDelete.js');
require('./events/roleUpdate.js');