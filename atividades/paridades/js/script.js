// Há browsers que não suportam ou restrigem o HTML5, por razões de privacidade (como o Librewolf)
// Source: https://stackoverflow.com/a/13952727
// 45 -> '-'
function isNumberKey(evt)
{
    var charCode = (evt.which) ? evt.which : evt.keyCode;

    if ( charCode > 31 && (charCode < 48 || charCode > 57) && charCode != 45 )
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

const imageCheckboxOn = "imagens/checkbox_on.png";
const imageCheckboxOff = "imagens/checkbox_off.png";

const neutralPageColor  = "#252525";
const numParPageColor   = "#3f5ceb";
const numImparPageColor = "#f68e3f";

// Retorna a path da imagem correta para a checkbox de acordo com o boolean dado
function getCheckboxPathByBool(bool)
{
    return bool ? imageCheckboxOn : imageCheckboxOff;
}

// Retorna a cor correta para a página de acordo com o boolean dado
function getPageColorByBool(bool)
{
    return bool ? numParPageColor : numImparPageColor;
}

// Atualizar UI com base no num.
function parImparUpdate(parCheck, imparCheck, pageBody, num)
{
    pageBody.style.backgroundColor = getPageColorByBool( num % 2 == 0 );
    parCheck.src = getCheckboxPathByBool( num % 2 == 0 );
    imparCheck.src = getCheckboxPathByBool( num % 2 != 0 );
}

// Limpar UI
function parImparClear(parCheck, imparCheck, pageBody)
{
    pageBody.style.backgroundColor = neutralPageColor;

    parCheck.src = getCheckboxPathByBool( false );
    imparCheck.src = getCheckboxPathByBool( false );
}

// Atualiza quando user digita algo no input...
function inputUpdate()
{
    // HTML Elements
    
    const pageBody      = document.getElementById("PageBody");
    const numInput      = document.getElementById("NumInput");
    const parCheckbox   = document.getElementById("ParCheckbox");
    const imparCheckbox = document.getElementById("ImparCheckbox");

    // HTML Elements

    const numInputInt = getIntFromInput( numInput );

    if ( !isNaN(numInputInt) )
    {
        parImparUpdate(parCheckbox, imparCheckbox, pageBody, numInputInt);
    }
    else
    {
        parImparClear(parCheckbox, imparCheckbox, pageBody);
    }
}

// Quando o website carregar...
window.onload = function()
{
    inputUpdate();
}