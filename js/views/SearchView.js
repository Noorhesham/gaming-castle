import View from "./View.js";

export class SearchView extends View{
  _errorMessage='Sorry there is no resault for your search ! try another one ...'
    _parentEl=document.querySelector('.search_results');
    plat=false;
    _errorMessage='sorry ☹️☹️... there are no results for your search! try to use other keywords..😥😥'
    searchtitle(query,count){
      document.querySelector('.search__titlee').innerHTML=''
      document.querySelector('.search__titlee')?.insertAdjacentHTML('afterbegin',`<h1 class="search__title sub-title">Results for ${query} are <span class="count">${count}</span><i class="fa-solid fa-arrow-right moving-icon" style="color: #3a7cee;"></i> <span class='note'>default search is for playstaion top rating</span></h1> `)
    }
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
        handler2(this._data[this._data.findIndex(game=>game.id===Number(button.dataset.id))],button.dataset.id)
      })

    }
generatemarkup(){
  return !this.plat?this._data.map(d=>`<div class="game">
    <div class="game__background">
      <img class="game__pic"
        src="${d.background}"
        alt=""
      />
      <div class="game__plattforms">
      ${d.plattformP?.map(p=>`<div class="game__plattform ${
      p.platform.name==='PlayStation'?'ps':
      p.platform.name==='PC'?'def':
      p.platform.name==='Xbox'?'xbox1':''}">${p.platform.name}</div>`).join('')}
      </div>
    </div>
    <h2 class="game__title">${d.title}</h2>
    <div class="game__description">
    ${d.genres.map(genre=>`<div class="game__genre">${genre.name}</div>`).join('')}
    </div>
    <div class="date">${d.realese}</div>
    <a href="" class="wishlist-button button-nomargin" data-id=${d.id} id='addwishlist'>
    <div class='btns'>
    <a href="gamedetailed.html" id='detail' class="button default game__button" data-detail=${d.id}>discover more<i class="fa-solid fa-angle-right iconn"></i></a>
    </a> 
    <button id='addwishlist' data-id=${d.id} class='meow' aria-label="heart" data-ico="❤️" style="--hue: 344deg"></button> 
    </div>
  </div>`).join(''):this._data.map(d=>`<div class="game game-gen game-gen-result">
  <div class="game__background game__background-gen game__background-gen-result">
    <img class="game__pic"
      src="${d.background}"
      alt=""
    />
    <div class="game__plattforms">
    ${d.plattformP.map(p=>`<div class="game__plattform ${
    p.platform.name==='PlayStation'?'ps':
    p.platform.name==='PC'?'def':
    p.platform.name==='Xbox'?'xbox1':''}">${p.platform.name}</div>`).join('')}
    </div>
  </div>
  <h2 class="game__title">${d.title}</h2>
  <div class="game__description">
  ${d.genres.map(genre=>`<div class="game__genre">${genre.name}</div>`).join('')}
  </div>
  <div class="date">${d.realese}</div>
  <div class='btns'>
  <a href="gamedetailed.html" id='detail' class="button default game__button" data-detail=${d.id}>discover more<i class="fa-solid fa-angle-right iconn"></i></a>
  <a href="" class="wishlist-button button-nomargin" data-id=${d.id} id='addwishlist'><h2 class="game__title d-2">wishlist<i class="fa-regular fa-heart margin-r-s" style="color: #2974f5;"></i></h2>
  </a> 
</div></div>`).join('')
    }
}
export default new SearchView();
    // <button class="game__title wishbutton">wishlist<i class="fa-regular fa-heart margin-r-s" style="color: white;"></i></button>
