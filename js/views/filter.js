class Filter {
  _parentEl = document.querySelectorAll(".option");
  addhandler(handler) {
    const ob = [{ filterr: "parent_platforms", option: "2" }];
    this._parentEl?.forEach((option) =>
      option.addEventListener("click", (e) => {
        const filtercontent = option.querySelector(".head").dataset.filter;
        if (!e.target.classList.contains("menu__option")) return;
        const filterOption = e.target.id;
        //i want to loop  through the objects array and search if THE VALue of the property filter is equal to the clicked property
        //if they are equal i do not wanna push a new object i will just change the value of the options
        //if they are not equal i will add a new filter object
        //i used some cause i can break out of the loop instead of the foreach
        let found = true;
        ob.some((o) => {
          if (o.filterr === filtercontent) {
            o.option = filterOption;
            found = true;
            return true;
          } else found = false;
        });
        if (!found) ob.push({ filterr: filtercontent, option: filterOption });
        handler(ob);
      })
    );
  }
}
export default new Filter();
