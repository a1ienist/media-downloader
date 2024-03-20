// import fs from 'fs';
// import ytdl from 'ytdl-core';

// const videoFileName = 'video.mp4';

// export async function downloadVideo(url) {
//   try {
//     const info = ytdl.getInfo(url);
//     const format = info.formats.find(f => f.container === 'mp4' && f.qualityLabel === '720p');

//     if (!format) {
//       console.error('Desired format not found.');
//       return;
//     }

//     const writeStream = fs.createWriteStream(videoFileName);
//     const stream = ytdl(url, { format });

//     stream.on('error', error => console.error('Download error:', error));
//     stream.pipe(writeStream).on('finish', () => console.log('Download complete!'));
//   } catch (error) {
//     console.error('Error:', error);
//   }
// }

import fs from 'fs';
import ytdl from 'ytdl-core';

const videoFileName = 'video.mp4';

export async function downloadVideo(url) {
  return new Promise((resolve, reject) => {
    try {
      ytdl.getInfo(url).then(info => {
        const format = info.formats.find(f => f.container === 'mp4' && f.qualityLabel === '720p');
        
        if (!format) {
          throw new Error('Desired format not found.');
        }

        const writeStream = fs.createWriteStream(videoFileName);
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
// downloadVideo(url);