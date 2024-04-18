// script.js for calculator 
function add(a,b){
    return (a+b);
}
function subtract(a,b){
    return (a-b);
}
function multiply(a,b){
    return (a*b);
}
function divide(a,b){
    return (a/b);
}

let num1 = "0";
let operator = "";
let num2 = "";

function operate(num1, operator, num2){
    if (operator == " + "){
        return add(num1,num2);
    }
    else if (operator == " - "){
        return subtract(num1,num2);
    }
    else if (operator == " x "){
        return multiply(num1,num2);
    }
    else if (operator == " ÷ "){ //for division function
        if (num2 == 0){
            return "Haha!"; // Produce error if num/0 so dont crash the calculator
        }
        else{
        return divide(num1,num2);}
    }
}

const display = document.querySelector(".display");
let displayValue = "";
display.textContent = num1; //display will show "0" at the start

//updating display based on what number u type, havent included operations
const nums = document.querySelectorAll(".nums"); 
nums.forEach((num) => {
    num.addEventListener("click" , () =>{
        if (num1 == "0" || displayValue == "restart"){ //first input into calc as well as restarting after finished operation
            displayValue = "";
            num1 = ""; //clear num1 so that we know that num1 is being created again through displayValue
        }
        displayValue = "" + displayValue + num.value;
        display.textContent = displayValue;

    });    
});

let operand;

const operations = document.querySelectorAll(".operators");
operations.forEach((operation) => {
    operation.addEventListener("click", () =>{
        if (num1 == ""){ //u only have num1 typed in before u type the operator
            operand = operation.textContent;
            num1 = displayValue; //update num1
            displayValue="";} //change display value to nothing so can store num2
        else if (num1 !== "" && displayValue !== "" && displayValue !== "restart"){ //means this acts as a equal sign now and u must operate
            num1 = parseFloat(num1); //change string to float
            num2 = parseFloat(displayValue);
            let answer= operate(num1,operand,num2);
            display.textContent = answer;
            num1 = answer;
            operand = operation.textContent;
            displayValue = "";
        }
        else if(num1 !=="" && displayValue == "restart"){
            operand = operation.textContent;
            displayValue ="";
        }
    })
})

//BELOW ALL CHECKED. PROBLEM ARISES FROM CODE ABOVE ^^^^^

const allclear = document.querySelector("#ac") //CHECKED
allclear.addEventListener(("click"), () =>{
    num1 = "0"
    num2 = ""
    display.textContent = "0";
    displayValue ="0" //reset to nothing so can start w storage of num1
})

const equals = document.querySelector('.equals') // CHECKED
equals.addEventListener("click", () => {
    num1 = parseFloat(num1); //change string to float
    num2 = parseFloat(displayValue);
    let answer = operate(num1, operand, num2);
    display.textContent = answer;
    displayValue = "restart";
    num1 = answer; //if straight away press another operand, it will work
    num2 = "";
    operand = "";
});

const del = document.querySelector("#del") //CHECKED
del.addEventListener("click", () => {
    displayValue = displayValue.slice(0,-1); //removing the last number in the string. only can edit the values u keyed in, cannot alter answer returned
    display.textContent = displayValue;
})