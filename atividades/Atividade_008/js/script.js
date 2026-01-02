// Há browser que não suportam ou restrigem o HTML5, por razões de privacidade (como o Librewolf)
// Source: https://stackoverflow.com/a/13952727
function isNumberKey(evt) {
  var charCode = (evt.which) ? evt.which : evt.keyCode

  if (charCode > 31 && (charCode < 48 || charCode > 57) && charCode !== 46)
    return false;

  return true;
}

function get_result(num1, operator, num2) {
    if (operator.value === '+') {
        return num1 + num2;
    }
    else if (operator.value === '-') {
        return num1 - num2;
    }
    else if (operator.value === 'x') {
        return num1 * num2;
    }
    else if (operator.value === '÷') {
        // Divisão por zero não é permitida
        if (num2 == 0) {
            return "Erro";
        }
        return num1 / num2;
    }

    return 0;
}

function update() {
    let num1 = document.getElementById("num1");
    let num2 = document.getElementById("num2");
    let operator = document.getElementById("operator");
    let result = document.getElementById("result");

    // Tirar placeholders
    num1.placeholder = "";
    num2.placeholder = "";
    result.placeholder = "";

    if (num1.value.length > 0 && num2.value.length > 0) {
        let res = get_result(Number(num1.value), operator, Number(num2.value));

        if (res === "Erro"){
            result.value = res;
        }
        else {
            // Arrendondar a 3 casas decimais
            result.value = Math.round(res * 10e2) / 10e2;
            console.log(`Result = ${result.value}`)
        }
    }
    else {
        // Limpar Caixa de Texto
        result.value = "";
    }
}

function copy_result_clipboard()
{
    let result = document.getElementById("result");

    // https://stackoverflow.com/a/30810322
    // usar "document.execCommand('copy')"?
    navigator.clipboard.writeText(result.value);
}