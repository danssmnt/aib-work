// Há browsers que não suportam ou restrigem o HTML5, por razões de privacidade (como o Librewolf)
// Source: https://stackoverflow.com/a/13952727
function isNumberKey(evt)
{
    var charCode = (evt.which) ? evt.which : evt.keyCode;

    if (charCode > 31 && (charCode < 48 || charCode > 57))
        return false;

    return true;
}

// Retorna, de um input, um integer, ou NaN
function getIntFromInput(input)
{
    if (input.value.length <= 0) 
        return NaN;

    return parseInt(input.value);
}

class LoopFunction
{
    #returned; #time;
    constructor(returned, time)
    {
        this.#returned = returned;
        this.#time = time;
    }

    get returnValue()
    {
        if (this.#returned.length <= 0) return "Nada";
        return this.#returned;
    }

    get timeProcessed()
    {
        if (this.#time <= 0) return "Time: 0s!";
        return `Time: ${this.#time.toFixed(1)}ms`;
    }
}

// Retorna os primeiros X Números Naturais
// O 0 não é considerado número natural
function getNumerosNaturais(quantidade)
{
    var returnString = "";

    // https://stackoverflow.com/a/1975103
    const beforeTime = performance.now();

    for (var i = 1; i < quantidade+1; i++)
    {
        returnString += `${i} `;
    }

    const afterTime = performance.now();

    return new LoopFunction(returnString.trimEnd(), afterTime - beforeTime);
}

// Retorna os primeiros X Números Pares
function getumerosPares(quantidade)
{
    var returnString = "";

    const beforeTime = performance.now();

    var numAtual = 0;
    var countNumPar = 0;
    while (countNumPar < quantidade)
    {
        if ( numAtual % 2 == 0 )
        {
            returnString += `${numAtual} `;
            countNumPar++;
        }
        numAtual++;
    }

    const afterTime = performance.now();

    return new LoopFunction(returnString.trimEnd(), afterTime - beforeTime);
}

// Retorna os primeiros X Números Ímpares
function getNumerosImpares(quantidade)
{
    var returnString = "";

    const beforeTime = performance.now();

    var numAtual = 0;
    var countNumImpar = 0;
    while (countNumImpar < quantidade)
    {
        if ( numAtual % 2 != 0 )
        {
            returnString += `${numAtual} `;
            countNumImpar++;
        }
        numAtual++;
    }

    const afterTime = performance.now();

    return new LoopFunction(returnString.trimEnd(), afterTime - beforeTime);
}

// Retorna os primeiros X Múltiplos de 3
function getMul3(quantidade)
{
    var returnString = "";

    const beforeTime = performance.now();

    var numAtual = 1;
    var countMul3 = 0;
    while (countMul3 < quantidade)
    {
        if ( numAtual % 3 == 0 )
        {
            returnString += `${numAtual} `;
            countMul3++;
        }
        numAtual++;
    }

    const afterTime = performance.now();

    return new LoopFunction(returnString.trimEnd(), afterTime - beforeTime);
}

// Retorna os primeiros X Divisores de 12, se quantidade > num. divisores de 12, retornará todos os existentes
function getDiv12(quantidade)
{
    var returnString = "";

    const beforeTime = performance.now();

    var numAtual = 0;
    var countDiv12 = 0;
    while (numAtual < 12 && countDiv12 < quantidade)
    {
        if ( 12 % numAtual == 0 )
        {
            returnString += `${numAtual} `;
            countDiv12++;
        }
        numAtual++;
    }

    const afterTime = performance.now();

    return new LoopFunction(returnString, afterTime - beforeTime);
}


function gerarNumeros()
{
    const numNumbersInput = document.getElementById("numNumbersInput");
    const naturaisOutput = document.getElementById("naturaisOutput");
    const naturaisOutputTime = document.getElementById("naturaisOutputTime");
    const paresOutput = document.getElementById("paresOutput");
    const paresOutputTime = document.getElementById("paresOutputTime");
    const imparesOutput = document.getElementById("imparesOutput");
    const imparesOutputTime = document.getElementById("imparesOutputTime");
    const mul3Output = document.getElementById("mul3Output");
    const mul3OutputTime = document.getElementById("mul3OutputTime");
    const div12Output = document.getElementById("div12Output");
    const div12OutputTime = document.getElementById("div12OutputTime");

    if (!numNumbersInput || !naturaisOutput || !naturaisOutputTime || !paresOutput || 
        !paresOutputTime || !imparesOutput || !imparesOutputTime || !mul3Output || 
        !mul3OutputTime || !div12Output || !div12OutputTime) return;

    var quantidade = getIntFromInput(numNumbersInput);

    if (isNaN(quantidade)) return;

    if (quantidade < 1)
    {
        quantidade = 1;
        numNumbersInput.value = 1;
    }

    const naturaisFunc = getNumerosNaturais(quantidade);
    const paresFunc = getumerosPares(quantidade);
    const imparesFunc = getNumerosImpares(quantidade);
    const mul3Func = getMul3(quantidade);
    const div12Func = getDiv12(quantidade);

    naturaisOutput.value = naturaisFunc.returnValue;
    naturaisOutputTime.innerText = naturaisFunc.timeProcessed;

    paresOutput.value = paresFunc.returnValue;
    paresOutputTime.innerText = paresFunc.timeProcessed;

    imparesOutput.value = imparesFunc.returnValue;
    imparesOutputTime.innerText = imparesFunc.timeProcessed;

    mul3Output.value = mul3Func.returnValue;
    mul3OutputTime.innerText = mul3Func.timeProcessed;

    div12Output.value = div12Func.returnValue;
    div12OutputTime.innerText = div12Func.timeProcessed;
}

function clearOutput()
{
    const numNumbersInput = document.getElementById("numNumbersInput");
    const naturaisOutput = document.getElementById("naturaisOutput");
    const naturaisOutputTime = document.getElementById("naturaisOutputTime");
    const paresOutput = document.getElementById("paresOutput");
    const paresOutputTime = document.getElementById("paresOutputTime");
    const imparesOutput = document.getElementById("imparesOutput");
    const imparesOutputTime = document.getElementById("imparesOutputTime");
    const mul3Output = document.getElementById("mul3Output");
    const mul3OutputTime = document.getElementById("mul3OutputTime");
    const div12Output = document.getElementById("div12Output");
    const div12OutputTime = document.getElementById("div12OutputTime");

    if (!numNumbersInput || !naturaisOutput || !naturaisOutputTime || !paresOutput || 
        !paresOutputTime || !imparesOutput || !imparesOutputTime || !mul3Output || 
        !mul3OutputTime || !div12Output || !div12OutputTime) return;

    
    naturaisOutput.value = "";
    naturaisOutputTime.innerText = "";

    paresOutput.value = "";
    paresOutputTime.innerText = "";

    imparesOutput.value = "";
    imparesOutputTime.innerText = "";

    mul3Output.value = "";
    mul3OutputTime.innerText = "";

    div12Output.value = "";
    div12OutputTime.innerText = "";
}

function getFatorial(n)
{
    var return_num = BigInt(1);

    const beforeTime = performance.now();

    for (var i = BigInt(n); i > 0; i--)
    {
        return_num *= i;
    }

    const afterTime = performance.now();

    return new LoopFunction(return_num.toString(), afterTime - beforeTime);
}

function gerarFatorial()
{
    const fatorialInput = document.getElementById("fatorialInput");
    const fatorialNumOutput = document.getElementById("fatorialNumOutput");
    const fatorialNumOutputTime = document.getElementById("fatorialNumOutputTime");
    
    if (!fatorialInput || !fatorialNumOutput || !fatorialNumOutputTime) return;

    var fatorialInputInt = getIntFromInput(fatorialInput);

    if (isNaN(fatorialInputInt)) return;

    if (fatorialInputInt < 0)
    {
        fatorialInputInt = 0;
        fatorialInput.value = 0;
    }

    const fatorialResult = getFatorial(fatorialInputInt);

    fatorialNumOutput.value = fatorialResult.returnValue;
    fatorialNumOutputTime.innerText = fatorialResult.timeProcessed;
}

function clearFatorial()
{
    Number.MAX_VALUE
    const fatorialInput = document.getElementById("fatorialInput");
    const fatorialNumOutput = document.getElementById("fatorialNumOutput");
    const fatorialNumOutputTime = document.getElementById("fatorialNumOutputTime");
    
    if (!fatorialInput || !fatorialNumOutput || !fatorialNumOutputTime) return;

    fatorialNumOutput.value = "";
    fatorialNumOutputTime.innerText = "";
}

function copyElemText(elementInput)
{
    if (!navigator.clipboard)
    {
        console.error("O teu browser não é compatível com a clipboard, copia manualmente o output :)");
        return;
    }

    const elementDocument = document.getElementById(elementInput);

    if (!elementDocument) return;

    navigator.clipboard.writeText(elementDocument.value);
}

window.addEventListener("DOMContentLoaded", () =>
{
    clearOutput();
    clearFatorial();
});