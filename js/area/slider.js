const sliderData = [
  {
    img: "../img/area/slider/slider-1.jpg",
    title: "양재천 벚꽃 등(燈) 축제",
    location: "서울 서초구",
    period: "2025. 4. 3 ~ 2025. 4. 27.",
    place: "서울특별시 서대문구 통일로 279-24 (현저동)",
  },
  {
    img: "../img/area/slider/slider-2.jpg",
    title: "예시 축제 제목",
    location: "서울 강남구",
    period: "2025. 5. 1 ~ 2025. 5. 15.",
    place: "서울특별시 강남구 테헤란로",
  },
  {
    img: "../img/area/slider/slider-3.jpg",
    title: "예시 축제 제목",
    location: "서울 강남구",
    period: "2025. 5. 1 ~ 2025. 5. 15.",
    place: "서울특별시 강남구 테헤란로",
  },
  {
    img: "../img/area/slider/slider-3.jpg",
    title: "예시 축제 제목",
    location: "서울 강남구",
    period: "2025. 5. 1 ~ 2025. 5. 15.",
    place: "서울특별시 강남구 테헤란로",
  },
  {
    img: "../img/area/slider/slider-3.jpg",
    title: "예시 축제 제목",
    location: "서울 강남구",
    period: "2025. 5. 1 ~ 2025. 5. 15.",
    place: "서울특별시 강남구 테헤란로",
  },
  {
    img: "../img/area/slider/slider-3.jpg",
    title: "예시 축제 제목",
    location: "서울 강남구",
    period: "2025. 5. 1 ~ 2025. 5. 15.",
    place: "서울특별시 강남구 테헤란로",
  },
];

document.addEventListener("DOMContentLoaded", () => {
  const sliderWrapper = document.querySelector(".item-slider-wrapper");
  const sliderContainer = document.querySelector(".slider-container");
  const prevBtn = document.getElementById("sliderPrevBtn");
  const nextBtn = document.getElementById("sliderNextBtn");

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
  function slideUpdate(dir) {
    const computedStyle = window.getComputedStyle(sliderContainer);
    const transform = computedStyle.getPropertyValue("transform");

    let currentX = 0;
    if (transform && transform !== "none") {
      const matrixValues = transform.match(/matrix.*\((.+)\)/)[1].split(", ");
      currentX = parseFloat(matrixValues[4]);
    }
    const initialPosition = sliderContainer.clientWidth / 2 - slideWidth / 2;

    selectedUpdate();
    sliderContainer.style.transform = `translateX(${
      initialPosition - currentIndex * slideWidth
    }px)`;
  }

  function initialSliderPosition() {
    console.log(sliderContainer.clientWidth);
    sliderContainer.style.transform = `translateX(${
      sliderContainer.clientWidth / 2 - slideWidth / 2
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
  initialSliderPosition();

  // 이전 버튼 클릭 시
  prevBtn.addEventListener("click", () => {
    if (currentIndex > 0) {
      currentIndex--;
      slideUpdate(0);
    }
  });

  // 다음 버튼 클릭 시
  nextBtn.addEventListener("click", () => {
    if (currentIndex < totalSlides - 1) {
      currentIndex++;
      slideUpdate(1);
    }
  });

  // 창 크기 변화 시 재계산 (반응형 대응)
  window.addEventListener("resize", () => {
    initialSliderPosition();
    currentIndex = 0;
    selectedUpdate();
  });
});
