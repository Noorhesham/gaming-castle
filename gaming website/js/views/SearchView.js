import View from "./View.js";

class SearchView extends View{
  _errorMessage='Sorry there is no resault for your search ! try another one ...'
    _parentEl=document.querySelector('.search_results');
    searchtitle(query,count){
      document.querySelector('.search__titlee').innerHTML=''
      document.querySelector('.search__titlee').insertAdjacentHTML('afterbegin',`<h1 class="search__title sub-title">Results for ${query} are <span class="count">${count}</span><i class="fa-solid fa-arrow-right moving-icon" style="color: #3a7cee;"></i> <span class='note'>default search is for playstaion top rating</span></h1> `)
    }
generatemarkup(){
    return this._data.map(d=>`<div class="game">
    <div class="game__background">
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
    <a href="gamedetailed.html" class="button default game__button" data-detail=${d.id}>discover more<i class="fa-solid fa-angle-right iconn"></i></a>
  </div>`).join('')
    }
}
export default new SearchView();