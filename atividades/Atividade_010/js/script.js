// Há browsers que não suportam ou restrigem o HTML5, por razões de privacidade (como o Librewolf)
// Source: https://stackoverflow.com/a/13952727
// 45 -> '-'
function isNumberKey(evt)
{
    var charCode = (evt.which) ? evt.which : evt.keyCode;

    if (charCode > 31 && (charCode < 48 || charCode > 57) && charCode != 45)
        return false;

    return true;
}

// Decimal Version (com 46 -> '.')
function isDecimalKey(evt)
{
    var charCode = (evt.which) ? evt.which : evt.keyCode;

    if (charCode > 31 && (charCode < 48 || charCode > 57) && charCode != 46 && charCode != 45)
        return false;

    return true;
}

const Unit =
{
    K: "ºK", F: "ºF", C: "ºC", None: "None"
}

class Temperature
{
    #kelvin = 0;

    constructor(temperature, unit)
    {
        var final_unit = Temperature.GetUnitByString(unit);

        // Não deve acontecer
        if (final_unit == Unit.None)
        {
            console.error("final_unit == NONE!");
            return;
        }

        this.SetTempWithUnit(temperature, final_unit);
    }

    GetTempWithUnit(unit)
    {
        if (unit == Unit.C) return this.Celsius;
        else if (unit == Unit.F) return this.Fahrenheit;
        else if (unit == Unit.K) return this.Kelvin;
        return 0;
    }

    SetTempWithUnit(temperature, unit)
    {
        if (unit == Unit.C) this.Celsius = temperature;
        else if (unit == Unit.F) this.Fahrenheit = temperature;
        else if (unit == Unit.K) this.Kelvin = temperature;
    }

    static GetUnitByString(string_unit) {
        for (const val of Object.values(Unit)) 
        {
            if (string_unit === val) return val;
        }
        return Unit.None;
    }

    String(unit)
    {
        var final_unit = Temperature.GetUnitByString(unit);
        if (final_unit == Unit.None) return "None";
        return `${this.GetTempWithUnit(final_unit).toFixed(2)} ${final_unit}`;
    }

    static String(value, unit)
    {
        return `${value.toFixed(2)} ${unit}`;
    }

    #setPrivateKelvin(value)
    {
        this.#kelvin = value;

        // Validação (Graus Kelvin não podem ser negativos)
        if (this.#kelvin < 0) this.#kelvin = 0;
    }
    
    get Kelvin() { return this.#kelvin; }

    set Kelvin(value) { this.#setPrivateKelvin(value); }

    // https://www.geeksforgeeks.org/physics/temperature-formula/
    get Celsius() { return this.#kelvin - 273.15; }

    set Celsius(value) { this.#setPrivateKelvin(value + 273.15); }

    get Fahrenheit() { return (this.#kelvin - 273.15) * (9/5) + 32; }

    set Fahrenheit(value) { this.#setPrivateKelvin((value - 32) * (5/9) + 273.15); }
}

const bg_normal     = "#252525";
const bg_red        = "#f85151";
const bg_darkred    = "#551414";
const bg_yellow     = "#e2ce4e";
const bg_blue       = "#5dabff";
const bg_darkblue   = "#1737a0";

function update_ui(output_val, output_text, unit_input, unit_output)
{
    const bg = document.getElementById("bg");

    if (!output_val)
    {
        temp_output.value = "";
        bg.style.backgroundColor = bg_normal;
        return;
    }

    if (input_temperature.Celsius < 0) bg.style.backgroundColor = bg_darkblue;
    else if (input_temperature.Celsius < 13) bg.style.backgroundColor = bg_blue;
    else if (input_temperature.Celsius < 25) bg.style.backgroundColor = bg_yellow;
    else if (input_temperature.Kelvin < 798) bg.style.backgroundColor = bg_red;

    // https://youtu.be/4fuHzC9aTik?t=202, draper point
    else bg.style.backgroundColor = bg_darkred;

    output_text.value = output_val.toFixed(2);
    console.log(`${input_temperature.String(Temperature.GetUnitByString(unit_input))} = ${Temperature.String(output_val, unit_output)}`)
}

function GetFloatFromInput(input)
{
    if (input.value.length <= 0) return NaN;
    const temp_input_float = parseFloat(input.value);
    return temp_input_float;
}

const input_temperature = new Temperature(0, "ºC");

function temp_update()
{
    const temp_input = document.getElementById("temp_input");
    const unidade_temp_input = document.getElementById("unidade_temp_input");
    const temp_output = document.getElementById("temp_output");
    const unidade_temp_output = document.getElementById("unidade_temp_output");

    const temp_input_float = GetFloatFromInput(temp_input);

    if (!isNaN(temp_input_float))
    {
        input_temperature.SetTempWithUnit(temp_input_float, unidade_temp_input.value);

        // Certamente não é a melhor forma de o fazer mas prontos...
        // Verifica se user talvez tenha digitado algo inválido (kelvin negativos...)
        // Corrige input
        if (input_temperature.Kelvin == 0)
            temp_input.value = input_temperature.GetTempWithUnit(Temperature.GetUnitByString(unidade_temp_input.value)).toFixed(2);

        const output_value = input_temperature.GetTempWithUnit(Temperature.GetUnitByString(unidade_temp_output.value));
        
        update_ui(output_value, temp_output, unidade_temp_input.value, unidade_temp_output.value);
    }
    else
    {
        update_ui(null, null);
    }
}

function CreateOptionChildUnit(unit_string)
{
    var unit = document.createElement("option");
    unit.textContent = unit_string;

    return unit;
}

function AddAllUnitsToOutput(output_units)
{
    output_units.appendChild(CreateOptionChildUnit("ºC"));
    output_units.appendChild(CreateOptionChildUnit("ºF"));
    output_units.appendChild(CreateOptionChildUnit("ºK"));
}

function unit_update()
{
    const unidade_temp_input = document.getElementById("unidade_temp_input");
    const unidade_temp_output = document.getElementById("unidade_temp_output");

    // Elimina as options atuais, preenche com todas as unidades disponiveis, tira aquela igual ao input...
    unidade_temp_output.innerHTML = "";

    AddAllUnitsToOutput(unidade_temp_output);

    const options = Array.from(unidade_temp_output.children);

    options.forEach(child => 
    {
        if (child.innerHTML === unidade_temp_input.value) 
        {
            unidade_temp_output.removeChild(child);
        }
    });
}

window.onload = function() 
{
  unit_update();
  temp_update();
};

function copy_result_clipboard(value)
{
    if (!navigator.clipboard)
    {
        console.error("O teu browser não é compatível com a clipboard, copia manualmente o output :)");
        return;
    }

    navigator.clipboard.writeText(value);
}