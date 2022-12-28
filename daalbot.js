// This file is here to make gathering data from the client easier.
// It is not meant to be run on its own, but rather to be included in other files.

const client = require('./client.js');
const config = require('./config.json');
const fs = require('fs');
const path = require('path');
const Discord = require('discord.js');
const cleanText = require('./util/homoglyphs.js');

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
   
function db_read(category, subcategory, entry) {
    if (category) {
        if (subcategory) {
            if (entry) {
                return fs.readFileSync(`${config.botPath}/db/${category}/${subcategory}/${entry}`, 'utf8');
            } else {
                return fs.readdirSync(`${config.botPath}/db/${category}/${subcategory}`);
            }
        } else {
            if (entry) {
                return fs.readFileSync(`${config.botPath}/db/${category}/${entry}`, 'utf8');
            } else {
                return fs.readdirSync(`${config.botPath}/db/${category}`);
            }
        }
    } else {
        return fs.readdirSync(`${config.botPath}/db`);
    }
}

function db_write(category, subcategory, entry, data) {
    try {
    if (category) {
        if (subcategory) {
            if (entry) {
                if (fs.existsSync(`${config.botPath}/db/${category}/${subcategory}/${entry}`)) {
                fs.writeFileSync(`${config.botPath}/db/${category}/${subcategory}/${entry}`, data);
                } else {
                    fs.appendFileSync(`${config.botPath}/db/${category}/${subcategory}/${entry}`, data);
                }
            } else {
                fs.mkdirSync(`${config.botPath}/db/${category}/${subcategory}`);
            }
        } else {
            if (entry) {
                fs.writeFileSync(`${config.botPath}/db/${category}/${entry}`, data);
            } else {
                fs.mkdirSync(`${config.botPath}/db/${category}`);
            }
        }
    } else {
        return "No category specified.";
    }
} catch {
    return "An error occured.";
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

const database = {
    read: db_read,
    write: db_write
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

class DatabaseEntry {
    constructor(name, category, server, data, fileName) {
        this.name = name;
        this.data = data;
        this.category = category;
        this.server = server;
        this.fileName = fileName;
    }

    save(upsert) {
        let entryPath = path.resolve(`./db/${this.category}`)
        if (this.category) {
            if (this.server) {
                entryPath += `/${this.server}`
            }

            if (this.fileName) {
                entryPath += `/${this.fileName}`
            } else {
                return 'Error > A file name must be specified.'
            }

            if (!upsert && fs.existsSync(entryPath)) {
                return 'Error > Entry already exists.'
            }

            betterFS_write(entryPath, this.data)
            this.entryPath = entryPath

            if (config.debug) console.log(`Saved database entry ${this.category}/${this.server ? this.server + '/' : ''}${this.fileName}`);
            return 1;
        } else {
            if (config.debug) console.log(`Failed to save database entry ${this.category}/${this.server ? this.server + '/' : ''}${this.fileName} (no category specified)`);
            return 'Error > A category must be specified.';
        }
    }

    async delete() {
        if (this.entryPath) {
            try {
                fs.unlinkSync(this.entryPath)
                if (config.debug) console.log(`Deleted database entry ${this.category}/${this.server ? this.server + '/' : ''}${this.fileName}`);
                return 1;
            } catch {
                if (config.debug) console.log(`Failed to delete database entry ${this.category}/${this.server ? this.server + '/' : ''}${this.fileName}`);
                return 0;
            }
        } else {
            if (config.debug) console.log(`Failed to delete database entry ${this.category}/${this.server ? this.server + '/' : ''}${this.fileName} (no entry path)`);
            return 404;
        }
    }
}

const text = {
    cleanHomoglyphs: cleanText,
}

const better_fs = {
    write: betterFS_write,
    read: betterFS_read
}

module.exports = {
    client,
    serverAmount,
    database,
    warnings,
    fs: better_fs,
    text,
    embed: Discord.MessageEmbed,
    findServerVanity,
    fetchServer,
    fetchServerName,
    fetchServerOwner,
    getRole,
    getChannel,
    getUser,
    getMember,
    log: botLog,
    DatabaseEntry
}