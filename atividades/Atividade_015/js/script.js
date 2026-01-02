/*
 * ##### Padrões com JS #####
 * Permite editar caracter de desenho e altura da figura.
 * A altura da figura é a parte mais interessante e díficil de fazer (principalmente para o coração)
 * 
 * TODO:
 *  - Melhorar função do coração
 *  - Comentar cenas melhor (sou demasiado inconsistente com o idioma hahaah)
 *  - Melhorar árvore
 *  - Melhorar e até adaptar frontend a telemóveis?
 * 
 * Daniel Munteanu, 18/12/2025, 10:13 PM
 */

// Há browsers que não suportam ou restrigem o HTML5, por razões de privacidade (como o Librewolf)
// Source: https://stackoverflow.com/a/13952727
function isNumberKey(evt)
{
    var charCode = (evt.which) ? evt.which : evt.keyCode;

    if (charCode > 31 && (charCode < 48 || charCode > 57))
        return false;

    return true;
}

// Escrever string para input
function writeString(string)
{
    const textArea = document.getElementById("textArea");

    textArea.textContent = string;
}

function copyTextArea()
{
    const textArea = document.getElementById("textArea");

    if (!textArea || !textArea.textContent || textArea.textContent.length == 0) return;

    if (!navigator.clipboard)
    {
        console.error("O teu browser não é compatível com a clipboard, copia manualmente o output :)");
        return;
    }

    navigator.clipboard.writeText(textArea.textContent);
}

// Retorna, de um input, um integer, ou NaN
function getIntFromInput(input)
{
    if (input.value.length <= 0) 
        return NaN;

    return parseInt(input.value);
}

// Get random number between two values, return it
// (Why doesn't JS have a func like this already?)
function RandRangeInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Gerar character aleatório
function getRandomChar()
{
    // https://www.asciitable.com/
    return String.fromCharCode(RandRangeInt(33, 126));
}

// Validar input da altura
function alturaInputUpdate()
{
    const figuraAltura = document.getElementById("figuraAltura");

    if (!figuraAltura) return;

    var altura = getIntFromInput(figuraAltura);

    if (isNaN(altura)) return;

    if (altura > 30) altura = 30;
    else if (altura < 1) altura = 1;

    figuraAltura.value = altura;
}

// Retorna as definições definidas pelo utilizador no website
function getSettings()
{
    const figuraAltura = document.getElementById("figuraAltura");
    const charDraw = document.getElementById("charDraw");

    var altura, char;

    // Se altura não for válida, default = 7
    if (!figuraAltura) altura = 7;
    else
    {
        altura = getIntFromInput(figuraAltura);
        if (isNaN(altura)) altura = 7;
    }

    // Se char de desenho não for válido, default = '*'
    if (!charDraw || charDraw.value.length == 0) char = '*';
    else char = charDraw.value;

    return { altura, char };
}

// https://unicode-explorer.com/c/2000
// A 1 en (= 1/2 em) wide space, where 1 em is the height of the current font.
const whiteSpaceChar = '\u2000';

// Newline, should work everywhere
const newLineChar = '\n';

/*
 * *****
 * *****
 * *****
 * *****
 * *****
 *
 */
function quadradoString(alturaFigura, charDesenhar)
{
    let strReturn = "";

    for (let r = 0; r < alturaFigura; r++)
    {
        for (let c = 0; c < alturaFigura; c++)
        {
            strReturn += charDesenhar;
        }
        
        strReturn += newLineChar;
    }

    return strReturn;
}

/*
 * *****
 * *   *
 * *   *
 * *   *
 * *****
 *
 */
function quadradoOcoString(alturaFigura, charDesenhar)
{
    let strReturn = "";

    for (let r = 0; r < alturaFigura; r++)
    {
        for (let c = 0; c < alturaFigura; c++)
        {
            // If first or last line OR first or last char in line, draw
            if ((r == 0 || r == alturaFigura - 1) || (c == 0 || c == alturaFigura - 1))
            {
                strReturn += charDesenhar;
            }
            else // Otherwise, fill with empty space
            {
                strReturn += whiteSpaceChar;
            }
        }
        
        strReturn += newLineChar;
    }

    return strReturn;
}

