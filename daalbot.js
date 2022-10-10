// This file is here to make gathering data from the client easier.
// It is not meant to be run on its own, but rather to be included in other files.

const client = require('./client.js');


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

module.exports = {
    client,
    serverAmount,
    findServerVanity,
    fetchServer,
    fetchServerName,
    fetchServerOwner,
    getRole,
    getChannel,
    getUser,
}