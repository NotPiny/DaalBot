const fs = require('fs')
const path = require('path')
const daalbot = require('../../daalbot.js')

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

async function wait(seconds) {
    return new Promise(resolve => setTimeout(resolve, seconds * 1000))
}

function win(member) {
    const currentXP = parseInt(daalbot.fs.read(path.resolve(`./db/xp/${member.guild.id}/${member.id}.xp`)))

    daalbot.fs.write(path.resolve(`./db/xp/${member.guild.id}/${member.id}.xp`), `${currentXP + 125}`)
}

module.exports = {
    name: 'guess',
    description: 'Guess a number between 1 and 100 and win xp',
    category: 'Games',

    slash: true,

    callback: async ({ interaction }) => {
        const number = getRandomInt(100)
        const filter = m => m.author.id === interaction.user.id

        const startingmessage = await interaction.reply({ content: `You will have to guess a number from 1-100 you have 5 chances (starts <t:${Math.floor((Date.now() + (10 * 1000)) / 1000)}:R>)` })
        const gameChannel = daalbot.getChannel(interaction.guild.id, interaction.channel.id)

        if (gameChannel === 'Channel not found.' || gameChannel === 'Server not found.' || gameChannel === undefined) {
            return interaction.editReply({ content: 'An error occurred while creating the game thread.' })
        }

        if (gameChannel.type !== 'GUILD_TEXT') return interaction.editReply({ content: 'An error occurred while creating the game thread.' })

        await wait(10)

        const startingMessage = await gameChannel.send({
            content: `Please wait while we create a thread for the game to take place in.`
        })

        const gameThread = await startingMessage.startThread({
            name: 'Guess the number',
            autoArchiveDuration: 60,
            type: 'GUILD_PRIVATE_THREAD',
        })

        await gameThread.members.add(daalbot.getUser(interaction.user.id))
        
        async function ask() {
            try {
                gameThread.send({
                    content: `Guess a number between 1 and 100 (expires in <t:${Math.floor((Date.now() + (30 * 1000)) / 1000)}:R>)`,
                })

                const messagesCollected = await gameThread.awaitMessages({ filter: filter, max: 1, time: 30 * 1000, errors: ['time'] })
                const guess = parseInt(messagesCollected.first().content)
    
                if (guess === number) {
                    await gameThread.send({ content: 'Correct! You won 125 xp!', })
                    win(interaction.member)

                    return 'win'
                }

                if (guess > number) {
                    gameThread.send({ content: 'Too high!', })

                    return 'ask'
                }

                if (guess < number) {
                    gameThread.send({ content: 'Too low!', })

                    return 'ask'
                }
            } catch (e) {
                await gameThread.send({ content: 'You took too long to respond!', })
                return 'timeout'
            }
        }

        const chances = 5

        function endGame() {
            gameThread.delete();
            startingMessage.delete();
        }

        for (let i = 0; i < chances; i++) {
            const result = await ask()

            if (result === 'win') {
                await wait(5)
                await gameThread.delete()

                break;
            }

            if (result === 'timeout') {
                await wait(5)
                await gameThread.delete()

                break;
            }

            if (i === chances - 1) {
                gameThread.send({ content: `You lost! The number was ${number}`, })
                
                await wait(5)
                await gameThread.delete()
            }

            await wait(3)
        }
    }
}