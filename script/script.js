// TODO
// Keyboard input
// cannot digit 0 after an op sign (code in digit doesn't work correctly)
// function for automatic date in footer
// link in footer for social / github
// separation point for thousands 
// mouse pointer to hand when on calculator

// --------------------------------------------------------
// DOM VARIABLES
// --------------------------------------------------------

const audio = new Audio("./media/button-press-sound.mp3")
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
let opSign; // holds the operation sign
let focusedItem;  // holds the item we're working on (var1, var2 or result)
let afterOperation;  // boolean: determine if a precedent operation has been made

// --------------------------------------------------------
// MAIN FUNCTION
// --------------------------------------------------------

function calculator() {
    displayBottom.textContent = "0"
    displayTop.textContent = ""
    var1 = "";
    var2 = "";
    op = "";
    focusedItem = "";
    afterOperation = false;

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

    // TEST
    buttons.forEach((button) => {
        button.addEventListener('click', test);
    })
};

// --------------------------------------------------------
// BUTTONS FUNCTIONS
// --------------------------------------------------------

function digitClick(e) {
    // after one operation if a new digit is clicked, that replaces the the result of previous operation
    if (afterOperation) {
        focusedItem = "";
        afterOperation = false;
    };
    // PROBLEM HERE
    // focusedItem cannot starts with 0
    if (!focusedItem && e.target.getAttribute("data-value") == 0) {
        focusedItem = ""
    // adds the digits to focusedItem
    } else focusedItem += e.target.getAttribute("data-value"); 
};

function operatorClick(e) {
    // assigns the current operation sign
    opSign = e.target.textContent
    // if after multiple "C" the "-" sign is the only left in focusedItem, set this to 0
    if (focusedItem == "-") focusedItem = "0";
    // multiple op clicks with just 1 variable just change the operator
    if (!focusedItem && !var2 && var1) op = e.target.getAttribute("data-value")
    // if it's the first operation (afterOperation == false), run the operation code
    else if (!afterOperation) {
        // if an operator is clicked with no digit value set this to 0
        if (!focusedItem) focusedItem = "0";
        // concatenate operations
        if (var1 && op) {
            var2 = focusedItem;
            var1 = operate(parseFloat(var1), parseFloat(var2), op);
            focusedItem = var1;
            op = e.target.getAttribute("data-value");
            var2 = "";
            afterOperation = true;
        // first operation
        } else {
            var1 = focusedItem;
            focusedItem = "";
            op = e.target.getAttribute("data-value");
            afterOperation = false;
        };
    // if an operation has already been executed (afterOperation == true) only change che operator for the next operation
    } else {
        op = e.target.getAttribute("data-value");
        var1 = focusedItem;
    };
    // display on topDisplay (first var and operation sign)
    toDisplayTop(var1, opSign)
};

function equalSignClick() {
    if (!afterOperation && focusedItem) {
        var2 = focusedItem;
        focusedItem = operate(parseFloat(var1), parseFloat(var2), op);
        op = "";
        var2 = "";
        afterOperation = true;  
    };
};

function restartClick() {
    calculator()
    console.clear()
};

function changeSignClick() {
    // if (!afterOperation) {
        if (focusedItem) focusedItem *= -1;
    // };
};

function decimalDotClick() {
    if (!afterOperation) {
        // if clicked without a value, set that to 0 (0.decimal)
        if (!focusedItem) focusedItem = "0";
        // add a dot only if there isn't already one
        if (!focusedItem.toString().includes(".")) {
            afterOperation = false;
            focusedItem += ".";
        };
    };
 };

function cancelClicked() {
    // if the focusedItem holds a new digit (not a result of previous operation)
    if (!afterOperation) {
        focusedItem = focusedItem.toString().slice(0, -1)
        // if empty displays 0
        if (!focusedItem) displayBottom.textContent = "0"
    };
};

// --------------------------------------------------------
// DISPLAY FUNCTIONS
// --------------------------------------------------------

// display the current value in the bottom display
function toDisplayBottom() {
    // if focusedItem is present, display it. If not, display the last defined.
    if (focusedItem) displayBottom.textContent = focusedItem;
};

// display the full operation in the top display
function toDisplayTop(...items) {
    displayTop.textContent = "";
    items.forEach(item => displayTop.textContent += `${item} `);
    console.log(items)
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
    return val1 + val2;
};

function subtract(val1, val2) {
    return val1 - val2;
};

function multiply(val1, val2) {
    return val1 * val2;
};

function divide(val1, val2) {
    if (val1 != 0 && val2 == 0 || val1 == 0 && val2 == 0) {
        displayBottom.textContent = "Sir, you shouldn't do that"
        return 0;
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

function test(e) {
    console.log("-------------------------")
    console.log(e.target.textContent + " clicked")
    console.log("focusedItem: " + focusedItem)
    console.log("var1: " + var1);
    console.log("var2: " + var2);
    console.log("op: " + op);
    console.log("afterOperation: " + afterOperation);
};

// --------------------------------------------------------




calculator()