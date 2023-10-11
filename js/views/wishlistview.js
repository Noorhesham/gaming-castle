import View from "./View.js";

export class Wishlist extends View{
    _errorMessage='have not added any items to your wishlist yet ... add some😊😁🎮'
    _parentEl=document.querySelector('.wishlist-box');
    addhandler(handler,handler2,handler3){
    document.querySelector('#wishlistparent')?.addEventListener('click',(e)=>{
      this._parentEl.classList.remove('hidden-2');
        handler()
    })
    this._parentEl?.addEventListener('click',(e)=>{
        const btn=e.target.closest('.delete')?.dataset.del;
        if(!btn) return;
        handler2(btn)
        // delete-wish
    })
    this._parentEl?.addEventListener('click',(e)=>{
        const id=e.target.closest('.suggestion')?.dataset.detail;
        console.log(id);
        if(!id) return;
        handler3(id)
        // delete-wish
    })
    document.addEventListener('click',(e)=>{if(!e.target.classList.contains('wish')) this._parentEl.classList.add('hidden-2')})
    }
    generatemarkup(){
        return `<h1 class='tech__title center-title wishlist__title'>my wishlist ❤️</h1>
       ${this._data.map(d=>`<div class='wish__container'>
        <a href="gamedetailed.html" id='detail' data-detail=${d.id} class="suggestion suggestion-2">
        <div class="suggestion__title">${d.title}</div>
        <img class="suggestion__photo" src='${d.background}'>
        </a><div class='delete-wish wish'><ii class="fa-solid fa-trash wish delete" data-del=${d.id} style="color: #d1d1d1;"></ii></div>
        </div>`).join('')}`
    }

}

export default new Wishlist()