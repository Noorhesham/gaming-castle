import { AJAX } from "./helpers.js";
import { KEY } from "./config.js";
import MiniSlider from "./minislider.js";
import Slider from "./slider.js";
import { getGame } from "./modal.js";
import View from "./views/gamevVew.js";
//NEWS SLIDER DATA
const newsSlider = [
  {
    image: require("url:../img/spider-man-2-video-hero-banner-desktop-01-en-19sep23.mp4"),
    subtitle: "Be Greater. Together.",
    content:
      "Peter Parker & Miles Morales return for an exciting new adventure in the acclaimed Marvel’s Spider-Man franchise, out October 20 for PS5.",
    btnclasses: "spider",
    button: "swing there",
    video: true,
    poster: require("../img/poster.webp"),
    photo: true,
    icon: require("../img/news1title.webp"),
  },
  {
    image: require("url:../img/cyberpunk-2077-phantom-liberty-video-hero-01-en-11sep23.mp4"),
    subtitle: "Freedom always comes at a price…",
    content:
      "As cyber-enhanced mercenary V, join secret agent Solomon Reed to unravel a web of sinister political machinations.",
    btnclasses: "default",
    button: "find out more",
    video: true,
    poster: require("../img/poster2.webp"),
    photo: true,
    icon: require("url:../img/iconcyber.webp"),
  },
  {
    image: require("../img/news1.webp"),
    subtitle: "play like never before..be greater",
    content:
      "Get the PlayStation®5 - Marvel's Spider-Man 2 Limited Edition Bundle",
    btnclasses: "spider",
    button: "swing there",
    photo: true,
    icon: require("../img/ps5icon.png"),
  },
  {
    image: require("../img/news2.webp"),
    subtitle: "Season 2 is now available",
    content:
      "Season 2 is available now on PS4 and PS5, with new maps, chaos and more to come",
    btnclasses: "default",
    button: "find out more",
    photo: true,
    icon: require("../img/news2title.webp"),
  },

  {
    image: require("../img/news4.jpg"),
    title: "Xbox Series S – 1TB",
    subtitle: "Power Your Dreams",
    content: "Best Value in Gaming",
    btnclasses: "xbox",
    button: "buy now",
    link: "https://www.xbox.com/en-US/consoles/xbox-series-s",
  },
];
const slider1 = new Slider(
  document.querySelector(".slider"),
  document.querySelector(".slide__pagination")
);
slider1.render(newsSlider);
setTimeout(slider1.moveSlider, 500);
slider1.clickButtons();

//GAMES FROM API DATA
const getgame2 = async function () {
  const MINIGAMES = await AJAX(`https://api.rawg.io/api/games?&key=${KEY}`);
  return MINIGAMES.results;
};
const slider2 = new MiniSlider(
  document.querySelector(".mini-slider"),
  document.querySelector(".mini-slide"),
  document.querySelectorAll(".slide-btn")
);
getgame2().then((d) => {
  slider2.render(d);
  slider2.sliderMove();
  slider2.clickButtons();
  slider2.addhandler(setgame)
});

//EXCLUSIVE GAMES DATA
const featuredgames = [
  {
    id: "799265",
    name: "The Last of Us Part I",
    background:require( "../img/game1.webp"),
    class: "default",
    detail:
      "Experience the emotional storytelling and unforgettable characters of The Last of Us, winner of over 200 Game of the Year awards.",
  },
  {
    id: "58550",
    name: "Ghost of Tsushima™ Director's Cut",
    background:require( "../img/game2.webp"),
    class: "default",
    detail:
      "Forge a new path and wage an unconventional war for the freedom of Tsushima in this expanded version of the open-world action-adventure from Sucker Punch Productions.",
  },
  {
    id: "2462",
    name: "uncharted 4",
    background: require("../img/uncharted.png"),
    detail:
      "Play as Nathan Drake and Chloe Frazer in their own standalone adventures as they are forced to confront their pasts and forge their own legacies.",
  },
  {
    id: "494384",
    name: "God of War™ Ragnarök",
    background: require("../img/game4.jpg"),
    detail:
      "From Santa Monica Studio comes the sequel to the critically acclaimed God of War (2018). Fimbulwinter is well underway. Kratos and Atreus must journey to each of the Nine Realms in search of answers.",
  },
  {
    id: "452642",
    name: "horaizon forbidden west",
    background:require( "../img/game5.webp"),
    detail:
      "Explore distant lands, fight bigger and more awe-inspiring machines, and encounter astonishing new tribes as you return to the far-future, post-apocalyptic world of Horizon. ",
  },
  {
    id: "452634",
    name: "Marvel's Spider Man Miles Morales",
    background:require( "../img/game6.webp"),
    class: "spider",
    detail:
      "Experience the rise of Miles Morales as the new hero masters incredible, explosive new powers to become his own Spider-Man.",
  },
];
const slider3 = new MiniSlider(
  document.querySelector(".game__Slider"),
  document.querySelector(".game-slide"),
  document.querySelectorAll(".game-btn")
);

const setgame=function(id){
  console.log(id);
    localStorage.setItem('id',id)
    if(!id) return;
    window.location="gamedetailed.html"
}

slider3.render(featuredgames, true);
slider3.infinte();
slider3.sliderMove(true);
slider3.clickButtons();
slider3.addhandler(setgame)

//VIDEOS DATA
const videos = [
  {
    video: "https://www.youtube.com/embed/EE-4GvjKcfs?si=mMd_tC0YafJgmVJl",
    poster: require("../img/game4.jpg"),
  },
  {
    video: "https://www.youtube.com/embed/bgqGdIoa52s?si=LWrhHCGupDqL0WLO",
    poster: require("../img/video2.jpg"),
  },
  {
    video: "https://www.youtube.com/embed/_jD6SoXMNy4?si=KBgh0l9GXvb4HLZK",
    poster: require("../img/video3.webp"),
  },
  {
    video: "https://www.youtube.com/embed/_jD6SoXMNy4?si=KBgh0l9GXvb4HLZK",
    poster: require("../img/video4.avif"),
  },
];
const slider4 = new MiniSlider(
  document.querySelector(".game__Slider-2"),
  document.querySelector(".game-slide"),
  document.querySelectorAll(".game-btn-2")
);
slider4.render(videos, false, true);
slider4.sliderMove(true);
slider4.clickButtons();
//SLIDING VIDEOS
document.querySelectorAll(".video").forEach((video) => {
  video.addEventListener("click", (e) => {
    const videocover = e.target.closest(".video__icon");
    if (!videocover) return;
    video.querySelector(".video__cover").classList.add("video__player");
    video.querySelector(".video__icon").classList.add("video__player");
    video.querySelector(".youtube__icon").classList.add("video__player");
    video.querySelector(".video__iframe").classList.remove("video__player");
    video.querySelector(".video__iframe").src += "?controls=0&autoplay=1";
  });
});
