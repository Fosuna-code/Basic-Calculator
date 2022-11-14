const body = document.querySelector('body');
//this is the result section

const operation = document.querySelector('.operation');
const showResult = document.querySelector('.showResult');

const all_clean = document.querySelector('.all_clean');
const single_clean = document.querySelector('.single_clean');

//operators
const operators = document.querySelectorAll('.operator');
const numbers =  document.querySelectorAll('.number');

const equal = document.querySelector('.showResultOperator')

const themeToggle = document.querySelector('.themeToggle');

//counting numbers and operations (if the)

themeToggle.addEventListener('click',() =>{
    body.classList.toggle('ligthTheme')
    all_clean.classList.toggle('ligthTheme');
    single_clean.classList.toggle('ligthTheme');
    equal.classList.toggle('ligthTheme');
    operators.forEach(element => {
        element.classList.toggle('ligthTheme');
    });
    numbers.forEach(element => {
        element.classList.toggle('ligthTheme');
    });
});

//setting the first div operation
operation.innerHTML +='<div style="display: inline-block"> <span>0</span> </div>'

function avoidEmptyStr(){
    operation.innerHTML = '<span>0</span>';// "‎"; // invisible character
}

//Events 

single_clean.addEventListener('click', () => {
    // operation.innerText = operation.innerText.slice(0,-1);
    
    if (operation.lastChild.lastChild){
        operation.lastChild.removeChild(operation.lastChild.lastChild);

    }
    if (operation.innerText.length === 0){
        avoidEmptyStr();
    }
})
all_clean.addEventListener('click',() => {
    avoidEmptyStr();
    showResult.innerText = '0';
} )

operators.forEach(element => {
    element.addEventListener('click', ()=>{
        // if (operation.lastChild.innerText.length >= 21){
        //     alert('21 digits are the max');
        //     return;
        // }

        //getting an array with all the operators (operatorsValue)
        let lastCharacterOperation = operation.innerText.charAt(operation.innerText.length - 1);
        let operatorsToArray = Array.from(operators);
        let operatorsValue = operatorsToArray.map(operator => {return operator.innerText});

        // console.log(operatorsValue);
        if (!operatorsValue.includes(lastCharacterOperation)){
            operation.innerHTML += `<div style="display: inline-block;" ><span class="operatiorOnScreen">${element.innerText}</span></div>`; 
        } 

    })
});
numbers.forEach(element => {
    element.addEventListener('click',()=>{
        // if (operation.lastChild.innerText.length >= 20){
        //     alert('21 digits are the max');
        //     return;
        // }
        if ( operation.innerText == 0 ){
            operation.removeChild(operation.lastChild);
            operation.innerHTML +='<div style="display: inline-block">'
        } 

        if (element.innerText !== "."){ // you can't have duplique dots, for this reason i have this conditional
        operation.lastChild.innerHTML += `<span>${element.innerText}</span>`;     
        }
        else{
            let theresDot = operation.lastChild.innerText.includes('.'); 
            if (!theresDot){
                operation.lastChild.innerHTML += `<span>${element.innerText}</span>`; 
            }
        }
    })
})

equal.addEventListener('click', () => {
    showResult.innerText = eval(operation.innerText);
})

//
