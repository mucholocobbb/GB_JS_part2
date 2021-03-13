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
      cartCount: 0,
      filterCount: 0,


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
              let productId = element.id_product;
              let find = this.cartProducts.find(product => product.id_product === productId);
              if(find){
                find.quantity++;

              } else {
                let product = {
                  id_product: productId,
                  price: element.price,
                  product_name: element.product_name,
                  quantity: 1
                };
                this.cartProducts.push(product);
                this.cartCount = this.cartProducts.length

              }
            } else {
              alert('Error');
            }
          })
      },      
      removeProduct(element){
        this.getJson(`${API}/deleteFromBasket.json`)
          .then(data => {
            if(data.result === 1){
              let productId = element.id_product;
              let find = this.cartProducts.find(product => product.id_product === productId);
              if(find.quantity > 1){
                find.quantity--;
              } else { 
                this.cartProducts.splice(this.cartProducts.indexOf(find), 1);
                document.querySelector(`.cart-item[data-id="${productId}"]`).remove();
                this.cartCount = this.cartProducts.length
              }
            } else {
              alert('Error');
            }
          })
      },

      filterGoods(){
        const regexp = new RegExp(this.searchLine, 'i');
        this.filtered = this.products.filter(product => regexp.test(product.product_name));
        this.products.forEach(el => {
          const block = document.querySelector(`.product-item[id="${el.id_product}"]`);
          if(!this.filtered.includes(el)){
            block.classList.add('hidden');
          } else {
            block.classList.remove('hidden');
          }
        })
        this.filterCount = this.filtered.length
      }

  },
  beforeCreate() {

  },
  created() {
      this.getJson(`${API + this.catalogUrl}`)
          .then(data => {
              for(let el of data){
                  this.products.push(el);
              }
              this.filterCount = this.products.length
          })
          .catch(err =>{
            document.querySelector('.products').insertAdjacentHTML('beforeend', '<p class="outProductsText"> Список товаров пуст...</p>')
          });

      this.getJson(`${API + this.cartUrl}`)
          .then(data => {
              for(let el of data.contents){
                  this.cartProducts.push(el);
              }
              this.cartCount = this.cartProducts.length;
          });
  
  },
  beforeMount() {

  },
  mounted() {

  },
  beforeUpdate() {

  },
  updated() {

  },
  beforeDestroy() {

  },
  destroyed() {

  }
});