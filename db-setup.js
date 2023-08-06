// This file is designed to create the database when the bot is launched if it does nto already exist

const fs = require('fs');

if (!fs.existsSync('./db')) {
    fs.mkdirSync('./db');
    console.log('✅ Created database folder');
} else {
    console.log('✅ Database folder already exists');
}

if (!fs.existsSync('./db/welcome')) {
    fs.mkdirSync('./db/welcome');
    console.log('✅ Created welcome folder');
} else {
    console.log('✅ Welcome folder already exists');
}

if (!fs.existsSync('./db/logging')) {
    fs.mkdirSync('./db/logging');
    console.log('✅ Created logging folder');
} else {
    console.log('✅ Logging folder already exists');
}

if (!fs.existsSync('./db/xp')) {
    fs.mkdirSync('./db/xp');
    console.log('✅ Created xp folder');
} else {
    console.log('✅ XP folder already exists');
}

if (!fs.existsSync('./db/verify')) {
    fs.mkdirSync('./db/verify');
    console.log('✅ Created verify folder');
} else {
    console.log('✅ Verify folder already exists');
}

if (!fs.existsSync('./db/tickets')) {
    fs.mkdirSync('./db/tickets');
    console.log('✅ Created tickets folder');
} else {
    console.log('✅ Tickets folder already exists');
}

if (!fs.existsSync('./db/autorole')) {
    fs.mkdirSync('./db/autorole');
    console.log('✅ Created autorole folder');
} else {
    console.log('✅ Autorole folder already exists');
}