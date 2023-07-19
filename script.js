// first number --- operator --- second number method 
let fnumExists = false;
let snumExists = false;
let opExists = false;
let inputtingNumber = false;

let input = 1;

let num1 = "";
let num2 = "";
let op = "";
let tempAnswer;

const calcDisplay = document.getElementById("num-display");

const calcButtons = document.querySelectorAll(".displayable");
let numButtons = Array.from(document.querySelectorAll(".number"));
let opButtons = Array.from(document.querySelectorAll(".operator"));

// Arrage number buttons for easier passing of value
numButtons = numButtons.sort((a, b) => a.value > b.value ? 1 : -1);

const acButton = document.getElementById("clear");
const delButton = document.getElementById("backspace");
const calculate = document.getElementById("answer");

// Clear display
acButton.onclick = () => {
    calcDisplay.innerHTML = 0;
    clearSignals()
    tempAnswer = undefined;
}

// Backspace
delButton.onclick = () => {
    displayedNumber = calcDisplay.innerHTML

    if (displayedNumber == tempAnswer || displayedNumber == '0') {
        calcDisplay.innerHTML = 0;
        clearSignals()
        tempAnswer = undefined;
        return
    }

    switch(input) {

        case 1:
            let fnumArray = Array.from(num1);
            fnumArray.pop();
            num1 = fnumArray.join("");
            console.log(num1)
            if (num1 == "") {
                inputtingNumber = false;
                calcDisplay.innerHTML = 0;
                break;
            }
            calcDisplay.innerHTML = num1;
            break;

        case 2:
            op = "";
            opExists = !opExists;   
            console.log("Curretn asnwer:", tempAnswer)
            input = 1;
            break;

        default:

            if (num2 == "") {
                calcDisplay.innerHTML = num1;
                tempAnswer = num1;
                input = 2;
                break;
            }

            let snumArray = Array.from(num2);
            snumArray.pop();
            num2 = snumArray.join("");
            console.log(num2)

            if (num2 == "") {
                calcDisplay.innerHTML = num1;
                inputtingNumber = false;
            }
            else {
                calcDisplay.innerHTML = num2;
            }
            tempAnswer = operate(parseFloat(num1), parseFloat(num2), op);
            console.log("Curretn asnwer:", tempAnswer)

            
            break;
    }
    console.log("input mode", input)
}

// Change display to answer
calculate.onclick = () => {
    console.log(tempAnswer, "after =")
    if (!tempAnswer && !(tempAnswer == 0)) {
        calcDisplay.innerHTML = "undefined";
    }
    else {
        calcDisplay.innerHTML = Number((tempAnswer).toFixed(6));
    }
    clearSignals()
}

calcButtons.forEach((btn) => {

    // only display number inputs
    if (numButtons.some(number => btn == number)) {
        btn.addEventListener("click", displayInput);
    }
    btn.addEventListener("click", storeInput);
});


function storeInput(e) {

    let n = e.target.value;
    // If pressed button is a number
    if (numButtons.some(number => n == number.value)) {
        
        // num1 is being inputted
        if (!fnumExists && !opExists) {

            num1 += `${n}`;
            console.log("Storing first number", num1);
            // If user presses a number after getting an answer
            if (tempAnswer) {
                tempAnswer = num1;
            }

            input = 1;


        }
        // num2 is being inputted
        else {
            num2 += `${n}`;
            tempAnswer = operate(parseFloat(num1), parseFloat(num2), op);

            snumExists = true;

            console.log("Storing second number", num2)
            console.log(tempAnswer, "after second number")

            input = 3;
        }
    }
    // If pressed button is an operator
    else if (opButtons.some(op => n == op.value)) {

        // clear first number in the display 
        inputtingNumber = false;

        // signal next number input
        opExists = !opExists;

        op = n;

        console.log(op)

        // If there's one already, set temporary answer as num1 for future operations
        if (tempAnswer || tempAnswer == 0) {
            clearSignals()
            num1 = tempAnswer;
            fnumExists = true;

            // operation must be remembered for = to work
            op = n
        }
        
        console.log(tempAnswer, "after operator", op);

        input = 2;
        
    }     

}

function displayInput(e) {
    if (inputtingNumber) {
        calcDisplay.innerHTML = calcDisplay.innerHTML + `${e.target.value}`;
    }   
    else {
        calcDisplay.innerHTML = `${e.target.value}`;
        inputtingNumber = true;
    }
}

function clearSignals() {
    fnumExists = false;
    snumExists = false; 
    opExists = false; 
    inputtingNumber = false;
    num1 = "";
    num2 = "";
    op = "";
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

    // undefined
    if (num2 == 0 && op =="/") 
    {
        return undefined
    }

    if (isNaN(num1) || isNaN(num2) || op == "")
    {
        return tempAnswer
    }

    // normal operators
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