/*
 *     *
 *    **
 *   ***
 *  ****
 * *****
 *
*/
function trianguloRetanguloString(alturaFigura, charDesenhar)
{
    let strReturn = "";

    for (let r = 0; r < alturaFigura; r++)
    {
        for (let c = 0; c < alturaFigura; c++)
        {
            if (c >= alturaFigura - 1 - r)
            {
                strReturn += charDesenhar;
            }
            else
            {
                strReturn += whiteSpaceChar;
            }
        }
        
        strReturn += newLineChar;
    }

    return strReturn;
}

/*
 * *
 * **
 * ***
 * ****
 * *****
 *
 */
function trianguloEsquerdoString(alturaFigura, charDesenhar)
{
    let strReturn = "";

    for (let r = 0; r < alturaFigura; r++)
    {
        for (let c = 0; c <= r; c++)
        {
            strReturn += charDesenhar;
        }
        
        strReturn += newLineChar;
    }

    return strReturn;
}

/*
 * *****
 * ****
 * ***
 * **
 * *
 *
 */
function trianguloDescendenteString(alturaFigura, charDesenhar)
{
    let strReturn = "";

    for (let r = 0; r < alturaFigura; r++)
    {
        for (let c = alturaFigura - r; c > 0; c--)
        {
            strReturn += charDesenhar;
        }
        
        strReturn += newLineChar;
    }

    return strReturn;
}

/*
 * *
 * **
 * * *
 * *  *
 * *****
 *
 */
function trianguloOcoString(alturaFigura, charDesenhar)
{
    let strReturn = "";

    for (let r = 0; r < alturaFigura; r++)
    {
        for (let c = 0; c <= r; c++)
        {
            // If first or second or last line OR first or last char in line, draw
            if ((r <= 1 || r == alturaFigura - 1) || (c == 0 || c == r))
            {
                strReturn += charDesenhar;
            }
            else // Otherwise, fill with empty space
            {
                strReturn += whiteSpaceChar;
            }
        }
        
        strReturn += newLineChar;
    }

    return strReturn;
}

/*
 *     *
 *    ***
 *   *****
 *  *******
 * *********
 *
 */
function piramideString(alturaFigura, charDesenhar)
{
    let strReturn = "";

    for (let r = 0; r < alturaFigura; r++)
    {
        for (let c = 0; c < alturaFigura + r; c++)
        {
            if (c >= alturaFigura - 1 - r)
            {
                strReturn += charDesenhar;
            }
            else
            {
                strReturn += whiteSpaceChar;
            }
        }
        
        strReturn += newLineChar;
    }

    return strReturn;
}

/*
 * *********
 *  *******
 *   *****
 *    ***
 *     *
 *
 */
function piramideInvertidaString(alturaFigura, charDesenhar)
{
    let strReturn = "";

    for (let r = 0; r < alturaFigura; r++)
    {
        for (let c = 0; c < 2 * alturaFigura - r - 1; c++)
        {
            if (c > r - 1)
            {
                strReturn += charDesenhar;
            }
            else
            {
                strReturn += whiteSpaceChar;
            }
        }
        
        strReturn += newLineChar;
    }

    return strReturn;
}

/*
 *     *
 *    * *
 *   *   *
 *  *     *
 * *********
 *
 */
function piramideOcaString(alturaFigura, charDesenhar)
{
    let strReturn = "";

    for (let r = 0; r < alturaFigura; r++)
    {
        for (let c = 0; c < alturaFigura + r; c++)
        {
            // If char is first drawable one OR last drawable one OR we're in the last row
            if (c == alturaFigura - 1 - r || c == alturaFigura + r - 1 || r == alturaFigura - 1)
            {
                strReturn += charDesenhar;
            }
            else
            {
                strReturn += whiteSpaceChar;
            }
        }
        
        strReturn += newLineChar;
    }

    return strReturn;
}

/*
 *    *
 *   ***
 *  *****
 * *******
 *  *****
 *   ***
 *    *
 *
 */
