//gioco ricorda i numeri

//prendo il bottone
const elPlay = document.getElementById("start");

//prendo i container
const elContainerNum = document.getElementById('container');
const elContainerConsegna = document.getElementById('consegna');
const elContainerTimer = document.getElementById('container-timer');

//variabile per numeri indovinati
let elNumeriIndovinati = 0;

//iniziamo
elPlay.addEventListener(
    "click",

    function(){

        //pulisco il contenitore
        elContainerNum.innerHTML = "";
        elContainerConsegna.innerHTML = "";
        elContainerTimer.innerHTML = '';
        //genero la consegna e la inserisco
        let elConsegna = "<h1>Memorizza i numeri</h1>";
        elContainerConsegna.innerHTML = elConsegna;

        //genero i numeri
        const arrayNumeriDaRicordare = generaArray(1, 100, 5);

        //genero elementi e inseerisco i numeri
        for (let i = 0; i < arrayNumeriDaRicordare.length; i++) {

            const elNumero = arrayNumeriDaRicordare[i];

            //creo elemento che contiene i numeri
            const elSquare = createElemento('div', 'square', elNumero);

            //metto l'elemento nel container
            elContainerNum.append(elSquare);   
        }

        //conto alla rovescia
        const elOrologio = createElemento('div', 'timer', '');
        const h2 = document.createElement('h2');
        elOrologio.append(h2)
        elContainerTimer.append(elOrologio);

        //inizializzo il timer
        let elSeconds = 30;

        //setto intervallo
        let elTimer = setInterval(
            function () {
                h2.innerHTML = elSeconds;
                elSeconds--;
                //quando finisce il timer
                if (elSeconds < 0) {
                    //pulisco cio che non serve piu
                    clearInterval(elTimer);
                    elContainerTimer.innerHTML = '';
                    //inserisco la consegna
                    elConsegna = "<h1>Riscrivi i numeri</h1>";
                    elContainerConsegna.innerHTML = elConsegna;

                    //inserimento numeri
                    const arraySquare = document.getElementsByClassName('square');
                    for (let i = 0; i < arraySquare.length; i++) {
                        const elementSquare = arraySquare[i];
                        const elInput = `<input type="number" class="solution" id="soluzione-${i + 1}">`;
                        elementSquare.innerHTML = elInput;
                    }
                    const elVerifica = `<button type="button" id="verifica">VERIFICA</button>`;
                    elContainerTimer.innerHTML = elVerifica;
                    //veifica numeri
                    const elButtonVerifica = document.getElementById('verifica');

                    elButtonVerifica.addEventListener('click', 
                        function () {
                            //ottengo i numeri
                            const arrayInput = document.getElementsByClassName('solution');
                            const arrayNumeri = [];
                            
                            for (let i = 0; i < arrayInput.length; i++) {
                                const elementInput = arrayInput[i];
                                const elInput = parseInt(elementInput.value);
                                elementInput.style.backgroundColor = 'red';

                                //conttrollo se il numero è tra quelli giusti
                                if(arrayNumeriDaRicordare.includes(elInput)){
                                    elementInput.style.backgroundColor = 'yellow';
                                    console.log(elInput, 'numero corretto');

                                    //controllo se il numero corretto è già stato inserito
                                    if (!arrayNumeri.includes(elInput)) {
                                        elNumeriIndovinati++;
                                        arrayNumeri.push(elInput);
                                        elementInput.style.backgroundColor = 'lightgreen';
                                    }
                                }else{
                                    console.log(elInput, 'numero errato');
                                }
                            } 
                            const commento = `<h2>Numeri corretti: ${elNumeriIndovinati}</h2>`;
                            elContainerTimer.innerHTML = commento;
                        }
                    );              
                }
            },
            1000
        );
    }
)



//funzioni

//***genera array di numeri***
function generaArray(numMin, numMax, quantiNum){
    //creo array vuoto
    const arrayDiNumeri = [];

    //aggiungo a array
    //fino a che la lunghezza dell'array é minore della quantitá che voglio
    while (arrayDiNumeri.length < quantiNum){

        //creo un numero random
        const numRandom = numeroCasuale(numMin, numMax);

        //se l'array non contiene giá il numero, push
        if(!arrayDiNumeri.includes(numRandom)){
            arrayDiNumeri.push(numRandom);
        }
    }
    //restituisco l'array
    return arrayDiNumeri;
}

//***genera numeri casuali in un range***
function numeroCasuale(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

//***creare un elemento e assegnargli una classe e inserisco qualcosa***
function createElemento(tagType, classToAdd, objToIns) {
    const newElement = document.createElement(tagType);
    newElement.classList.add(classToAdd);
    newElement.append(objToIns)
    return newElement;
}