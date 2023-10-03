export default class Slider {
  constructor(slider, pagination, curslide,clicked) {
    this.clicked=false
    this.slider =slider;
    this.pagination = pagination;
    this.curslide = 0;
  }
  render(data) {
    data.forEach((slide, j) => {
      this.slider.insertAdjacentHTML(
        "beforeend",
        this.generatemarkupSlide(slide, j)
      );
      this.pagination.insertAdjacentHTML(
        "beforeend",
        this.generatemarkuppagination(slide, j)
      );
    });
  }
  generatemarkupSlide(s, j) {
    return `
        <div class="slide" id=${j}>
        <div class="slide__background">
         ${s.video?` <video class="slide__photo" muted="true" autoplay="true" loop  ="true" playsinline='true'>
         <source type="video/mp4" src="${s.image}">
       </video>`:`<img
       src="${s.image}"
       alt="" class="slide__photo" draggable="false"
     />`} 
        </div>
        <div class="slide__info ${s.photo?'infoico':''}">
        ${s.photo?`<img src="${s.icon}"alt="" class="icon"/><h3 class="sub-title">${s.subtitle}</h3>`
        :`<h2 class="title">${s.title}<h3 class="sub-title">${s.subtitle}</h3></h2>`}
        <p class="paragraph">
        ${s.content}
        </p>
        ${s.button?`<a href="${s.link}" class="button ${s.btnclasses}">${s.button}<i class="fa-solid fa-angle-right iconn"></i></a>`:''}
      </div>
        </div>
        `;
  }
  generatemarkuppagination(s, j) {
    return `  <div class="slide__button" data-slide="${j}">
        ${s.video?`<img
        src="${s.poster}"
        alt="" class="slide__photo-small"
      />`:`<img
          src="${s.image}"
          alt="" class="slide__photo-small"
        />`}
        <span></span>
      </div>`;
  }
  slideMove() {
    const slides = document.querySelectorAll(".slide");
    if (this.curslide === slides.length) this.curslide = 0;
    let activeslide = slides[this.curslide];
    slides.forEach((s, i) => {
      s.lastElementChild.classList.remove('paragraph-active')
      s.classList.remove("slided");
      activeslide.classList.add("slided");
      activeslide.lastElementChild.classList.add('paragraph-active')
      s.style.transform = `translateX(${(i - this.curslide) * 100}%)`;
    });
    this.activeButtons()
    this.curslide++;
  }

  moveSlider = () => {
    if(!this.clicked){
    this.slideMove();
    this.s=setTimeout(this.moveSlider.bind(this), 5100);}
  };

  clickButtons() {
    const buttons = document.querySelectorAll(".slide__button");
    buttons.forEach((button) =>{
      button.addEventListener("click", () => {
        this.clicked=true;
        this.curslide = +button.dataset.slide;
        this.slideMove();
      })}
    );
  }
  activeButtons(){
    const buttons = document.querySelectorAll(".slide__button");
    buttons.forEach((button) =>{
      button.classList.remove('active');
      button.lastElementChild.classList.remove('load')
      if(+button.dataset.slide===this.curslide){
        button.classList.add('active');
        if(!this.clicked)button.lastElementChild.classList.add('load')
      }
    });
  }
}
