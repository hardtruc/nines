let chances = [];

let index = 0;

function dealCards(cardsPerPlayer, game){
    for(let player = 1; player <= 4; player++){
        for(let card = 1; card <= cardsPerPlayer; card++){
            if(game.ninesLeft > game.cardsCount){
                game.ninesLeft = game.cardsCount;
            }
            if(player == game.myPosition){
                if(game.cardsCount > 12){
                    const myCard = game.myCards[game.myIndex++]
                    if(myCard == '9'){
                        game.ninesLeft--;
                        if(game.ninesLeft == 0){
                            game.theirChance = 0;
                            game.myChance = 0;
                        }
                    }
                    createParagraph(`получавам ${myCard}`,'green',game)
                }else{
                    oldChance = game.myChance;
                    game.myChance = (game.ninesLeft / game.cardsCount)*(100-game.theirChance-game.myChance) + game.myChance;
                    createParagraph(`(${game.ninesLeft}/${game.cardsCount})*(100-${game.theirChance}-${oldChance}) + ${oldChance} = ${game.myChance}%`,'green',game)
                }
            }else{
                let oldChance = game.theirChance;
                game.theirChance = (game.ninesLeft / game.cardsCount)*(100-game.theirChance-game.myChance) + game.theirChance;
                createParagraph(`(${game.ninesLeft}/${game.cardsCount})*(100-${oldChance}-${game.myChance}) + ${oldChance} = ${game.theirChance}%`,'red',game)
            }
            game.cardsCount--;
        }
    }
}

function calc(myPosition,myCards,index){
    document.getElementById('result').innerHTML = ''
    const game = {
        myChance : 0,
        theirChance : 0,
        ninesLeft : 4,
        myPosition : myPosition,
        cardsCount : 32,
        myCards : myCards,
        myIndex : 0,
        logs : [],
        index
    }
    dealCards(3,game);
    dealCards(2,game);
    dealCards(3,game);
    const link = document.createElement('a');
    link.href = `#result`;
    link.textContent = `${game.index + 1}.Ред ${game.myPosition} Първи пет карти - (${game.myCards}) - Шанс : ${game.myChance}%`
    link.onclick = ()=> {
        let h3 = document.createElement('h3');
        h3.textContent = `${game.index + 1}. Ред ${game.myPosition} Първи пет карти - (${game.myCards}) - Шанс : ${game.myChance}%`;
        document.getElementById('result').innerHTML = ''
        document.getElementById('result').appendChild(h3);
        game.logs.forEach(log=> document.getElementById('result').appendChild(log))
    }
    document.getElementById('finalResult').appendChild(link);
    return game.myChance;
}

function createParagraph(text,color,game){
    const p = document.createElement('p');
    p.innerHTML = `Карта ${32 - game.cardsCount + 1} - ${text}`
    p.style = `color:${color}`
    game.logs.push(p);
}

for(let i = 1; i <= 4; i++){
    for(let first = 0; first < 3; first++){
        for(let second = first + 1; second < 4; second++){
            for(let third = second + 1; third < 5; third++){
                let arr = ['Друга','Друга','Друга','Друга','Друга'];
                arr[first] = 9;
                arr[second] = 9;
                arr[third] = 9;
                let result = calc(i,arr,index++);
                chances.push(result);
            }
        }
    }
}

const avg = (chances.reduce((a, b) => a + b, 0) / chances.length)
console.log(avg)

document.getElementById('answer').textContent = `Има 40 различни комбинации според реда и поредността на получените карти`;
document.getElementById('avg').textContent = `Средна вероятност от всички комбинации : ${avg}`

// `Формула за моя шанс : ({брой 9ки в тестето}/{карти в тестете})*(100 - {шанса вече да се паднала при другите} - {шанса вече да е при мен}) + {шанса вече да е при мен}`