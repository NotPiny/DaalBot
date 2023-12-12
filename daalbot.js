const client = require('./client.js');
const config = require('./config.json');
const fs = require('fs');
const path = require('path');
const Discord = require('discord.js');
const cleanText = require('./util/homoglyphs.js');
require('dotenv').config();
const axios = require('axios');
const { EventEmitter } = require('events');

const serverAmount = client.guilds.cache.size

function findServerVanity(server) {
    if (client.guilds.cache.get(server) == undefined) {
        return "Server not found.";
    } else {
        if (client.guilds.cache.get(server)?.vanityURLCode) {
            return client.guilds.cache.get(server)?.vanityURLCode;
        } else {
            return `No vanity URL found for ${server}`;
        }
    }
}

function fetchServer(server) {
    if (client.guilds.cache.get(server) == undefined) {
        return "Server not found.";
    } else {
        return client.guilds.cache.get(server);
    }
}

function fetchServerName(server) {
    if (client.guilds.cache.get(server) == undefined) {
        return "Server not found.";
    } else {
        return client.guilds.cache.get(server).name;
    }
}

function fetchServerOwner(server) {
    if (client.guilds.cache.get(server) == undefined) {
        return "Server not found.";
    } else {
        return client.users.cache.get(client.guilds.cache.get(server).ownerID);
    }
}

function getRole(server, role) {
    if (client.guilds.cache.get(server) == undefined) {
        return "Server not found.";
    } else {
        if (client.guilds.cache.get(server).roles.cache.get(role)) {
            return client.guilds.cache.get(server).roles.cache.get(role);
        } else {
            return "Role not found.";
        }
    }
}

function getChannel(server, channel) {
    if (client.guilds.cache.get(server) == undefined) {
        return "Server not found.";
    } else {
        if (client.guilds.cache.get(server).channels.cache.get(channel)) {
            return client.guilds.cache.get(server).channels.cache.get(channel);
        } else {
            return "Channel not found.";
        }
    }
}

function getUser(user) {
    if (client.users.cache.get(user)) {
        return client.users.cache.get(user);
    } else {
        return "User not found.";
    }
}

function getMember(server, member) {
    if (client.guilds.cache.get(server) == undefined) {
        return "Server not found.";
    } else {
        if (client.guilds.cache.get(server).members.cache.get(member)) {
            return client.guilds.cache.get(server).members.cache.get(member);
        } else {
            return "Member not found.";
        }
    }
}
   
function db_mongo_warn_create(userId, guildId, staffId, reason) {
    const warnSchema = require('./models/warn-schema.js');
    warnSchema.create({
        userId: userId,
        guildId: guildId,
        staffId: staffId,
        reason: reason
    })
}

function db_mongo_warn_delete(id) {
    const warnSchema = require('./models/warn-schema.js');
    warnSchema.findByIdAndDelete(id).then(() => {
        return `Deleted warn with id "${id}"`;
    }).catch(() => {
        return `Failed to delete warn with id "${id}"`;
    })
}

function botLog(text) {
    client.channels.cache.find(channel => channel.id === config.Logchannel).send(text);
    console.log(text);
}

function config_get() {
    return config;
}

const warnings = {
    create: db_mongo_warn_create,
    delete: db_mongo_warn_delete
}

function betterFS_write(path, data) {
    if (fs.existsSync(path)) {
        fs.writeFileSync(path, data);
        return "Success";
    } else {
        fs.appendFileSync(path, data);
        return "Success";
    }
}

function betterFS_read(path) {
    if (fs.existsSync(path)) {
        return fs.readFileSync(path, 'utf8');
    } else {
        return "File not found.";
    }
}

async function getLogChannel(guild) {
    return getChannel(getLogChannelId(guild));
}

async function getLogChannelId(guild) {
    if (fs.existsSync(path.resolve(`./db/logging/${guild}/channel.id`))) {
        return fs.readFileSync(path.resolve(`./db/logging/${guild}/channel.id`), 'utf8');
    } else {
        return null;
    }
}

