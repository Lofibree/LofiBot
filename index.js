const {gameOptions, againOptions } = require('./options')
const TelegramApi = require('node-telegram-bot-api')

const token = '5908217130:AAEN_sQhLp9dDO1Z_3-YrLtYAwLaa_2QY3I';

const bot = new TelegramApi(token, {polling: true})

const chats = {}



const startGame = async (chatId) => {
    console.log('dfgdf')
    await bot.sendMessage(chatId, "I'm gonna wonder a digit from 0 to 9, then you should try to guess it")
    const randNum = Math.floor(Math.random() * 10)
    chats[chatId] = randNum
    await bot.sendMessage(chatId, 'Lets go', gameOptions)
}

const start = () => {
    bot.setMyCommands([
        {command: '/start', description: 'Greetings'},
        {command: '/info', description: 'get user information'},
        {command: '/game', description: 'starts a guessing random number game'},
        {command: '/again', description: 'restarts a guessing random number game'},
    ])
    
    bot.on('message', async (mess) => {
        const text = mess.text
        const chatId = mess.chat.id
        // bot.sendMessage(chatId, `You sent me ${text}` )
        // console.log(mess)
        if (text === '/start') {
            await bot.sendSticker(chatId, 'https://tlgrm.eu/_/stickers/1b5/0ab/1b50abf8-8451-40ca-be37-ffd7aa74ec4d/11.webp')
            return bot.sendMessage(chatId, `Welcome`)
        }
        if (text === '/info') {
            await bot.sendMessage(chatId, `Your username is ${mess.chat.username}`)
            return bot.sendMessage(chatId, `Your name is ${mess.from.first_name} ${mess.from.last_name}`)
        }
        if (text === '/game') {
            return startGame(chatId)
        }
        return bot.sendMessage(chatId, "Don't understand")
    })

    bot.on('callback_query', async (mess) => {
        const data = mess.data;
        const chatId = mess.message.chat.id
        console.log(data)
        if (data === '/again') {
            console.log('sdf')
            return startGame(chatId)
        }
        if (data === chats[chatId]) {
            return await bot.sendMessage(chatId, 'Success!', againOptions)
        } else if (data !== chats[chatId]) {
            return await bot.sendMessage(chatId, `Nope, it was ${chats[chatId]}`, againOptions)
        }                                                                                                                                                                       
    })
}

start();