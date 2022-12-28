// This file is designed to create the database when the bot is launched if it does nto already exist

const fs = require('fs');

if (!fs.existsSync('./db')) {
    fs.mkdirSync('./db');
    console.log('Database > Created database folder');
}

if (!fs.existsSync('./db/welcome')) {
    fs.mkdirSync('./db/welcome');
    console.log('Database > Created welcome folder');
}

if (!fs.existsSync('./db/logging')) {
    fs.mkdirSync('./db/logging');
    console.log('Database > Created logging folder');
}

if (!fs.existsSync('./db/xp')) {
    fs.mkdirSync('./db/xp');
    console.log('Database > Created xp folder');
}

if (!fs.existsSync('./db/verify')) {
    fs.mkdirSync('./db/verify');
    console.log('Database > Created verify folder');
}

if (!fs.existsSync('./db/tickets')) {
    fs.mkdirSync('./db/tickets');
    console.log('Database > Created tickets folder');
}

if (!fs.existsSync('./db/autorole')) {
    fs.mkdirSync('./db/autorole');
    console.log('Database > Created autorole folder');
}