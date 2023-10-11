import View from "./View.js";

export class Searchsuggest extends View{

    _parentEl=document.querySelector('.result-box');
    _errorMessage='Sorry there is no resault for your search ! try another one ...☹️☹️'

    addhandler(handler){
        document.querySelector('#search-form').addEventListener('keyup',()=>{
        const query=document.querySelector('#search').value;
        if(query) {
          handler(query)  
          document.querySelector('.result-box')?.classList.remove('hidden')
        }
        else{
            this._clear();
            document.querySelector('.result-box')?.classList.add('hidden')
        } 
        })
        document.querySelector('.closebtn')?.addEventListener('click',()=>{
          document.querySelector('#search').value=''
          this._clear();
          document.querySelector('.result-box').classList.add('hidden')
        })
    }
    addhandler2(handler){
        this._parentEl?.addEventListener('click',(e)=>{
            e.preventDefault()
            const btn=e.target.closest('#detail');
          if(!btn) return;
          const id=btn.dataset.detail;
          handler(id)})
    }
    generatemarkup(){
        return` 
        <ul class="search-suggestions">
        ${this._data.map(d=>` <a href="gamedetailed.html" id='detail' data-detail=${d.id} class="suggestion">
        <div class="suggestion__title">${d.title}</div>
        <img class="suggestion__photo" src='${d.background}'>
        </a>`).join('')}
        </ul>
      `
    }
}
export default new Searchsuggest()