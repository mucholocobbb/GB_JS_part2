
const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';


let header = document.querySelector('header');
header.classList.add('header');
let main = document.querySelector('main');
main.classList.add('main');

// Promise Version #Pr
const getProducts = (data) => {
  return new Promise((resolve, reject) => {
      if (data) resolve(data);
      else reject('Error');
});
}


class ProductList {
    #goods;
    #allProducts;
  
    constructor(container = '.products') {
      this.container = container;
      this.goods = [];
      this.allProducts = [];
  
      //#Pr
      this.showProducts(`${API}/catalogData.json`);
      

      // this.#fetchGoods()
      //         .then((data) => {
      //             this.#goods = [...data];
      //             this.#render();
      //          });;
  
    }


    showSum(){
      document.querySelector('.final_price')
      .insertAdjacentHTML('beforeend', `${this.allProducts.reduce((accum, item) => accum + item.price, 0)} \u20bd`);
    }


    //#Pr
    showProducts(url){
      let xhr = new XMLHttpRequest();
      xhr.open('GET', url, true);
      xhr.onreadystatechange = () => {
        if (xhr.readyState === 4) {
          if (xhr.status !== 200) {
            console.log('Error');
          } else {
            getProducts(xhr.responseText)
              .then((data) => {
                  this.goods = JSON.parse(data);
                  this.#render();
                  this.showSum();
              })
              .catch((err) => {
                console.log(err);
              });
          }
        }
      }
      xhr.send();
    };

    // #fetchGoods() {
    //   return fetch(`${API}/catalogData.json`)
    //       .then((response) => response.json())
    //       .catch((err) => {
    //         console.log(err);
    //       });
    // }
  
    #render() {
      const block = document.querySelector(this.container);
  
      this.goods.forEach((product) => {
        const productObject = new ProductItem(product);
        this.allProducts.push(productObject);
        block.insertAdjacentHTML('beforeend', productObject.render());
      });
    }
  }
  
  class ProductItem {
    constructor(product, img='https://placehold.it/200x150') {
      this.title = product.product_name;
      this.price = product.price;
      this.id = product.id_product;
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
  
  }
  
  const productList = new ProductList();
  
  
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
  
  
    
  
     