class Menu {
  constructor(parent) {
    this.parent = parent;
  }
  addhandler() {
    const handler = (e) => {
      e.stopPropagation();
      const activeoption = e.target.closest(".option");
      if (!activeoption) return;
      optionss.forEach((option) =>option!==activeoption?this.remove(option):'');
      this.add(activeoption);
      const link = e.target.closest(".menu__option");
      const select = activeoption.querySelector(".select");
      if (!link) return;
      select.firstElementChild.innerText = link.innerText;
      activeoption.classList.add("option-active");
      this.remove(activeoption);
    };
    this.parent.addEventListener("click", handler);
    document.addEventListener("click",(e)=>!e.target.classList.contains('option')?this.remove(this.parent):'');
  }
  remove = (parent) => {
    if (!parent) return;
    const menu = parent.querySelector(".menu");
    const select = parent.querySelector(".select");
    const icon = parent.querySelector(".menu__icon");
    menu?.classList.remove("menu-active");
    icon?.classList.remove("icon-active");
    options?.classList.remove("options-active");
  };
  add = (parent) => {
    if (!parent) return;
    const menu = parent.querySelector(".menu");
    const select = parent.querySelector(".select");
    const icon = parent.querySelector(".menu__icon");
    options?.classList.toggle("options-active");
    menu?.classList.toggle("menu-active");
    icon?.classList.toggle("icon-active");
  };
}
const options = document.querySelector(".options");
const optionss = document.querySelectorAll(".option");
const plat = new Menu(document.querySelector(".platt"));
  const genre = new Menu(document.querySelector(".genre"));
const store = new Menu(document.querySelector(".stores"));
plat.addhandler();
genre.addhandler();
store.addhandler();
