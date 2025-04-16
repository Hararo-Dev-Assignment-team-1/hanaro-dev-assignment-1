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
        <img src="../img/travel/dot.svg" />
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
  // 1. 기존 아이템만 제거 (전체 초기화 X)
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

  // 2. 데이터가 없는 경우 메시지 출력
  if (itemsToShow.length === 0) {
    const message = document.createElement("div");
    message.className = "no-place-message";
    message.textContent = "선택한 장소에는 등록된 행사가 없습니다.";
    mainSectionContent.appendChild(message);
    return;
  }

  // 3. 아이템 렌더링
  itemsToShow.forEach((item) => {
    const itemElement = createItemElement(item);
    mainSectionContent.appendChild(itemElement);
  });

  // 4. 페이지네이션 렌더링
  renderPagination(filteredData.length);
}

export function setFilteredData(data) {
  filteredData = data;
  currentPage = 1;
  renderPaginatedItems();
}

document.addEventListener("DOMContentLoaded", () => {
  renderPaginatedItems();
});
