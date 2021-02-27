//Артем! Я сразу многократно извиняюсь за это...
// До дэдлайна оставался час, а я так заблудился в мыслях
// что все стер и написал то что есть!(( 
//     я понимаю что это не говнокод.
//     Это -говноКООООДИЩЕееее, но мне было  принципиально 
//     сделаать, чтобы заработало.



const Burger = [
    {name: 'big' ,price: 100 ,cal: 40},
    {name: 'small' ,price: 50 ,cal: 20}
]

const BurgerInner = [
    {name: 'cheeze' ,price: 10 ,cal: 20},
    {name: 'salat' ,price: 20 ,cal: 5},
    {name: 'potato' ,price: 15 ,cal: 10},
    {name: 'spices' ,price: 15 ,cal: 0},
    {name: 'sour' ,price: 20 ,cal: 5}
]

const OurBurger = [];



let cheeze = document.getElementById('1');
let salat = document.getElementById('2');
let potato = document.getElementById('3');
let spices = document.getElementById('4');
let sour = document.getElementById('5');
let sizeB = document.getElementById('6');
let sizeS = document.getElementById('7');
let button = document.querySelector('.check_btn');
let priceInput = document.querySelector('.price');
let calInput = document.querySelector('.cal');

button.addEventListener('click',() => {
    let price = 0;
    let cal = 0;
if(!cheeze.checked && !salat.checked && !potato.checked && !spices.checked && !sour.checked){
    alert('Необходимо добавить Начинку!!');
} else {
    if(cheeze.checked){
        price +=  BurgerInner[0].price;
        cal += BurgerInner[0].cal;
    }
    if(salat.checked){
        price +=  BurgerInner[1].price;
        cal += BurgerInner[1].cal;
    }
    if(potato.checked){
        price +=  BurgerInner[2].price;
        cal += BurgerInner[2].cal;
    }
    if(spices.checked){
        price +=  BurgerInner[3].price;
        cal += BurgerInner[3].cal;
    }
    if(sour.checked){
        price +=  BurgerInner[4].price;
        cal += BurgerInner[4].cal;
    }

    if(sizeB.checked){
        price += Burger[0].price;
        cal += Burger[0].cal;
    }
    if(sizeS.checked){
        price += Burger[1].price;
        cal += Burger[1].cal;
    }

    priceInput.textContent = `${price} \u20bd`;
    calInput.textContent = `${cal} ccal`;
    

}
});
