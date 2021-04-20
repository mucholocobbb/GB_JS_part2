Vue.component('search', {
    data(){
        return{
            searchLine: '',
        }
    },
    methods: {
        filterGoods(){
            let regexp = new RegExp(this.searchLine, 'i');
            this.$root.$refs.products.filtered = this.$root.$refs.products.products.filter(el => regexp.test(el.product_name));
          },
    }, 
    template: `
    <form action="#" class="search-form" >
        <input type="text" class="search-field"   v-model="searchLine" @input="filterGoods" >
        <button class="btn-search" type="submit" >
            <i class="fas fa-search zoomIcon"></i>
        </button>
    </form>     
    `
});