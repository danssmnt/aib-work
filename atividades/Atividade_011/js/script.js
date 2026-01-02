// Decimal Version (com 46 -> '.')
function isDecimalKey(evt)
{
    var charCode = (evt.which) ? evt.which : evt.keyCode;

    if (charCode > 31 && (charCode < 48 || charCode > 57) && charCode != 46 && charCode != 45)
        return false;

    return true;
}

function GetFloatFromInput(input)
{
    if (input.value.length <= 0) return NaN;
    const temp_input_float = parseFloat(input.value);
    return temp_input_float;
}

function are_nums_equal(...values)
{
    if (values.length <= 1) return true; // Tecnicamente "todos" são iguais

    // Verifica se todos os valores são iguais entre si, apenas precisamos de verificar
    // se o valor é igual ao primeiro para todos os valores na lista
    // Se for para todos, então podemos garantir que a lista apenas 
    // contém o mesmo número repetidamente
    for (var i = 1; i < values.length; i++)
    {
        if (values[i] != values[0]) return false;
    }

    return true;
}

function are_nums_all_diff(...values)
{
    if (values.length <= 1) return false;

    // Verifica se cada valor é diferente um do outro
    // Criamos dois loops: para cada valor na lista, compara-se com todos os outros elementos
    // da lista em questão, se dois valores forem iguais, então podemos garantir que a
    // lista não contém apenas valores diferentes um dos outros
    // (isto é ganda overkill mas ok)
    for (var i = 0; i < values.length; i++)
    {
        for (var j = 0; j < values.length; j++)
        {
            if (i != j) // Não são o mesmo elemento
            {
                if (values[i] == values[j]) return false;
            }
        }
    }

    return true;
}

function comparador2num_update()
{
    const num_1_input = document.getElementById("num_1_input");
    const num_2_input = document.getElementById("num_2_input");
    const maior_output = document.getElementById("maior_output");
    const menor_output = document.getElementById("menor_output");
    const iguais_check = document.getElementById("iguais_check");

    const num_1_input_float = GetFloatFromInput(num_1_input);
    const num_2_input_float = GetFloatFromInput(num_2_input);

    if (!isNaN(num_1_input_float) && !isNaN(num_2_input_float))
    {
        maior_output.value = Math.max(num_1_input_float, num_2_input_float);
        menor_output.value = Math.min(num_1_input_float, num_2_input_float);

        // Checkboxes são ridículos de formatar em HTML e CSS, optei por fazê-lo manualmente em JS.
        iguais_check.src = are_nums_equal(num_1_input_float, num_2_input_float) ? "../imagens/checkbox_on.png" : "../imagens/checkbox_off.png";
    }
    else
    {
        maior_output.value = "";
        menor_output.value = "";
        iguais_check.src = "../imagens/checkbox_off.png";
    }
}

function comparador3num_update()
{
    const num_1_input = document.getElementById("num_1_input");
    const num_2_input = document.getElementById("num_2_input");
    const num_3_input = document.getElementById("num_3_input");
    const maior_output = document.getElementById("maior_output");
    const menor_output = document.getElementById("menor_output");
    const iguais_check = document.getElementById("iguais_check");
    const diff_check = document.getElementById("diff_check");

    const num_1_input_float = GetFloatFromInput(num_1_input);
    const num_2_input_float = GetFloatFromInput(num_2_input);
    const num_3_input_float = GetFloatFromInput(num_3_input);

    if (!isNaN(num_1_input_float) && !isNaN(num_2_input_float) && !isNaN(num_3_input_float))
    {
        maior_output.value = Math.max(num_1_input_float, num_2_input_float, num_3_input_float);
        menor_output.value = Math.min(num_1_input_float, num_2_input_float , num_3_input_float);

        // Checkboxes são ridículos de formatar em HTML e CSS, optei por fazê-lo manualmente em JS.
        iguais_check.src = are_nums_equal(num_1_input_float, num_2_input_float, num_3_input_float) ? "../imagens/checkbox_on.png" : "../imagens/checkbox_off.png";
        diff_check.src = are_nums_all_diff(num_1_input_float, num_2_input_float, num_3_input_float) ? "../imagens/checkbox_on.png" : "../imagens/checkbox_off.png";
    }
    else
    {
        maior_output.value = "";
        menor_output.value = "";
        iguais_check.src = "../imagens/checkbox_off.png";
        diff_check.src = "../imagens/checkbox_off.png";
    }
}

function copy_result_clipboard(value)
{
    if (!navigator.clipboard)
    {
        console.error("O teu browser não é compatível com a clipboard, copia manualmente o output :)");
        return;
    }

    navigator.clipboard.writeText(value);
}