const NeverGonnaL = `We're no strangers to love \nYou know the rules and so do I (do I) \nA full commitment's what I'm thinking of \nYou wouldn't get this from any other guy \nI just wanna tell you how I'm feeling \nGotta make you understand \nNever gonna give you up \nNever gonna let you down \nNever gonna run around and desert you \nNever gonna make you cry \nNever gonna say goodbye \nNever gonna tell a lie and hurt you \nWe've known each other for so long \nYour heart's been aching, but you're too shy to say it (say it) \nInside, we both know what's been going on (going on) \nWe know the game and we're gonna play it \nAnd if you ask me how I'm feeling \nDon't tell me you're too blind to see \nNever gonna give you up \nNever gonna let you down \nNever gonna run around and desert you \nNever gonna make you cry \nNever gonna say goodbye \nNever gonna tell a lie and hurt you \nNever gonna give you up \nNever gonna let you down \nNever gonna run around and desert you \nNever gonna make you cry \nNever gonna say goodbye \nNever gonna tell a lie and hurt you \nWe've known each other for so long \nYour heart's been aching, but you're too shy to say it (to say it) \nInside, we both know what's been going on (going on) \nWe know the game and we're gonna play it \nI just wanna tell you how I'm feeling \nGotta make you understand \nNever gonna give you up \nNever gonna let you down \nNever gonna run around and desert you \nNever gonna make you cry \nNever gonna say goodbye \nNever gonna tell a lie and hurt you \nNever gonna give you up \nNever gonna let you down \nNever gonna run around and desert you \nNever gonna make you cry \nNever gonna say goodbye \nNever gonna tell a lie and hurt you \nNever gonna give you up \nNever gonna let you down \nNever gonna run around and desert you \nNever gonna make you cry \nNever gonna say goodbye \nNever gonna tell a lie and hurt you`
module.exports = {
    category: 'Pen',
    description: 'Only Pens can run this secret command',
  
    slash: 'both',
    testOnly: false,

    ownerOnly: true,
  
    callback: () => {
      return NeverGonnaL
      
      
    },
  }