
let header = document.querySelector('header');
header.classList.add('header');
let main = document.querySelector('main');
main.classList.add('main');

function startCalc(a , b){
    return a + b;
};


const products = [
    {id: 1, title: 'Notebook', price: 20000},
    {id: 2, title: 'Mouse', price: 1500},
    {id: 3, title: 'Keyboard', price: 5000},
    {id: 4, title: 'Gamepad', price: 4500},
    {id: 5}
];

// const renderProduct = (title = 'No title', price = startCalc('No ',' price'), img = 'https://placehold.it/200x150') => {
//     return `<div class="product-item">
//                 <img src="${img}" alt="Some img">
//                 <h3>${title}</h3>
//                 <p>${price} \u20bd</p>
//                 <button class="by-btn">Добавить в корзину</button>
//               </div>`;
// }




                // Здесь мы методом перебора  сразу вставляем  каждый отдельный продукт в разметку.#1
// const renderProducts = list => 
    // list.forEach(item => 
    //     document.querySelector('.products').insertAdjacentHTML("beforeend",renderProduct(item.title, item.price))
    // );


                // Думаю это тот самый топорный метод #2   
// const renderProducts = list => {
//     const productList = list.map((item) => {
//         return renderProduct(item.title, item.price);
//     });
    
    // let [a,b,c,d,e] = productList;
    // document.querySelector('.products').insertAdjacentHTML("beforeend",a)
    // document.querySelector('.products').insertAdjacentHTML("beforeend",b)
    // document.querySelector('.products').insertAdjacentHTML("beforeend",c)
    // document.querySelector('.products').insertAdjacentHTML("beforeend",d)


                // с помощью цикла #3
// const renderProducts = list => {
//     const productList = list.map((item) => {
//         return renderProduct(item.title, item.price);
//     });    
//     for(let i = 0; i < productList.length; i++){
//     document.querySelector('.products').insertAdjacentHTML("beforeend",productList[i]);
//     };
 
// };


// renderProducts(products);


// TeacherVariant #4 Топорный метод .join() такое решение не актуально,чисто для демонстрации.

const renderProduct = (item, img = 'https://placehold.it/200x150') => 
        `<div class="product-item" data-id="${this.id}">
            <img src="${img}" alt="Some img">
            <div class="desc">
                <h3>${item.title}</h3>
                <p>${item.price} \u20bd</p>
                <button class="by-btn">Buy</button>  
            </div>
        </div>`;

const renderProducts = list => {
document.querySelector('.products').insertAdjacentHTML('beforeend', list.map(item => renderProduct(item)).join(' '));
};        

renderProducts(products);
     