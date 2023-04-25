// This file is designed to create the database when the bot is launched if it does nto already exist

const fs = require('fs');

if (!fs.existsSync('./db')) {
    fs.mkdirSync('./db');
    console.log('✅ Created database folder');
}

if (!fs.existsSync('./db/welcome')) {
    fs.mkdirSync('./db/welcome');
    console.log('✅ Created welcome folder');
}

if (!fs.existsSync('./db/logging')) {
    fs.mkdirSync('./db/logging');
    console.log('✅ Created logging folder');
}

if (!fs.existsSync('./db/xp')) {
    fs.mkdirSync('./db/xp');
    console.log('✅ Created xp folder');
}

if (!fs.existsSync('./db/verify')) {
    fs.mkdirSync('./db/verify');
    console.log('✅ Created verify folder');
}

if (!fs.existsSync('./db/tickets')) {
    fs.mkdirSync('./db/tickets');
    console.log('✅ Created tickets folder');
}

if (!fs.existsSync('./db/autorole')) {
    fs.mkdirSync('./db/autorole');
    console.log('✅ Created autorole folder');
}