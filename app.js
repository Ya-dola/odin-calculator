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

function clear() {
    prevCalculation.textContent = "";
    currCalculation.textContent = "0";
    var1 = "";
    var2 = "";
    operator = null;
}

function keyInput(evt) {
    if (evt.key >= 0 && evt.key <= 9) appendNum(evt.key);
    if (evt.key === '.') appendPoint();
    if (evt.key === '=' || evt.key === 'Enter') evaluate();
    if (evt.key === 'Backspace') deleteNum();
    if (evt.key === 'Escape') clear();
    if (evt.key === '+' || evt.key === '-' || evt.key === '*' || evt.key === '/')
        setOperation(convertOperator(evt.key));
}

// Event Listeners
window.addEventListener("keydown", keyInput);
btnPoint.addEventListener('click', appendPoint);

