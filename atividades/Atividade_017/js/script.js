
/**
 * Get a random number between two values (inclusive).
 * @param {int} min - minimum number.
 * @param {int} max - maximum number.
 * @returns {int} Randomly generated number.
 */
function RandRangeInt(min, max)
{
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * Get Integer Value from Input Element ID.
 * @param {string} inputID - HTML Input Element ID
 * @returns {Number}
 */
function GetIntFromInput(inputID)
{
    const inputElement = GetElementByID(inputID);
    if (!inputElement) return NaN;

    if (inputElement.value.length <= 0)
    {
        if (debugLog) console.log(`'${inputID}' is empty!`);
        return NaN;
    }

    return parseInt(inputElement.value);
}

/**
 * Get Element object from HTML defined ID.
 * @param {string} elementID - HTML Element ID
 * @returns {HTMLElement} Element or null.
 */
function GetElementByID(elementID)
{
    const element = document.getElementById(elementID);
    if (!element)
    {
        if (debugLog) console.log(`Label '${elementID}' doesn't exist!`);
        return null;
    }
    
    return element;
}

/**
 * Check if key pressed is a valid digit number (0-9).
 * @param {Event} evt 
 * @returns {boolean}
 */
function isDigitKey(evt)
{
    var charCode = (evt.which) ? evt.which : evt.keyCode;

    if (charCode > 31 && (charCode < 48 || charCode > 57)) return false;

    return true;
}

/**
 * Shuffle an array. Taken from https://stackoverflow.com/a/2450976
 * @param {Array} array
 */
function ShuffleArray(array)
{
    let currentIndex = array.length;

    // While there remain elements to shuffle...
    while (currentIndex != 0)
    {
        // Pick a remaining element...
        let randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        // And swap it with the current element.
        [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
    }
}

function GetArraySum(array)
{
    var sum = 0;

    array.forEach(number =>
    {
        sum += number;
    });

    return sum;
}

function GetArrayAverage(array)
{
    if (array.length == 0) return 0;
    return GetArraySum(array) / array.length;
}

function GetArrayMedian(array)
{
    if (array.length == 0) return 0;

    const array_copy = [...array].sort((a, b) => a - b);

    const half = Math.floor( array_copy.length / 2 );

    if (array_copy.length % 2 == 0)
    {
        return (array_copy[half - 1] + array_copy[half]) / 2;
    }
    else
    {
        return array_copy[half];
    }
}

function GetValueInstancesArray(array, value)
{
    var instances = 0;

    array.forEach(number =>
    {
        if (value == number) instances++;
    });

    return instances;
}


// Main Website Array to control
var mainArray = [];

var debugLog = true;

/**
 * Hides a label.
 * @param {string} labelID - label ID (from HTML)
 */
function HideLabel(labelID)
{
    const labelElement = GetElementByID(labelID);
    if (!labelElement) return;

    labelElement.hidden = true;

    if (debugLog) console.log(`Label '${labelID}' was hidden!`);
}

/**
 * Shows (un-hides) a label for a specified duration.
 * @param {string} labelID - label ID (from HTML)
 * @param {float} duration - time in seconds for label to be shown on-screen.
 */
function ShowLabelWithDuration(labelID, duration)
{
    const labelElement = GetElementByID(labelID);
    if (!labelElement) return;

    labelElement.hidden = false;

    if (debugLog) console.log(`Label '${labelID}' was shown!`);
    
    setTimeout(() => 
    {
        HideLabel(labelID);
    }, duration * 1000);
}

function WriteLabel(labelID, string)
{
    const labelElement = GetElementByID(labelID);
    if (!labelElement) return;

    labelElement.innerText = string;
    if (debugLog) console.log(`'${labelID}' was updated with string!`);
}

const outputID = "mainOutput";
function WriteOutput(string)
{
    const outputElement = GetElementByID(outputID);
    if (!outputElement) return;

    outputElement.innerText = string;
    if (debugLog) console.log(`'${outputID}' was updated with string!`);
}

function WriteOutputHTML(string)
{
    const outputElement = GetElementByID(outputID);
    if (!outputElement) return;

    outputElement.innerHTML = string;
    if (debugLog) console.log(`'${outputID}' was updated with string!`);
}

function UpdateOutput()
{
    WriteOutput(mainArray.join(' '));
}


function CreateArray()
{
    mainArray = [];
    
    for (var i = 1; i <= 100; i++)
    {
        mainArray.push(i);
    }

    ShowLabelWithDuration("lblCreateArray", 2);
    UpdateOutput();
}

function GetArraySize()
{
    WriteLabel("lblArraySize", `Tamanho: ${mainArray.length}`);
    ShowLabelWithDuration("lblArraySize", 60);
}

function GetArrayFirstElement()
{
    WriteLabel("lblArrayElement", `1º Elemento: ${mainArray[0]}`);
    ShowLabelWithDuration("lblArrayElement", 60);
}

function GetArrayLastElement()
{
    WriteLabel("lblArrayLastElem", `Último Elemento: ${mainArray[mainArray.length - 1]}`);
    ShowLabelWithDuration("lblArrayLastElem", 60);
}

function ChangeArrayElement()
{
    const elementIndex = GetIntFromInput("inpElemChangeIndex");
    const newElementValue = GetIntFromInput("inpElemChangeValue");

    if (isNaN(elementIndex) || isNaN(newElementValue) || 
        elementIndex < 0 || elementIndex > mainArray.length - 1) return;

    mainArray[elementIndex] = newElementValue;
    UpdateOutput();
}

function RemoveArrayElement()
{
    const elementIndex = GetIntFromInput("inpElemRemoveIndex");

    if (isNaN(elementIndex) || elementIndex < 0 || elementIndex > mainArray.length - 1) return;

    // Remove one element at elementIndex.
    // https://www.geeksforgeeks.org/javascript/remove-elements-from-a-javascript-array/
    mainArray.splice(elementIndex, 1);
    UpdateOutput();
}

function ShuffleMainArray()
{
    ShuffleArray(mainArray);
    ShowLabelWithDuration("lblShuffleArray", 2);
    UpdateOutput();
}

function Output2em2Array()
{
    var finalString = "";

    for (var i = 0; i < mainArray.length; i++)
    {
        if (i % 2 == 0)
            finalString += `<b>${mainArray[i]}</b> `;
        else
            finalString += `<a style="color: #525252">${mainArray[i]}</a> `;
    }

    ShowLabelWithDuration("lblArray2", 3);
    WriteOutputHTML(finalString);
}

function GetArrayInfo()
{
    WriteLabel("lblArrayStats", `Soma: ${GetArraySum(mainArray)} | Média: ${GetArrayAverage(mainArray)} | Mediana: ${GetArrayMedian(mainArray)} | Min.: ${Math.min(...mainArray)} | Máx.: ${Math.max(...mainArray)}`);
    ShowLabelWithDuration("lblArrayStats", 60);
}

function GetNumberInstancesValueArray()
{
    const elementValue = GetIntFromInput("inpValInstancesValue");
    if (isNaN(elementValue) || !mainArray.includes(elementValue)) return;

    WriteLabel("lblArrayInstances", `Existem ${GetValueInstancesArray(mainArray, elementValue)} instâncias do número ${elementValue} na array!`);
    ShowLabelWithDuration("lblArrayInstances", 60);
}

function GetClonedValuesArray()
{
    var finalString = "Nesta array existem ";
    var array_repeated_values = [];

    mainArray.forEach(number => 
    {
        var instances = GetValueInstancesArray(mainArray, number);

        if (instances > 1 && !array_repeated_values.includes(number))
        {
            array_repeated_values += number;
            finalString += `${instances} '${number}'s, `;
        }
    });

    finalString = finalString.slice(0, -2);
    finalString += '!';

    if (array_repeated_values.length > 0)
        WriteLabel("lblArrayNumInstance", finalString);
    else
        WriteLabel("lblArrayNumInstance", "Nesta array não existem números repetidos!");
    ShowLabelWithDuration("lblArrayNumInstance", 60);
}

function GenerateArrayNum100()
{
    const arraySize = GetIntFromInput("impSizeArrayNum100");
    if (isNaN(arraySize)) return;

    mainArray = [];

    for (var i = 0; i < arraySize; i++)
    {
        mainArray.push(RandRangeInt(-100, 100));
    }

    var finalString = "";

    mainArray.forEach(number => 
    {
        if (number < 0)
            finalString += `<a style="color: #a01212">${number}</a> `;
        else
            finalString += `<a style="color: #40be21">${number}</a> `;
    });

    ShowLabelWithDuration("lblArrayNum100", 2);
    WriteOutputHTML(finalString);
}