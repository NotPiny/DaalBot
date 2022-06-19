module.exports = {
    category: 'Help',
    description: 'Brings up a list of commands',
  
    slash: true,
    testOnly: false,
  
    callback: () => {
      return `Dev: \n /Shutdown, /Status \n Admin: \n /send, /clear, /Kick, /Ban \n User: \n $Cmds, /CrashTest, $DevCheck, %Test, /TestBot, /DateTime, $PingMe, $UserInfo, /BotInfo, :P (Activates when ":P" is located at the end of a message), /Help, Don't quote me on this (Activate when "Don't quote me on this" is located at the end of a message), /Hello, /Site, /Invite`
    },
  }