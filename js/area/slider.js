import { sliderData } from "./sliderData.js";

let sliderContainer, prevBtn, nextBtn, sliderDots;
let currentIndex = 0;
let totalSlides = 0;
let slideWidth = 0;

window.openKakaoMap = function (address) {
  const encodedAddress = encodeURIComponent(address);
  const url = `https://map.kakao.com/?q=${encodedAddress}`;
  window.open(url, "_blank");
};

export function slideUpdate(skipTransition = false) {
  const initialPosition = sliderContainer.clientWidth / 2 - slideWidth / 2;

  if (sliderData.length === 0) {
    sliderContainer.style.transform = `translateX(${initialPosition}px)`;
    return;
  }

  // 버튼 visibility 처리
  if (currentIndex === 0) {
    prevBtn.style.visibility = "hidden";
  } else {
    prevBtn.style.visibility = "visible";
  }
  if (currentIndex === totalSlides - 1) {
    nextBtn.style.visibility = "hidden";
  } else {
    nextBtn.style.visibility = "visible";
  }

  selectedUpdate();

  // transition 옵션에 따라 처리
  if (skipTransition) {
    sliderContainer.style.transition = "none";
  } else {
    sliderContainer.style.transition = "transform 0.5s ease-in-out";
  }

  sliderContainer.style.transform = `translateX(${
    initialPosition - currentIndex * slideWidth
  }px)`;
}

function createDots() {
  sliderDots.innerHTML = "";
  for (let i = 0; i < totalSlides; i++) {
    const dot = document.createElement("div");
    dot.classList.add("dot");
    if (i === currentIndex) {
      dot.classList.add("active");
    }
    dot.dataset.index = i;
    dot.addEventListener("click", () => {
      currentIndex = Number(dot.dataset.index);
      slideUpdate();
      updateDots();
    });
    sliderDots.appendChild(dot);
  }
}

function updateDots() {
  const dots = sliderDots.querySelectorAll(".dot");
  dots.forEach((dot, idx) => {
    if (idx === currentIndex) {
      dot.classList.add("active");
    } else {
      dot.classList.remove("active");
    }
  });
}

function hideBtn() {
  nextBtn = document.getElementById("sliderNextBtn");
  nextBtn.style.visibility = "hidden";
}

function selectedUpdate() {
  const slides = document.querySelectorAll(".item-wrapper");
  slides.forEach((slide) => slide.classList.remove("selected"));
  if (slides[currentIndex]) {
    slides[currentIndex].classList.add("selected");
  }
}

export function updateEventSlider(filteredEvents) {
  sliderContainer.innerHTML = "";
  sliderDots.innerHTML = "";

  if (filteredEvents.length === 0) {
    sliderContainer.style.transition = "none";
    const initialPosition = sliderContainer.clientWidth / 2 - slideWidth / 2;
    sliderContainer.style.transform = `translateX(${initialPosition}px)`;
    hideBtn();
    sliderContainer.innerHTML = `
      <div class="no-events-message">
        선택한 날짜에는 등록된 행사가 없습니다.
      </div>
    `;
    return;
  }

  filteredEvents.forEach((item, index) => {
    const slide = document.createElement("div");
    slide.className = "item-wrapper";
    if (index === 0) {
      slide.classList.add("selected");
    }
    slide.innerHTML = `
      <div class="img-wrapper">
        <img src="${item.img}" alt="슬라이드 ${index + 1}" />
      </div>
      <div class="item-content-wrapper">
        <div class="item-title">
          <h2>${item.title}</h2>
          <span>${item.location}</span>
        </div>
        <div class="item-content">
          <div class="info-wrapper">
            <div class="info-content">
              <span>기간</span>
              <span class="info">${item.period}</span>
            </div>
            <div class="info-content">
              <span>장소</span>
              <span class="info">${item.place}</span>
            </div>
          </div>
          <div class="btn-wrapper">
            <div class="site" onclick="window.open('${
              item.link
            }', '_blank')">바로가기</div>
            <div class="road" onclick="openKakaoMap('${
              item.place
            }')">길찾기</div>
          </div>
        </div>
      </div>
    `;
    sliderContainer.appendChild(slide);
  });

  const slides = document.querySelectorAll(".item-wrapper");
  totalSlides = slides.length;
  if (totalSlides > 0) {
    const firstSlideStyles = window.getComputedStyle(slides[0]);
    const slideMarginRight = parseInt(firstSlideStyles.marginRight, 10) || 0;
    slideWidth = slides[0].offsetWidth + slideMarginRight;
  }
  currentIndex = 0;
  slideUpdate(true); // transition 없이 초기 위치 설정
  createDots();
}

