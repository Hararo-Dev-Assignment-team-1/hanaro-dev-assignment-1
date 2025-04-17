// main.js
// 역할: 초기 렌더링 및 상태 초기화

import { renderSlides, updateSlides, nextSlide, prevSlide } from './slider.js';
import { resetTiming, startProgressBar, stopProgressBar } from './progressbar.js';
import { initControls, getIsPlaying } from './controls.js';

document.addEventListener('DOMContentLoaded', () => {
  renderSlides();       // 초기 렌더링
  resetTiming();        // 시간 초기화
  updateSlides(0);      // 첫 슬라이드 보여주기

  initControls({
    onNext: () => {
      resetTiming();
      nextSlide();
    },
    onPrev: () => {
      resetTiming();
      prevSlide();
    },
    onTogglePlay: (isNowPlaying) => {
      if (isNowPlaying) {
        startProgressBar(() => {
          resetTiming();
          updateSlides(1);
        });
      } else {
        stopProgressBar();
      }
    }
  });
});
