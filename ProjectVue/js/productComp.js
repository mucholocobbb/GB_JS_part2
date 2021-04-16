Vue.component('products', {
    data(){
        return{
            catalogUrl: '/catalogData.json', //здесь ошибка в адресе, для показа заглушки.
            products: [],
            filtered: [],
            imgCatalog: 'https://via.placeholder.com/200x150?text=Picture+in+this+place',
        }
    },
    mounted() {
        this.$parent.getJson(`${API + this.catalogUrl}`)
        .then(data => {
            for(let el of data){
                this.products.push(el);
                this.filtered.push(el);
            }
        })
    },    

    template: `
    <div class="products">
        <product v-for="item of filtered" :key="item.id_product" :img="imgCatalog" :product="item"></product>
    </div>
    `
});

Vue.component('product', {
    props: ['product', 'img'],
    template: `
    <div>

        <div class="product-item">
                <img :src="img" alt="Some img">
                <div class="desc">
                    <h3>{{product.product_name}}</h3>
                    <p>{{product.price}}₽</p>
                    <button class="buy-btn" @click="$root.$refs.cart.addProduct(product)">Купить</button>

                </div>
        </div>
    </div>
    `
});



Vue.component('error', {
    data(){
        return{
            fault: false,
        }
    },
    template: `
    <div class="serverFault" v-show="fault">
         <i class="fas fa-biohazard errorIcon"></i>
        <p>ERROR!!!<br>Server is not avalible!<br>Fault:404</p>
    </div>
    `
});