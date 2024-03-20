import ffmpeg from 'fluent-ffmpeg';
import { fileURLToPath } from 'url';
import path from 'path';

export async function mergeVideo() {
  return new Promise((resolve, reject) => {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);

    const outputPath = path.join(__dirname, 'public', 'merged_video.mp4');

    try {
      ffmpeg()
        .input(path.join(__dirname, 'audio.webm'))
        .input(path.join(__dirname, 'video.mp4'))
        .videoCodec('libx265')
        .videoBitrate(1000)
        .audioCodec('aac')
        .audioBitrate(128)
        .outputOptions([
          '-preset veryfast',
          '-crf 23'
        ])
        .on('end', () => {
          console.log('Merging complete!');
          resolve();
        })
        .on('error', (err) => {
          console.error('Error:', err);
          reject(err); 
        })
        .save(outputPath);
    } catch (error) {
      console.error('Error:', error);
      reject(error);
    }
  });
}
