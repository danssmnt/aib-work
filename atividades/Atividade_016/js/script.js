// Há browsers que não suportam ou restrigem o HTML5, por razões de privacidade (como o Librewolf)
// Source: https://stackoverflow.com/a/13952727
function isNumberKey(evt)
{
    var charCode = (evt.which) ? evt.which : evt.keyCode;

    if (charCode > 31 && (charCode < 48 || charCode > 57))
        return false;

    return true;
}

function isDecimalKey(evt)
{
    var charCode = (evt.which) ? evt.which : evt.keyCode;

    if (charCode > 31 && (charCode < 48 || charCode > 57) && charCode != 46 && charCode != 45)
        return false;

    return true;
}

// Retorna, de um input, um int, ou NaN
function getIntFromInput(input)
{
    if (input.value.length <= 0)
        return NaN;

    return parseInt(input.value);
}

// Retorna, de um input, um float, ou NaN
function getFloatFromInput(input)
{
    if (input.value.length <= 0)
        return NaN;

    return parseFloat(input.value);
}

const imageCheckboxOn = "../imagens/checkbox_on.png";
const imageCheckboxOff = "../imagens/checkbox_off.png";

// Retorna a path da imagem correta para a checkbox de acordo com o boolean dado
function getCheckboxPathByBool(bool)
{
    return bool ? imageCheckboxOn : imageCheckboxOff;
}

/**
 * Retorna o context do canvas do HTML (cujo ID é `mainTriangleDrawingCanvas`)
 * @returns Canvas Context
 */
function getPageCanvasCtx()
{
    const canvasElement = document.getElementById("mainTriangleDrawingCanvas");
    if (!canvasElement) return null;

    return canvasElement.getContext("2d");
}

function clearPageCanvas()
{
    const ctx = getPageCanvasCtx();
    if (!ctx) return;

    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
}

/**
 * Desenha um triângulo centrado no canvas a partir do tamanho dos lados
 * @param {number} side1 - Tamanho do lado 1.
 * @param {number} side2 - Tamanho do lado 2.
 * @param {number} side3 - Tamanho do lado 3.
 */
function desenharTrianguloComLados(side1, side2, side3)
{
    const ctx = getPageCanvasCtx();

    // Desigualdade triangular -> (https://pt.wikipedia.org/wiki/Desigualdade_triangular)
    if ( !(side1 + side2 > side3 && side1 + side3 > side2 && side2 + side3 > side1) )
    {
        console.error("Triângulo não respeita a desigualdade triangular!");
        return -2;
    }

    const canvas = ctx.canvas;
    const W = canvas.width;
    const H = canvas.height;

    // Para triangulo ficar dentro do canvas com algum espaço
    const padding = 30;

    // Coloca o ponto A a (0, 0)
    // Coloca o ponto B a (line3, 0)
    // O ponto C é calculado a partir dos pontos A e B
    const pontoA = {x: 0,     y: 0};
    const pontoB = {x: side3, y: 0};

    const pontoC_X = (side3*side3 + side2*side2 - side1*side1) / (2 * side3);
    const pontoC = 
    {  
        x: pontoC_X, 
        y: -Math.sqrt(Math.max(0, side2*side2 - pontoC_X*pontoC_X))
    };

    // Para padding
    const minX = Math.min(pontoA.x, pontoB.x, pontoC.x);
    const maxX = Math.max(pontoA.x, pontoB.x, pontoC.x);
    const minY = Math.min(pontoA.y, pontoB.y, pontoC.y);
    const maxY = Math.max(pontoA.y, pontoB.y, pontoC.y);
    const triW = maxX - minX;
    const triH = maxY - minY;

    const availableW = Math.max(1, W - 2 * 30);
    const availableH = Math.max(1, H - 2 * 30);
    const scale = Math.min(availableW / triW, availableH / triH);

    // Calcular offset para o centro
    const offsetX = (W - triW * scale) / 2 - minX * scale;
    const offsetY = (H - triH * scale) / 2 - minY * scale;

    // Passar Coord. do Triangulo para Coord. do Canvas
    const pontoCanvas = (x, y) => ({ x: x * scale + offsetX, y: y * scale + offsetY });

    const A = pontoCanvas(pontoA.x, pontoA.y);
    const B = pontoCanvas(pontoB.x, pontoB.y);
    const C = pontoCanvas(pontoC.x, pontoC.y);

    // Desenhar Triangulo no Canvas
    ctx.lineWidth = 3.0;
    ctx.strokeStyle = "white";
    ctx.beginPath();
    ctx.moveTo(A.x, A.y);
    ctx.lineTo(B.x, B.y);
    ctx.lineTo(C.x, C.y);
    ctx.closePath();
    ctx.stroke();

    return 0;
}

