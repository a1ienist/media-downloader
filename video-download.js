import fs from 'fs';
import ytdl from 'ytdl-core';

const videoFileName = 'video.mp4';

async function downloadVideo(url) {
  try {
    const info = await ytdl.getInfo(url);
    const format = info.formats.find(f => f.container === 'mp4' && f.qualityLabel === '720p');

    if (!format) {
      console.error('Desired format not found.');
      return;
    }

    const writeStream = fs.createWriteStream(videoFileName);
    const stream = ytdl(url, { format });

    stream.on('error', error => console.error('Download error:', error));
    stream.pipe(writeStream).on('finish', () => console.log('Download complete!'));
  } catch (error) {
    console.error('Error:', error);
  }
}

const url = 'https://www.youtube.com/watch?v=dQw4w9WgXcQ';
downloadVideo(url);
