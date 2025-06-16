document.addEventListener("DOMContentLoaded", function () {
  var splide = new Splide("#swiper-container-popular-dishes", {
    type: "loop",
    perPage: 5,
    focus: "center",
    gap: "30px",
  });

  splide.mount();
});
