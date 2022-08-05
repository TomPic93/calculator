// PROBLEMS / TODO:
// button to change the sign
// link the display with the current focused element/result
// A/C button
// delete button


// --------------------------------------------------------
// DOM VARIABLES
let changeSign = document.querySelector("#changeSign");
let cancel = document.querySelector("#cancel");
let clear = document.querySelector("#clear");
let display = document.querySelector("#display");
let buttons = document.querySelectorAll(".button");
let digits = document.querySelectorAll(".digit")
let operators = document.querySelectorAll(".operator");
let equal = document.querySelector(".equal");

// --------------------------------------------------------
// GLOBAL VARIABLES
let firstVar = true;
let var1 = "";
let var2 = "";
let op = "";
let result = "";
let lastInput = "";

// --------------------------------------------------------
// MAIN FUNCTION

function calculator() {
    // DIGITS
    digits.forEach((digit) => {
        digit.addEventListener("click", digitPressed);
    });
    // OPERATORS
    operators.forEach((operator) => {
        operator.addEventListener('click', operatorPressed);
    });
    // EQUAL SIGN
    equal.addEventListener('click', equalSignPressed);
    // CLEAR
    clear.addEventListener("click", restart)
};

// --------------------------------------------------------
// OTHER FUNCTIONS

// the user press a operator sign (+,-,*,/)
function operatorPressed(e) {
    // if the user, after one operation finished with "=" so the result variable results TRUE, wants to continue using
    // the result as the starting point for a new operation, pressing a operation sign will start a new cycle assigning
    // the previous operation's result to var1
    if (result) {
        var1 = result;
    };
    // if the user wants to concatenate multiple operations (so a value has already been assigned to var1 and var2),
    // the previous operation's result is assigned to var1 and var2 is initialized for the next digit
    if (var1 && var2) {
        var1 = operate(parseInt(var1), parseInt(var2), op);
        var2 = "";
        // when the condition is true, this changes only to equilibrate the second change below
        firstVar = !firstVar;
    };
    // the operation the user wants to perform is assigned to the "op" variable
    op = e.target.getAttribute("data-value");
    // the user can change the operator (es. + -> /) without changing the variable he's working on (var2)
    if (lastInput != "operator") {
        firstVar = !firstVar;
    };
    lastInput = "operator";

    // Test -----------------
    console.log("operator click -------------------------")
    console.log("last input type: " + lastInput)
    console.log("var1: " + var1);
    console.log("var2: " + var2);
    console.log("op: " + op);
    console.log("firstVar: " + firstVar);
    console.log("result: " + result);
}

// the user press a digit (0-9)
function digitPressed(e) {
    if (firstVar) {  // if we're working with the first variable (true), add the digit input to var1
        result = 0;  // after one operation finished with "=", if the user wants to starts a new one and starts typing, the previous operation's result is re-initialized 
        var1 += e.target.getAttribute("data-value");
    } else {  // if we're working with the second variable (false), add the digit input to var2
        var2 += e.target.getAttribute("data-value");
    };
    // variable used when clicking an operator
    lastInput = "digit";

    // Test -----------------
    console.log("digit click -------------------------")
    console.log("last input type: " + lastInput)
    console.log("var1: " + var1);
    console.log("var2: " + var2);
    console.log("op: " + op);
    console.log("firstVar: " + firstVar);
    console.log("result: " + result);

}

// the user press the equal sign
function equalSignPressed(e) {
    if (var1 && var2 && op) {
        result = operate(parseInt(var1), parseInt(var2), op);
        // all the variables are re-initialized for the next operation
        op = "";
        var1 = "";
        var2 = "";
        firstVar = !firstVar;
    }


    // Test -----------------
    console.log("= click -------------------------")
    console.log("last input type: " + lastInput)
    console.log("var1: " + var1);
    console.log("var2: " + var2);
    console.log("op: " + op);
    console.log("firstVar: " + firstVar);
    console.log("result: " + result);
}

// the user press A/C 
function restart() {
    console.log("restart")
    let firstVar = true;
    let var1 = "";
    let var2 = "";
    let op = "";
    let result = "";
    let lastInput = "";
    calculator()

    // Test -----------------
    console.log("clear click -------------------------")
    console.log("last input type: " + lastInput)
    console.log("var1: " + var1);
    console.log("var2: " + var2);
    console.log("op: " + op);
    console.log("firstVar: " + firstVar);
    console.log("result: " + result);
}

// takes two input values and one operation function (below) and return the result
function operate(input1, input2, operationToDo) {
    // based on the values of "storage", call one of the operation functions below with the two digit values stored
    return window[operationToDo](input1, input2);
};

// display the argument in the calculator display
function displayResult(toDisplay) {
    display.textContent = toDisplay;
}


// --------------------------------------------------------
// OPERATION FUNCTIONS

function add(val1, val2) {
    return val1 + val2;
};

function subtract(val1, val2) {
    return val1 - val2;
};

function multiply(val1, val2) {
    return val1 * val2;
};

function divide(val1, val2) {
    return val1 / val2
};

// --------------------------------------------------------

calculator()