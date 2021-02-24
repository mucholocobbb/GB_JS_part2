
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

const renderProduct = (title = 'No title', price = startCalc('No ',' price')) => {
    return `<div class="product-item">
                <h3>${title}</h3>
                <p>${price}</p>
                <button class="by-btn">Добавить в корзину</button>
              </div>`;
}

            //!!!Мы вставляли в разметку целый массив, и запятые-разделители элементов массива выводились 
            // в нее.!!! 
            // Так же, здесь  убираем лишние круглые и фигурные скобки, так как имеем лишь один аргумент массива
            // и одну операцию в теле стрелочной функции.


            // Здесь мы методом перебора  сразу вставляем  каждый отдельный продукт в разметку.
// const renderProducts = list => 
    // list.forEach(item => 
    //     document.querySelector('.products').insertAdjacentHTML("beforeend",renderProduct(item.title, item.price))
    // );


    
const renderProducts = list => {
    const productList = list.map((item) => {
        return renderProduct(item.title, item.price);
    });
    // Думаю это тот самый топорный метод
    // let [a,b,c,d,e] = productList;
    // document.querySelector('.products').insertAdjacentHTML("beforeend",a)
    // document.querySelector('.products').insertAdjacentHTML("beforeend",b)
    // document.querySelector('.products').insertAdjacentHTML("beforeend",c)
    // document.querySelector('.products').insertAdjacentHTML("beforeend",d)

    // с помощью цикла
    for(let i = 0; i < productList.length; i++){
    document.querySelector('.products').insertAdjacentHTML("beforeend",productList[i]);
    };
 
};


renderProducts(products);

// а вот метод "ревьюз" о котором говорилось в конце урока, я ничего не нашел, какие то есть умоминания
// но в не понятном контексте. Скорее всего я его  на слух как то не так понял и неверно гуглю. 
// Хотелось ыб про него почитать,тк вы нахваливали его))

// Еще были мысли физически убрать запятую, сославшись на див после которого она стоит. Типа : div.remove('afterend')
// Но никаких методов для подобного редактирования разметки не нашел, а к запятой напрямую не смог обратиться,
// искал через отладчик как к ней зацепиться, но ни классов, ни тегов у нее нет. 

// Если есть варианты решения, ссылки на статьи  и вас не затруднит, буду рад, я вам писал в телеге "Егор Матюшкин"

