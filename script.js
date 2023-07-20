// first number --- operator --- second number method 

// Initialize flags
let fnumExists = false;
let snumExists = false;
let opExists = false;
let inputtingNumber = false;
let input = 1;

// Initialize an array to remember history of the user's input for proper deletion
let eqHistory = [];

// Initialize number, operator, and answer variables
let num1 = "";
let num2 = "";
let op = "";
let tempAnswer;

const calcDisplay = document.getElementById("num-display");
const eqDisplay = document.getElementById("eq-display");

const calcButtons = document.querySelectorAll(".displayable");
let numButtons = Array.from(document.querySelectorAll(".number"));
let opButtons = Array.from(document.querySelectorAll(".operator"));

// Arrage number buttons for easier passing of value
numButtons = numButtons.sort((a, b) => a.value > b.value ? 1 : -1);

// Modifying elements
const acButton = document.getElementById("clear");
const delButton = document.getElementById("backspace");
const calculate = document.getElementById("answer");

// Clear display
acButton.onclick = () => {
    calcDisplay.innerHTML = 0;

    eqDisplay.innerHTML = "";
    eqHistory = [];

    clearSignals()
    tempAnswer = undefined;
}

// Backspace
delButton.onclick = () => {
    displayedNumber = calcDisplay.innerHTML;

    // Auxiliary display
    eqHistory.pop()
    eqDisplay.innerHTML = eqHistory.join("");


    // Main display
    if (displayedNumber == '0') {
        calcDisplay.innerHTML = 0;
        clearSignals()
        tempAnswer = undefined;
        return
    }

    switch(input) {

        // First number is currently being modified
        case 1:
            let fnumArray = Array.from(num1);
            fnumArray.pop();
            num1 = fnumArray.join("");
            console.log(num1)

            // If the first number is already empty
            if (num1 == "") {
                inputtingNumber = false;
                calcDisplay.innerHTML = 0;
                break;
            }
            eqDisplay.innerHTML = num1; 
            calcDisplay.innerHTML = num1;
            break;
        
        // Operator is currently being modified
        case 2:

            op = "";

            // Toggle for storeInput()
            opExists = !opExists;
            
            console.log("Curretn asnwer:", tempAnswer)
            inputtingNumber = true;
            input = 1;

            break;

        // Second number is currently being modified
        default:

            // If user clicks del after getting an answer
            if (displayedNumber == tempAnswer) {
                calcDisplay.innerHTML = 0;
                clearSignals()
                tempAnswer = undefined;
                break;
            }

            let snumArray = Array.from(num2);
            snumArray.pop();
            num2 = snumArray.join("");
            console.log(num2)

            // If the second number is empty
            if (num2 == "") {
                calcDisplay.innerHTML = num1;
                inputtingNumber = false;
                tempAnswer = num1;
                input = 2;
                break;
            }

            calcDisplay.innerHTML = num2;
            tempAnswer = operate(parseFloat(num1), parseFloat(num2), op);
            console.log(num1, op, num2, "Curretn asnwer:", tempAnswer)
            break;

        
    }

    console.log("input mode", input)
    console.log(displayedNumber, op, fnumExists, snumExists, opExists)
}

// Change display to answer
calculate.onclick = () => {
    console.log(tempAnswer, "after =")
    if (tempAnswer === undefined && !(tempAnswer == 0)) {
        calcDisplay.innerHTML = "undefined";
        eqDisplay.innerHTML = "undefined";
        eqHistory = [];
    }
    else {
        calcDisplay.innerHTML = Number((tempAnswer).toFixed(6));

        // Set auxiliary display to answer, equation history set to answer
        eqDisplay.innerHTML = Number((tempAnswer).toFixed(6));
        eqHistory = [tempAnswer];
    }
    clearSignals()
}

calcButtons.forEach((btn) => {
    btn.addEventListener("click", displayInput);
    btn.addEventListener("click", storeInput);

});


function storeInput(e) {

    let n = e.target.value;

    // If the pressed button is a number
    if (numButtons.some(number => n == number.value)) {
        
        // num1 is being inputted
        if (!fnumExists && !opExists) {

            num1 += `${n}`;
            console.log("Storing first number", num1);

            // If user presses a number after getting an answer
            if (tempAnswer) {
                tempAnswer = num1;

                eqHistory = [tempAnswer];
                eqDisplay.innerHTML = eqHistory.join("");
            }

            // Signal that the first number is being modified
            input = 1;
        }

        // num2 is being inputted
        else {
            num2 += `${n}`;
            tempAnswer = operate(parseFloat(num1), parseFloat(num2), op);

            snumExists = true;

            console.log("Storing second number", num2)
            console.log(tempAnswer, "after second number")

            // Signal that the second number is being modified
            input = 3;
        }
    }
    // If pressed button is an operator
    else if (opButtons.some(op => n == op.value)) {

        // Clear first number in the display 
        inputtingNumber = false;

        // Signal next number input
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

        // Signal that the operator is being modified
        input = 2;
        
    }     

}

// Auxiliary functions

function displayInput(e) {
   
    // display only numbers in the main display
    if (numButtons.some(number => e.target == number)){

        if (inputtingNumber) {
            calcDisplay.innerHTML = calcDisplay.innerHTML + `${e.target.value}`;
        }   
        else {
            calcDisplay.innerHTML = `${e.target.value}`;
            inputtingNumber = true;
        }
    }
    
    // display equation on the auxiliary display
    eqHistory.push(`${e.target.value}`);
    eqDisplay.innerHTML = eqHistory.join("");

}

function clearSignals() {
    fnumExists = false;
    snumExists = false; 
    opExists = false; 
    inputtingNumber = false;
    num1 = "";
    num2 = "";
    op = "";
    input = 1;
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

    // If there is any empty number or operator
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