function diamanteString(alturaFigura, charDesenhar)
{
    let strReturn = "";

    const mid = Math.floor(alturaFigura / 2);

    // Draw top piramide
    for (let r = 0; r <= mid - 1; r++)
    {
        const numWhiteSpace = Math.abs(mid - r);
        let numDraw = 2 * r + 1;

        for (let c = 0; c < numWhiteSpace; c++)
            strReturn += whiteSpaceChar;

        for (let c = 0; c < numDraw; c++)
            strReturn += charDesenhar;

        strReturn += newLineChar;
    }

    // If alturaFigura is odd, draw middle line
    if (alturaFigura % 2 != 0)
    {
        for (let c = 0; c < alturaFigura; c++)
            strReturn += charDesenhar;
        strReturn += newLineChar;
    }

    // Draw bottom piramide
    for (let r = mid - 1; r >= 0; r--)
    {
        const numWhiteSpace = Math.abs(mid - r);
        let numDraw = 2 * r + 1;

        for (let c = 0; c < numWhiteSpace; c++)
            strReturn += whiteSpaceChar;

        for (let c = 0; c < numDraw; c++)
            strReturn += charDesenhar;

        strReturn += newLineChar;
    }

    return strReturn;
}

/*
 *    *
 *   * *
 *  *   *
 * *     *
 *  *   *
 *   * *
 *    *
 *
 */
function diamanteOcoString(alturaFigura, charDesenhar)
{
    let strReturn = "";

    const mid = Math.floor(alturaFigura / 2);

    // Draw top piramide
    for (let r = 0; r <= mid - 1; r++)
    {
        const numWhiteSpace = Math.abs(mid - r);
        let numDraw = 2 * r + 1;

        for (let c = 0; c < numWhiteSpace; c++)
            strReturn += whiteSpaceChar;

        for (let c = 0; c < numDraw; c++)
        {
            // If first or last char, draw. Otherwise, don't draw
            if (c == 0 || c == numDraw - 1) strReturn += charDesenhar;
            else strReturn += whiteSpaceChar;
        }

        strReturn += newLineChar;
    }

    // If alturaFigura is odd, draw middle line
    if (alturaFigura % 2 != 0)
    {
        for (let c = 0; c < alturaFigura; c++)
        {
            // If first or last char, draw. Otherwise, don't draw
            if (c == 0 || c == alturaFigura - 1) strReturn += charDesenhar;
            else strReturn += whiteSpaceChar;
        }
        strReturn += newLineChar;
    }

    // Draw bottom piramide
    for (let r = mid - 1; r >= 0; r--)
    {
        const numWhiteSpace = Math.abs(mid - r);
        let numDraw = 2 * r + 1;

        for (let c = 0; c < numWhiteSpace; c++)
            strReturn += whiteSpaceChar;

        // If first or last char, draw. Otherwise, don't draw
        for (let c = 0; c < numDraw; c++)
        {
            if (c == 0 || c == numDraw - 1) strReturn += charDesenhar;
            else strReturn += whiteSpaceChar;
        }

        strReturn += newLineChar;
    }

    return strReturn;
}

/*
 * *******
 *  *****
 *   ***
 *    *
 *   ***
 *  *****
 * *******
 *
 */
function ampulhetaString(alturaFigura, charDesenhar)
{
    let strReturn = "";

    const mid = Math.floor(alturaFigura / 2);
    let numWhiteSpace = 0;
    let r = 0;

    // Draw top piramide
    for (r = mid; r > 0; r--)
    {
        numWhiteSpace = Math.abs(mid - r);
        let numDraw = 2 * r + 1;

        for (let c = 0; c < numWhiteSpace; c++)
            strReturn += whiteSpaceChar;

        for (let c = 0; c < numDraw; c++)
            strReturn += charDesenhar;

        strReturn += newLineChar;
    }

    // If alturaFigura is odd, draw middle point
    if (alturaFigura % 2 != 0)
    {
        numWhiteSpace = Math.abs(mid - r);

        for (let c = 0; c < numWhiteSpace; c++)
            strReturn += whiteSpaceChar;

        strReturn += charDesenhar;
        strReturn += newLineChar;
    }

    // Draw bottom piramide
    for (let r = 1; r <= mid; r++)
    {
        const numWhiteSpace = Math.abs(mid - r);
        let numDraw = 2 * r + 1;

        for (let c = 0; c < numWhiteSpace; c++)
            strReturn += whiteSpaceChar;

        for (let c = 0; c < numDraw; c++)
            strReturn += charDesenhar;

        strReturn += newLineChar;
    }

    return strReturn;
}

