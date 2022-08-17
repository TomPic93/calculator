// --------------------------------------------------------
// DOM VARIABLES
// --------------------------------------------------------

const d = new Date();
let year = d.getFullYear();
let currentYear = document.querySelector("#currentYear");
const audio = new Audio("./media/button-press-sound.mp3");
let changeSignBtn = document.querySelector("#changeSign");
let cancel = document.querySelector("#cancel");
let clear = document.querySelector("#clear");
let displayTop = document.querySelector("#displayTop");
let displayBottom = document.querySelector("#displayBottom");
let buttons = document.querySelectorAll(".button"); // all buttons
let digits = document.querySelectorAll(".digit") // 0-9
let operators = document.querySelectorAll(".operator");
let equal = document.querySelector("#equal");
let dot = document.querySelector("#dot");

// --------------------------------------------------------
// GLOBAL VARIABLES
// --------------------------------------------------------

let var1;  // holds the operation's first variable (number)
let var2;  // holds the operation's second variable (number)
let op; // holds the operation to be performed on the variables
let opSign; // holds the operation sign (ONLY FOR DISPLAY)
let focusedItem;  // holds the item we're working on (var1, var2 or result)
let newOperation;  // boolean: determine if a precedent operation has been made
let lastInput; // holds the last input type (digit, operator, etc)

// --------------------------------------------------------
// MAIN FUNCTION
// --------------------------------------------------------

function calculator() {
    displayBottom.textContent = ""
    displayTop.textContent = ""
    var1 = "";
    var2 = "";
    op = "";
    focusedItem = "";
    newOperation = false;
    lastInput = "";

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
    buttons.forEach((button) => button.addEventListener('click', toDisplayBottom)); // bottom display (current value)
    // SOUND
    buttons.forEach((button) => button.addEventListener('click', buttonSound));
};

// --------------------------------------------------------
// BUTTONS FUNCTIONS
// --------------------------------------------------------

function digitClick(e) {
    let digit = e.target.getAttribute("data-value");

    // after one operation if a new digit is clicked, replaces the result of previous operation with that
    if (newOperation) {
        focusedItem = ""
        newOperation = false
    };

    // user can't click multiple initial 0
    if (focusedItem == 0 && digit == 0) {
        focusedItem = 0
    // if user clicks 0 and then another number, deletes the first 0 (except for a decimal value)
    } else if (focusedItem == 0 && digit != 0 && lastInput != "decimalDot") {
        focusedItem = ""
        focusedItem += digit
    // just adds the digit to focusedItem
    } else {
        focusedItem += digit
    };
    lastInput = "digit"
};

function operatorClick(e) {
    let operator = e.target.getAttribute("data-value");

    // if after multiple "C" the "-" sign is the only left in focusedItem, sets this to 0
    if (focusedItem == "-") focusedItem = "0";

    // multiple operator sign clicks with just 1 variable set just change the operator and exits the function
    if (lastInput == "operator") {
        op = operator

    // OPERATION CYCLE
    } else if (newOperation == false) {
        // if an operator sign is clicked with no digit value sets this to 0
        if (focusedItem == false) focusedItem = "0"
        
        if (var1 && op) { // CONCATENATE OPERATIONS (x + y +)
            var2 = focusedItem
            var1 = operate(parseFloat(var1), parseFloat(var2), op)
            focusedItem = var1
            op = operator
            var2 = ""
            newOperation = true  // enables a new input in focusedItem (digitClicked)
        } else { // NEW OPERATION (x +)
            var1 = focusedItem
            focusedItem = ""
            op = operator
            newOperation = false
        };
    // NEW OPERATION WITH PREVIOUS RESULT (x + y = z +)
    } else {
        op = operator
        var1 = focusedItem
    };


    lastInput = "operator";
    // assigns the current operation sign (ONLY FOR DISPLAY REASON)
    opSign = e.target.textContent;
    // displays on topDisplay (first var and operation sign)
    toDisplayTop(var1, opSign);
};

function equalSignClick() {
    if (newOperation == false) {
        var2 = focusedItem
        focusedItem = operate(parseFloat(var1), parseFloat(var2), op)
        op = ""
        var2 = ""
        newOperation = true  // enables a new digit input (digitClicked)
    };
    lastInput = "equal"
};

function restartClick() {
    calculator()
    console.clear()
};

function changeSignClick() {
    if (focusedItem) focusedItem *= -1;
};

function decimalDotClick() {
    if (!newOperation) {
        // if clicked without a value, set that to 0 (0.decimal)
        if (!focusedItem) focusedItem = "0";
        // add a dot only if there isn't already one
        if (focusedItem.toString().includes(".") == false) {
            newOperation = false
            focusedItem += "."
        };
    };
    lastInput = "decimalDot"
};

function cancelClicked() {
    // works only for new digits
    if (!newOperation) {
        focusedItem = focusedItem.toString().slice(0, -1)
        // if all digits are deleted, displays 0
        if (!focusedItem) displayBottom.textContent = "0"
    };
};

// --------------------------------------------------------
// DISPLAY FUNCTIONS
// --------------------------------------------------------

// displays the current value in the bottom display
function toDisplayBottom() {
    displayBottom.textContent = focusedItem;
};

// displays the full operation in the top display
function toDisplayTop(...items) {
    displayTop.textContent = ""
    items.forEach(item => displayTop.textContent += `${item} `);
};

// --------------------------------------------------------
// OPERATION FUNCTIONS
// --------------------------------------------------------

// takes two input values and one operation function (below) and return the result
function operate(input1, input2, operationToDo) {
    let result = window[operationToDo](input1, input2);

    // if the result is float, fixes it to two decimal points
    if ((result - Math.floor(result)) !== 0) result = result.toFixed(2);
    // displays on topDisplay
    toDisplayTop(input1, opSign, input2, " =")
    return result;
};

function add(val1, val2) {
    return val1 + val2
};

function subtract(val1, val2) {
    return val1 - val2
};

function multiply(val1, val2) {
    return val1 * val2
};

function divide(val1, val2) {
    // if user tries to divide by 0
    if (val1 != 0 && val2 == 0 || val1 == 0 && val2 == 0) {
        alert("Sir, you shouldn't do that. Shame on you.")
        restartClick()
    } else {
        return val1 / val2;
    };
};

// --------------------------------------------------------
// OTHER FUNCTIONS
// --------------------------------------------------------

function buttonSound() {
    audio.load();
    audio.play();
};

// --------------------------------------------------------

currentYear.textContent = year;

calculator()