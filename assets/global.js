class TopHeader extends HTMLElement {
  constructor() {
    super();
    this.nav = this.querySelector('.header__nav-bar');
    this.hamburger = this.querySelector('#hamburger');
    this.headerElements = [this.nav, this.hamburger];
    this.outerLinks = [...this.nav.querySelectorAll('li.has-submenu')];
    this.hasTitleLinksClickListener = false;

    // attach event listerners
    this.hamburger.addEventListener('click', this.handleHamburgerClick.bind(this));

    window.addEventListener('resize', this.handleWindowResize.bind(this));
    window.addEventListener('load', this.handleWindowResize.bind(this));
  }

  // define methods
  handleHamburgerClick() {
    // toggle the active state of the hamburger
    this.hamburger.classList.contains('open')
      ? this.headerElements.forEach((item) => this.closeItems(item))
      : this.headerElements.forEach((item) => this.openItems(item));
  }

  handleMBTitleLinkClick(e, link) {
    e.preventDefault();

    // show the submenu, if it exists
    link.classList.contains('has-submenu') && !link.classList.contains('open')
      ? this.openItems(link)
      : this.closeItems(link);
  }

  removeMBTitleEvents() {
    this.outerLinks.forEach((link) => {
      this.closeItems(link);
      link.querySelector('a').removeEventListener('click', link._clickHandler);
      delete link._clickHandler;
    });
    this.hasTitleLinksClickListener = false;
  }
  addMbTitleEvents() {
    this.outerLinks.forEach((link) => {
      link._clickHandler = (e) => this.handleMBTitleLinkClick(e, link);
      link.querySelector('a').addEventListener('click', link._clickHandler);
    });
    this.hasTitleLinksClickListener = true;
  }

  handleWindowResize() {
    const BP = 768;
    if (window.innerWidth <= BP) {
      if (!this.hasTitleLinksClickListener) {
        this.addMbTitleEvents();
      }
    } else {
      if (this.hasTitleLinksClickListener) {
        this.removeMBTitleEvents();
      }
    }
  }

  openItems(item) {
    item.classList.add('open');
  }
  closeItems(item) {
    item.classList.remove('open');
  }
}
customElements.define('top-header', TopHeader);
