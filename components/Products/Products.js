export default class Products {
    constructor() {
        this.classNameActive = 'products-element__btn_active';
        this.labelAdd = 'Добавить в корзину';
        this.labelRemove = 'Удалить из корзины';

    }

    addToCart(element, id) {
        const { pushProduct, products } = localStorageUtil.putProducts(id); 
        window.dispatchEvent(new CustomEvent("cartChanged", {
            detail: {products: products}
        }));

        if (pushProduct) {
            element.classList.add(this.classNameActive);
            element.innerHTML = this.labelRemove;
        } else {
            element.classList.remove(this.classNameActive);
            element.innerHTML = this.labelAdd;
        }
    }

    render(catalog) {
        const productsStore = localStorageUtil.getProducts();
        let htmlCatalog = '';

        catalog.forEach(({ id, name, price, img }) => {
            let activeClass = '';
            let activeText = '';

            if (productsStore.indexOf(id) === -1) {
                activeText = this.labelAdd;
            } else {
                activeClass = ' ' + this.classNameActive;
                activeText = this.labelRemove;
            }

            htmlCatalog += `
                <li class='products-element'>
                    <span class="products-element__name">${name}</span>
                    <img class="products-element__img" src="${img}" />
                    <span class="products-element__price" >
                        ${price} BYN
                    </span>
                    <button class="products-element__btn${activeClass}" data-id="${id}">
                    ${activeText}
                    </button>
                </li>
            `;
        });

        const html = `
            <ul class='products-container'>
               ${htmlCatalog} 
            </ul>
        `;

        ROOT_PRODUCTS.innerHTML = html;
        const buttons = document.getElementsByClassName('products-element__btn');
        Array.from(buttons).forEach( button => button.addEventListener('click', () => this.addToCart(button, button.dataset.id)))
    }
}