const symbols = ['Асо','Поп','Дама','Вале','10','9','8','7'];
const suits = ['Пика','Купа','Каро','Спатия'];

// const cards = [];

// symbols.forEach(symbol=> {
//     suits.map(suit=>createCard(suit,symbol)).forEach(card=> cards.push(card));
// });

// function createCard(suit, symbol){
//     return {
//         suit,
//         symbol
//     }
// }

const symbolOptions = symbols.map(symbol=>{
    const option = document.createElement('option');
    option.value = symbol;
    option.textContent = symbol
    return option;
});

