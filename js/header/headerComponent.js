// js/components/headerComponent.js

const template = document.createElement("template");

template.innerHTML = `
  <link rel="stylesheet" href="/css/header/index.css" />
  <header>
      <div class="header-wrapper">
        <img src="../img/logo.svg" />
        <div class="header-title">
          <div class="title-item selected">
            <div class="header-title-wrapper">
              <span>홈</span>
              <div class="title-dot"></div>
            </div>
          </div>
          <div class="title-item">
            <div class="header-title-wrapper">
              <span>테마</span>
              <div class="title-dot"></div>
            </div>
          </div>
          <div class="title-item">
            <div class="header-title-wrapper">
              <span>지역</span>
              <div class="title-dot"></div>
            </div>
          </div>

          <div class="title-item">
            <div class="header-title-wrapper">
              <span>여행코스</span>
              <div class="title-dot"></div>
            </div>

            <div class="sub-item-wrapper">
              <span>추천코스</span>
              <span>AI콕콕 플래너</span>
            </div>
          </div>
          <div class="title-item">
            <div class="header-title-wrapper">
              <span>여행정보</span>
              <div class="title-dot"></div>
            </div>
            <div class="sub-item-wrapper">
              <span>여행지</span>
              <span>여행기사</span>
              <span>축제</span>
              <span>공연/행사</span>
              <span>AI콕콕</span>
              <span>여행상품</span>
            </div>
          </div>
          <div class="title-item">
            <div class="header-title-wrapper">
              <span>여행혜택</span>
              <div class="title-dot hidden"></div>
            </div>
            <div class="sub-item-wrapper">
              <span>이벤트</span>
              <span>가볼래-터</span>
            </div>
          </div>
        </div>
        <div class="header-btn-wrapper">
          <img src="../img/header/search-md.svg" />
          <img src="../img/header/user.svg" />
          <img src="../img/header/map.svg" />
          <img src="../img/header/globe.svg" />
        </div>
      </div>
    </header>
`;

class HeaderComponent extends HTMLElement {
  constructor() {
    super();
    const shadow = this.attachShadow({ mode: "open" });
    shadow.appendChild(template.content.cloneNode(true));

    // 현재 경로 확인
    const path = window.location.pathname;

    // 경로에 따라 클래스 설정
    const titleItems = shadow.querySelectorAll(".title-item");
    titleItems.forEach((item) => {
      const label = item.querySelector("span")?.textContent?.trim();

      if (label === "홈" && path.includes("/main.html")) {
        item.classList.add("selected");
      } else if (label === "지역" && path.includes("/area.html")) {
        item.classList.add("selected");
      } else if (label === "여행정보" && path.includes("/travel.html")) {
        item.classList.add("selected");
      } else {
        item.classList.remove("selected");
      }

      // 클릭 시 페이지 이동 처리
      item.addEventListener("click", () => {
        if (label === "홈") location.href = "/pages/main.html";
        else if (label === "지역") location.href = "/pages/area.html";
        else if (label === "여행정보") location.href = "/pages/travel.html";
        else {
          alert("준비 중인 서비스입니다.");
        }
      });
    });
  }
}

customElements.define("header-component", HeaderComponent);
