// calendar.js
import { sliderData } from "./sliderData.js";
import { updateEventSlider, slideUpdate } from "./slider.js";
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

      // 선택된 날짜 생성 (yearMonth와 wrapper 내부의 날짜 이용)
      const [yearStr, monthStr] = yearMonth.textContent.split(".");
      const dateStr = wrapper.querySelector(".date").textContent;

      const selectedDate = new Date(
        parseInt(yearStr.trim(), 10),
        parseInt(monthStr.trim(), 10) - 1,
        parseInt(dateStr.trim(), 10)
      );

      // 행사 데이터 필터링
      const filteredEvents = filterEventsByDate(selectedDate);

      updateEventSlider(filteredEvents);
    });

    calendarHeader.appendChild(wrapper);
  }
}
function updateSliderFromCalendar() {
  const selectedCalendar =
    document.querySelector(".calendar-day.selected") ||
    document.querySelector(".calendar-day"); // 만약 selected가 없으면 첫번째
  if (selectedCalendar) {
    // wrapper 내부 .date 요소에서 날짜 값 가져오기
    const dateStr = selectedCalendar.querySelector(".date").textContent;
    const [yearStr, monthStr] = yearMonth.textContent.split(".");
    const selectedDate = new Date(
      parseInt(yearStr.trim(), 10),
      parseInt(monthStr.trim(), 10) - 1,
      parseInt(dateStr.trim(), 10)
    );

    const filteredEvents = filterEventsByDate(selectedDate);

    updateEventSlider(filteredEvents);
  }
}

function updateCalendar(weekPage) {
  const newStartDate = new Date(baseDate);
  newStartDate.setDate(baseDate.getDate() + weekPage * 14);

  // 3개월 제한 범위 확인
  const now = new Date();
  const minDate = new Date(now.getFullYear(), now.getMonth() - 3, 1);
  const maxDate = new Date(now.getFullYear(), now.getMonth() + 3 + 1, 0); // 다음달 0일 = 그달 마지막 날

  // newStartDate가 범위를 벗어나면 중단
  if (newStartDate < minDate || newStartDate > maxDate) {
    alert("당월 기준 이전/이후 3개월 이내의 정보만 확인하실 수 있습니다.");
    return false;
  }

  createCalendar(newStartDate);
  page = weekPage;
  updateSliderFromCalendar();
}

window.addEventListener("DOMContentLoaded", () => {
  createCalendar(baseDate);

  const selectedCalendar = document.querySelector(".calendar-day.selected");
  if (selectedCalendar) {
    const dateStr = selectedCalendar.querySelector(".date").textContent;
    const [yearStr, monthStr] = yearMonth.textContent.split(".");
    const selectedDate = new Date(
      parseInt(yearStr.trim(), 10),
      parseInt(monthStr.trim(), 10) - 1,
      parseInt(dateStr.trim(), 10)
    );

    const filteredEvents = filterEventsByDate(selectedDate);

    updateEventSlider(filteredEvents);
  }

  prevBtn.addEventListener("click", () => {
    page--;
    if (updateCalendar(page) == false) {
      // 페이지 원복 필요
      page++;
    }
  });

  nextBtn.addEventListener("click", () => {
    page++;
    if (updateCalendar(page) == false) {
      page--;
    }
  });
});

function parsePeriod(periodStr) {
  const parts = periodStr.split("~").map((s) => s.trim());
  const parseDate = (str) => {
    const [year, month, day] = str
      .split(".")
      .map((x) => parseInt(x.trim(), 10));
    return new Date(year, month - 1, day);
  };
  return [parseDate(parts[0]), parseDate(parts[1])];
}

function isDateWithinEvent(selectedDate, periodStr) {
  const [eventStart, eventEnd] = parsePeriod(periodStr);

  const selected = new Date(
    selectedDate.getFullYear(),
    selectedDate.getMonth(),
    selectedDate.getDate()
  );
  return selected >= eventStart && selected <= eventEnd;
}

function filterEventsByDate(selectedDate) {
  return sliderData.filter((event) =>
    isDateWithinEvent(selectedDate, event.period)
  );
}
