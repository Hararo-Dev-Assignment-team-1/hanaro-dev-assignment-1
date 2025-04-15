// slider.js

import { sliderData } from "./sliderData.js";
document.addEventListener("DOMContentLoaded", () => {
  const sliderContainer = document.querySelector(".slider-container");
  const prevBtn = document.getElementById("sliderPrevBtn");
  const nextBtn = document.getElementById("sliderNextBtn");
  const sliderDots = document.getElementById("sliderDots");

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
            <div class="site">바로가기</div>
            <div class="road">길찾기</div>
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
  const totalSlides = slides.length;

  // const viewportWidth = sliderWrapper.clientWidth;

  const firstSlideStyles = window.getComputedStyle(slides[0]);
  const slideMarginRight = parseInt(firstSlideStyles.marginRight, 10) || 0;
  const slideWidth = slides[0].offsetWidth + slideMarginRight;

  let currentIndex = 0;

  function createDots() {
    // dot 컨테이너 초기화
    sliderDots.innerHTML = "";
    for (let i = 0; i < totalSlides; i++) {
      const dot = document.createElement("div");
      dot.classList.add("dot");
      // 현재 선택된 슬라이드와 일치하면 active 클래스 추가
      if (i === currentIndex) {
        dot.classList.add("active");
      }
      // dot 클릭 시, dot의 index 값으로 슬라이드를 이동할 수 있도록 data-index 설정
      dot.dataset.index = i;
      dot.addEventListener("click", () => {
        // 외부에서 currentIndex 업데이트와 슬라이더 이동 처리 함수를 호출하도록 연결
        currentIndex = Number(dot.dataset.index);
        slideUpdate(); // 슬라이더 이동 함수 (외부 구현)
        updateDots(currentIndex, sliderDots);
      });
      sliderDots.appendChild(dot);
    }
  }
  function updateDots() {
    const dots = document.querySelectorAll(".slider-dots .dot");
    dots.forEach((dot, idx) => {
      if (idx === currentIndex) {
        dot.classList.add("active");
      } else {
        dot.classList.remove("active");
      }
    });
  }

  // 슬라이드 이동 함수
  function slideUpdate() {
    const computedStyle = window.getComputedStyle(sliderContainer);
    const transform = computedStyle.getPropertyValue("transform");

    let currentX = 0;
    if (transform && transform !== "none") {
      const matrixValues = transform.match(/matrix.*\((.+)\)/)[1].split(", ");
      currentX = parseFloat(matrixValues[4]);
    }
    const initialPosition = sliderContainer.clientWidth / 2 - slideWidth / 2;

    // 버튼 visibility 처리
    if (currentIndex == 0) {
      prevBtn.style.visibility = "hidden";
    } else {
      prevBtn.style.visibility = "visible";
    }
    if (currentIndex == sliderData.length - 1) {
      nextBtn.style.visibility = "hidden";
    } else {
      nextBtn.style.visibility = "visible";
    }

    selectedUpdate();
    sliderContainer.style.transform = `translateX(${
      initialPosition - currentIndex * slideWidth
    }px)`;
  }

  function selectedUpdate() {
    const slides = document.querySelectorAll(".item-wrapper");

    slides.forEach((slide) => slide.classList.remove("selected"));

    if (currentIndex >= slides.length) {
      currentIndex = slides.length - 1;
    }
    slides[currentIndex].classList.add("selected");
  }

  // 초기 슬라이더 위치 설정 (첫 슬라이드를 중앙에 위치)
  slideUpdate();
  createDots();

  // 이전 버튼 클릭 시
  prevBtn.addEventListener("click", () => {
    if (currentIndex > 0) {
      currentIndex--;
      slideUpdate();
      updateDots();
    }
  });

  // 다음 버튼 클릭 시
  nextBtn.addEventListener("click", () => {
    if (currentIndex < totalSlides - 1) {
      currentIndex++;
      slideUpdate();
      updateDots();
    }
  });

  // 창 크기 변화 시 재계산 (반응형 대응)
  window.addEventListener("resize", () => {
    slideUpdate();
    currentIndex = 0;
    selectedUpdate();
    updateDots();
  });
});
