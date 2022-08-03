// PROBLEMS / TODO:
// 

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

// GLOBAL VARIABLES
let storage = []; // -> [value2, value1, op1, op2] -> operation on the first 3 element 
let input = "";

// --------------------------------------------------------

// EVENT-LISTENERS


// --------------------------------------------------------
// MAIN FUNCTIONS

// store variables, calls other functions
function calculator() {
    // adds the entered values to the variable "input"
    digits.forEach((digit) => {
        digit.addEventListener("click", (e) => {
            input += e.target.getAttribute("data-value");
            // test:
            console.log("input: " + input)
            console.log(storage.length)
        });
    });

    operators.forEach((operator) => {
        operator.addEventListener('click', (e) => {
             // insert the input value at the beginning of "storage"
            storage.unshift(input);

            if (storage.length > 2) {
                let result = operate(parseInt(storage[1]), parseInt(storage[0]), storage[2]);
                storage = [result];
            };
            
            // insert the operation to execute at the end of "storage"
            storage.push(e.target.getAttribute("data-value"));
            
            // reset the input value for the next digit
            input = "";
            
            // test:
            console.log("storage: " + storage)

        });
    });

    equal.addEventListener('click', () => {

    });

};



// --------------------------------------------------------
// OTHER FUNCTIONS

// takes two input values and one operation function (below) and return the result
function operate(input1, input2, operationToDo) {
    // based on the values of "storage", call one of the operation functions below
    // with the two digit values stored
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







calculator()