Vue.component('cart',{
    data(){
        return{
            cartUrl: '/getBasket.json',
            cartImgCatalog: 'https://via.placeholder.com/50?text=Picture',
            cartProducts: [],
            visible: true,
        }
    },
    methods:{
        addProduct(element){
            this.$parent.getJson(`${API}/addToBasket.json`)
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
            this.$parent.getJson(`${API}/deleteFromBasket.json`)
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
    },

    mounted(){
        this.$parent.getJson(`${API + this.cartUrl}`)
        .then(data => {
            for(let el of data.contents){
                this.cartProducts.push(el);
            }
        });
    },

    template: `
    <div>
        <button class="btn-cart" type="button" @click="visible = !visible">Корзина</button>
        <div class="cart_list" v-show="!visible">
            <p v-if="!cartProducts.length" class="cartNullText">Корзина пуста...</p>
            <cart-item class="cart-item" 
            v-for="item of cartProducts" 
            :key="item.id_product"
            :cartItem="item" 
            :img="cartImgCatalog"
            @remove="removeProduct">
            </cart-item>
        </div>
    </div>`
});

Vue.component('cart-item', {
    props: ['cartItem', 'img'],
    template: `
                <div class="cart-item">
                    <div class="product-bio">
                        <img :src="img" alt="Some image">
                        <div class="product-desc">
                            <p class="product-title">{{cartItem.product_name}}</p>
                            <p class="product-quantity">Количество: {{cartItem.quantity}}</p>
                            <p class="product-single-price">{{cartItem.price}}₽ за шт.</p>
                        </div>
                    </div>
                    <div class="right-block">
                        <p class="product-price">{{cartItem.quantity*cartItem.price}}₽</p>
                        <button class="del-btn" @click="$emit('remove', cartItem)">&times;</button>
                    </div>
                </div>
    `
});