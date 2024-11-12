class MenuDrawer extends HTMLElement {
  constructor() {
    super();
    this.nav = this.querySelector('nav');

    //setup Functions
  }
  // define methods
}

customElements.define('menu-drawer', MenuDrawer);

class TopHeader extends HTMLElement {
  constructor() {
    super();
    this.nav = this.querySelector('nav');
    this.hamburger = this.querySelector('#hamburger');
    //setup Functions

    this.hamburger.addEventListener('click', this.handleHamburgerClick);
  }

  // define methods
  handleHamburgerClick(e) {
    // if the hamburger is not active, add the active class
    if (this.classList.contains('open')) {
      this.classList.remove('open');
      return;
    }
    this.classList.add('open');
  }
}

customElements.define('top-header', TopHeader);
