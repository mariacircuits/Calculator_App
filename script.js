let runningTotal = 0;
let buffer = '0';
let previousOperator = null;
const MAX_DECIMALS = 10;

const screen = document.querySelector('.screen');

function buttonClick(value) {
    if (isNaN(value) && value !== '.') {
        handleSymbol(value);
    } else {
        handleNumber(value);
    }
    screen.innerText = buffer;
}
function handleSymbol(symbol) {
    switch(symbol) {
        case 'C':
        case 'Escape':
            buffer = '0';
            runningTotal = 0;
            previousOperator = null;
            break;
        case '=':
        case 'Enter':
            if (previousOperator === null) return;
            flushOperation(parseFloat(buffer));
            buffer = formatResult(runningTotal);
            runningTotal = 0;
            previousOperator = null;
            break;
        case '←':
        case 'Backspace':
            if (buffer.length === 1) {
                buffer = '0';
            } else {
                buffer = buffer.slice(0, -1);
            }
            break;
        case '+':
        case '-':
        case '×':
        case '÷':
        case '*':
        case '/':9
            handleMath(symbol);
            break;
    }
}

function handleMath(symbol) {
    const intBuffer = parseFloat(buffer);

    if (runningTotal === 0) {
        runningTotal = intBuffer;
    } else {
        flushOperation(intBuffer);
    }

    if (symbol === '*') symbol = '×';
    if (symbol === '/') symbol = '÷';

    previousOperator = symbol;
    buffer = '0';
}

function flushOperation(intBuffer) {
    if (previousOperator === '+') {
        runningTotal += intBuffer;
    } else if (previousOperator === '-') {
        runningTotal -= intBuffer;
    } else if (previousOperator === '×') {
        runningTotal *= intBuffer;
    } else if (previousOperator === '÷') {
        runningTotal /= intBuffer;
    }
}

function handleNumber(numberString) {
    if (numberString === '.' && buffer.includes('.')) return; // prevent multiple decimals
    if (buffer === '0' && numberString !== '.') {
        buffer = numberString;
    } else {
        buffer += numberString;
    }
}

function formatResult(value) {
    if (!Number.isInteger(value)) {
        return parseFloat(value.toFixed(MAX_DECIMALS)).toString();
    }
    return value.toString();
}

function init() {
    document.querySelector('.calc-buttons').addEventListener('click', function(event) {
        const text = event.target.innerText;
        if (!text) return;
        buttonClick(text);
    });

    document.addEventListener('keydown', function(event) {
        let key = event.key;
        buttonClick(key);
    });
}

init();