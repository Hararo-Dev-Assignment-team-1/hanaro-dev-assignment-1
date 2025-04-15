const calendarHeader = document.getElementById("calendarHeader");
const yearMonth = document.getElementById("yearMonth");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");

let baseDate = new Date();
let page = 0;

function formatYearMonth(date) {
  return `${date.getFullYear()}.${String(date.getMonth() + 1).padStart(
    2,
    "0"
  )}`;
}

function createCalendar(startDate) {
  calendarHeader.innerHTML = "";
  yearMonth.textContent = formatYearMonth(startDate);

  const dayKor = ["일", "월", "화", "수", "목", "금", "토"];

  for (let i = 0; i < 14; i++) {
    const targetDate = new Date(startDate);
    targetDate.setDate(startDate.getDate() + i);

    const date = targetDate.getDate();
    const dayIndex = targetDate.getDay();
    const day = dayKor[dayIndex];

    const wrapper = document.createElement("div");
    wrapper.className = "calendar-day";
    wrapper.classList.add(`day-${dayIndex}`);
    if (i === 0) wrapper.classList.add("selected");

    wrapper.innerHTML = `
      <div class="date">${date}</div>
      <div class="day">${i === 0 ? "오늘" : day}</div>
    `;

    wrapper.addEventListener("click", () => {
      document
        .querySelectorAll(".calendar-day")
        .forEach((el) => el.classList.remove("selected"));
      wrapper.classList.add("selected");
    });

    calendarHeader.appendChild(wrapper);
  }
}

function updateCalendar(weekPage) {
  const newStartDate = new Date(baseDate);
  newStartDate.setDate(baseDate.getDate() + weekPage * 14);
  createCalendar(newStartDate);
  page = weekPage;
}

// 초기 렌더 및 버튼 이벤트
window.addEventListener("DOMContentLoaded", () => {
  createCalendar(baseDate);

  prevBtn.addEventListener("click", () => {
    page--;
    updateCalendar(page);
  });

  nextBtn.addEventListener("click", () => {
    page++;
    updateCalendar(page);
  });
});
