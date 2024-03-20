// import fs from 'fs';
// import ytdl from 'ytdl-core';

// const audioFileName = 'audio.webm';

// export async function downloadAudio(url) {
//     try{
//     console.log(`Downloading audio to: ${audioFileName}`);
  
//     const info = ytdl.getInfo(url);
//     const format = info.formats.find((f => f.hasVideo === false )&& (f => f.audioBitrate === 128) )

//     const writeStream = fs.createWriteStream(audioFileName);
//     const stream = ytdl(url, { format });
  
//     stream.on('error', error => console.error('Download error:', error));
//     stream.pipe(writeStream).on('finish', () => console.log('Download complete!'));
//   } catch (error) {
//     console.error('Error:', error);
//   }
// }

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
// const url = "https://www.youtube.com/watch?v=7fmW9faGDDI";
// downloadAudio(url);
