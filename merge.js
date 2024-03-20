import ffmpeg from 'fluent-ffmpeg';


export async function mergeVideo() {
  ffmpeg()
  .input('audio.webm')
  .input('video.mp4')
  .videoCodec('libx265') // Use more efficient H.265 codec
  .videoBitrate(1000) // Adjust bitrate for desired quality vs. size
  .audioCodec('aac')
  .audioBitrate(128) // Adjust audio bitrate as needed
  .outputOptions([
    '-preset veryfast', // Speed up encoding for smaller files
    '-crf 23' // Target a good quality-to-size ratio (adjust as needed)
  ])
  .on('end', () => console.log('Merging complete!'))
  .on('error', (err) => console.error('Error:', err))
  .save('merged_video.mp4');

}
  