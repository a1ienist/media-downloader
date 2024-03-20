import express from 'express';
import { Telegraf } from 'telegraf';
import { message } from 'telegraf/filters';
import { downloadAudio } from './audio-download.js';
import { downloadVideo } from './video-download.js';
import { mergeVideo } from './merge.js';
import 'dotenv/config';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static('public'));

const bot = new Telegraf(process.env.TOKEN);

app.use(bot.webhookCallback('/webhook'));

bot.start(ctx => ctx.reply('Welcome'));

function getVideoFilePath() {
    return './public/merged_video.mp4';
}

bot.on(message("text"), async (ctx) => {
    const url = ctx.message.text;

    try {
        await Promise.all([downloadAudio(url), downloadVideo(url)]);
        await mergeVideo();
        await ctx.replyWithVideo({ source: getVideoFilePath() });
    } catch (error) {
        console.error('Error:', error);
        await ctx.reply("An error occurred. Please try again later.");
    }
});

bot.launch();

process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
