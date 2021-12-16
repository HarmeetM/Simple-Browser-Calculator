/* 
first iteration using eval, definitely cannot use due to security risk

let firstNum = ''
let secondNum = ''
let total = ''

let topDisplay = document.getElementById('running-total');
let bottomDisplay = document.getElementById('real-total');
let numsButtons = Array.from(document.getElementsByClassName('buttons'));
let operButtons = Array.from(document.getElementsByClassName('opbuttons'));
let allButtons = Array.from(document.getElementsByClassName('jsbuttons'));
const backspace = document.getElementById('backspace');

allButtons.map(button => {
    button.addEventListener('click', (e) => {
        switch(e.target.innerText){
            case 'C':
                bottomDisplay.innerText = '';
                break;
            case '<=':
                if(bottomDisplay.innerText){
                    bottomDisplay.innerText = bottomDisplay.innerText.slice(0,-1);
                }
                break;
            default: 
                if(bottomDisplay.innerText.length < 12){
                bottomDisplay.innerText += e.target.innerText;
            }
        }
    });
});
 */

const topDisplay = document.querySelector('.running-total');
const bottomDisplay = document.querySelector('.real-total');
const numsButtons = document.querySelectorAll('.buttons');
const operButtons = document.querySelectorAll('.opbuttons');
const equalsButton = document.querySelector('.eqbutton');
const backspace = document.querySelector('.backspace');
const clearAll = document.querySelector('.clear');

let topNum = '';
let bottomNum = '';
let total = null;
let lastOperator = '';

numsButtons.forEach(buttons => {
    buttons.addEventListener('click', (e) => {
        bottomNum += e.target.innerText;
        bottomDisplay.innerText = bottomNum;
    })
});

operButtons.forEach(opbuttons => {
    opbuttons.addEventListener ('click', (e) => {
        if (!total) topNum;
        const operator = e.target.innerText;
        if(topNum && bottomNum && lastOperator) {
            operateTheNums();
        } else {
            total = parseFloat(bottomNum);
        }
        tempClear(operator);
        lastOperator = operator;
    })
})

function tempClear(op = ''){
    topNum += `${bottomNum} ${op} `;
    topDisplay.innerText = topNum;
    bottomDisplay.innerText = '';
    bottomNum = '';
}

function operateTheNums(){
    if(lastOperator === 'x'){
        total = parseFloat(total) * parseFloat(bottomNum);
    } else if(lastOperator === '+') {
        total = parseFloat(total) + parseFloat(bottomNum);
    } else if(lastOperator === '/') {
        total = parseFloat(total) / parseFloat(bottomNum);
    } else if(lastOperator === '-') {
        total = parseFloat(total) - parseFloat(bottomNum);
    }
}

equalsButton.addEventListener('click', (e) => {
    if(!topNum || !bottomNum) return;
    operateTheNums();
    tempClear()
    bottomDisplay.innerText = total;
    bottomNum = total;
    topNum = '';
})

clearAll.addEventListener('click', (e) => {
    topDisplay.innerText  = '';
    bottomDisplay.innerText = '';
    topNum = '';
    bottomNum = '';
    total = ''
})

backspace.addEventListener('click', (e) =>{
    bottomDisplay.innerText = bottomDisplay.innerText.slice(0,-1);
    bottomNum = parseFloat(bottomDisplay.innerText);
})