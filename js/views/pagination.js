import View from "./View.js";

class Pagination extends View {
  _parentEl = document.querySelector(".pagination__results");
  page=1
  addhandler(handler) {
    this._parentEl?.addEventListener("click", (e) => {
      const button = e.target.closest(".pagination__button");
      if (!button) return;
      this.page = Number(button.dataset.page);
      button.classList.add('active-button')
      handler(this.page);
    });
  }
  generatemarkup() {
    const Numpages = Math.ceil(this._data.count / this._data.resultPerPage);
    console.log(Numpages);
    const pages = [];
    for (let index = this.page; index <= Numpages &&pages.length<=10;index++) pages.push(index)  
    return `${pages.map(page=>`<a class="pagination__button" data-page=${page}>
    <span class="pagination__number">${page}</span>
  </a>`).join('')}`
    
  }
}

export default new Pagination();
