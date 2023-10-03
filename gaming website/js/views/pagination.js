import View from "./View.js";

class Pagination extends View {
  _parentEl = document.querySelector(".pagination__results");
  addhandler(handler) {
    this._parentEl?.addEventListener("click", (e) => {
      const button = e.target.closest(".pagination__button");
      if (!button) return;
      const page = +button.dataset.page;
      handler(page);
    });
  }
  generatemarkup() {
    const Numpages = Math.ceil(this._data.count / this._data.resultPerPage);
    const pages = [];
    for (let index = 1; index <= Numpages; index++) {
      pages.push(index);
    }
    return pages.map(
      (page) => `<a class="pagination__button" data-page=${page}>
        <span class="pagination__number">${page}</span>
      </a>`
    );
  }
}

export default new Pagination();
