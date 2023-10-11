// import SearchView from "./SearchView.js";
import View from "./View.js";

class Gamefromgenres extends View{
    _parentEl=document.querySelector('.game_results');
    addhandler(handler,handler2,handler3){
      this._parentEl?.addEventListener('click',(e)=>{
        e.preventDefault()
        const btn=e.target.closest('#detail');
      if(!btn) return;
      const id=btn.dataset.detail;
      console.log(id);
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
        return this._data.map(d=>`<div class="game game-gen">
        <div class="game__background game__background-gen">
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
export default new Gamefromgenres();