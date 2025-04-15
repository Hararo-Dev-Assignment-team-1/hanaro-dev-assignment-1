import { sliderData } from "./sliderData.js";

let sliderContainer, prevBtn, nextBtn, sliderDots;
let currentIndex = 0;
let totalSlides = 0;
let slideWidth = 0;

export function slideUpdate() {
  const computedStyle = window.getComputedStyle(sliderContainer);
  const transform = computedStyle.getPropertyValue("transform");

  let currentX = 0;
  if (transform && transform !== "none") {
    const matrixValues = transform.match(/matrix.*\((.+)\)/)[1].split(", ");
    currentX = parseFloat(matrixValues[4]);
  }
  const initialPosition = sliderContainer.clientWidth / 2 - slideWidth / 2;

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
  sliderContainer.style.transform = `translateX(${
    initialPosition - currentIndex * slideWidth
  }px)`;
  sliderContainer.style.transition = "transform 0.5s ease-in-out";
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
            <div class="site">바로가기</div>
            <div class="road">길찾기</div>
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
  createDots();
  slideUpdate();
}

document.addEventListener("DOMContentLoaded", () => {
  sliderContainer = document.querySelector(".slider-container");
  prevBtn = document.getElementById("sliderPrevBtn");
  nextBtn = document.getElementById("sliderNextBtn");
  sliderDots = document.getElementById("sliderDots");

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

  window.addEventListener("resize", () => {
    slideUpdate();
    currentIndex = 0;
    selectedUpdate();
    updateDots();
  });
});
