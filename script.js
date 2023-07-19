


let num1 = 0;
let num2 = 0;
let op = "";

const calcDisplay = document.getElementById("num-display");

const calcButtons = document.querySelectorAll(".displayable");
let numButtons = Array.from(document.querySelectorAll(".number"));
let opButtons = Array.from(document.querySelectorAll(".operator"));

numButtons = numButtons.sort((a, b) => a.value > b.value ? 1 : -1);

const acButton = document.getElementById("clear");
const delButton = document.getElementById("backspace");
const calculate = document.getElementById("answer")

// If user is still inputting/calculating
let calculating = false;

acButton.onclick = () => {
    calcDisplay.innerHTML = 0;
    calculating = false;
}
delButton.onclick = () => {
    calcDisplay.innerHTML = calcDisplay.innerHTML;
    calculating = false;
}

calcButtons.forEach((btn) => {

    btn.addEventListener("click", displayInput);

});

calculate.onclick = operate();

function displayInput(e) {

    if (calculating) {
        calcDisplay.innerHTML = calcDisplay.innerHTML + `${e.target.value}`;
    }
    else {
        calcDisplay.textContent = `${e.target.value}`;
    }
    calculating = true;

}

function clearDisplay() {

}

function add(num1, num2) {
    return num1 + num2
}

function subtract(num1, num2) {
    return num1 - num2
}

function multiply(num1, num2) {
    return num1 * num2
}

function divide(num1, num2) {
    return num1 / num2
}

function operate(num1, num2, op) {

    if (op == "+") {
        return add(num1, num2)
    }

    else if (op == "-") {
        return subtract(num1, num2)
    }

    else if (op == "*") {
        return multiply(num1, num2)
    }

    else {
        return divide(num1, num2)
    }
}


