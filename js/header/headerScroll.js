// js/header/headerScroll.js
document.addEventListener("DOMContentLoaded", () => {
  const headerWrapper =
    document
      .querySelector("header-component")
      ?.shadowRoot?.querySelector(".header-wrapper") ||
    document.querySelector(".header-wrapper");

  const onScroll = () => {
    if (window.scrollY > 0) {
      headerWrapper.classList.add("scrolled");
    } else {
      headerWrapper.classList.remove("scrolled");
    }
  };

  window.addEventListener("scroll", onScroll);
});
