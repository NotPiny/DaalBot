import dotenv from 'dotenv'; dotenv.config(); import client from './client'; require('./handler'); client.login(process.env.TOKEN);