var website = {};

var alert_shown = false;

website.contrib_elem_hover = function()
{
    audio_play = new Audio('audio/hover.mp3');

    // If audio wasn't loaded
    if (!audio_play)
    {
        console.error("Audio not loaded! Not playing!");
        return;
    }

    // Play audio
    audio_play.play().catch(function(error) {
        if (!alert_shown)
        {
            // Browsers are very restrictive nowadays gotta warn the user to press one time on the site
            console.warn("Press on website once to activate audio on hover! Err: " + error);
            alert_shown = true;
        }
    });
}

window.onload = function()
{
    console.log("Website feito por Daniel Munteanu (12º G) 2025 - Aplicações Informáticas B.");
}