// Variables
let var1 = "";
let var2 = "";
let operator = null;
let clearCurrCalc = false;

// Constants
const btnsNum = document.querySelectorAll(".btnNum");
const btnsOperation = document.querySelectorAll(".btnOperation");

const btnEquals = document.getElementById("equals");
const btnClear = document.getElementById("clear");
const btnDelete = document.getElementById("delete");
const btnPoint = document.getElementById("point");

const prevCalculation = document.querySelector(".prevCalculation");
const currCalculation = document.querySelector(".currCalculation");


// Functions
function add(num1, num2) {
    return num1 + num2;
}

function subtract(num1, num2) {
    return num1 - num2;
}

function multiply(num1, num2) {
    return num1 * num2;
}

function divide(num1, num2) {
    return num1 / num2;
}

function modulus(num1, num2) {
    return num1 % num2;
}

function operate(var1, var2, operator) {
    var1 = Number(var1);
    var2 = Number(var2);
    switch (operator) {
        case "+":
            return add(var1, var2);
        case "-":
            return subtract(var1, var2);
        case "x":
            return multiply(var1, var2);
        case "÷":
            if (var2 === 0) return null;
            else return divide(var1, var2);
        case "%":
            if (var2 === 0) return null;
            else return modulus(var1, var2);
        default:
            return null;
    }
}

function appendNum(num) {
    if (currCalculation.textContent === "0" || clearCurrCalc) resetCurrCalculation();

    if (currCalculation.textContent.length < 13)
        currCalculation.textContent += num;
}

function deleteNum() {
    if (currCalculation.textContent === "0") return;

    if (currCalculation.textContent.length > 1) {
        currCalculation.textContent =
            currCalculation.textContent.toString().slice(0, -1);
    } else {
        currCalculation.textContent = "0";
    }
}

function resetCurrCalculation() {
    currCalculation.textContent = "";
    clearCurrCalc = false;
}

function appendPoint() {
    if (currCalculation.textContent.includes(".")) return;

    // If Empty to Add a 0 automatically
    if (currCalculation.textContent === "") currCalculation.textContent = '0';

    currCalculation.textContent += ".";
}

function setOperation(operation) {
    if (operator !== null) calculate();

    var1 = currCalculation.textContent;
    operator = operation;

    prevCalculation.textContent = `${var1} ${operator}`;
    clearCurrCalc = true;
}

function clearScreen() {
    prevCalculation.textContent = "";
    currCalculation.textContent = "0";
    var1 = "";
    var2 = "";
    operator = null;
}

function calculate() {
    if (operator === null || clearCurrCalc) return;

    if (operator === "÷" && currCalculation.textContent === "0") {
        alert("Cannot Divide By 0!");
        return;
    }

    var2 = currCalculation.textContent;
    currCalculation.textContent = roundDp3(operate(var1, var2, operator));
    prevCalculation.textContent = `${var1} ${operator} ${var2} =`;

    operator = null;
}

function roundDp3(num) {
    return Math.round(num * 1000) / 1000;
}

function keyInput(evt) {
    if (evt.key >= 0 && evt.key <= 9) appendNum(evt.key);
    if (evt.key === '.') appendPoint();
    if (evt.key === '=' || evt.key === 'Enter') calculate();
    if (evt.key === 'Backspace') deleteNum();
    if (evt.key === 'Escape') clearScreen();
    if (evt.key === "+" || evt.key === "-" || evt.key === "*" || evt.key === "/" || evt.key === "%")
        setOperation(convertOperator(evt.key));
}

function convertOperator(keyboardOperator) {
    if (keyboardOperator === "+") return "+";
    if (keyboardOperator === "-") return "−";
    if (keyboardOperator === "*") return "x";
    if (keyboardOperator === "/") return "÷";
    if (keyboardOperator === "%") return "%";
}

// Event Listeners
window.addEventListener('keydown', keyInput);

btnPoint.addEventListener('click', appendPoint);
btnClear.addEventListener('click', clearScreen);
btnDelete.addEventListener('click', deleteNum);
btnEquals.addEventListener('click', calculate);

btnsNum.forEach((btn) => {
    btn.addEventListener('click', () => appendNum(btn.textContent));
});

btnsOperation.forEach((btn) => {
    btn.addEventListener('click', () => setOperation(btn.textContent));
});