/*
 * *
 * **
 * ***
 * ****
 * ***
 * **
 * *
 *
 */
function pascalDireitoString(alturaFigura, charDesenhar)
{
    let strReturn = "";

    const mid = Math.floor(alturaFigura / 2);

    for (let r = 0; r < mid; r++)
    {
        for (let c = 0; c <= r; c++)
        {
            strReturn += charDesenhar;
        }
        
        strReturn += newLineChar;
    }

    // If alturaFigura is odd, draw middle line
    if (alturaFigura % 2 != 0)
    {
        for (let c = 0; c <= mid; c++)
            strReturn += charDesenhar;

        strReturn += newLineChar;
    }

    for (let r = mid-1; r >= 0; r--)
    {
        for (let c = 0; c <= r; c++)
        {
            strReturn += charDesenhar;
        }
        
        strReturn += newLineChar;
    }

    return strReturn;
}

/*
 *    *
 *   **
 *  ***
 * ****
 *  ***
 *   **
 *    *
 *
 */
function pascalEsquerdoString(alturaFigura, charDesenhar)
{
    let strReturn = "";

    const mid = Math.floor(alturaFigura / 2);

    for (let r = 0; r < mid; r++)
    {
        for (let c = mid - r; c > 0; c--)
        {
            strReturn += whiteSpaceChar;
        }
        
        for (let c = 0; c <= r; c++)
            strReturn += charDesenhar;
        
        strReturn += newLineChar;
    }

    // If alturaFigura is odd, draw middle line
    if (alturaFigura % 2 != 0)
    {
        for (let c = 0; c <= mid; c++)
            strReturn += charDesenhar;

        strReturn += newLineChar;
    }

    for (let r = mid-1; r >= 0; r--)
    {
        for (let c = mid - r; c > 0; c--)
        {
            strReturn += whiteSpaceChar;
        }
        
        for (let c = 0; c <= r; c++)
            strReturn += charDesenhar;
        
        strReturn += newLineChar;
    }

    return strReturn;
}

// f(x) = | sin((2pi*x)/width) * height
// https://www.desmos.com/calculator/w6xahjo5np
// A brincar com o desmos cheguei a esta equação
// que serve para fazer a parte do topo do coração
// TODO: A função não é muito boa e de certeza que existem alternativas (uma função mais curva seria melhor...)

// Esta função obtém os valores de x para um determinado y, a partir de f(x)
// Um bocadinho de AI teve de ser usado, admito, pois determinar o x pelo y nesta equação não é tão simples...
function fromYgetXCoracao(y, width, height)
{
    if (y < 0 || y > height) return []; // Não existe x quando y está fora da função

    var A = y / height;
    
    // Se y / altura ~= 0, então retornamos 0 e width/2 (os pontos que tocam no zero)
    if (A === 0) return [0, width / 2];

    // Calcular o arcsin
    var arcsin = Math.asin(A);

    // Calcula o primeiro X
    var x1 = (width / (2 * Math.PI)) * arcsin;

    // Calcula o segundo X
    var x2 = (width / (2 * Math.PI)) * (Math.PI - arcsin);

    // Normalizar entre 0 e width
    x1 = (x1 % width + width) % width;
    x2 = (x2 % width + width) % width;

    return [x1, x2];
}

/*
 *  ***    ***
 * *****  *****
 * ************
 *  **********
 *   ********
 *    ******
 *     ****
 *      **
 *
 */
