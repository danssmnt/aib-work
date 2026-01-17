const debugLog = true;

const mainArray = [];

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
 * Simple FizzBuzz implementation.
 * @param {Number} num - Number
 * @returns {String}
 */
function GetFizzBuzzFromNumber(num)
{
    if (num % 3 == 0 && num % 5 == 0) return "FizzBuzz";
    else if (num % 3 == 0) return "Fizz"
    else if (num % 5 == 0) return "Buzz"
    else return num.toString();
}

function GetPageColorFromFizzBuzzString(string)
{
    if (string === "Fizz") return bodyFizzColor;
    else if (string === "Buzz") return bodyBuzzColor;
    else if (string === "FizzBuzz") return bodyFizzBuzzColor;
    else return bodyNormalColor;
}

const bodyNormalColor = "#252525";
const bodyFizzColor = "#319424";
const bodyBuzzColor = "#1928af";
const bodyFizzBuzzColor = "#dd8a2c";

function SetBackgroundColorWithDuration(color, time)
{
    const mainBody = GetElementByID("mainBody");
    if (!mainBody) return;

    mainBody.style.backgroundColor = color;

    if (color === bodyNormalColor) return;

    console.log("Set color to " + color);

    setTimeout(() => 
    {
        mainBody.style.backgroundColor = bodyNormalColor;
    }, time * 1000);
}

function DisableButtonWithDuration(buttonID, time)
{
    const button = GetElementByID(buttonID);
    if (!button) return;

    button.disabled = true;
    button.style.cursor = "default";
    
    setTimeout(() =>
    {
        button.disabled = false;
        button.style.cursor = "pointer";
    }, time * 1000);

}

const mainOutputTableID = "tableMainOutput";

/**
 * Adds a row to the main output table.
 * @param {String} col1 - String to insert in first column.
 * @param {String} col2 - String to insert in second column.
 */
function AddRowToTableMain(col1, col2)
{
    const mainTable = GetElementByID(mainOutputTableID);
    if (!mainTable) return;

    const row = document.createElement('tr');

    const numberCol = document.createElement('td');
    const fizzBuzzCol = document.createElement('td');

    numberCol.textContent = col1;
    fizzBuzzCol.textContent = col2;

    row.appendChild(numberCol);
    row.appendChild(fizzBuzzCol);

    mainTable.appendChild(row);

    pageFooterAdjust();
}

function manualInputInsert()
{
    const inpManualFBNumber = GetElementByID("inpManualFBNumber");
    if (!inpManualFBNumber) return;

    const fbNumber = GetIntFromInput("inpManualFBNumber");
    if (isNaN(fbNumber)) return;

    const fbOutput = GetFizzBuzzFromNumber(fbNumber);
    mainArray.push(fbOutput);

    AddRowToTableMain(fbNumber.toString(), fbOutput);
    SetBackgroundColorWithDuration(GetPageColorFromFizzBuzzString(fbOutput), 3);
    DisableButtonWithDuration("inpManualFBButton", 3);

    inpManualFBNumber.value = "";
}

function autoInputInsert()
{
    const inpAutoFBQuantity = GetElementByID("inpAutoFBQuantity");
    if (!inpAutoFBQuantity) return;

    const fbQuantity = GetIntFromInput("inpAutoFBQuantity");
    if (isNaN(fbQuantity)) return;

    inpAutoFBQuantity.value = "";
    DisableButtonWithDuration("inpAutoFBButton", 2 * fbQuantity);

    for (var i = 0; i < fbQuantity; i++)
    {
        setTimeout(() =>
        {
            inputRandom();
        }, 2 * 1000 * i);
    }
}

function inputRandom()
{
    const fbNumber = RandRangeInt(0, 1000);
    const fbOutput = GetFizzBuzzFromNumber(fbNumber);
    mainArray.push(fbOutput);
    AddRowToTableMain(fbNumber.toString(), fbOutput);
    SetBackgroundColorWithDuration(GetPageColorFromFizzBuzzString(fbOutput), 1);
}

/**
 * Adjust footer Y position based on .mainContent.
 * If the content is small, fix footer at bottom.
 * Otherwise move relative to content.
 * I don't like messing with JS for this type of stuff but it seems to be the only way to do it.
 */
function pageFooterAdjust()
{
    const pageFooter = document.querySelector('.pageFooter');
    const mainContent = document.querySelector('.mainContent');
    const mainContentBottom = mainContent.offsetHeight;
    const viewportHeight = window.innerHeight;

    if (mainContentBottom < viewportHeight / 1.75)
        pageFooter.style.position = "fixed";
    else
        pageFooter.style.position = "relative";
}

window.addEventListener("DOMContentLoaded", () =>
{
    // Resizes when window width and height is changed
    window.addEventListener('resize', pageFooterAdjust);
    pageFooterAdjust();
});
