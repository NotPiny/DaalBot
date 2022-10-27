require('dotenv').config()
const Twit = require('twitter-v2')

const T = new Twit({
  consumer_key:         process.env.consumerKey,
  consumer_secret:      process.env.consumerSecret,
  access_token:         process.env.accessToken,
  access_token_secret:  process.env.accessTokenSecret,
})

const lowercaseLetters = 'abcdefghijklmnopqrstuvwxyz'.split('')
const uppercaseLetters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')
const numbers = '0123456789'.split('')
const symbols = '!@#$%^&*()_+-=[]{}|;:,.<>/?'.split('')
const allCharacters = lowercaseLetters.concat(uppercaseLetters, numbers, symbols)

const stream = T.stream('statuses/filter', { track: allCharacters })

stream.on('tweet', function (tweet) {
    console.log(tweet.text)
})