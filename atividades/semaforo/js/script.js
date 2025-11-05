var clr_red         = "#FF0000";
var clr_yellow      = "#FFFF00";
var clr_green       = "#00FF00";

var clr_dim_red     = "#600000";
var clr_dim_yellow  = "#606000";
var clr_dim_green   = "#006000";

var semaforo = {};
semaforo.is_on = false;
semaforo.initalized = false;

semaforo.set_color = function(lightname, color)
{
    document.getElementById(lightname).style.backgroundColor = color;
}

semaforo.update_buttons = function(red, yellow, green)
{
    document.getElementById("toggle_btn").innerHTML = semaforo.is_on ? "Desligar" : "Ligar";
    document.getElementById("red_btn").disabled = !red;
    document.getElementById("yellow_btn").disabled = !yellow;
    document.getElementById("green_btn").disabled = !green;
}

semaforo.set_red_signal = function()
{
    semaforo.set_color("redlight", clr_red);
    semaforo.set_color("yellowlight", clr_dim_yellow);
    semaforo.set_color("greenlight", clr_dim_green);
    semaforo.update_buttons(false, false, true);
}

semaforo.set_yellow_signal = function()
{
    semaforo.set_color("redlight", clr_dim_red);
    semaforo.set_color("yellowlight", clr_yellow);
    semaforo.set_color("greenlight", clr_dim_green);
    semaforo.update_buttons(true, false, false);
}

semaforo.set_green_signal = function()
{
    semaforo.set_color("redlight", clr_dim_red);
    semaforo.set_color("yellowlight", clr_dim_yellow);
    semaforo.set_color("greenlight", clr_green);
    semaforo.update_buttons(false, true, false);
}

semaforo.turn_off = function()
{
    semaforo.set_color("redlight", clr_dim_red);
    semaforo.set_color("yellowlight", clr_dim_yellow);
    semaforo.set_color("greenlight", clr_dim_green);
    semaforo.is_on = false;
    semaforo.update_buttons(false, false, false);
}

semaforo.turn_on = function()
{
    semaforo.is_on = true;
    semaforo.update_buttons(true, true, true);
    semaforo.set_red_signal();
}

semaforo.toggle = function()
{
    if (!semaforo.is_on)
    {
        semaforo.turn_on();
    }
    else
    {
        semaforo.turn_off();
    }
}

semaforo.init = function()
{
    semaforo.turn_off();
    semaforo.init = true;
}

window.onload = function()
{
    console.log("Exemplo de semáforo. Feito por Daniel Munteanu 12G");
    semaforo.init();
}