const calendarSlider = document.getElementById("calendarSlider");
const sliderPrevBtn = document.getElementById("sliderPrevBtn");
const sliderNextBtn = document.getElementById("sliderNextBtn");

let currentPage = 0;
let totalPages = 0;

function generateCalendarPages(startDate, totalWeeks = 4) {
  calendarSlider.innerHTML = "";

  const dayKor = ["일", "월", "화", "수", "목", "금", "토"];

  for (let w = 0; w < totalWeeks; w++) {
    const page = document.createElement("div");
    page.className = "slider-page";

    for (let i = 0; i < 14; i++) {
      const dateObj = new Date(startDate);
      dateObj.setDate(startDate.getDate() + w * 14 + i);

      const dayIdx = dateObj.getDay();
      const date = dateObj.getDate();
      const day = dayKor[dayIdx];

      const cell = document.createElement("div");
      cell.className = "calendar-day day-" + dayIdx;
      if (w === 0 && i === 0) cell.classList.add("selected");

      cell.innerHTML = `
        <div class="date">${date}</div>
        <div class="day">${w === 0 && i === 0 ? "오늘" : day}</div>
      `;

      cell.addEventListener("click", () => {
        document
          .querySelectorAll(".calendar-day")
          .forEach((d) => d.classList.remove("selected"));
        cell.classList.add("selected");
      });

      page.appendChild(cell);
    }

    calendarSlider.appendChild(page);
  }

  totalPages = totalWeeks;
  moveToPage(0); // 초기 위치
}

function moveToPage(page) {
  if (page < 0 || page >= totalPages) return;
  currentPage = page;
  const offset = -100 * page;
  calendarSlider.style.transform = `translateX(${offset}%)`;

  // 첫 날짜 자동 선택
  const firstDay = calendarSlider.children[page].querySelector(".calendar-day");
  document
    .querySelectorAll(".calendar-day")
    .forEach((el) => el.classList.remove("selected"));
  firstDay.classList.add("selected");
}

prevBtn.addEventListener("click", () => moveToPage(currentPage - 1));
nextBtn.addEventListener("click", () => moveToPage(currentPage + 1));

generateCalendarPages(new Date());
