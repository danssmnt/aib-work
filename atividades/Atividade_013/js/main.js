/*
*   Olá, não sei se é o professor ou apenas um curioso que abriu o inspector!
*   Quero dizer que fiz isto em 4 dias, isto é, o código pode estar mal escrito / organizado em certas partes.
*   É a minha primeira vez a fazer um jogo a sério em javascript.
*   Eu tentei comentar o melhor possível o que fosse necessário.
*   Eu gosto de programar em inglês (tanto no código quanto nos comments), é mais natural para mim,
*   mas, também existem nomes em português misturados (escritos à pressa :P), o que é confuso eu sei.
*   
*   Também gostava de deixar bem claro que AIs apenas foram usadas, nos casos mais extremos, para resolver certos
*   bugs / implementar certos sistemas, e ainda assim 99% do código destas foi reescrito por mim.
*   (E algum código copiado do StackOverflow tenho de admitir :P)
*   
*   Por último, há aqui coisas de gostava de ter feito para melhorar a experiência do user:
*       - Sistema de notificações (se user colocar valores inválidos, por exemplo)
*       - Melhor UI (eu sou terrível em frontends D:)
*       - Melhor sistema de áudio (playlists dinâmicas...)
*       - "Resgatar" dinheiro (onde poderias selecionar o teu tipo de pagamento...)
*       - Entre outros...
*   
*   Acabei por não fazer estes por preguiça / já perdi demasiado tempo nisto.
*   Talvez volte a este projeto no futuro, quando tiver mais conhecimento sobre Web Development.
*   Mas por agora, é isto, espero que gostes do jogo Curioso Anónimo :)
*   Boa noite.
*   
*   Daniel Munteanu, 29/11/2025, 1:49 AM
*/

// #region Utils

// Clamp number between two values, return it
// (Why doesn't JS have a func like this already?)
function NumClamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
};

// Get random number between two values, return it
// (Why doesn't JS have a func like this already?)
function RandRangeInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// https://www.geeksforgeeks.org/dsa/check-for-prime-number/
// Checks if number is prime, returns bool
function isPrime(num)
{
    if (num <= 1)
        return false;

    // Check divisibility from 2 to n-1
    for (i = 2; i < num; i++)
    {
        if (num % i == 0) return false;
    }

    return true;
}

// Checks if number is perfect square (4, 16, 400...), returns bool
function isPerfectSquare(num)
{
    // Se a raiz quadrada retornar um inteiro, então número é um quadrado perfeito.
    return Number.isInteger(Math.sqrt(num));
}

// https://stackoverflow.com/a/3943985
// Shuffles string randomly, copied from stackoverflow :P
function shuffleString(string) {
    var a = string.split(""),
        n = a.length;

    for(var i = n - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var tmp = a[i];
        a[i] = a[j];
        a[j] = tmp;
    }
    return a.join("");
}

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

    if (charCode > 31 && (charCode < 48 || charCode > 57) && charCode != 46 && charCode != 45)
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

// Retorna, de um input, um float, ou NaN
function getFloatFromInput(input)
{
    if (input.value.length <= 0) 
        return NaN;

    return parseFloat(input.value);
}

// Hides HTML element with custom CSS class
function hideHTMLElement(element)
{
    element.classList.add("eHidden");
}

// Shows previously hidden HTML element with custom CSS class
function showHTMLElement(element)
{
    element.classList.remove("eHidden");
}

// Sets bg color (with CSS transition)
function setPageBodyColor(color)
{
    const pageBody = document.getElementById("pageBody");

    if (!pageBody) return;

    pageBody.style.backgroundColor = color;
}

// #endregion

// #region Game Class Logic

// Tipos de output da função tentarAdivinhar.
const adivinhaOutput = {
    MENOR: "Menor", MAIOR: "Maior", GANHOU: "Ganhou", PERDEU: "Perdeu"
};

// Paridade -> Número é par / impar
// Ends With -> Número acaba com o algarismo X
// Soma -> A soma dos algarismos do número é XX
// Primo -> Número é primo
// PerfSqr -> Número é um quadrado perfeito
// CompAlg -> Número é composto pelos algarismos {X, X, ...}
const dicasType = {
    PARIDADE:   0,
    ENDSWITH:   1,
    SOMA:       2,
    COMPALG:    3,
    PRIMO:      4,
    PERFSQR:    5
}

class ApostaDica {

