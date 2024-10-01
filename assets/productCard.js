// Create a class for the element
if (!customElements.get('product-card')) {
  customElements.define(
    'product-card',
    class ProductCardForm extends HTMLElement {
      constructor() {
        super();
        this.addForm = this.querySelector('form[action$="/cart/add.js"]');

        this.addForm.addEventListener('submit', async (e) => {
          e.preventDefault();
          let formData = new FormData(this.addForm);

          const res = await fetch(window.Shopify.routes.root + 'cart/add.js', {
            method: 'POST',
            body: formData,
          })
            .then((response) => {
              return response.json();
            })
            .catch((error) => {
              console.error('Error:', error);
            });
        });
      }
    }
  );
}
