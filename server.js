import { Telegraf } from 'telegraf';
import { message } from 'telegraf/filters'; 
import { Input } from 'telegraf'; 
import { downloadAudio } from './audio-download.js'
import { downloadVideo } from './video-download.js'
import { mergeVideo } from './merge.js'
import 'dotenv/config'

const bot = new Telegraf(process.env.TOKEN)
bot.start((ctx) => ctx.reply('Welcome'))

function matchYoutubeUrl(url) {
    var p = /^(?:https?:\/\/)?(?:m\.|www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/;
    if(url.match(p)){
        return url.match(p)[1];
    }
    return false;
}

bot.on( message("text"), async (ctx) => {

    const url = ctx.message.text;

    if(!matchYoutubeUrl(url)){
      return await ctx.reply("Your URL is invalid")
    };

    await ctx.reply('Downloading...');

    try {
        await downloadAudio(url);
        await downloadVideo(url);

    if (!audioPath || !videoPath) { 
         throw new Error("Download failed for audio or video");
        }

    await ctx.reply('Merging...'); 

    await mergeVideo();

    await ctx.replyWithVideo('./merged_video.mp4');
    // await fs.unlink(audioPath); // Delete temporary audio file
    // await fs.unlink(videoPath); // Delete temporary video file
  } catch (error) {
    console.error('Error:', error);
    await ctx.reply("An error occurred. Please try again later.");
  }
});

bot.launch();

process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));