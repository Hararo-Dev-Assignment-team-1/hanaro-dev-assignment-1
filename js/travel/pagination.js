// pagination.js

import { travelData } from "./travelData.js";

const ITEMS_PER_PAGE = 10;
const MAX_PAGE_BUTTONS = 5;
let currentPage = 1;
let filteredData = [...travelData]; // 초기 필터링 데이터는 전체

const mainSectionContent = document.querySelector(".main-section-content");

function createItemElement(item) {
  const wrapper = document.createElement("div");
  wrapper.className = "main-item-wrapper";
  wrapper.innerHTML = `
    <div class="item-image-wrapper">
      <img src="${item.image}" alt="${item.title}" />
    </div>
    <div class="item-content-wrapper">
      <div class="item-title-wrapper">
        <div>${item.title}</div>
        <div class="popup-wrapper">
          <img src="../img/travel/dot.svg" />
          <div class="popup">
            <div class="popup-item">
              <img src="../img/travel/mark.svg" />
                즐겨찾기
              </div>
            <div class="popup-item">
              <img src="../img/travel/share.svg" />
              공유하기
            </div>
            <div class="popup-item">
              <img src="../img/travel/mark-2.svg" />
              코스에 담기
            </div>
          </div>
        </div>
      </div>
      <div>
        <div>${item.region} ${item.city}</div> 
        <div>${item.description}</div>
      </div>
      <span class="hashtag-wrapper">${item.hashtags.join("")}</span>
    </div>
  `;
  return wrapper;
}

function renderPagination(totalItems) {
  const paginationWrapper = document.createElement("div");
  paginationWrapper.className = "pagination-wrapper";

  const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);

  const leftWrapper = document.createElement("div");
  leftWrapper.className = "pagination-btn-wrapper";

  if (currentPage !== 1) {
    // 이전 페이지 이동 버튼
    const firstBtn = document.createElement("div");
    firstBtn.className = "page-btn";
    firstBtn.innerHTML = `<img src="../img/travel/d-left.svg" />`;
    firstBtn.addEventListener("click", () => {
      currentPage = 1;
      renderPaginatedItems();
    });

    const prevBtn = document.createElement("div");
    prevBtn.className = "page-btn";
    prevBtn.innerHTML = `<img src="../img/travel/left.svg" />`;
    prevBtn.addEventListener("click", () => {
      if (currentPage > 1) {
        currentPage--;
        renderPaginatedItems();
      }
    });

    leftWrapper.appendChild(firstBtn);
    leftWrapper.appendChild(prevBtn);
    paginationWrapper.appendChild(leftWrapper);
  }

  const pageNumWrapper = document.createElement("div");
  pageNumWrapper.className = "page-num-wrapper";

  const currentGroup = Math.floor((currentPage - 1) / MAX_PAGE_BUTTONS);
  const startPage = currentGroup * MAX_PAGE_BUTTONS + 1;
  const endPage = Math.min(startPage + MAX_PAGE_BUTTONS - 1, totalPages);

  for (let i = startPage; i <= endPage; i++) {
    const pageNum = document.createElement("div");
    pageNum.className = "page-num";
    if (i === currentPage) pageNum.classList.add("selected");
    pageNum.textContent = i;
    pageNum.addEventListener("click", () => {
      currentPage = i;
      renderPaginatedItems();
    });
    pageNumWrapper.appendChild(pageNum);
  }

  paginationWrapper.appendChild(pageNumWrapper);

  const rightWrapper = document.createElement("div");
  rightWrapper.className = "pagination-btn-wrapper";

  // 다음 페이지 이동 버튼
  if (currentPage !== totalPages) {
    const nextBtn = document.createElement("div");
    nextBtn.className = "page-btn";
    nextBtn.innerHTML = `<img src="../img/travel/right.svg" />`;
    nextBtn.addEventListener("click", () => {
      if (currentPage < totalPages) {
        currentPage++;
        renderPaginatedItems();
      }
    });

    const lastBtn = document.createElement("div");
    lastBtn.className = "page-btn";
    lastBtn.innerHTML = `<img src="../img/travel/d-right.svg" />`;
    lastBtn.addEventListener("click", () => {
      currentPage = totalPages;
      renderPaginatedItems();
    });

    rightWrapper.appendChild(nextBtn);
    rightWrapper.appendChild(lastBtn);
    paginationWrapper.appendChild(rightWrapper);
  }

  mainSectionContent.appendChild(paginationWrapper);
}

export function renderPaginatedItems() {
  const oldItems = mainSectionContent.querySelectorAll(
    ".main-item-wrapper, .pagination-wrapper, .no-place-message"
  );
  oldItems.forEach((el) => el.remove());
  const countSpan = document.querySelector(".content-title pre span");
  if (countSpan) {
    countSpan.textContent = filteredData.length;
  }

  const start = (currentPage - 1) * ITEMS_PER_PAGE;
  const end = start + ITEMS_PER_PAGE;
  const itemsToShow = filteredData.slice(start, end);

  if (itemsToShow.length === 0) {
    const message = document.createElement("div");
    message.className = "no-place-message";
    message.textContent = "선택한 장소에는 등록된 행사가 없습니다.";
    mainSectionContent.appendChild(message);
    return;
  }

  itemsToShow.forEach((item) => {
    const itemElement = createItemElement(item);
    mainSectionContent.appendChild(itemElement);
  });

  renderPagination(filteredData.length);
}

export function setFilteredData(data) {
  filteredData = data;
  currentPage = 1;
  renderPaginatedItems();
}

document.addEventListener("DOMContentLoaded", () => {
  renderPaginatedItems();

  const annotationWrapper = document.querySelector(".annotation-wrapper");
  const pullBox = annotationWrapper.querySelector(".pull");
  const icon = annotationWrapper.querySelector("img");
  const closeBtn = annotationWrapper.querySelector(".close-btn");
  // const popupBookMark = document.querySelector('img[src$="mark.svg"]');
  mainSectionContent.addEventListener("click", (e) => {
    const target = e.target.closest(".popup-item");
    if (!target) return;

    const popupItems = Array.from(
      target.parentElement.querySelectorAll(".popup-item")
    );
    const index = popupItems.indexOf(target);

    switch (index) {
      case 0:
        alert("준비 중인 서비스입니다.");
        break;
      case 1:
        alert("준비 중인 서비스입니다.");
        break;
      case 2:
        alert("준비 중인 서비스입니다.");
        break;
    }
  });

  icon.addEventListener("click", () => {
    pullBox.classList.toggle("show");
  });

  closeBtn.addEventListener("click", (e) => {
    pullBox.classList.remove("show");
  });

  document.addEventListener("click", (e) => {
    if (!annotationWrapper.contains(e.target)) {
      pullBox.classList.remove("show");
    }
  });

  document.addEventListener("click", (e) => {
    const overlay = document.getElementById("travelPopupOverlay");

    document.querySelectorAll(".popup").forEach((popup) => {
      popup.classList.remove("show");
    });
    overlay.classList.remove("show");

    const wrapper = e.target.closest(".popup-wrapper");
    if (wrapper) {
      const popup = wrapper.querySelector(".popup");
      popup.classList.add("show");
      overlay.classList.add("show");
      e.stopPropagation();
    }
  });

  document
    .getElementById("travelPopupOverlay")
    .addEventListener("click", () => {
      document.querySelectorAll(".popup").forEach((popup) => {
        popup.classList.remove("show");
      });
      document.getElementById("travelPopupOverlay").classList.remove("show");
    });
});
