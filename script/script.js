// TO DO
// multiple operator return NaN
// multiple operation with op without new digit (on the focusedItem) doesn't work when changing operator
// implement cancel function

// --------------------------------------------------------
// DOM VARIABLES
let changeSignBtn = document.querySelector("#changeSign");
let cancel = document.querySelector("#cancel");
let clear = document.querySelector("#clear");
let display = document.querySelector("#display");
let buttons = document.querySelectorAll(".button");
let digits = document.querySelectorAll(".digit")
let operators = document.querySelectorAll(".operator");
let equal = document.querySelector(".equal");
let dot = document.querySelector(".dot");

// --------------------------------------------------------
// GLOBAL VARIABLES
let var1;  // holds the operation's first variable (number)
let var2;  // holds the operation's second variable (number)
let op; // holds the operation to be performed on the variables
let focusedItem;  // holds the item we're working on (var1, var2 or result)
let afterEqual;  // boolean: determine if a precedent operation has been made

// --------------------------------------------------------
// MAIN FUNCTION

function calculator() {
    display.textContent = "0"
    var1 = "";
    var2 = "";
    op = "";
    focusedItem = "";
    afterEqual = false;

    
    // CLEAR (A/C)
    clear.addEventListener("click", restartClick)
    // CANCEL (C)
    cancel.addEventListener("click", cancelClicked)
    // CHANGE SIGN (+/-)
    changeSignBtn.addEventListener("click", changeSignClick);
    // DIGITS (0-9)
    digits.forEach(digit => digit.addEventListener("click", digitClick));
    // OPERATORS (+,-,*,/)
    operators.forEach(operator => operator.addEventListener('click', operatorClick));
    // DECIMAL DOT (.)
    dot.addEventListener("click", decimalDotClick);
    // EQUAL SIGN (=)
    equal.addEventListener('click', equalSignClick);
    // DISPLAY
    buttons.forEach((button) => button.addEventListener('click', toDisplay));


    // TEST
    buttons.forEach((button) => {
        button.addEventListener('click', test);
    })
};

// --------------------------------------------------------
// BUTTONS FUNCTIONS

function digitClick(e) {
    if (afterEqual) {
        focusedItem = "";
        afterEqual = false;
    };
    focusedItem += e.target.getAttribute("data-value");
};

function operatorClick(e) {
    // concatenate operations
    if (var1 && op) {
        var2 = focusedItem;
        var1 = operate(parseFloat(var1), parseFloat(var2), op);
        focusedItem = var1;
        op = e.target.getAttribute("data-value");
        var2 = "";
        afterEqual = true;
    // first operation
    } else {
        var1 = focusedItem;
        focusedItem = "";
        op = e.target.getAttribute("data-value");
        afterEqual = false;
    }
};

function equalSignClick() {
    if (!afterEqual) {
        var2 = focusedItem;
        focusedItem = operate(parseFloat(var1), parseFloat(var2), op);
        op = "";
        var2 = "";
        afterEqual = true;
    };
};

function restartClick() {
    calculator()
    console.clear()
};

function changeSignClick() {
    focusedItem *= -1;
};

function decimalDotClick() {
    if (!focusedItem) {
        focusedItem = 0;
    };
    if (!focusedItem.includes(".")) {
        focusedItem += "."
    }
}

function cancelClicked() {
    focusedItem = focusedItem.toString().slice(0, -1)
};

// --------------------------------------------------------
// OTHER FUNCTIONS

// takes two input values and one operation function (below) and return the result
function operate(input1, input2, operationToDo) {
    return window[operationToDo](input1, input2);
};

// display the argument in the calculator display
function toDisplay() {
    // if focusedItem is present, display it. If not, display the last defined.
    if (focusedItem) {
        display.textContent = focusedItem;
    }
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
    if (val1 != 0 && val2 == 0) {
        display.textContent = "Not today."
    } else {
        return (val1 / val2).toFixed(2);
    };
};

// --------------------------------------------------------


function test() {
    console.log("-------------------------")
    console.log("focusedItem: " + focusedItem)
    // console.log("type: " + typeof (focusedItem))
    console.log("var1: " + var1);
    // console.log("type: " + typeof(var1))
    console.log("var2: " + var2);
    // console.log("type: " + typeof (var2))
    console.log("op: " + op);
    console.log("afterEqual: " + afterEqual);
}

calculator()