/**
 * Desenha um triângulo centrado no canvas a partir dos seus ângulos
 * @param {number} ang1 - Ângulo 1.
 * @param {number} ang2 - Ângulo 2.
 * @param {number} ang3 - Ângulo 3.
 */
function desenharTrianguloComAngulos(ang1, ang2, ang3)
{
    // Validar ângulos
    // A soma dos ângulos deve ser inferior a 180º.
    const sum = ang1 + ang2 + ang3;
    if ( Math.abs(sum - 180.0) > 0.001 )
    {
        console.error("Ângulos inválidos — devem somar para 180°.");
        return -1;
    }

    // Converter para radianos
    const toRad = deg => deg * Math.PI / 180;
    const A = toRad(ang1);
    const B = toRad(ang2);
    const C = toRad(ang3);

    // c = Tamanho de referência
    const c = 100;

    // Lei dos Senos: a/sin(A) = b/sin(B) = c/sin(C)
    // https://pt.wikipedia.org/wiki/Lei_dos_senos
    const k = c / Math.sin(C);
    const a = k * Math.sin(A);
    const b = k * Math.sin(B);

    // Chama a função existente que desenha por lados
    desenharTrianguloComLados(a, b, c);

    return 0;
}

/**
 * Obtém o tipo de triângulo a partir dos lados / ângulos.
 * @param {number} num1 - Lado / Ângulo 1.
 * @param {number} num2 - Lado / Ângulo 2.
 * @param {number} num3 - Lado / Ângulo 3.
 * 
 * @returns {String} Tipo de triangulo (Equilátero, Isósceles ou Escaleno)
 */
function getTypeTriangulo(num1, num2, num3)
{
    if (num1 == num2 && num1 == num3) return "Equilátero";
    else if ((num1 != num2 && num2 == num3) || (num1 != num3 && num1 == num2) || (num1 != num2 && num1 == num3)) return "Isósceles";
    else return "Escaleno";
}

function clearInputLado()
{
    const lado1Input = document.getElementById("lado1Input");
    const lado2Input = document.getElementById("lado2Input");
    const lado3Input = document.getElementById("lado3Input");
    const outputTrianguloType = document.getElementById("outputTrianguloType");

    if (!lado1Input || !lado2Input || !lado3Input || !outputTrianguloType) return;

    console.log("Clearing lados...");

    lado1Input.value = "";
    lado2Input.value = "";
    lado3Input.value = "";
    outputTrianguloType.innerText = "";
}

function clearInputAngulo()
{
    const angulo1Input = document.getElementById("angulo1Input");
    const angulo2Input = document.getElementById("angulo2Input");
    const angulo3Input = document.getElementById("angulo3Input");
    const outputTrianguloType = document.getElementById("outputTrianguloType");

    if (!angulo1Input || !angulo2Input || !angulo3Input || !outputTrianguloType) return;

    console.log("Clearing angulos...");

    angulo1Input.value = "";
    angulo2Input.value = "";
    angulo3Input.value = "";
    outputTrianguloType.innerText = "";
}

