import View from "./View.js";

export class Gameview extends View{
    _parentEl=document.querySelector('.Game-details');
    clicked;
    addhandler(handler,handler2){
      this._parentEl?.addEventListener('click',(e)=>{
        e.preventDefault()
        const btn=e.target.closest('#detail');
      if(!btn) return;
      const id=btn.dataset.detail;
      handler(id)
      })
      this._parentEl?.addEventListener('click',(e)=>{
        e.preventDefault()
        const button=e.target.closest('#addwishlist');
        if(! button) return;
        handler2(this._data,button.dataset.id)
      })
    }
    viewscreen(slider){
      const close=function(){
        document.querySelector('.slider-screen ').classList.add('hidden-2')
        document.querySelector('.pagi-screen').classList.add('hidden-2')
        document.querySelector('header').classList.remove('hidden-2')
        document.querySelector('.slider-screen ').classList.add('hidden-2')
        document.querySelector('.exist').classList.add('hidden-2')
        document.querySelector('.overlay').classList.add('hidden-2')
        document.documentElement.style.overflow = 'auto';
        document.body.scroll = "yes";
      }
      let dataset=0;
      document.querySelector('.screenshot-slider')?.addEventListener('click',function(e){
        const photo=e.target.closest('.screen-slide__photo')
        dataset=e.target.closest('.screen-slide').dataset.slide;
        if(!photo) return;
        document.querySelector('.slider-screen ').classList.remove('hidden-2')
        document.querySelector('.slider-screen ').classList.add('screenshot-active')
        document.querySelector('.pagi-screen').classList.remove('hidden-2')
        document.querySelector('.pagi-screen').classList.add('pagi-active')
        document.querySelector('header').classList.add('hidden-2')
        document.querySelector('.overlay').classList.remove('hidden-2')
        document.querySelector('.exist').classList.remove('hidden-2')
        document.documentElement.style.overflow = 'hidden';
        document.body.scroll = "no";
        slider.slideMove(dataset)
      })
      document.querySelector('.exist')?.addEventListener('click',close.bind(this));
      document.querySelector('.overlay')?.addEventListener('click',close.bind(this));

      }
    
    generatemarkup(){
        return `        <div class="overlay hidden-2"></div>
        <div class="slider slider-1">
        <div class="slide-1 slided">
            <div class="gradient"></div>
          <div class="slide__background slide__background-static">
            <img src=${this._data.background} class="slide__photo slide__photo-3">
          </div>
          <div class="game-info">
                <h2 class="game-name">${this._data.title}</h2>
                <div class="bold-title">${this._data.developers[0].name}</div>
                <div class="game__plattforms game__plattforms-1">
                <div class="sub-title sub-title-1 margin-r-s">avilable on 🎮</div>
                ${this._data.platforms.map(plat=>{
                return `<div class="game__plattform game__plattform-1">${plat.platform.name}
                ${plat.platform.name.includes("PlayStation")?`<i class="fa-brands fa-playstation margin-l-s icon-size" style="color: #3878e5;"></i>`:
                plat.platform.name.includes("PC")?'<i class="fa-brands fa-windows margin-l-s icon-size" style="color: #ffffff;"></i>':
                plat.platform.name.includes('Xbox')?'<i class="fa-brands fa-xbox margin-l-s icon-size" style="color: #1eae3b;"></i>':''}</div>`
                }).join('')}
                </div>
                <div class="game__plattforms game__plattforms-1">
              <div class="bold-title margin-r-s">rating 🤩</div>
              ${function fun(){
                const arr=[]
                for(var i =0; i < this._data.rating; i ++)arr.push(`<div class="game__icon"><i class="fa-solid fa-star" style="color: #ffed24;"></i></div>`)   
                return arr.join('')}.call(this)}
            </div>
           
              <a class="btn-glitch-fill" data-id=${this._data.id} id='addwishlist'>
                <span class="text">//add to wishlist</span><span class="text-decoration">_</span><span class="decoration">&rArr;</span>
              </a>
                <div class="sub-title sub-title-1 margin-r-s margin-top-s">Release date: ${this._data.realese?this._data.realese:'not know yet'} 🗓️</div>
              </div>
            </div>
            
      </div>
       <div class='outerslider'>
       <span class="game-btn game-buttonprev game-buttonprev-3" id="left"
       ><i class="fa-solid fa-circle-chevron-left" style="color: #234fd1;"></i></span>
     <span class="game-btn game-buttonnext game-buttonnext-3" id="right"
       ><i class="fa-solid fa-circle-chevron-right" style="color: #234fd1;"></i>
     </span>
       <div class="screenshot-slider">
    
       </div>
       </div>         


      <div class="slider slider-1">
        <div class="slide-1 slided">
            <div class="gradient gradient-2"></div>
          <div class="slide__background slide__background-height">
            <img src=${this._data.backgroundsec} class="slide__photo slide__photo-4">
            <div class="game-info game-info-2">
            <div class="box__title box__title-3">What is ${this._data.title}?</div>
            <div class="game__paragraph game-info__paragraph">
                ${this._data.description}
            </div>
        </div>
        </div>
        </div>
        </div>

        <div class='tags'>
        <h2 class="game-name game-name-2">tags for ${this._data.title}</h2>
        <div class="game__tags">
        ${this._data.tags.map(tag=>`<div class="game__genre">${tag.name}</div>`).join('')}
    </div>
    </div>
        <h2 class="tech__title center-title margin-bottom">games like ${this._data.title}</h2>
          <div class="search_results search_results-2">
          <img src=${this._data.screenshots[Math.floor(Math.random()*this._data.screenshots.length)]?.image} class='imagea'>
        ${this._data.similargames.length!==0?this._data.similargames.map(d=>`<div class="game game-gen">
        <div class="game__background game__background-gen">
          <img class="game__pic"
            src="${d.background_image}"
            alt=""
          />
          <div class="game__plattforms">
          ${d.parent_platforms.map(p=>`<div class="game__plattform ${
          p.platform.name==='PlayStation'?'ps':
          p.platform.name==='PC'?'def':
          p.platform.name==='Xbox'?'xbox1':''}">${p.platform.name}</div>`).join('')}
          </div>
        </div>
        <h2 class="game__title">${d.name}</h2>
        <div class="game__description">
        ${d.genres.map(genre=>`<div class="game__genre">${genre.name}</div>`).join('')}
        </div>
        <div class="date">${d.released}</div>
        <a href="gamedetailed.html" id='detail' class="button default game__button" data-detail=${d.id}>discover more<i class="fa-solid fa-angle-right iconn"></i></a>
      </div>`).join(''):`<h2 class="sub-title sub-title-primary alert">
      <span class="closebtn">❗❗</span>
      there is no similar games for ${this._data.title} 😭☹️!!!</h2>`} 
        </div>`
        }

}

export default new Gameview();