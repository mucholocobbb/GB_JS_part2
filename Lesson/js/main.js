
let header = document.querySelector('header');
header.classList.add('header');
let main = document.querySelector('main');
main.classList.add('main');

class ProductList {
    #goods;
    #allProducts;
  
    constructor(container = '.products') {
      console.log('constructor');
      this.container = container;
      // this._goods = [];
      this.#goods = [];
      this.#allProducts = [];
  
      this.#fetchGoods();
      this.#render();
  
    }
  
    getTotalPrice(){
      let finalPrice = 0;
      this.#allProducts.forEach(function(product){
        let price =  new ProductItem(product).getPrice();
        finalPrice += price;
      })
     return finalPrice;
    }
  
    getDiscount(sale){
      return this.getTotalPrice() - (this.getTotalPrice() * (sale / 100));
    }

    showTotalPrice(){
      document.querySelector('.final_price').insertAdjacentHTML('beforeend',`${this.getTotalPrice()} \u20bd`);
    }
  
    #fetchGoods() {
      this.#goods = [
        {id: 1, title: 'Notebook', price: 20000},
        {id: 2, title: 'Mouse', price: 1500},
        {id: 3, title: 'Keyboard', price: 5000},
        {id: 4, title: 'Gamepad', price: 4500},
      ];
    }
  
    #render() {
      const block = document.querySelector(this.container);
  
      this.#goods.forEach((product) => {
        const productObject = new ProductItem(product);
        console.log(productObject);
        this.#allProducts.push(productObject);
        block.insertAdjacentHTML('beforeend', productObject.render());
      });
    }
  }
  
  class ProductItem {
    constructor(product, img='https://placehold.it/200x150') {
      this.title = product.title;
      this.price = product.price;
      this.id = product.id;
      this.img = img;
    }
  
    render() {
      return `<div class="product-item" data-id="${this.id}">
                <img src="${this.img}" alt="Some img">
                <div class="desc">
                    <h3>${this.title}</h3>
                    <p>${this.price} \u20bd</p>
                    <button class="buy-btn">Купить</button>
                </div>
            </div>`;
    }
  
    getPrice() {
      return this.price;
    }
  }
  
  const productList = new ProductList();
  productList.showTotalPrice();
  
  
  //       //Корзина товаров
  // class CartList {
  //   constructor(){
  //   }
  
    //   getListArr() - Метод будет формировать массив из выбранных товаров. 
  
    //   cartArrDel() - Будет убирать не нужный товар из массива.
  
    //   cartArrRemove() -  Очищаем массив. 
    // }
  
    // class Cart() {
    //   constructor()
    // }
  
    //   showCart() - Метод будет выводить актуальный массив с товарами. 
  
    //   showFinalPrice() - будет выводить общую цену опираясь на актуальный масиив. 
  
    //   getDiscount() - Будет присваивать скидку опираясь на финальную цену.
  
  
    
  
     