    #num;

    constructor (num)
    {
        this.#num = num;
    }

    #getParidade()
    {
        return `Número é ${this.#num % 2 == 0 ? "par" : "impar"}`;
    }

    #getEndsWith()
    {
        const numStr = this.#num.toString();
        return `Número acaba com o algarismo ${numStr[numStr.length - 1]}`;
    }

    #getSoma()
    {
        var numStr = this.#num.toString();
        var finalSoma = 0;

        for (const alg of numStr)
        {
            finalSoma += parseInt(alg);
        }

        return `A soma dos algarismos que compõem o número é ${finalSoma}`;
    }

    // Função apenas será executada quando número for primo.
    #getPrimo()
    {
        return "Número é primo";
    }

    // Função apenas será executada quando número for um quadrado perfeito.
    #getPerfSqr()
    {
        return "Número é um quadrado perfeito";
    }

    #getCompAlg()
    {
        var numStr = shuffleString(this.#num.toString());

        var returnStr = "Número é composto pelos algarismos {";

        for (var i = 0; i < numStr.length; i++)
        {
            if (i == 0)
            {
                returnStr += numStr[i];
            }
            else
            {
                returnStr += `, ${numStr[i]}`;
            }
        }

        returnStr += "}";

        return returnStr;
    }

    #getTypeDicasAvailableToChooseArray() {
        const availableHintTypes = [];

        Object.values(dicasType).forEach(dicaType => {
            switch (dicaType) 
            {
                case dicasType.SOMA:
                    // Apenas usa este tipo de dica se o num. tiver mais de 2 algarismos (se n fica demasiado fácil)
                    if (this.#num.toString().length > 2) availableHintTypes.push(dicaType);
                    break;

                case dicasType.PRIMO:
                    if (isPrime(this.#num)) availableHintTypes.push(dicaType);
                    break;

                case dicasType.PERFSQR:
                    if (isPerfectSquare(this.#num)) availableHintTypes.push(dicaType);
                    break;

                case dicasType.ENDSWITH:
                    // Apenas usa este tipo de dica se o num. tiver mais de 2 algarismos (se n fica demasiado fácil)
                    if (this.#num.toString().length > 2) availableHintTypes.push(dicaType);
                    break;

                case dicasType.COMPALG:
                    // Apenas usa este tipo de dica se o num. tiver mais de 4 algarismos (se n fica demasiado fácil)
                    if (this.#num.toString().length > 4) availableHintTypes.push(dicaType);
                    break;
                    
                default:
                    availableHintTypes.push(dicaType);
            }
        });

        return availableHintTypes;
    }

    getDica()
    {
        const availableDicaTypes = this.#getTypeDicasAvailableToChooseArray();
        const chosenDicaType = availableDicaTypes[RandRangeInt(0, availableDicaTypes.length-1)];

        switch(chosenDicaType)
        {
            case dicasType.PARIDADE:
                return this.#getParidade();

            case dicasType.ENDSWITH:
                return this.#getEndsWith();

            case dicasType.SOMA:
                return this.#getSoma();

            case dicasType.COMPALG:
                return this.#getCompAlg();

            case dicasType.PRIMO:
                return this.#getPrimo();

            case dicasType.PERFSQR:
                return this.#getPerfSqr();

            default:
                return this.#getParidade();
        }
    }
}

class Aposta {

    #numAdivinhar;
    #money;

    #dicasEnabled = false;
    #apostaDicas;

    #tentativasTotalNum;
    #tentativasCurrentNum = 0;

    #numMin;
    #numMax;

    constructor(numRangeMin, numRangeMax, moneyApostado, dicasEnabled)
    {
        this.#numMin = numRangeMin;
        this.#numMax = numRangeMax;
        this.#tentativasTotalNum = this.#getTentativasNum();
        this.#numAdivinhar = RandRangeInt(numRangeMin, numRangeMax);
        this.#money = moneyApostado;
        this.#dicasEnabled = dicasEnabled;
        if (this.#dicasEnabled)
        {
            this.#apostaDicas = new ApostaDica(this.#numAdivinhar);
        }
    }

    // https://www.freecodecamp.org/news/binary-search-algorithm-and-time-complexity-explained/
    // Uma binary search seria a forma mais eficiente de se jogar este jogo
    // Logo, como queremos que o utilizador acerte também com base na sorte (e não só em teoria)
    // reduzimos o número teórico necessário de binarySearchesNecessarias para 75%.
    #getTentativasNum()
    {
        const binarySearchesNecessarias = Math.log2(this.#numMax - this.#numMin) + 1;

        return Math.ceil(binarySearchesNecessarias * 0.75);
    }

    get numMin()
    {
        return this.#numMin;
    }

    get numMax()
    {
        return this.#numMax;
    }

    get dicasEnabled()
    {
        return this.#dicasEnabled;
    }

    get randomDica()
    {
        return this.#apostaDicas.getDica();
    }

    moneyReward(lost)
    {
        if (this.#dicasEnabled && !lost)
        {
            return this.#money * 0.90;
        }
        else
        {
            return this.#money;
        }
    }

    get tentativasCurrent()
    {
        return this.#tentativasCurrentNum + 1;
    }

    get tentativasTotal()
    {
        return this.#tentativasTotalNum;
    }

    get tentativasString()
    {
        return `Tentativa ${this.tentativasCurrent} de ${this.tentativasTotal}`;
    }

    tentarAdivinhar(num)
    {
        if (num == this.#numAdivinhar)
        {
            return adivinhaOutput.GANHOU; // User Ganhou!
        }

        if (this.tentativasCurrent < this.tentativasTotal)
        {
            this.#tentativasCurrentNum++;
        }
        else
        {
            return adivinhaOutput.PERDEU;
        }

        if (this.#numAdivinhar > num)
        {
            return adivinhaOutput.MAIOR;
        }
        if (num > this.#numAdivinhar)
        {
            return adivinhaOutput.MENOR;
        }
    }
}

class Money {
    #money = 0;

    // 9007199254740991, devia fazer de outra forma?
    #moneyLimit = Number.MAX_SAFE_INTEGER;

    constructor( initialMoney = 0, moneyLimit = 0 ) {
        if (moneyLimit > 0) 
            this.#moneyLimit = moneyLimit;

        this.value = initialMoney;
    }

    get value() {
        return this.#money;
    }

    set value(newMoneyValue) {
        this.#money = NumClamp(newMoneyValue, 0, this.#moneyLimit);
    }

    get limit()
    {
        return this.#moneyLimit;
    }

    set limit(newLimitValue) {
        this.#moneyLimit = newLimitValue;

        // Se limite é < dinheiro, limitar dinheiro.
        if (this.#money > this.#moneyLimit)
        {
            this.#money = this.#moneyLimit;
        }
    }

    // Esta lógica complicada serve para termos 2 casas decimais garantidamente
    toString() {
        return `${(Math.round(this.value * 10e1) / 10e1).toFixed(2)}€`;
    }

    earn(amount) {
        if (amount <= 0) return false;

        this.value += amount;

        return true;
    }

    spend(amount) {
        if (amount <= 0) return false;

        // Não gastar mais do que o user tem.
        if (amount > this.value) return false;

        this.value -= amount;

        return true;
    }
}

class Player {
    #money = new Money();
    #name = "";

    constructor(playerName)
    {
        this.#name = playerName;
    }

    set Name(newName)
    {
        this.#name = newName;
    }

    get Name()
    {
        return this.#name;
    }

    get Money()
    {
        return this.#money;
    }
}

// #endregion

// #region Audio / Sound System

var audioAlertShown = false;
var currentSFXPlaying = null;
var currentBackgroundMusicPlaying = null;

function playSound(path, sound, loop)
{
    stopSound(sound);

    audio = new Audio(path);

    // If audio wasn't loaded
    if (!audio)
    {
        console.error("Audio not loaded! Not playing!");
        return;
    }

    if (loop)
    {
        audio.loop = true;
        audio.volume = 0.2;
    }
    else
    {
        audio.addEventListener('ended', () => { stopSound(audio) });
    }

    // Play audio
    audio.play().catch(function(error) {
        if (!audioAlertShown)
        {
            // Browsers are very restrictive nowadays gotta warn the user to press one time on the site
            console.warn("Press on website once to activate audio on hover! Err: " + error);
            audioAlertShown = true;
        }
    });

    return audio;
}

function stopSound(sound) {
    if (!sound) return;

    // Isto é provavelmente a melhor forma de o fazer...
    // (Não existe forma de "parar" áudios em JS, pelo o que percebi...)
    sound.pause();
    sound.currentTime = 0;
    sound.src = '';
    sound.load();

    return null;
}

// #endregion

// #region Save System

// https://www.w3schools.com/html/html5_webstorage.asp
// Use Web Storage API instead of cookies

// Checks if browser is able to use Web Storage API
function checkWebsiteCanSave()
{
    // 1st Check, Type não existe
    if (typeof(Storage) === "undefined")
    {
        return false;
    }

    // Não cliques no link, por favor...
    const _testvarString = "https://youtu.be/QB7ACr7pUuE";

    // 2nd Check, manual check (saving and loading values), just to be sure
    localStorage.setItem("_testVar", _testvarString);

    // If, for some reason, it isn't equal, then something has gone wrong...
    if (localStorage.getItem("_testVar") !== _testvarString)
    {
        localStorage.removeItem("_testVar");
        return false;
    }

    // Manual check cleanup
    localStorage.removeItem("_testVar");

    return true;
}

// Checks if browser has saved this website before, if yes, then it probably
// contains relevant data to the game...
function hasWebsiteBeenSaved()
{
    console.log(`hasWebsiteBeenSaved() -> ${localStorage.length > 0}`);

    return localStorage.length > 0;
}

// Gets Saved Variable Value by Name
function getSavedVar(nameVar)
{
    return localStorage.getItem(nameVar);
}

// Saves Variable with Value
function saveVar(nameVar, valueVar)
{
    console.log(`Saving '${nameVar}' with value '${valueVar}'`);
    localStorage.setItem(nameVar, valueVar);
}

// Creates default save data
function createPlayerSavedData()
{
    saveVar("playerMoney", player.Money.value);
    saveVar("playerName", player.Name);
    saveVar("playerMoneyLimit", player.Money.limit);
}

// Gets player data from save and updates UI
function getPlayerDataFromSave()
{
    player.Money.value = getSavedVar("playerMoney");
    player.Name = getSavedVar("playerName");
    player.Money.limit = getSavedVar("playerMoneyLimit");

    const pageDefNameInput = document.getElementById("pageDefNameInput");
    const pageDefSaldoLimite = document.getElementById("pageDefSaldoLimite");

    if (!pageDefNameInput || !pageDefSaldoLimite) return;

    pageDefNameInput.value = player.Name;
    pageDefSaldoLimite.value = player.Money.limit;
}

// #endregion

// Páginas que o jogo contem (definidas no HTML)
const pageScreens = ["apostaPlay", "apostaSetup", "apostaGame", "apostaWin", "apostaLose", "definicoesMenu"];

var currentScreen = null;
var previousScreen = null;

var apostaGame = null;
var jogoTerminou = false;

const initialScreen = "apostaPlay";

var player = new Player("Gambler");

// Possíveis cores de fundo
const bgColorGanhou = "#2e9656";
const bgColorPerdeu = "#c93a2b";
const bgColorNormal = "#16212c";

// #region Game Screens System

// Hide Current Screen
function screenCurrentHide()
{
    if (!currentScreen) return;

    previousScreen = currentScreen;

    hideHTMLElement(currentScreen);
}

// Set Screen Active / Not Active
function screenToggle(screen_id, bool)
{
    var screen = document.getElementById(screen_id);

    if (!screen)
    {
        console.log(`[screenToggle] Screen '${screen_id}' not found!`);
    }

    if (screen == currentScreen && bool) return;

    currentSFXPlaying = stopSound(currentSFXPlaying);

    if (bool)
    {
        screenCurrentHide();
    
        currentScreen = screen;
        showHTMLElement(currentScreen);
    }
    else
    {
        if (currentScreen === screen) currentScreen = null;
        hideHTMLElement(screen);
    }
}

// Go back to previous screen
function screenGotoPrevious()
{
    if (!previousScreen) return;

    const screen = previousScreen;

    screenCurrentHide();
    
    currentScreen = screen;
    showHTMLElement(screen);
}

// #endregion

// #region Main Game Logic

// Update Saldo in UI
function mainGameUpdateSaldoUI()
{
    const headerSaldoVal = document.getElementById("headerSaldoVal");

    if (!headerSaldoVal) return;

    headerSaldoVal.innerText = `Saldo: ${player.Money}`;
}

// Update apostaPlay initial screen with player name
function apostaPlayUpdateName()
{
    const apostaPlayName = document.getElementById("apostaPlayName");

    if (!apostaPlayName) return;

    apostaPlayName.innerText = `Olá ${player.Name},`;
}

// #region apostaSetup

// Update / fix numLow and numHigh
function apostaSetupNumsUpdate()
{
    const apostaSetupNumLow = document.getElementById("apostaSetupNumLow");
    const apostaSetupNumHigh = document.getElementById("apostaSetupNumHigh");

    var numLow = getIntFromInput(apostaSetupNumLow);
    var numHigh = getIntFromInput(apostaSetupNumHigh);

    if ( !isNaN(numLow) && !isNaN(numHigh) )
    {
        // Apostas tem de ser no mínimo com diferença de 20 números
        // Caso contrário, ficaria muito fácil...
        if (numHigh <= numLow + 20)
        {
            numHigh = numLow + 20;
        }

        apostaSetupNumLow.value = numLow;
        apostaSetupNumHigh.value = numHigh;
    }
}

// Fix aposta value if needed (can't be higher than player's money)
function apostaSetupValue()
{
    const apostaSetupSaldo = document.getElementById("apostaSetupSaldo");

    var saldo = getFloatFromInput(apostaSetupSaldo);

    if ( !isNaN(saldo) )
    {
        // Jogador não pode apostar mais do que ele tem
        if (saldo > player.Money.value)
        {
            saldo = player.Money.value;
        }

        apostaSetupSaldo.value = saldo;
    }
}

// Setup Game
function apostaSetupStartGame(aposta)
{
    const apostaGameInputButton = document.getElementById("apostaGameInputButton");
    const apostaGameInputMain = document.getElementById("apostaGameInputMain");
    const apostaGameDica = document.getElementById("apostaGameDica");
    const apostaGameLogTable = document.getElementById("apostaGameLogTable");

    if (!apostaGameInputMain || !apostaGameLogTable || !apostaGameDica || !apostaGameInputButton) return;

    apostaGameUpdTentativasStr(aposta);
    
    if (aposta.dicasEnabled)
    {
        apostaGameSetupDicasStr(aposta);
    }

    apostaGameInputMain.value = "";

    apostaGameInputButton.disabled = false;
    apostaGameInputMain.disabled = false;
    
    apostaGameInputMain.placeholder = `Número de ${aposta.numMin} a ${aposta.numMax}`;

    if (!aposta.dicasEnabled)
    {
        hideHTMLElement(apostaGameDica);
    }
    else
    {
        showHTMLElement(apostaGameDica);
    }

    jogoTerminou = false;

    apostaGameLogTableClear(apostaGameLogTable);
    screenToggle("apostaGame", true);
}

// #endregion

// #region apostaGame

// Start Game
function apostaGameStart()
{
    const apostaSetupNumLow = document.getElementById("apostaSetupNumLow");
    const apostaSetupNumHigh = document.getElementById("apostaSetupNumHigh");
    const apostaSetupSaldo = document.getElementById("apostaSetupSaldo");
    const apostaSetupDicas = document.getElementById("apostaSetupDicasMain");

    var numLow = getIntFromInput(apostaSetupNumLow);
    var numHigh = getIntFromInput(apostaSetupNumHigh);
    var saldo = getFloatFromInput(apostaSetupSaldo);
    var dicas = apostaSetupDicas.checked;

    if ( isNaN(numLow) || isNaN(numHigh) || isNaN(saldo) ) return;

    if (saldo > player.Money.value) saldo = player.Money.value;

    apostaSetupSaldo.value = saldo;

    if (saldo <= 0) return;

    apostaGame = new Aposta(numLow, numHigh, saldo, dicas);

    apostaSetupStartGame(apostaGame);
}

// Clamp input between numLow and numHigh
function apostaGameInputUpdate()
{
    const apostaGameInputMain = document.getElementById("apostaGameInputMain");

    var numUser = getIntFromInput(apostaGameInputMain);

    if ( !isNaN(numUser) )
    {
        numUser = NumClamp(numUser, apostaGame.numMin, apostaGame.numMax);

        apostaGameInputMain.value = numUser;
    }
}

// User ganhou
function apostaGameGanhar()
{
    jogoTerminou = true;

    const apostaGameInputButton = document.getElementById("apostaGameInputButton");
    const apostaGameInputMain = document.getElementById("apostaGameInputMain");

    if (apostaGameInputButton) apostaGameInputButton.disabled = true;
    if (apostaGameInputMain) apostaGameInputMain.disabled = true;

    setPageBodyColor(bgColorGanhou);
    player.Money.earn(apostaGame.moneyReward(false));

    setTimeout(() => 
    {
        apostaGameGanhouEnd();
    }, 
    2000);
}

// User perdeu
function apostaGamePerder()
{
    jogoTerminou = true;

    const apostaGameInputButton = document.getElementById("apostaGameInputButton");
    const apostaGameInputMain = document.getElementById("apostaGameInputMain");

    if (apostaGameInputButton) apostaGameInputButton.disabled = true;
    if (apostaGameInputMain) apostaGameInputMain.disabled = true;

    setPageBodyColor(bgColorPerdeu);
    player.Money.spend(apostaGame.moneyReward(true));

    setTimeout(() => 
    {
        apostaGamePerdeuEnd();
    }, 
    2000);
}

// Show win screen...
function apostaGameGanhouEnd()
{
    const apostaWinPlayerName = document.getElementById("apostaWinPlayerName");
    const apostaWinDinheiroGanho = document.getElementById("apostaWinDinheiroGanho");
    const apostaWinSaldo = document.getElementById("apostaWinSaldo");

    if (!apostaWinPlayerName || !apostaWinDinheiroGanho || !apostaWinSaldo) return;
    
    apostaWinPlayerName.innerText = `${player.Name},`;
    apostaWinDinheiroGanho.innerText = `${(apostaGame.moneyReward(false)).toFixed(2)}€`;
    apostaWinSaldo.innerText = player.Money.toString();
    mainGameUpdateSaldoUI();
    saveVar("playerMoney", player.Money.value);

    screenToggle("apostaWin", true);
    currentSFXPlaying = playSound("audio/gamewin.mp3", currentSFXPlaying, false);
    setPageBodyColor(bgColorNormal);
}

// Show lose screen...
function apostaGamePerdeuEnd()
{
    const apostaLosePlayerName = document.getElementById("apostaLosePlayerName");
    const apostaLoseDinheiroPerdido = document.getElementById("apostaLoseDinheiroPerdido");
    const apostaLoseSaldo = document.getElementById("apostaLoseSaldo");

    if (!apostaLosePlayerName || !apostaLoseDinheiroPerdido || !apostaLoseSaldo) return;
    
    apostaLosePlayerName.innerText = `${player.Name},`;
    apostaLoseDinheiroPerdido.innerText = `${(apostaGame.moneyReward(true)).toFixed(2)}€`;
    apostaLoseSaldo.innerText = player.Money.toString();
    mainGameUpdateSaldoUI();
    saveVar("playerMoney", player.Money.value);

    screenToggle("apostaLose", true);
    currentSFXPlaying = playSound("audio/gamelose.mp3", currentSFXPlaying, false);
    setPageBodyColor(bgColorNormal);
}

// Quando user clica no botão de adivinhar
function apostaGameGuess()
{
    const apostaGameInputMain = document.getElementById("apostaGameInputMain");
    const apostaGameLogTable = document.getElementById("apostaGameLogTable");

    var numUser = getIntFromInput(apostaGameInputMain);

    if ( isNaN(numUser) ) return;

    var tentativa = apostaGame.tentativasCurrent;

    numUser = NumClamp(numUser, apostaGame.numMin, apostaGame.numMax);
    var result = apostaGame.tentarAdivinhar(numUser);
    
    apostaGameUpdTentativasStr(apostaGame);
    apostaGameLogTableAdd(apostaGameLogTable, tentativa, numUser, result);

    apostaGameInputMain.value = "";

    if (result === adivinhaOutput.GANHOU)
    {
        console.log("Ganhaste!");
        apostaGameGanhar();

        return;
    }
    else if (result === adivinhaOutput.PERDEU)
    {
        console.log("Perdeste!");
        apostaGamePerder();
    }
}

// Update "Tentativa X de Y"
function apostaGameUpdTentativasStr(aposta)
{
    const apostaGameTentativas = document.getElementById("apostaGameTentativas");

    if (!apostaGameTentativas) return;

    apostaGameTentativas.innerText = aposta.tentativasString;
}

// Setup Dica for game 
function apostaGameSetupDicasStr(aposta)
{
    const apostaGameDicaLabel = document.getElementById("apostaGameDicaLabel");

    if (!apostaGameDicaLabel) return;

    apostaGameDicaLabel.innerText = aposta.randomDica;
}

// Clear Tentativas Table (for next game)
function apostaGameLogTableClear(logTable)
{
    while (logTable.rows.length > 1) {
        logTable.deleteRow(logTable.rows.length - 1);
    }

    hideHTMLElement(logTable);
}

// Add tentativa to Tentativas Table
function apostaGameLogTableAdd(logTable, tentativa, num, state)
{
    if (logTable.rows.length == 1)
    {
        showHTMLElement(logTable);
    }

    const row = document.createElement('tr');

    const tentativaElement = document.createElement('td');
    const numElement = document.createElement('td');
    const stateElement = document.createElement('td');

    tentativaElement.textContent = tentativa;
    numElement.textContent = num;
    stateElement.textContent = state;

    row.appendChild(tentativaElement);
    row.appendChild(numElement);
    row.appendChild(stateElement);

    logTable.appendChild(row);
}

// #endregion

// #region pageDef

// Update and save new player name
function pageDefNameUpdate()
{
    const pageDefNameInput = document.getElementById("pageDefNameInput");

    if (!pageDefNameInput) return;

    const nameInput = pageDefNameInput.value;

    if (nameInput.length <= 0) return;

    player.Name = nameInput;
    apostaPlayUpdateName();

    saveVar("playerName", player.Name);
}

// saldo -> money (defined in HTML)
// Earn money
function pageDefCarregarSaldo(saldo)
{
    player.Money.earn(saldo);
    mainGameUpdateSaldoUI();
    saveVar("playerMoney", player.Money.value);

    currentSFXPlaying = playSound("audio/moneycarregar.mp3", currentSFXPlaying, false);
}

// Update Player's Money Limit
function pageDefAtualizarLimiteSaldo()
{
    const pageDefSaldoLimite = document.getElementById("pageDefSaldoLimite");

    if (!pageDefSaldoLimite) return;

    const saldoLimite = getFloatFromInput(pageDefSaldoLimite);

    if (isNaN(saldoLimite) || saldoLimite <= player.Money.value) return;

    player.Money.limit = saldoLimite;
    saveVar("playerMoneyLimit", player.Money.limit);

    // If limit is higher than player money, player money = limit
    mainGameUpdateSaldoUI();
}

// #endregion

// #endregion

// #region Listeners

// Check if user has pressed enter (for game)
// More convinient for user
window.addEventListener("keydown", (e) => 
{
    if (e.key === "Enter") 
    {
        if (currentScreen.id == "apostaGame" && !jogoTerminou)
        {
            apostaGameGuess();
        }
    }
});

// Load as soon as DOM is loaded, which seems to be the fastest way to do it...
window.addEventListener("DOMContentLoaded", () =>
{
    currentScreen = document.getElementById(initialScreen);

    pageScreens.forEach((screen) => {
        if (screen !== currentScreen.id) screenToggle(screen, false);
    });

    // :)
    console.log("\n==============================================================");
    console.log("Jogo feito por Daniel Munteanu 12G - Aplicações Informáticas B");
    console.log("O que é que estás aqui a fazer? ;)");
    console.log("==============================================================\n ");
    
    // Player começará com 25€ (valor overwritten se save existir)
    player.Money.value = 25;

    console.log(`Browser can save -> ${checkWebsiteCanSave()}`);

    // Save Init
    if (checkWebsiteCanSave())
    {
        if (hasWebsiteBeenSaved())
        {
            getPlayerDataFromSave();
        }
        else
        {
            createPlayerSavedData();
        }
    }

    // Update stuff based on saved data
    mainGameUpdateSaldoUI();
    apostaPlayUpdateName();
});

// User interagiu com website (permite tocar áudios se sim)
var user_interacted = false;

// Autoplay is disabled when user doesn't interact with website
// Esperar até interagir...
// Sim, devia fazer de outra forma...
//
// Taken from https://developer.mozilla.org/en-US/docs/Web/Media/Guides/Autoplay
// "From the user's perspective, a web page or app that spontaneously 
// starts making noise without warning can be jarring, inconvenient, or
// off-putting. Because of that, browsers generally only allow autoplay 
// to occur successfully under specific circumstances."
document.addEventListener("click", () =>
{
    if (user_interacted) return;

    user_interacted = true;

    // Apenas começar a tocar a música quando permitido
    currentBackgroundMusicPlaying = playSound("audio/undertalehotelbanger.mp3", currentBackgroundMusicPlaying, true);
});

// #endregion