// slider.js
// 역할: 슬라이드 전환, 배경색 바꾸기
import { getIsPlaying } from './controls.js';
import { startProgressBar, resetTiming } from './progressbar.js';

const bgSlider = document.querySelector(".bg-slider");
const textWrapper = document.querySelector(".text-wrapper");
const imageWrapper = document.querySelector(".image-wrapper");
const indicator = document.getElementById("indicator");

export let current = 0;

const slides = [
    {
      title: "4월은 지구의 달🌎<br>에코 감수성 테스트",
      subtitle: "사진 속 친환경 여행지를 맞혀보자!",
      link: "#",
      image: "https://cdn.visitkorea.or.kr/img/call?cmd=VIEW&id=eaf7e8b7-278d-4dc5-a96b-758ddef8722f&mode=raw",
      bgColor: "#d9efff"
    },
    {
      title: "데이터로 본 지역별<br>핫플레이스!<br>뜨는 도시 7",
      subtitle: "방문자 수로 본 인기 급상승 도시",
      link: "#",
      image: "https://cdn.visitkorea.or.kr/img/call?cmd=VIEW&id=a10dd458-8e19-4aec-b7b5-d59f697a76b2&mode=raw",
      bgColor: "#fff0f7"
    },
    {
      title: "지금 마시러 갑니다,<br>전국 양조장 투어 4",
      subtitle: "오래도록 달큼한 여운",
      link: "#",
      image: "https://cdn.visitkorea.or.kr/img/call?cmd=VIEW&id=9cadaa8b-5749-4162-aec6-4cbd603a056d&mode=raw",
      bgColor: "#ebf8ff"
    },
    {
      title: "겹겹이 피어난 봄🌸<br>서산 벚꽃 여행 코스",
      subtitle: "겹벚꽃부터 청벚꽃까지!",
      link: "#",
      image: "https://cdn.visitkorea.or.kr/img/call?cmd=VIEW&amp;id=faf0800e-bf74-490e-b37a-bbfd06c752bc&amp;mode=raw",
      bgColor: "#def0bb"
    },
    {
      title: "남원에서 만끽하는<br>아날로그 여행",
      subtitle: "봄으로 물드는 지금",
      link: "#",
      image: "https://cdn.visitkorea.or.kr/img/call?cmd=VIEW&amp;id=e2ef6788-62c6-4eba-bb0b-0ad34cf6b8e3&amp;mode=raw",
      bgColor: "#dedeff"
    },
    {
      title: "힐링되는 봄나들이<br>여행지 가볼래?",
      subtitle: "가볼래-터 4월호 도착!",
      link: "#",
      image: "https://cdn.visitkorea.or.kr/img/call?cmd=VIEW&amp;id=269c76b6-70d5-49e0-83e4-8251d4923edf&amp;mode=raw",
      bgColor: "#f9ebff"
    },
    {
      title: "마음까지 화사해지는<br>매화 명소 추천 3",
      subtitle: "봄 정취로 가득!",
      link: "#",
      image: "https://cdn.visitkorea.or.kr/img/call?cmd=VIEW&amp;id=ca33c81c-25ad-45b2-a043-c670c6685d97&amp;mode=raw",
      bgColor: "#fffff5"
    },
    {
      title: "전주에서 즐기는<br>잔잔한 산책",
      subtitle: "여유를 만끽하고 싶다면,",
      link: "#",
      image: "https://cdn.visitkorea.or.kr/img/call?cmd=VIEW&amp;id=ff853943-ded1-4d6e-9818-8e9f22b48d19&amp;mode=raw",
      bgColor: "#fce3c2"
    }
  ];

export function renderSlides() {
    textWrapper.innerHTML = slides.map(s => `
          <li>
            <div class="tit_wrap">
              <em>${s.subtitle}</em>
              <strong>${s.title}</strong>
              <a href="${s.link}" tabindex="-1">자세히 보기</a>
            </div>
          </li>
        `).join("");
  
    imageWrapper.innerHTML = slides.map(s => `
          <li><img src="${s.image}" alt="" /></li>
        `).join("");
  
    updateSlides();
  }
  

export function updateSlides(dir = 0) {
    current = (current + dir + slides.length) % slides.length;

    bgSlider.style.backgroundColor = slides[current].bgColor;
    textWrapper.style.transform = `translateX(-${current * 25}vw)`;
    imageWrapper.style.transform = `translateX(-${current * 50}vw)`;
  
    const currentFormatted = String(current + 1).padStart(2, '0');
    const totalFormatted = String(slides.length).padStart(2, '0');
    indicator.innerHTML = `<strong>${currentFormatted}</strong> / ${totalFormatted}`;

    if (getIsPlaying()) {
        startProgressBar(() => {
          resetTiming();
          updateSlides(1);
        });
    }
}

export function getCurrentSlide() {
  return slides[current];
}

export function nextSlide() {
    updateSlides(1);
  }
  
  export function prevSlide() {
    updateSlides(-1);
  }
  