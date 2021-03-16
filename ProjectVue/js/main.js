const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';


const app = new Vue({
  el: '#app',
  data: {
      catalogUrl: '/catalogData.json',
      cartUrl: '/getBasket.json',
      imgCatalog: 'https://placehold.it/200x150',
      cartImgCatalog: 'https://placehold.it/50x50',
      products: [],
      filtered: [],
      cartProducts: [],
      searchLine: '',
      visible: true,

  },
  methods: {

      getJson(url){
          return fetch(url)
              .then(result => result.json())
              .catch(error => {
                  console.log(error);
              })
      },
      addProduct(element){
        this.getJson(`${API}/addToBasket.json`)
          .then(data => {
            if(data.result === 1){
              let find = this.cartProducts.find(el => el.id_product === element.id_product);
              if(find){
                find.quantity++;
              } else {
                let product = Object.assign({quantity: 1}, element);
                this.cartProducts.push(product);
              }
            } else {
              alert('Error');
            }
          })
      },      
      removeProduct(el){
        this.getJson(`${API}/deleteFromBasket.json`)
          .then(data => {
            if(data.result === 1){
              if(el.quantity > 1){
                el.quantity--;
              } else { 
                this.cartProducts.splice(this.cartProducts.indexOf(el), 1);
              }
            } 
          })
      },

      filterGoods(){
        const regexp = new RegExp(this.searchLine, 'i');
        this.filtered = this.products.filter(el => regexp.test(el.product_name));
      }

  },

  mounted() {
    this.getJson(`${API + this.catalogUrl}`)
    .then(data => {
        for(let el of data){
            this.products.push(el);
            this.filtered.push(el);
        }
    })
    .catch(err =>{
      document.querySelector('.products').insertAdjacentHTML('beforeend', '<p class="outProductsText"> Список товаров пуст...</p>')
    });

this.getJson(`${API + this.cartUrl}`)
    .then(data => {
        for(let el of data.contents){
            this.cartProducts.push(el);
        }
    });

  },

});