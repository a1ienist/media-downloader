import fs from 'fs';
import ytdl from 'ytdl-core';

const audioFileName = 'audio.webm';

export async function downloadAudio(url) {
  return new Promise((resolve, reject) => {
    try {
      console.log(`Downloading audio to: ${audioFileName}`);
      
      ytdl.getInfo(url).then(info => {
        const format = info.formats.find(f => f.hasVideo === false && f.audioBitrate === 128);
        
        if (!format) {
          throw new Error('Desired audio format not found');
        }
        
        const writeStream = fs.createWriteStream(audioFileName);
        const stream = ytdl(url, { format });
        
        stream.on('error', error => {
          console.error('Download error:', error);
          reject(error);
        });
        
        writeStream.on('finish', () => {
          console.log('Download complete!');
          resolve();
        });
        
        stream.pipe(writeStream);
      }).catch(error => {
        console.error('Error:', error);
        reject(error);
      });
    } catch (error) {
      console.error('Error:', error);
      reject(error);
    }
  });
}

