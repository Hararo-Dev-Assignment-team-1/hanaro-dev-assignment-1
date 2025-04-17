// js/components/headerComponent.js

const template = document.createElement("template");

template.innerHTML = `
  <link rel="stylesheet" href="../css/header/index.css" />
  <header class="main-header">
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
          <div class="language-wrapper">
            <span>한국어</span>
            <span>English</span>
            <span>日本語</span>
            <span>中文 ( 简体 )</span>
            <span>中文 ( 繁體 )</span>
            <span>Deutsch</span>
            <span>Français</span>
            <span>Español</span>
            <span>Pусский</span>
          </div>
        </div>
        <div class="profile-popup">
        <div></div>

        </div>
      </div>
    </header>
`;

class HeaderComponent extends HTMLElement {
  constructor() {
    super();
    const shadow = this.attachShadow({ mode: "open" });
    shadow.appendChild(template.content.cloneNode(true));

    // 로고 -> 홈 버튼
    const logoBtn = shadow.querySelector('img[src$="logo.svg"]');

    // 언어 버튼
    const globeBtn = shadow.querySelector('img[src$="globe.svg"]');
    const languageWrapper = shadow.querySelector(".language-wrapper");

    languageWrapper.style.display = "none";

    const path = window.location.pathname;

    const titleItems = shadow.querySelectorAll(".title-item");
    const searchBtn = shadow.querySelector('img[src$="search-md.svg"]');
    searchBtn.addEventListener("click", () => {
      const searchHeader = document.querySelector("search-header");
      if (searchHeader) {
        searchHeader.style.display = "block";
      }
      this.closest("header-component").style.display = "none";
    });

    // 홈 버튼 이동
    logoBtn.addEventListener("click", () => {
      location.href = "/pages/main.html";
    });

    // 언어 버튼
    globeBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      const isVisible = languageWrapper.style.display === "flex";
      languageWrapper.style.display = isVisible ? "none" : "flex";
    });

    titleItems.forEach((item) => {
      item.classList.remove("selected");
      const label = item.querySelector("span")?.textContent?.trim();
      const subItems = item.querySelectorAll(".sub-item-wrapper span");

      if (label === "홈" && path.includes("/main.html")) {
        item.classList.add("selected");
      } else if (label === "지역" && path.includes("/area.html")) {
        item.classList.add("selected");
      } else if (label === "여행정보" && path.includes("/travel.html")) {
        item.classList.add("selected");
        subItems.forEach((sub) => {
          if (sub.textContent.trim() === "여행지") {
            sub.classList.add("selected");
          }
        });
      }

      // 상위 메뉴 클릭 시 이동
      item.addEventListener("click", () => {
        if (label === "홈") location.href = "/pages/main.html";
        else if (label === "지역") location.href = "/pages/area.html";
        else if (label === "여행정보") location.href = "/pages/travel.html";
        else {
          alert("준비 중인 서비스입니다.");
        }
      });

      // 하위 메뉴 클릭 이벤트도 부여
      subItems.forEach((sub) => {
        sub.addEventListener("click", (e) => {
          e.stopPropagation(); // 상위 메뉴 클릭 방지

          const text = sub.textContent.trim();
          if (text === "여행지") location.href = "/pages/travel.html";
          else alert("준비 중인 서비스입니다.");
        });
      });
    });
  }
}

customElements.define("header-component", HeaderComponent);
