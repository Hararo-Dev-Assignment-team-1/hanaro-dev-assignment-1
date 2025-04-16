// progressbar.js
import { updateSlides } from './slider.js';

export const slideInterval = 5000;

let progressTimer = null;
let startTime = 0;
let currentWidth = 0;
let remaining = slideInterval;

export function startProgressBar(onComplete) {
  clearInterval(progressTimer);
  startTime = Date.now();

  const progressFill = document.getElementById('progressFill');
  const step = (100 - currentWidth) / (remaining / 50);

  progressTimer = setInterval(() => {
    const elapsed = Date.now() - startTime;
    currentWidth += step;

    if (currentWidth >= 100 || elapsed >= remaining) {
      clearInterval(progressTimer);
      currentWidth = 0;
      remaining = slideInterval;
      progressFill.style.width = `100%`;
      if (onComplete) onComplete();
      return;
    }

    progressFill.style.width = `${currentWidth}%`;
  }, 50);
}

export function stopProgressBar() {
  clearInterval(progressTimer);
  const elapsed = Date.now() - startTime;
  remaining -= elapsed;
  if (remaining < 0) remaining = 0;
  currentWidth = ((slideInterval - remaining) / slideInterval) * 100;
}

export function resetTiming() {
  clearInterval(progressTimer);
  remaining = slideInterval;
  currentWidth = 0;
  const fill = document.getElementById('progressFill');
  if (fill) fill.style.width = '0%';
}
