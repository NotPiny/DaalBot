module.exports = {
    category: 'Help',
    description: 'Brings up a list of commands',
  
    slash: 'both',
    testOnly: false,
  
    callback: () => {
      return `Dev: \n /Shutdown, /Status, /Pensend, /Pendit \n Admin: \n /send, /cc, /Kick, /Ban \n User: \n /Cmds, /CrashTest, %Test, /TestBot, /DateTime, /BotInfo, :P (Activates when ":P" is located at the end of a message), Don't quote me on this (Activate when "Don't quote me on this" is located at the end of a message), /Hello, /Site, /Invite \n For more info visit https://daalbot-a.web.app/Commands`
    },
  }