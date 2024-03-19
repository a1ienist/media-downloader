import fs from 'fs';
import ytdl from 'ytdl-core';

const audioFileName = 'audio.webm';

async function downloadAudio(url) {
    try{
    console.log(`Downloading audio to: ${audioFileName}`);
  
    const info = await ytdl.getInfo(url);
    const format = info.formats.find((f => f.hasVideo === false )&& (f => f.audioBitrate === 128) )

    const writeStream = fs.createWriteStream(audioFileName);
    const stream = ytdl(url, { format });
  
    stream.on('error', error => console.error('Download error:', error));
    stream.pipe(writeStream).on('finish', () => console.log('Download complete!'));
  } catch (error) {
    console.error('Error:', error);
  }
}

const url = 'https://www.youtube.com/watch?v=dQw4w9WgXcQ';
downloadAudio(url);