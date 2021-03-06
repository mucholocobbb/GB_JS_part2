
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
    // #goods;
    // #allProducts;
  
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
      this.product_name = product.product_name;
      this.price = product.price;
      this.id_product = product.id_product;
      this.img = img;
    }
  
    render() {
      return `<div class="product-item" data-id="${this.id_product}">
                <img src="${this.img}" alt="Some img">
                <div class="desc">
                    <h3>${this.product_name}</h3>
                    <p>${this.price} \u20bd</p>
                    <button class="buy-btn"
                    data-id="${this.id_product}"
                    data-name="${this.product_name}"
                    data-price="${this.price}">Купить</button>
                </div>
            </div>`;
    }
  
  }
  
  const productList = new ProductList();
  
  
  
        //Корзина товаров
  class CartList {
    constructor(container = '.cart_list'){
      this.container = container;
      this.goods = [];
      this.allProducts = [];
      this.finalPrice = 0;
      this.getListArr()
      this.cartArrDel()
      this.showCart()
      
    }

      showCart(){
        let cartBtn = document.querySelector('.btn-cart');
        let cartList = document.querySelector('.cart_list');
        cartBtn.addEventListener('click', () => {
          cartList.classList.toggle('cart_listHidden');
        })
      }


      getListArr(){
        document.querySelector('.products').addEventListener('click', elem => {
          if(elem.target.classList.contains('buy-btn')){
              let product = {
                id_product : +elem.target.dataset['id'],
                price: +elem.target.dataset['price'],
                product_name: elem.target.dataset['name'],
              }  
             this.goods.push(product) 
             this.getCart()
             this.goods = []
          }
        });

      }

      getCart() {
        
        const cartBlock = document.querySelector(this.container);
        this.goods.forEach(product => {
          const cartObject = new Cart(product);
          this.allProducts.push(product);
          cartBlock.insertAdjacentHTML('afterbegin', cartObject.renderCart());
          console.log(this.allProducts);
          this.finalPrice += cartObject.price;
          document.querySelector('.totalPrice').textContent = `${this.finalPrice} \u20bd`;

        })

  
      }
  
      cartArrDel() {
        document.querySelector(this.container).addEventListener('click', elem => {
          if(elem.target.classList.contains('del-btn')){
              let delProduct =  +elem.target.dataset['id']
              let find = this.allProducts.find(product => product.id_product === delProduct);
              this.allProducts.splice(this.allProducts.indexOf(find), 1);
              document.querySelector(`.cart_item[data-id="${delProduct}"]`).remove();
              this.finalPrice -= +find.price;

          }
          document.querySelector('.totalPrice').textContent = `${this.finalPrice} \u20bd`;

        });
      }

    }

    const cart = new CartList();
  


    class Cart {
      constructor(product, img='https://placehold.it/50x50', quantity= 1){
        this.product_name = product.product_name;
        this.price = product.price;
        this.id_product = product.id_product;
        this.img = img;
        this.quantity = quantity;

      }
      renderCart(){
        return `<div class="cart_item" data-id="${this.id_product}">
                <div class="product-bio">
                  <img src="${this.img}" alt="Some image">
                <div class="product-desc">
                  <p class="product-title">${this.product_name}</p>
                  <p class="product-quantity">Количество: ${this.quantity}</p>
                  <p class="product-single-price">${this.price} за ед.</p>
                </div>
              </div>
              <div class="right-block">
                <p class="product-price">${this.quantity*this.price} ₽</p>
                <button class="del-btn" data-id="${this.id_product}">&times;</button>
              </div>
              </div>
              `
      }
  

    }

