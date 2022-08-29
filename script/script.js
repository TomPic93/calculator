// --------------------------------------------------------
// DOM VARIABLES
// --------------------------------------------------------

const currentYear = document.querySelector("#currentYear");
const audio = new Audio("./media/button-press-sound.mp3");
const displayTop = document.querySelector("#displayTop");
const displayBottom = document.querySelector("#displayBottom");
const buttons = document.querySelectorAll(".button");

// --------------------------------------------------------
// GLOBAL VARIABLES
// --------------------------------------------------------

// copyright year changes automatically
const d = new Date();
currentYear.textContent = d.getFullYear();

let var1;  // holds the operation's first variable (number)
let var2;  // holds the operation's second variable (number)
let operator;  // + - * /
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
    operator = "";
    focusedItem = "";
    newOperation = false;
    lastInput = "";

    // INPUT OPTIONS: click on screen or keyboard press
    buttons.forEach((button) => button.addEventListener('click', inputListener));
    document.addEventListener("keydown", inputListener)
};

// --------------------------------------------------------
// USER'S INPUT HANDLER
// --------------------------------------------------------

function inputListener(e) {
    let input;
    // different value origin for click and keydown events
    if (e.type == "click") input = e.target.getAttribute("data-value")
    if (e.type == "keydown") input = e.key

    if (input >= 0 && input <= 9 && input != null) digitClick(input)
    if (input == "+" || input == "-" || input == "*" || input == "/") operatorClick(input)
    if (input == "=" || input == "Enter") equalSignClick()
    if (input == "+/-") changeSignClick()
    if (input == ".") decimalDotClick()
    if (input == "c" || input == "Backspace" || input == "Delete") cancelClick()
    if (input == "a/c" || input == "Escape" || input == "Clear") restartClick()
    
    toDisplayBottom();
};

// --------------------------------------------------------
// BUTTONS FUNCTIONS
// --------------------------------------------------------

function digitClick(digitInput) {

    // after one complete operation, if a new digit is clicked, replaces the result of previous operation with that
    if (newOperation) {
        focusedItem = ""
        newOperation = false
    };

    // user can't click multiple initial 0
    if (focusedItem == 0 && digitInput == 0) {
        focusedItem = 0
    // if user clicks 0 and then another digit, deletes the first 0 (except for a decimal value)
    } else if (focusedItem == 0 && digitInput != 0 && lastInput != "decimalDot") {
        focusedItem = ""
        focusedItem += digitInput
    } else {
        // "normal case": just adds the digit to focusedItem
        focusedItem += digitInput
    };
    
    lastInput = "digit"
    buttonSound()
};

function operatorClick(operatorInput) {

    // if after multiple "C" the "-" sign is the only left in focusedItem, sets this to 0
    if (focusedItem == "-") focusedItem = "0";

    // multiple operator sign clicks with just 1 variable set just change the operator
    if (lastInput == "operator") {
        operator = operatorInput

        // OPERATION CYCLE
    } else if (newOperation == false) {
        // if an operator sign is clicked with no digit value sets this to 0
        if (focusedItem == false) focusedItem = "0"

        if (var1 && operator) { // CONCATENATE OPERATIONS (x + y +)
            var2 = focusedItem
            var1 = operate(parseFloat(var1), parseFloat(var2), operator)
            focusedItem = var1
            operator = operatorInput
            var2 = ""
            newOperation = true  // enables a new input in focusedItem (digitClick)
        } else { // NEW OPERATION (x +)
            var1 = focusedItem
            focusedItem = ""
            operator = operatorInput
            newOperation = false
        };
        // NEW OPERATION WITH PREVIOUS RESULT (x + y = z +)
    } else {
        operator = operatorInput
        var1 = focusedItem
    };

    lastInput = "operator";

    // displays on topDisplay (first var and operation sign)
    toDisplayTop(var1, operatorInput);
    buttonSound()
};

function equalSignClick() {
    if (newOperation == false && (var2 || var2 == 0)) {
        var2 = focusedItem
        focusedItem = operate(parseFloat(var1), parseFloat(var2), operator)
        operator = ""
        var2 = ""
        newOperation = true  // enables a new digit input (digitClicked)
    };
    lastInput = "equal"
    buttonSound()
};

function changeSignClick() {
    if (focusedItem) focusedItem *= -1;
    buttonSound()
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
    buttonSound()
};

function cancelClick() {
    // works only for new digits
    if (!newOperation) {
        focusedItem = focusedItem.toString().slice(0, -1)
        // if all digits are deleted, displays 0
        if (!focusedItem) displayBottom.textContent = "0"
    }
    buttonSound()
};

function restartClick() {
    calculator()
    console.clear()
    buttonSound()
};

// --------------------------------------------------------
// OPERATION FUNCTION
// --------------------------------------------------------

// takes two values and one symbol and return the result
function operate(input1, input2, symbol) {
    let result;

    if (symbol == "+") result = input1 + input2
    if (symbol == "-") result = input1 - input2
    if (symbol == "*") result = input1 * input2
    if (symbol == "/") {
        if (input1 != 0 && input2 == 0 || input1 == 0 && input2 == 0) {
            alert("Sir, you shouldn't do that. Shame on you.")
            restartClick()
        } else { result = input1 / input2 }
    }

    // if the result is float, fixes it to two decimal points
    if ((result - Math.floor(result)) !== 0) result = result.toFixed(2);
    // // displays on topDisplay
    toDisplayTop(input1, symbol, input2, " =")
    return result;
};

// --------------------------------------------------------
// DISPLAYS FUNCTIONS
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
// OTHER FUNCTIONS
// --------------------------------------------------------

function buttonSound() {
    audio.load();
    audio.play();
};

// --------------------------------------------------------

calculator()