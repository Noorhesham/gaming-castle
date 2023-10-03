export default class View{
    _data;
    render(data){
        this._data=data;
        if(!this._data.length) this.renderError()
        const markup = this.generatemarkup();
        this._clear()
        this._parentEl?.insertAdjacentHTML('afterbegin', markup);
    }
    _clear() {
      if(this._parentEl) this._parentEl.innerHTML = '';
      }
      loadSpinner() {
        const html = `<div class="spinner">
            <svg>
              <use href="${icons}#icon-loader"></use>
            </svg>
            </div>`;
        this._clear();
        this._parentEl?.insertAdjacentHTML('afterbegin', html);
      }
      renderError(message=this._errorMessage){
        const markup=`<div class="error">
        <div>
         
        </div>
        <p>${message}!</p>
      </div>`
        this._clear();
        this._parentEl?.insertAdjacentHTML('afterbegin',markup)
      }
}