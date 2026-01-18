let nama = "Brother";
// console.log(nama);
alert("Hello " + nama + ", Welcome To My Website!");

let runningTotal = 0;
let buffer = "0";
let previusOperator = null;

const screen = document.querySelector(".screen");

function buttonClick(value) {
    const symbols = ['C', '=', '←', '+', '-', '*', '/'];
    const operators = ['+', '-', '*', '/'];
    const numbers = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
    console.log("Value:", value); 
    if(symbols.includes(value)) {
        handleSymbol(value);
    }else {
        handleNumber(value);
    }
    
    if(!operators.includes(value)) {
        screen.innerText = buffer;
    }
}

function handleSymbol(symbol) {
    switch(symbol) {
        case 'C':
            buffer = "0";
            runningTotal = 0;
            previusOperator = null;
            break;
        case '=':
            if(previusOperator === null) {
                return;
            }
            flushOperation(parseFloat(buffer));
            buffer = runningTotal.toString();
            previusOperator = null;
            runningTotal = 0;
            break;
        case '←':
            if(buffer.length === 1) {
                buffer = "0";
            }else {
                buffer = buffer.substring(0, buffer.length - 1);
            }
            break;
        case '+':
        case '-':
        case '*':
        case '/':
            handleMath(symbol);
            break;
    }           
}

function handleMath(symbol) {
    const intBuffer = parseFloat(buffer);
    
    if(runningTotal === 0) {
        runningTotal = intBuffer;
    } else if(previusOperator !== null) {
        flushOperation(intBuffer);
    }
    
    previusOperator = symbol;
    buffer = "0";
    screen.innerText = symbol;  
}

function flushOperation(intBuffer) {
    if(previusOperator === '+') {
        runningTotal += intBuffer;
    }else if(previusOperator === '-') {
        runningTotal -= intBuffer;
    }else if(previusOperator === '*') {
        runningTotal *= intBuffer;
    }else if(previusOperator === '/') {
        runningTotal /= intBuffer;
    }
    buffer = runningTotal.toString();
}

function handleNumber(numberString) {
    if(buffer === "0") {
        buffer = numberString;
    }else {
        buffer += numberString;
    }
}

function init() {
    document.querySelector(".cals-button").addEventListener("click", function(event) {
        buttonClick(event.target.innerText);
    });
}

init();