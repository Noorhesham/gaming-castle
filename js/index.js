import Slider from "./slider.js";
import * as modal from './modal.js';
//Search setup
const searchBox = document.querySelector(".search"),
  input = document.querySelector(".search__input"),
  btn = document.querySelector(".search__button");
  //SEARCH ANIMATION
const search = function (e) {
  if (e.target.classList.contains("srch-btn")) {
    document.querySelector('.closebtn').classList.remove('hidden-2')
    searchBox.classList.add("search__active");
    input.classList.add("search__input-show");
    btn.classList.add("search__button-show");
    input.focus();
  } else {
    document.querySelector('.closebtn').classList.add('hidden-2')
    document.querySelector('.result-box')?.classList.add('hidden')
    searchBox.classList.remove("search__active");
    input.classList.remove("search__input-show");
    input.value = "";
    btn.classList.remove("search__button-show");
  }
};
document.addEventListener("click", search);

//MOVING TO RESULTS WHEN SUBMIT QUERY
const getQuery= async function(e){
   e.preventDefault()
  const query=document.querySelector('#search').value;
  localStorage.setItem('search',query)
  if(!query) return;
  input.value = "";
  window.location="results.html"
}

document.querySelector('#search-form').addEventListener('submit',getQuery)


//addtional feature search
// input.addEventListener('keyup',()=>{
//   console.log(input.value);

// })





//ACTIVE LINE ON NAV
const siblings=document.querySelectorAll('.nav__link');
const activeLine=(entry)=>{
  if (!entry.isIntersecting) return;
  else{
    const id=entry.target.getAttribute('id');
    const active=document.querySelector(`.nav__link[id="${id}"]`);
  siblings.forEach(sibling=>{
    if(sibling!=active) sibling?.firstChild?.classList.remove('active-nav');
  })
  active?.firstChild.classList.add('active-nav');
  }
}
const animated=(entries)=>{
  entries.forEach(entry=>{
    if (!entry.isIntersecting) return;
    else{
      entry.target.classList.add('section-active')
    }
  })
}
const activesec=(entries)=>entries.forEach(entry=>activeLine(entry))
const sectionActive=new IntersectionObserver(activesec,{root:null,threshold:.15,rootMargin:'-10px'})
const sectionAnimation=new IntersectionObserver(animated,{root:null,threshold:.15,rootMargin:'-10px'})
const sections=document.querySelectorAll('section').forEach(section=>{
  sectionActive.observe(section);
  sectionAnimation.observe(section);
});
document.querySelectorAll('.box').forEach(box=>sectionAnimation.observe(box));

let lastscroll=window.pageYOffset;
const nav=document.querySelector('.header')
const scroll=function(){
  const curScroll=window.pageYOffset;
  if(curScroll>nav.getBoundingClientRect().height) nav.classList.add('sticky')
  if(curScroll<=lastscroll) nav.classList.remove('sticky'); 
  lastscroll=curScroll
}
window.addEventListener('scroll',scroll);

// window.addEventListener('contextmenu', function (e) { 
//   e.preventDefault(); 
// }, false);