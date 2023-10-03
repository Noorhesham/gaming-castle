import Slider from "./slider.js";

export default class MiniSlider {
  constructor(slider, slide, buttons, isdragstart, prevpagex, prevscrollleft) {
    this.buttons = buttons;
    this.prevscrollleft = prevscrollleft;
    this.prevpagex = prevpagex;
    this.isdragstart = isdragstart = false;
    this.slider = slider;
  }
  render(data, large = false, video = false) {
    data.forEach((slide, j) => {
      this.slider.insertAdjacentHTML(
        "beforeend",
        this.generatemarkupSlide(slide, j, large, video)
      );
    });
  }
  generatemarkupSlide(s, j, large, video) {
    if (!large && !video)
      return `<div  class="mini-slide" id=${s.id}>
        <div  class="mini-slide__background">
          <img
            src="${s.background_image}"
            alt=""
            class="mini-slide__photo"
            draggable="false"
          />
        </div>
        <div class="mini-slide__info">
          <a href="gamedetailed.html" id='detail' class="mini-slide__title">${s.name}</a>
        </div>
      </div>`;
    else if (large)
      return ` <div class="game-slide" id=${s.id}>
      <div class="game-slide__info">
        <h2 class="game-slide__title">${s.name}</h2>
        <p class='game-slide__paragraph'>${s.detail}</p>
        <a href="gamedetailed.html" id='detail' data-detail=${s.id} class="${s.class} button button-nomargin">discover more</a>
        </div>
      <div class="game-slide__background">
        <img
          src="${s.background}"
          alt=""
          class="game-slide__photo"
          draggable="false"
        />
      </div>
    </div>`;
    else if (video)
      return ` <div class="game-slide game-slide-2">
    <div class="video">
      <iframe  class="game-slide__photo video__player video__iframe" src="${s.video}"frameborder="0"allowfullscreen allow="autoplay"></iframe>            
      <span class="circle video__icon"><i class="fa-solid fa-play" style="color: #f4f2f2;"></i>   </span>
      <img src="${s.poster}" class="game-slide__photo video__cover" alt="">
      <i class="fa-brands fa-youtube youtube__icon" style="color: #fd1c27;"></i>
         </div>  `;
  }
  infinte() {
    let cardperview = Math.round(
      this.slider.offsetWidth / this.slider.firstElementChild.offsetWidth
    );
    const children = [...this.slider.children];
    children
      .slice(-cardperview)
      .reverse()
      .forEach((card) =>
        this.slider.insertAdjacentHTML("afterbegin", card.outerHTML)
      );
    children
      .slice(0, cardperview)
      .forEach((card) =>
        this.slider.insertAdjacentHTML("beforeend", card.outerHTML)
      );
  }
  dragstart(e) {
    this.isdragstart = true;
    this.prevpagex = e.pageX;
    this.prevscrollleft = this.scrollLeft;
    this.classList.add("dragging");
  }
  dragstop() {
    this.isdragstart = false;
    this.classList.remove("dragging");
  }
  dragging(e) {
    if (!this.isdragstart) return;
    e.preventDefault();
    let positiondiff = e.pageX - this.prevpagex;
    this.scrollLeft = this.prevscrollleft - positiondiff;
  }
  infintescroll() {
    if (this.scrollLeft === 0) {
      this.scrollLeft = this.scrollWidth - 2 * this.offsetWidth;
    } else if (
      Math.floor(this.scrollLeft) ===
      this.scrollWidth - this.offsetWidth
    ) {
      this.scrollLeft = this.offsetWidth;
    }
  }
  sliderMove(infinte = false) {
    this.slider.addEventListener("mousedown", this.dragstart);
    this.slider.addEventListener("mousemove", this.dragging);
    this.slider.addEventListener("mouseup", this.dragstop);
    if (infinte) this.slider.addEventListener("scroll", this.infintescroll);
  }
  clickButtons() {
    const width = this.slider.firstElementChild.offsetWidth;
    this.buttons.forEach((button) => {
      button.addEventListener(
        "click",
        () => (this.slider.scrollLeft += button.id === "left" ? -width : +width)
      );
    });
  }
}
