const DiscordOauth2 = require("discord-oauth2");
const oauth = new DiscordOauth2();

const access_token = "";

(async () => {
    const user = await oauth.getUser(access_token);
    console.log(user);
})();