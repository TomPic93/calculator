// PROBLEMS / TODO:
// button to change the sign
// multiple operation signs typing make change first var and breaks the code
// link the display with the current focused element/result


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

// --------------------------------------------------------
// MAIN FUNCTION

function calculator() {
    digits.forEach((digit) => {
        digit.addEventListener("click", (e) => {
            if (firstVar) {  // if we're working with the first variable (true), add the digit input to var1
                result = 0;  // after one operation finished with "=", if the user wants to starts a new one and starts typing, the previous operation's result is re-initialized 
                var1 += e.target.getAttribute("data-value");
            } else {  // if we're working with the second variable (false), add the digit input to var2
                var2 += e.target.getAttribute("data-value");
            };

            // Test -----------------
            console.log("digit click -------------------------")
            console.log("var1: " + var1);
            console.log("var2: " + var2);
            console.log("op: " + op);
            console.log("firstVar: " + firstVar);
            console.log("result: " + result);
        });
    });

    operators.forEach((operator) => {
        operator.addEventListener('click', (e) => {
            
            if (result) {  // if the user, after one operation finished with "=", wants to continue using the result as the starting point for a new operation, pressing a operation sign will start a new cycle assigning the previous operation's result to var1
                var1 = result;
            };
            if (var1 && var2) {  // if the user wants to concatenate multiple operations (so a value has already been assigned to var1 and var2), the previous operation's result is assigned to var1 and var2 is initialized for the next digit
                var1 = operate(parseInt(var1), parseInt(var2), op);
                var2 = "";
                firstVar = !firstVar;
            }
            op = e.target.getAttribute("data-value");  // the operation the user wants to perform is assigned to the "op" variable
            firstVar = !firstVar;

            // Test -----------------
            console.log("operator click -------------------------")
            console.log("var1: " + var1);
            console.log("var2: " + var2);
            console.log("op: " + op);
            console.log("firstVar: " + firstVar);
            console.log("result: " + result);
        });
    });

    equal.addEventListener('click', () => {
        result = operate(parseInt(var1), parseInt(var2), op);
        // all the variables are re-initialized for the next operation
        op = "";
        var1 = "";
        var2 = "";
        firstVar = !firstVar;

        // Test -----------------
        console.log("= click -------------------------")
        console.log("var1: " + var1);
        console.log("var2: " + var2);
        console.log("op: " + op);
        console.log("firstVar: " + firstVar);
        console.log("result: " + result);
    });
};



// --------------------------------------------------------
// OTHER FUNCTIONS

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