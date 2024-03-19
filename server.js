import { Telegraf } from 'telegraf';
import { message } from 'telegraf/filters'; 
import 'dotenv/config'
import URL from "./index"

const bot = new Telegraf('6652374350:AAGImEVGFx1EHJhoX02YB1BZn-YP6HvfrLk')
bot.start((ctx) => ctx.reply('Welcome'))
bot.help((ctx) => ctx.reply('Send me a sticker'))
bot.on(message('sticker'), (ctx) => ctx.reply('👍'))
bot.hears('hi', (ctx) => ctx.reply('Hey there'))
bot.launch()

process.once('SIGINT', () => bot.stop('SIGINT'))
process.once('SIGTERM', () => bot.stop('SIGTERM'))