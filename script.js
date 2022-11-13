//this is the result section
const operation = document.querySelector('.operation');
const showResult = document.querySelector('.showResult');

const all_clean = document.querySelector('.all_clean');
const single_clean = document.querySelector('.single_clean');

//operators
const operators = document.querySelectorAll('.operator');
const numbers =  document.querySelectorAll('.number');

const equal = document.querySelector('.showResultOperator')



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
