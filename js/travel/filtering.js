// filtering.js
import { travelData } from "./travelData.js";
import { renderPaginatedItems, setFilteredData } from "./pagination.js";

// 현재 선택된 필터 상태
const filterState = {
  region: "#전체",
  city: "#전체",
  tag: ["#전체"],
  sortBy: "latest",
};

const regionContainer = document.querySelector('[data-type="region"]');
const cityContainer = document.querySelector('[data-type="city"]');
const tagContainer = document.querySelector('[data-type="tag"]');
const resetBtn = document.getElementById("resetBtn");

const cityMap = travelData.reduce((map, item) => {
  const regionKey = `#${item.region}`;
  const cityKey = `#${item.city}`;
  if (!map[regionKey]) map[regionKey] = new Set();
  map[regionKey].add(cityKey);
  return map;
}, {});

Object.keys(cityMap).forEach((region) => {
  cityMap[region] = Array.from(cityMap[region]);
});

// 필터 초기화 함수
function resetFilters() {
  filterState.region = "#전체";
  filterState.city = "#전체";
  filterState.tag = "#전체";

  // 버튼 UI 초기화
  createButtons(regionContainer, allRegions, "region");
  createButtons(cityContainer, ["#전체"], "city");
  createButtons(tagContainer, allTags, "tag");

  cityContainer.style.display = "none";

  // 필터 적용
  setFilteredData(travelData);
  renderPaginatedItems();
}

function createButtons(container, items, type) {
  if (type === "city") cityContainer.style.display = "none !important";
  container.innerHTML = "";

  items.forEach((label) => {
    const btn = document.createElement("button");
    btn.className = "hashtag-button";
    btn.textContent = label;

    if (type === "tag" && filterState.tag.includes(label)) {
      btn.classList.add("active");
    } else if (filterState[type] === label) {
      btn.classList.add("active");
    }

    btn.addEventListener("click", () => {
      if (type === "tag") {
        // 다중 선택 처리
        if (label === "#전체") {
          filterState.tag = ["#전체"];
        } else {
          filterState.tag = filterState.tag.filter((t) => t !== "#전체");
          const index = filterState.tag.indexOf(label);
          if (index > -1) {
            filterState.tag.splice(index, 1); // 선택 해제
          } else {
            filterState.tag.push(label); // 선택 추가
          }

          if (filterState.tag.length === 0) {
            filterState.tag = ["#전체"];
          }
        }
        createButtons(container, items, type);
      } else {
        filterState[type] = label;
        container
          .querySelectorAll(".hashtag-button")
          .forEach((b) => b.classList.remove("active"));
        btn.classList.add("active");

        if (type === "region") {
          filterState.city = "#전체";
          const cities = cityMap[label];
          if (cities) {
            cityContainer.style.display = "grid";
            createButtons(cityContainer, ["#전체", ...cities], "city");
          } else {
            cityContainer.style.display = "none";
            cityContainer.innerHTML = "";
          }
        }
      }

      applyFilters();
    });

    container.appendChild(btn);
  });
}

function applyFilters() {
  let filtered = travelData;

  if (filterState.region !== "#전체") {
    filtered = filtered.filter(
      (item) => `#${item.region}` === filterState.region
    );
  } else if (filterState.region === "#전체") {
    cityContainer.style.display = "none !important";
  }

  if (filterState.city !== "#전체") {
    filtered = filtered.filter((item) => `#${item.city}` === filterState.city);
  }

  if (!filterState.tag.includes("#전체")) {
    filtered = filtered.filter((item) =>
      filterState.tag.some((t) => item.hashtags.includes(t))
    );
  }

  // 정렬 처리
  if (filterState.sortBy === "latest") {
    filtered.sort((a, b) => new Date(b.date) - new Date(a.date));
  } else if (filterState.sortBy === "distance") {
    filtered.sort((a, b) => a.distance - b.distance);
  } else if (filterState.sortBy === "popularity") {
    filtered.sort((a, b) => b.popularity - a.popularity);
  }

  setFilteredData(filtered);
  renderPaginatedItems();
}

// 초기 렌더링
const allRegions = ["#전체", ...Object.keys(cityMap)];
const allTags = [
  "#전체",
  "#레포츠",
  "#문화시설",
  "#자연",
  "#역사",
  "#관광지",
  "#체험",
  "#숙박",
  "#실내여행지",
  "#이색체험",
  "#음식",
  "#쇼핑",
  "#트래킹",
  "#드라이브코스",
  "#봄꽃여행",
  "#봄나들이",
  "#DMZ",
  "#전통시장 K-관광마켓 10선",
  "#우수웰니스관광지",
  "#한국관광품질인증",
  "#관광두레",
  "#야간관광",
];

createButtons(regionContainer, allRegions, "region");
cityContainer.style.display = "none";
createButtons(cityContainer, ["#전체"], "city");
createButtons(tagContainer, allTags, "tag");

const sortButtons = document.querySelectorAll(".ordering-wrapper span");
sortButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    sortButtons.forEach((b) => b.classList.remove("selected"));
    btn.classList.add("selected");

    const sortText = btn.textContent.trim();
    if (sortText === "최신순") filterState.sortBy = "latest";
    else if (sortText === "거리순") filterState.sortBy = "distance";
    else if (sortText === "인기순") filterState.sortBy = "popularity";

    applyFilters();
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const resetBtn = document.querySelector(".sub-section-title img");

  // 초기 렌더링 시 최신순으로 정렬
  const sortButtons = document.querySelectorAll(".ordering-wrapper span");
  filterState.sortBy = "latest";
  sortButtons[0].classList.add("selected");
  applyFilters();

  if (resetBtn) {
    resetBtn.addEventListener("click", resetFilters);
  }
});
