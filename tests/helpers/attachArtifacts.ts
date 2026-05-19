import { TestInfo } from '@playwright/test';
import fs from 'fs';

export async function attachArtifacts(testInfo: TestInfo) {
  // Only attach artifacts when the test did not pass to reduce noise
  if (testInfo.status === 'passed')
    return;

  const videoPath = testInfo.outputPath('video.webm');
  const tracePath = testInfo.outputPath('trace.zip');

  try {
    if (fs.existsSync(videoPath)) {
      await testInfo.attach('video', { path: videoPath, contentType: 'video/webm' });
    }
  } catch (err) {
    // ignore attach errors
  }

  try {
    if (fs.existsSync(tracePath)) {
      await testInfo.attach('trace', { path: tracePath, contentType: 'application/zip' });
    }
  } catch (err) {
    // ignore attach errors
  }
}
