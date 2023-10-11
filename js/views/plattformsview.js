import View from "./View.js";

export class plattformview extends View{
    _parentEl=document.querySelector('.platforms');
    addhandler(handler){
        const p=this._parentEl;
        this._parentEl?.addEventListener('click',(e)=>{
            const id=e.target.closest('.game-plat').id;
            if(!id) return;
            console.log(p);
            p.classList.add('button-active')
            handler(id);
        })
        
    }
    
    generatemarkup(){
        return `${this._data.map(d=>`<div class="game game-plat" id=${d.id}>
        <div class="game__background game__background-plat">
          <img class="game__pic"
            src="${d.image_background}"
            alt=""
          />
        </div>
        <h2 class="game__title">${d.name}</h2>
        </div>`).join('')}`
        }
}
export default new plattformview()