function inputLadoUpdate()
{
    const lado1Input = document.getElementById("lado1Input");
    const lado2Input = document.getElementById("lado2Input");
    const lado3Input = document.getElementById("lado3Input");
    const outputTrianguloType = document.getElementById("outputTrianguloType");

    if (!lado1Input || !lado2Input || !lado3Input || !outputTrianguloType) return;

    const floatLado1 = getFloatFromInput(lado1Input);
    const floatLado2 = getFloatFromInput(lado2Input);
    const floatLado3 = getFloatFromInput(lado3Input);

    clearPageCanvas();

    if (!isNaN(floatLado1) || !isNaN(floatLado2) || !isNaN(floatLado3))
    {
        clearInputAngulo();
    }

    if (!isNaN(floatLado1) && !isNaN(floatLado2) && !isNaN(floatLado3))
    {
        const returned = desenharTrianguloComLados(floatLado1, floatLado2, floatLado3);
        
        if (returned == 0)
            outputTrianguloType.innerText = getTypeTriangulo(floatLado1, floatLado2, floatLado3);
        
        else
            outputTrianguloType.innerText = "Inválido! Triângulo não respeita a desigualdade triangular!";
    }
}

function inputAnguloUpdate()
{
    const angulo1Input = document.getElementById("angulo1Input");
    const angulo2Input = document.getElementById("angulo2Input");
    const angulo3Input = document.getElementById("angulo3Input");
    const outputTrianguloType = document.getElementById("outputTrianguloType");

    if (!angulo1Input || !angulo2Input || !angulo3Input || !outputTrianguloType) return;

    const floatAngulo1 = getFloatFromInput(angulo1Input);
    const floatAngulo2 = getFloatFromInput(angulo2Input);
    const floatAngulo3 = getFloatFromInput(angulo3Input);

    clearPageCanvas();

    if (!isNaN(floatAngulo1) || !isNaN(floatAngulo2) || !isNaN(floatAngulo3))
    {
        clearInputLado();
    }

    if (!isNaN(floatAngulo1) && !isNaN(floatAngulo2) && !isNaN(floatAngulo3))
    {
        const returned = desenharTrianguloComAngulos(floatAngulo1, floatAngulo2, floatAngulo3);
        
        if (returned == 0)
            outputTrianguloType.innerText = getTypeTriangulo(floatAngulo1, floatAngulo2, floatAngulo3);
        
        else
            outputTrianguloType.innerText = "Inválido! Soma(Angulos) != 180º";
    }
}


// "ano bissexto (ano que é divisível por 4 e não é divisível por 100, 
// com a ressalva de que ano que são divisíveis por 400 são também anos bissextos)"
function isAnoBissexto(ano)
{
    return (ano % 4 == 0 && ano % 100 != 0) || ano % 400 == 0;
}

// "festival Huluculu (acontece em anos divisíveis por 15)"
function isAnoHuluculu(ano)
{
    return ano % 15 == 0;
}

// "festival Bulukulu (acontece em anos divisíveis por 55 desde que também seja um ano bissexto)"
function isAnoBulukulu(ano)
{
    return isAnoBissexto(ano) && ano % 55 == 0;
}

function anoInputUpdate()
{
    const anoInput = document.getElementById("anoInput");
    const checkboxAnoBissexto = document.getElementById("checkboxAnoBissexto");
    const checkboxAnoHuluculu = document.getElementById("checkboxAnoHuluculu");
    const checkboxAnoBulukulu = document.getElementById("checkboxAnoBulukulu");

    if (!anoInput || !checkboxAnoBissexto || !checkboxAnoHuluculu || !checkboxAnoBulukulu) return;

    var anoInt = getIntFromInput(anoInput);

    if (isNaN(anoInt)) return;

    if (anoInt < 0)
    {
        anoInt = 0;
        anoInput.value = 0;
    }

    checkboxAnoBissexto.src = getCheckboxPathByBool( isAnoBissexto(anoInt) );
    checkboxAnoHuluculu.src = getCheckboxPathByBool( isAnoHuluculu(anoInt) );
    checkboxAnoBulukulu.src = getCheckboxPathByBool( isAnoBulukulu(anoInt) );
}