async function logEvent(guild, event, embed) {
    if (getLogChannelId(guild)) {
        const logChannel = await getLogChannel(guild);

        if (logChannel === 'Server not found.' || logChannel === 'Channel not found.' || logChannel == undefined) return;

        if (fs.existsSync(path.resolve(`./db/logging/${guild}/${event.toUpperCase()}.enabled`))) {
            if (fs.readFileSync(path.resolve(`./db/logging/${guild}/${event.toUpperCase()}.enabled`), 'utf8') == 'true') {
                logChannel?.send({
                    content: embed.title,
                    embeds: [embed]
                });
            } else return;
        } else return;
    } else return;
}

class DatabaseEntry {
    constructor({category, subcategory, entry, data}) {
        this.category = `${category}`;
        this.subcategory = `${subcategory ? subcategory : ''}`;
        this.entry = `${entry}`;

        this.path = `${config.botPath}/db/${category}/${subcategory !== '' ? `${subcategory}/` : ''}${entry}`;

        if (fs.existsSync(this.path)) {
            this.data = fs.readFileSync(this.path, 'utf8');
        } else {
            this.data = `${data}`;

            if (fs.existsSync(`${config.botPath}/db/${category}/${subcategory}`)) {
                fs.appendFileSync(this.path, this.data);
            } else {
                fs.mkdirSync(`${config.botPath}/db/${category}/${subcategory}`, { recursive: true });

                fs.appendFileSync(this.path, this.data);
            }
        }
    }

    modify(data) {
        fs.writeFileSync(this.path, data);
        this.data = data;
    }

    delete() {
        fs.unlinkSync(this.path);
        this.data = null;
    }
}

async function DatabaseSetChannel(guild, type, channel) {
    const filePath = path.resolve(`./db/config/${guild}/channels/${type}.id`);
    const fileDirectory = path.resolve(`./db/config/${guild}/channels`);

    if (!fs.existsSync(fileDirectory)) {
        fs.mkdirSync(fileDirectory, { recursive: true });
    }

    betterFS_write(filePath, channel);
}

async function DatabaseGetChannel(guild, type) {
    const filePath = path.resolve(`./db/config/${guild}/channels/${type}.id`);

    if (fs.existsSync(filePath)) {
        return betterFS_read(filePath);
    } else {
        return null;
    }
}

async function sendAlert(guild, embed, message) {
    const alertChannel = await DatabaseGetChannel(guild, 'alerts');

    if (alertChannel) {
        client.channels.cache.get(alertChannel).send({
            content: message ? message : null,
            embeds: [embed]
        });
    }
}

/**
 * @param {string} id
 */
async function API_get_user(id) {
    try {
        const response = await axios.get(`https://discord.com/api/v9/users/${id}`, {
            headers: {
                'Authorization': `Bot ${process.env.TOKEN}`
            }
        });

        return response.data;
    } catch (error) {
        return error;
    }
}

async function API_get_guild(id) {
    try {
        const response = await axios.get(`https://discord.com/api/v9/guilds/${id}`, {
            headers: {
                'Authorization': `Bot ${process.env.TOKEN}`
            }
        });

        return response.data;
    } catch (err) {
        return err;
    }
}

async function API_get_role(guild, id) {
    try {
        const response = await axios.get(`https://discord.com/api/v9/guilds/${guild}/roles/${id}`, {
            headers: {
                'Authorization': `Bot ${process.env.TOKEN}`
            }
        });

        return response.data;
    } catch (err) {
        return err;
    }
}

async function createPermanentImgLink(url) {
    try {
        const options = {
            method: 'POST',
            headers: {'content-type': 'multipart/form-data; boundary=---011000010111000001101001'},
        };

        const response = await axios.post(`https://api.imgbb.com/1/upload?key=${process.env.IMGBB_KEY}&image=${url}`, {
            headers: {}
        });

        return response.data.data.display_url;
    } catch (err) {
        console.log(err.response.data.error)
        return 'https://pinymedia.web.app/Error.png'
    }
}

