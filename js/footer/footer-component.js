const template = document.createElement("template");

template.innerHTML = `
<style>
  :host {
    display: block;
    width: 100%;
  }

  footer {
    width: 100%;
    background-color: #f9f9f9;
    overflow-x: hidden;
    margin: 0;
    padding: 0;
  }
  
  </style>
  <link rel="stylesheet" href="../css/footer/content.css" />
  <link rel="stylesheet" href="../css/footer/sns-icon.css" />
  <footer class="main-footer">
    <div class="footer-container">
        <div class="footer-top">
            <img src="../img/footer/footer_top.png" alt="로고" />
            <p><strong>대한민국 구석구석을 SNS에서 만나보세요!</strong></p>
        </div>

        <div class="sns-wrapper">
            <div class="sns-icons">
                <a href="https://blog.naver.com/korea_diary" class="sns-item blog">
                    <img src="../img/footer/blog_1.png" alt="블로그 아이콘" />
                    <span>블로그</span>
                </a>
                <a href="https://post.naver.com/korea_diary" class="sns-item post">
                    <img src="../img/footer/post_1.png" alt="포스트 아이콘" />
                    <span>포스트</span>
                </a>
                <a href="https://www.facebook.com/9suk9suklive" class="sns-item facebook">
                    <img src="../img/footer/facebook_1.png" alt="페이스북 아이콘" />
                    <span>페이스북</span>
                </a>
                <a href="https://x.com/kor_visitkorea" class="sns-item x">
                    <img src="../img/footer/x_1.png" alt="엑스 아이콘" />
                    <span>엑스</span>
                </a>
                <a href="https://story.kakao.com/ch/visitkorea/" class="sns-item kakaostory">
                    <img src="../img/footer/kakaostory_1.png" alt="카카오스토리 아이콘" />
                    <span>카카오<br>스토리</span>
                </a>
                <a href="https://www.instagram.com/kto9suk9suk/" class="sns-item instagram">
                    <img src="../img/footer/instagram_1.png" alt="인스타그램 아이콘" />
                    <span>인스타<br>그램</span>
                </a>
                <a href="https://www.band.us/@koreadiary" class="sns-item band">
                    <img src="../img/footer/band_1.png" alt="네이버밴드 아이콘" />
                    <span>네이버<br>밴드</span>
                </a>
            </div>
        </div>

        <div class="section-divider"></div>

        <div class="footer-banners">
            <a href="https://www.odii.kr/smarttour_web/iframe"><img src="../img/footer/banner_1.png" alt="배너1" /></a>
            <a href="#"><img src="https://cdn.visitkorea.or.kr/resources/images/common/fot_link_banner3.gif"
                    alt="배너2" /></a>
            <a href="https://korean.visitkorea.or.kr/wallpaper/main.do"><img
                    src="https://cdn.visitkorea.or.kr/resources/images/common/fot_link_banner6.gif" alt="배너3" /></a>
            <a href="https://korean.visitkorea.or.kr/notice/guide_book.do"><img
                    src="https://cdn.visitkorea.or.kr/resources/images/common/fot_link_banner4.gif" alt="배너4" /></a>
            <a href="#"><img src="https://cdn.visitkorea.or.kr/resources/images/common/fot_link_banner7.gif"
                    alt="배너5" /></a>
        </div>

        <div class="footer-links">
            <a href="#" class="link-highlight">개인정보처리방침</a>
            <a href="#">이용약관</a>
            <a href="#">위치기반서비스 이용약관</a>
            <a href="#">저작권정책</a>
            <a href="#">고객서비스현장</a>
            <a href="#">전자우편무단수집거부</a>
            <a href="#">Q&A</a>
            <a href="#">찾아오시는 길</a>
            <a href="#">사이트맵</a>
        </div>

        <ul class="ft_address">
            <li>
                <span>우)26464</span>
                <span>강원특별자치도 원주시 세계로 10</span>
                <span>TEL : 033-738-3000</span>
            </li>
            <li>사업자등록번호 : 202-81-50707</li>
            <li>통신판매업신고 : 제2009-서울중구-1234호</li>
        </ul>

        <div class="section-divider"></div>

        <div class="footer-credits">
            <div class="copyright">© 한국관광공사</div>
            <div class="partners">
              <a href="https://api.visitkorea.or.kr/#/"><img src="../img/footer/cooperative_1.png" alt="TourAPI" /></a>
              <a href="https://www.wa.or.kr/board/list.asp?BoardID=0006"><img src="../img/footer/cooperative_2.png" alt="한국장애인단체총연합회" /></a>
              <a href="https://knto.or.kr/index"><img src="https://cdn.visitkorea.or.kr/resources/images/common/logo_foot_gg.png" alt="한국관광공사" /></a>
              <a href="https://www.mcst.go.kr/kor/main.jsp"><img src="https://cdn.visitkorea.or.kr/resources/images/common/logo_foot_mg.png" alt="문화체육관광부" /></a>
            </div>
          </div>          
    </div>
</footer>
`;

class FooterComponent extends HTMLElement {
  constructor() {
    super();
    const shadow = this.attachShadow({ mode: 'open' });
    shadow.appendChild(template.content.cloneNode(true));
  }
}

customElements.define("footer-component", FooterComponent);
