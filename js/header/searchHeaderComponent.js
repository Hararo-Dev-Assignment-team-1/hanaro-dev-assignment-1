const template = document.createElement("template");

template.innerHTML = `
  <link rel="stylesheet" href="/css/header/search.css" />
  <header class="search-header">
    <div class="header-search-container">
      <div class="header-search-wrapper-title">
        <img class="logo-btn" src="../img/logo.svg" />
        <img class="close-btn" src="../img/header/close.svg" />
      </div>
      <div class="header-search-wrapper">
        <div class="search-bar">
          <div class="search-category">
            <span class="selected-category">전체</span>
            <img class="drop-down-btn" src="../img/header/drop-down.svg" />
            <div class="drop-down-container">
              <div class="drop-down-wrapper">
                ${[
                  "전체",
                  "서울",
                  "부산",
                  "대구",
                  "인천",
                  "광주",
                  "대전",
                  "울산",
                  "세종",
                  "경기",
                  "강원",
                  "충북",
                  "충남",
                  "전북",
                  "전남",
                  "경북",
                  "경남",
                  "제주",
                ]
                  .map(
                    (region, i) =>
                      `<div class="drop-down-item${
                        i === 0 ? " selected" : ""
                      }">${region}</div>`
                  )
                  .join("")}
              </div>
              <div class="drop-down-confirm">확인</div>
            </div>
          </div>
          <input
            type="text"
            class="search-input"
            placeholder="어디로, 어떤 여행을 떠날 예정인가요?"
          />
          <button class="search-btn">
            <img src="../img/header/search-md.svg" alt="검색" />
          </button>
        </div>
      </div>
      <div class="search-history-container">
        <div class="history-title">최근 검색어</div>
        <div class="history-wrapper">최근 검색어 내역이 없습니다.</div>
      </div>
    </div>
  </header>
`;

class SearchHeaderComponent extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" }).appendChild(
      template.content.cloneNode(true)
    );
  }

  connectedCallback() {
    const shadow = this.shadowRoot;
    const logoBtn = shadow.querySelector(".logo-btn");
    const searchCategory = shadow.querySelector(".search-category");
    const selectedCategory = shadow.querySelector(".selected-category");
    const dropdownContainer = shadow.querySelector(".drop-down-container");
    const dropdownItems = shadow.querySelectorAll(".drop-down-item");
    const confirmBtn = shadow.querySelector(".drop-down-confirm");
    const dropdownBtn = shadow.querySelector(".drop-down-btn");
    const searchInput = shadow.querySelector(".search-input");
    const searchBtn = shadow.querySelector(".search-btn");
    const closeBtn = shadow.querySelector(".close-btn");

    let selectedText = selectedCategory.textContent;

    const toggleDropdown = () => {
      dropdownContainer.classList.toggle("visible");
      searchCategory.classList.toggle("active");
    };

    dropdownBtn.addEventListener("click", toggleDropdown);
    selectedCategory.addEventListener("click", toggleDropdown);

    dropdownItems.forEach((item) => {
      item.addEventListener("click", (e) => {
        e.stopPropagation();
        dropdownItems.forEach((el) => el.classList.remove("selected"));
        item.classList.add("selected");
        selectedText = item.textContent;
      });
    });
    logoBtn.addEventListener("click", () => {
      location.href = "/pages/main.html";
    });

    confirmBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      selectedCategory.textContent = selectedText;
      dropdownContainer.classList.remove("visible");
      searchCategory.classList.remove("active");
    });

    const originalPlaceholder = searchInput.placeholder;
    searchInput.addEventListener("focus", () => {
      searchInput.placeholder = "";
    });
    searchInput.addEventListener("blur", () => {
      searchInput.placeholder = originalPlaceholder;
    });

    searchBtn.addEventListener("click", () => {
      alert("준비 중인 서비스입니다.");
    });

    document.addEventListener("click", (e) => {
      if (!this.contains(e.target)) {
        dropdownContainer.classList.remove("visible");
        searchCategory.classList.remove("active");
      }
    });

    closeBtn.addEventListener("click", () => {
      this.style.display = "none";
      const mainHeader = document.querySelector("header-component");
      if (mainHeader) mainHeader.style.display = "block";
    });
  }
}

customElements.define("search-header", SearchHeaderComponent);