document.addEventListener("DOMContentLoaded", () => {
  sliderContainer = document.querySelector(".slider-container");
  prevBtn = document.getElementById("sliderPrevBtn");
  nextBtn = document.getElementById("sliderNextBtn");
  sliderDots = document.getElementById("sliderDots");

  if (sliderData.length === 0) {
    sliderContainer.style.transition = "none";
    const initialPosition = sliderContainer.clientWidth / 2 - slideWidth / 2;
    sliderContainer.style.transform = `translateX(${initialPosition}px)`;
    hideBtn();
    sliderContainer.innerHTML = `
      <div class="no-events-message">
        선택한 날짜에는 등록된 행사가 없습니다.
      </div>
    `;
    return;
  }

  sliderData.forEach((item, index) => {
    const slide = document.createElement("div");
    slide.className = "item-wrapper";
    slide.innerHTML = `
      <div class="img-wrapper">
        <img src="${item.img}" alt="슬라이드 ${index + 1}" />
      </div>
      <div class="item-content-wrapper">
        <div class="item-title">
          <h2>${item.title}</h2>
          <span>${item.location}</span>
        </div>
        <div class="item-content">
          <div class="info-wrapper">
            <div class="info-content">
              <span>기간</span>
              <span class="info">${item.period}</span>
            </div>
            <div class="info-content">
              <span>장소</span>
              <span class="info">${item.place}</span>
            </div>
          </div>
          <div class="btn-wrapper">
            <div class="site" onclick="window.open('${
              item.link
            }', '_blank')">바로가기</div>
            <div class="road" onclick="openKakaoMap('${
              item.place
            }')">길찾기</div>
          </div>
        </div>
      </div>
    `;
    if (index === 0) {
      slide.classList.add("selected");
    }
    sliderContainer.appendChild(slide);
  });

  const slides = document.querySelectorAll(".item-wrapper");
  totalSlides = slides.length;
  if (totalSlides > 0) {
    const firstSlideStyles = window.getComputedStyle(slides[0]);
    const slideMarginRight = parseInt(firstSlideStyles.marginRight, 10) || 0;
    slideWidth = slides[0].offsetWidth + slideMarginRight;
  }
  currentIndex = 0;
  createDots();
  slideUpdate();

  prevBtn.addEventListener("click", () => {
    if (currentIndex > 0) {
      currentIndex--;
      slideUpdate();
      updateDots();
    }
  });

  nextBtn.addEventListener("click", () => {
    if (currentIndex < totalSlides - 1) {
      currentIndex++;
      slideUpdate();
      updateDots();
    }
  });

  // 드래그 이벤트
  let startX = 0;
  let isDragging = false;

  // mousedown : 드래그 시작
  sliderContainer.addEventListener("mousedown", (e) => {
    startX = e.clientX;
    isDragging = true;

    // 슬라이드 현재 위치 저장
    sliderContainer.style.transition = "none"; // 드래그 중 transition 제거
  });

  // mousemove : 드래그 중
  sliderContainer.addEventListener("mousemove", (e) => {
    if (!isDragging) return;
    const diff = e.clientX - startX;
    const currentTranslate =
      sliderContainer.clientWidth / 2 -
      slideWidth / 2 -
      currentIndex * slideWidth;

    // 슬라이더가 드래그에 따라 실시간으로 움직임
    sliderContainer.style.transform = `translateX(${
      currentTranslate + diff
    }px)`;
  });

  // mouseup : 드래그 끝
  sliderContainer.addEventListener("mouseup", (e) => {
    if (!isDragging) return;
    const endX = e.clientX;
    const diff = endX - startX;

    isDragging = false;
    sliderContainer.style.transition = "transform 0.5s ease-in-out";

    if (diff > 50 && currentIndex > 0) {
      currentIndex--;
    } else if (diff < -50 && currentIndex < totalSlides - 1) {
      currentIndex++;
    }

    slideUpdate();
    updateDots();
  });

  // 리사이즈 이벤트
  window.addEventListener("resize", () => {
    slideUpdate();
    currentIndex = 0;
    selectedUpdate();
    updateDots();
  });
});
