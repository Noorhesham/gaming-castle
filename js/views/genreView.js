import View from "./View.js";

class Genre extends View{
    _parentEl=document.querySelector('.search__genres');
    generatemarkup(){
        return this._data.map(d=>`<a data-id=${d.id} class="genre__title">${d.name}</a>`).join('')
        }
        addhandler(handler) {
            this._parentEl?.addEventListener("click", (e) => {
              const button = e.target.closest(".genre__title");
              if (!button) return;
              document.querySelectorAll('.genre__title').forEach(btn=>btn.classList.remove('active-button'))
              button.classList.add('active-button')
              handler(button.dataset.id);
            });
          }
}
export default new Genre();