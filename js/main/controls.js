let isPlaying = true;

export function getIsPlaying() {
  return isPlaying;
}

export function setIsPlaying(val) {
  isPlaying = val;
}

export function initControls({ onNext, onPrev, onTogglePlay }) {
  const nextBtn = document.getElementById('next');
  const prevBtn = document.getElementById('prev');
  const playPauseBtn = document.getElementById('playPause');
  const playIcon = playPauseBtn.querySelector('.play-icon');
  const pauseIcon = playPauseBtn.querySelector('.pause-icon');

  nextBtn.addEventListener('click', () => {
    onNext();
  });

  prevBtn.addEventListener('click', () => {
    onPrev();
  });

  playPauseBtn.addEventListener('click', () => {
    isPlaying = !isPlaying;
    playIcon.style.display = isPlaying ? 'none' : 'inline';
    pauseIcon.style.display = isPlaying ? 'inline' : 'none';
    onTogglePlay(isPlaying);
  });

  // 초기 상태
  playIcon.style.display = 'none';
  pauseIcon.style.display = 'inline';
}
