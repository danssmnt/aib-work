// Há browsers que não suportam ou restrigem o HTML5, por razões de privacidade (como o Librewolf)
// Source: https://stackoverflow.com/a/13952727
function isNumberKey(evt)
{
    var charCode = (evt.which) ? evt.which : evt.keyCode;

    if (charCode > 31 && (charCode < 48 || charCode > 57))
        return false;

    return true;
}

// Decimal Version (com 46 -> '.')
function isDecimalKey(evt)
{
    var charCode = (evt.which) ? evt.which : evt.keyCode;

    if (charCode > 31 && (charCode < 48 || charCode > 57) && charCode != 46)
        return false;

    return true;
}

// https://stackoverflow.com/a/11409944
function ClampValue(num, min, max)
{
    return Math.min(Math.max(num, min), max);
}

function antecessor_sucessor_update()
{
    var antecessor_input = document.getElementById("antecessor_input");
    var ant_suc_input = document.getElementById("ant_suc_input");
    var sucessor_input = document.getElementById("sucessor_input");

    if (ant_suc_input.value.length > 0)
    {
        var input_int = parseInt(ant_suc_input.value);
        if (input_int != NaN)
        {
            antecessor_input.value = input_int - 1;
            sucessor_input.value = input_int + 1;
            console.log(antecessor_input.value + " " + input_int + " " + sucessor_input.value);
        }
    }
    else 
    {
        antecessor_input.value = "";
        sucessor_input.value = "";
    }
}

function area_perim_ret_update()
{
    var comp_input = document.getElementById("comprimento_input");
    var larg_input = document.getElementById("largura_input");
    var area_output = document.getElementById("area_output");
    var perim_output = document.getElementById("perimetro_output");

    if (comp_input.value.length > 0 && larg_input.value.length > 0)
    {
        var comp_float = parseFloat(comp_input.value);
        var larg_float = parseFloat(larg_input.value);

        if (comp_float != NaN && larg_float != NaN)
        {
            // Arrendondar a 3 casas decimais
            area_output.value = Math.round((comp_float * larg_float) * 10e2) / 10e2;
            perim_output.value = Math.round((comp_float * 2 + larg_float * 2) * 10e2) / 10e2;
            console.log("Área: " + area_output.value + " m²");
            console.log("Perímetro: " + perim_output.value + " m");
        }
    }
    else 
    {
        area_output.value = "";
        perim_output.value = "";
    }
}

function conv_idade_anos()
{
    var anos_input = document.getElementById("anos_input");
    var dias_output = document.getElementById("dias_output");

    if (anos_input.value.length > 0)
    {
        var input_int = parseInt(anos_input.value);
        if (input_int != NaN)
        {
            // https://en.wikipedia.org/wiki/Gregorian_calendar
            dias_output.value = Math.round(input_int * 365.2425);
            console.log(input_int + " Anos -> " + dias_output.value + " Dias");
        }
    }
    else 
    {
        dias_output.value = "";
    }
}

function conv_idade_dias()
{
    var dias_input = document.getElementById("dias_input");
    var anos_output = document.getElementById("anos_output");

    if (dias_input.value.length > 0)
    {
        var input_int = parseInt(dias_input.value);
        if (input_int != NaN)
        {
            // https://en.wikipedia.org/wiki/Gregorian_calendar
            anos_output.value = Math.round(input_int / 365.2425 * 10) / 10;
            console.log(input_int + " Dias -> " + anos_output.value + " Anos");
        }
    }
    else 
    {
        anos_output.value = "";
    }
}

function calc_desc()
{
    var preco_input = document.getElementById("preco_input");
    var desc_input = document.getElementById("desconto_input");
    var preco_output = document.getElementById("preco_output");

    if (preco_input.value.length > 0 && desc_input.value.length > 0)
    {
        var preco_float = parseFloat(preco_input.value);
        var desconto_int = parseInt(desc_input.value);

        if (preco_float != NaN && desconto_int != NaN)
        {
            // Clamp Desconto entre 0% e 100%
            desc_input.value = ClampValue(desconto_int, 0, 100);
            desconto_int = desc_input.value;

            var preco_final = preco_float - (preco_float * (desconto_int / 100));
            preco_output.value = Math.round(preco_final * 10e1) / 10e1;

            console.log(preco_float + "€ com " + desconto_int + "% de desconto -> " + preco_final + "€");
        }
    }
    else
    {
        preco_output.value = "";
    }
}

function calc_valor()
{
    var valor_input = document.getElementById("valor_input");
    var metade_output = document.getElementById("metade_output");
    var dobro_output = document.getElementById("dobro_output");
    var quadrado_output = document.getElementById("quadrado_output");
    var cubo_output = document.getElementById("cubo_output");

    if (valor_input.value.length > 0)
    {
        var valor_float = parseFloat(valor_input.value);

        if (valor_float != NaN)
        {
            metade_output.value = valor_float / 2;
            dobro_output.value = valor_float * 2;
            quadrado_output.value = Math.pow(valor_float, 2);
            cubo_output.value = Math.pow(valor_float, 3);

            console.log("Valor: " + valor_float);
            console.log("Dobro: " + dobro_output.value);
            console.log("Quadrado: " + quadrado_output.value);
            console.log("Cubo: " + cubo_output.value);
        }
    }
    else
    {
        metade_output.value = "";
        dobro_output.value = "";
        quadrado_output.value = "";
        cubo_output.value = "";
    }
}

// 4 casas decimais
const PI = 3.1416;

function area_perim_cir_update()
{
    var raio_input = document.getElementById("raio_input");
    var area_output = document.getElementById("area_output");
    var perim_output = document.getElementById("perimetro_output");

    if (raio_input.value.length > 0)
    {
        var raio_float = parseFloat(raio_input.value);

        if (raio_float != NaN)
        {    
            // Área de um círculo: pi * raio^2
            var area_cir = PI * Math.pow(raio_float, 2);

            // Perímetro de um círculo: 2 * pi * raio
            var peri_cir = 2 * PI * raio_float;

            // Arrendondar a 2 casas decimais
            area_output.value = Math.round(area_cir * 10e1) / 10e1;
            perim_output.value = Math.round(peri_cir * 10e1) / 10e1;
            console.log("Área: " + area_output.value + " m²");
            console.log("Perímetro: " + perim_output.value + " m");
        }
    }
    else 
    {
        area_output.value = "";
        perim_output.value = "";
    }
}

function copy_result_clipboard(value)
{
    // https://stackoverflow.com/a/30810322
    // usar "document.execCommand('copy')"?
    navigator.clipboard.writeText(value);
}