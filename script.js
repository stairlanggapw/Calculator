let nama = "User";
console.log(nama);
alert("Halo " + nama + ", selamat datang di website saya!");

let runningTotal = 0;
let buffer = "0";
let previusOperator = null;

const screen = document.querySelector(".screen");

function buttonClick(value) {
    const symbols = ['C', '=', '←', '+', '-', '×', '÷'];
    console.log("Value:", value); // Untuk debug
    if(symbols.includes(value)) {
        handleSymbol(value);
    }else {
        handleNumber(value);
    }
    screen.innerText = buffer;
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
            flushOperation(parseInt(buffer));
            previusOperator = null;
            buffer = runningTotal.toString();
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
        case '×':
        case '÷':
            handleMath(symbol);
            break;
    }           
}

function handleMath(symbol) {
    if(buffer === "0") {
        return;
    }
    const intBuffer = parseInt(buffer);
    if(runningTotal === 0) {
        runningTotal = intBuffer;
    }else if(previusOperator !== null) {
        flushOperation(intBuffer);
    }
    previusOperator = symbol;
    buffer = "0";
}

function flushOperation(intBuffer) {
    if(previusOperator === '+') {
        runningTotal += intBuffer;
    }else if(previusOperator === '-') {
        runningTotal -= intBuffer;
    }else if(previusOperator === '×') {
        runningTotal *= intBuffer;
    }else if(previusOperator === '÷') {
        runningTotal /= intBuffer;
    }
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