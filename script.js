

const body = document.querySelector('body');
//this is the result section

const result = document.querySelector('.result');
const operation = document.querySelector('.operation');
const showResult = document.querySelector('.showResult');
// const arrowSvg = document.querySelector('.arrow');

const all_clean = document.querySelector('.all_clean');
const single_clean = document.querySelector('.single_clean');

//operators
const operators = document.querySelectorAll('.operator');
const numbers =  document.querySelectorAll('.number');

const equal = document.querySelector('.showResultOperator')

const themeToggle = document.querySelector('.themeToggle');
const opacityDefault = '1';
const opacityHide = 0.1;

themeToggle.style.opacity = opacityDefault;
// arrowSvg.style.display = 'none';

//fitty module
fitty('#finalResult', {
    maxSize: 48,
});
fitty('#operationId', {
    minSize: 20,
    maxSize: 30,
    multiLine: true,

});

//getting an array with all the operators (operatorsValue)
let operatorsToArray = Array.from(operators);
let operatorsValue = operatorsToArray.map(operator => {return operator.innerText});
    // console.log(operatorsValue)
let countingNumbers;


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

//toogle behavor in queries
function screenHandler(){
    const windowScreen = window.matchMedia('(max-width: 575px)');
    if (windowScreen.matches){
        if ( operation.innerText != '0'){
            themeToggle.style.opacity = opacityHide;
        }else{
            themeToggle.style.opacity = opacityDefault;
        }
    }else{
        themeToggle.style.opacity = opacityDefault;
    }
}
window.onresize = screenHandler;


//setting the first div operation
operation.innerHTML +='<div style="display: inline-block"> <span>0</span> </div>'

function avoidEmptyStr(){
    operation.innerHTML = '<span>0</span>';// "‎"; // invisible character

}

function sharedArrayValue(arr1,arr2){
    return arr1.some(e => arr2.includes(e));
}
// function arrowSvgUp(scrollingElement){
//     scrollingElement.scrollBy({
//         top: 1000,
//         behavior: 'smooth'
//       });
// }


// arrowSvg.addEventListener('click',() =>{
//     console.log('hola');
//     result.scrollBy({
//         top: -1000,
//         behavior: 'smooth'
//       });
// })

//Events 

single_clean.addEventListener('click', () => {
    // operation.innerText = operation.innerText.slice(0,-1);
    
    if (operation.lastChild){
        operation.lastChild.removeChild(operation.lastChild.lastChild);

    }
    if (operation.innerText.length === 0){
        avoidEmptyStr();
    }

    if(operation.innerText.length == 1 && operation.innerText == 0){
        themeToggle.style.opacity = opacityDefault;
    }
})
all_clean.addEventListener('click',() => {
    avoidEmptyStr();
    showResult.innerText = '0';
    themeToggle.style.opacity = opacityDefault;

} )

operators.forEach(element => {
    element.addEventListener('click', ()=>{
        // let countingNumbers = operation.lastChild.innerText.includes(operatorsValue) ? 20 : 21;
        
        // if (operation.lastChild.innerText.length >= countingNumbers){
        //     console.log('21 digits are the max');
        //     return;
        // }

        let lastCharacterOperation = operation.innerText.charAt(operation.innerText.length - 1);
        // console.log(operatorsValue);
        if (!operatorsValue.includes(lastCharacterOperation)){
            operation.innerHTML += `<div style="display: inline-block;" ><span class="operatiorOnScreen">${element.innerText}</span></div>`; 
        } 

    })
});

numbers.forEach(element => {
    element.addEventListener('click',()=>{
        
        if (themeToggle.style.opacity == opacityDefault && window.matchMedia('(max-width: 575px)').matches){
            console.log(themeToggle.style.opacity);
            themeToggle.style.opacity = opacityHide;
        }
        
        // CountingNumbers: you just could put 20 numbers, if there are a
        // operator in the div, you could put 21 characters, if isn't, you just could put
        //20
        countingNumbers = sharedArrayValue(operatorsValue,operation.lastChild.innerText) ? 21 : 20;
        if (operation.lastChild.innerText.length >= countingNumbers){
            alert('sorry mate! no more of 20 digits per number');
            return;
        }

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
        let hasVerticalScrollbar = result.scrollHeight > result.clientHeight;
        if (hasVerticalScrollbar){
            result.scrollBy(0, 100);
            // arrowSvg.style.display = 'block';
        }
    })
})

equal.addEventListener('click', () => {
    showResult.innerText = eval(operation.innerText);
    // let hasVerticalScrollbar = result.scrollHeight > result.clientHeight;
    //     if (hasVerticalScrollbar){
    //         result.scrollBy(0, 100);
    //         arrowSvg.style.top = '50px';
    //     }
})

//