function coracaoString(alturaFigura, charDesenhar)
{
    let strReturn = "";

    const height_top = Math.floor(alturaFigura / 4);
    const width = alturaFigura * 3/2;

    for (let r = 0; r < alturaFigura; r++)
    {
        // Desenhar parte de cima do coração (as duas curvas)
        if (r < height_top)
        {
            const xFunc = fromYgetXCoracao(height_top - 1 - r, width, height_top);

            for (let c = 0; c < width; c++)
            {
                // Verificar se index encontra-se dentro da primeira ou segunda subida do gráfico
                if ((c > xFunc[0] && c < xFunc[1]) || (c > xFunc[0]+width/2 && c < xFunc[1]+width/2))
                {
                    strReturn += charDesenhar;
                }
                else
                {
                    strReturn += whiteSpaceChar;
                }
            }
        }
        // Desenhar parte de baixo do coração
        else
        {
            for (let c = 0; c < width - r + height_top; c++)
            {
                if (c > r - height_top)
                {
                    strReturn += charDesenhar;
                }
                else
                {
                    strReturn += whiteSpaceChar;
                }
            }
        }

        strReturn += newLineChar;
    }

    return strReturn;
}

/*
 *      *
 *     ***
 *    *****
 *   *******
 *  *********
 * ***********
 *     ***
 *     ***
 * TODO: Fazer melhor árvore? 
 */
function arvoreNatalString(alturaFigura, charDesenhar)
{
    let strReturn = "";

    const alturaCone = Math.floor(alturaFigura * 0.80);
    const grossuraTronco = Math.ceil(alturaFigura / 4);
    const whiteSpaceTronco = alturaCone - 1 - Math.floor(grossuraTronco / 2);

    for (let r = 0; r < alturaFigura; r++)
    {
        // Desenhar cone da árvore
        if (r < alturaCone)
        {
            for (let c = 0; c < alturaCone + r; c++)
            {
                if (c >= alturaCone - 1 - r)
                {
                    strReturn += charDesenhar;
                }
                else
                {
                    strReturn += whiteSpaceChar;
                }
            }
        }
        // Desenhar tronco
        else
        {
            for (let c = 0; c < whiteSpaceTronco; c++)
                strReturn += whiteSpaceChar;

            for (let c = 0; c < grossuraTronco; c++)
                strReturn += charDesenhar;
        }
        
        strReturn += newLineChar;
    }

    return strReturn;
}

function genQuadrado()
{
    var { altura, char } = getSettings();

    writeString(quadradoString(altura, char));
}

function genQuadradoOco()
{
    var { altura, char } = getSettings();
    writeString(quadradoOcoString(altura, char));
}

function genTrianguloRetangulo()
{
    var { altura, char } = getSettings();
    writeString(trianguloRetanguloString(altura, char));
}

function genTrianguloEsquerdo()
{
    var { altura, char } = getSettings();
    writeString(trianguloEsquerdoString(altura, char));
}

function genTrianguloDescendente()
{
    var { altura, char } = getSettings();
    writeString(trianguloDescendenteString(altura, char));
}

function genTrianguloOco()
{
    var { altura, char } = getSettings();
    writeString(trianguloOcoString(altura, char));
}

function genPiramide()
{
    var { altura, char } = getSettings();
    writeString(piramideString(altura, char));
}

function genPiramideInvertida()
{
    var { altura, char } = getSettings();
    writeString(piramideInvertidaString(altura, char))
}

function genPiramideOca()
{
    var { altura, char } = getSettings();
    writeString(piramideOcaString(altura, char));
}

function genDiamante()
{
    var { altura, char } = getSettings();
    writeString(diamanteString(altura, char));
}

function genDiamanteOco()
{
    var { altura, char } = getSettings();
    writeString(diamanteOcoString(altura, char));
}

function genAmpulheta()
{
    var { altura, char } = getSettings();
    writeString(ampulhetaString(altura, char));
}

function genPascalDireito()
{
    var { altura, char } = getSettings();
    writeString(pascalDireitoString(altura, char));
}

function genPascalEsquerdo()
{
    var { altura, char } = getSettings();
    writeString(pascalEsquerdoString(altura, char));
}

function genCoracao()
{
    var { altura, char } = getSettings();
    writeString(coracaoString(altura, char));
}

function genArvoreNatal()
{
    var { altura, char } = getSettings();
    writeString(arvoreNatalString(altura, char));
}

window.addEventListener("DOMContentLoaded", () =>
{
    // Gerar um coração aleatório quando o user abrir a página
    writeString(coracaoString(RandRangeInt(10, 14), getRandomChar()))
});