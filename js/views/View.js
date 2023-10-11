export default class View{
    _data;
    render(data){
      if(!data || (Array.isArray(data) &&data.length===0)) return this.renderError();
        this._data=data;
        if(!this._data.length) this.renderError()
        const markup = this.generatemarkup();
        this._clear()
        this._parentEl?.insertAdjacentHTML('afterbegin', markup);
    }
    _clear() {
      if(this._parentEl) this._parentEl.innerHTML = '';
      }
      loadSpinner(small=false) {
        const html = `<div class="spinner ${small?"spinsmall":''}">
        <i class="fa-solid fa-spinner spinning" style="color: #2d73eb;"></i>
            </div>`;
        this._clear();
        this._parentEl?.insertAdjacentHTML('afterbegin', html);
      }
      renderError(message=this._errorMessage){
        console.log(message,this);
        const markup=`<h2 class="sub-title sub-title-primary alert"> ${message}</h2></div>`
        this._clear();
        this._parentEl?.insertAdjacentHTML('afterbegin',markup)
      }
}