function premiumActivateServer(guild, user) {
    /**
     * @type {{users: {id: string, boosts: number, servers_activated: number, servers: string[]}[], guilds: {id: string, activated_by: string}[]}}
    */
    const premiumJSON = JSON.parse(fs.readFileSync(path.resolve(`./db/premium.json`), 'utf8'));

    const premiumUser = premiumJSON.users.find(u => u.id === user);

    if (!premiumUser) {
        return 1;
    }

    if (premiumUser.servers_activated >= premiumUser.boosts) {
        return 2;
    }

    const premiumGuild = premiumJSON.guilds.find(g => g.id === guild);

    if (premiumGuild) {
        return 3;
    }

    premiumUser.servers_activated += 1;

    premiumJSON.guilds.push({
        id: guild,
        activated_by: user
    })

    premiumUser.servers.push(guild);

    fs.writeFileSync(path.resolve(`./db/premium.json`), JSON.stringify(premiumJSON, null, 4));

    return 0;
}

function premiumDeactivateServer(guild, user) {
    /**
     * @type {{users: {id: string, boosts: number, servers_activated: number, servers: string[]}[], guilds: {id: string, activated_by: string}[]}}
    */
    const premiumJSON = JSON.parse(fs.readFileSync(path.resolve(`./db/premium.json`), 'utf8'));

    const premiumUser = premiumJSON.users.find(u => u.id === user);

    if (!premiumUser) {
        return 1;
    }

    const premiumGuild = premiumJSON.guilds.find(g => g.id === guild);

    if (!premiumGuild) {
        return 2;
    }

    if (premiumGuild.activated_by !== user) {
        return 3;
    }

    premiumUser.servers_activated -= 1;

    premiumJSON.guilds.splice(premiumJSON.guilds.indexOf(premiumGuild), 1);

    premiumUser.servers.splice(premiumUser.servers.indexOf(guild), 1);

    fs.writeFileSync(path.resolve(`./db/premium.json`), JSON.stringify(premiumJSON, null, 4));

    return 0;
}

function premiumIsServerActivated(guild) {
    /**
     * @type {{users: {id: string, boosts: number, servers_activated: number, servers: string[]}[], guilds: {id: string, activated_by: string}[]}}
    */
    const premiumJSON = JSON.parse(fs.readFileSync(path.resolve(`./db/premium.json`), 'utf8'));

    const premiumGuild = premiumJSON.guilds.find(g => g.id === guild);

    if (!premiumGuild) {
        return false;
    }

    return true;
}

const timestampEvents = new EventEmitter();

// Constantly emit the current timestamp so that other files can set up listeners for a timestamp they need and get a callback when it happens
// Tick every 100ms (10tps)
setInterval(() => {
    timestampEvents.emit(Date.now())
}, 100);

const premium = {
    activateServer: premiumActivateServer,
    deactivateServer: premiumDeactivateServer,
    isServerActivated: premiumIsServerActivated
}

const images = {
    createPermLink: createPermanentImgLink,
}

const text = {
    cleanHomoglyphs: cleanText,
}

const better_fs = {
    write: betterFS_write,
    read: betterFS_read
}

const db = {
    setChannel: DatabaseSetChannel,
    getChannel: DatabaseGetChannel
}

const guilds = {
    sendAlert
}

const api = {
    discord: {
        getUser: API_get_user,
        getGuild: API_get_guild,
        getRole: API_get_role
    }
}

const colours = {
    daalbot_purple: '#502898'
}

module.exports = {
    client,
    serverAmount,
    warnings,
    text,
    fs: better_fs,
    db,
    guilds,
    DJS: Discord,
    images,
    colours,
    premium,
    timestampEvents,
    findServerVanity,
    fetchServer,
    fetchServerName,
    fetchServerOwner,
    getRole,
    getChannel,
    getUser,
    getMember,
    log: botLog,
    config: config_get,
    getLogChannel,
    getLogChannelId,
    logEvent,
    api,
    embed: Discord.EmbedBuilder,
    DatabaseEntry
}