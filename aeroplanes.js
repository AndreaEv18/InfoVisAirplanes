
var dataCases = readFileJson().dates
var configClouds = readFileJsonClouds().clouds

/*
D3 scales.
Qui ho usato le scales di D3, ovvero delle funzioni che vanno a mappare un dominio 
di input (valori delle coordinate x e y definite nel file json) con un range di output
(quello corrispondente alla dimensione dell' SVG).
*/
var scaleX = d3.scaleLinear()
scaleX.domain([0,500])
scaleX.range([0,1300])

var scaleY = d3.scaleLinear()
scaleY.domain([0,200])
scaleY.range([0,600])

//Prima funzione che viene eseguita quando si clicca sul bottone Start
function init() {
    removeButton();
    removeTitle();
	drawAirplanes()
	drawClouds()
}

var button = document.getElementById('buttonEffect')
button.volume=0.5
//Rimuovo lo Start button
function removeButton() {
    button.play()
    var elem = document.getElementById('button');
    elem.parentNode.removeChild(elem);
    return false;
}

//Rimuovo il titolo
function removeTitle() {
    var elem = document.getElementById('titolo');
    elem.parentNode.removeChild(elem);
    return false;
}

/*
Funzione che disegna e posiziona tutti e 8 gli aeroplanini sulla mappa, nella loro
configurazione iniziale. Inoltre verrà associato ad ognuno di essi un evento 'click',
che associa a sua volta il click del mouse da parte dell utente con la funzione che 
determina lo spostamento.
*/
function drawAirplanes(){
    var svg= d3.select("svg")
    for (let i = 0; i < 8; i++) {
        svg.append("svg:image")
        .attr("xlink:href", "images/airplane.png")
        .attr("id", "plane"+i)
        .attr("locked", 0)
		.attr("width", 100 )
		.attr("height", 100)
		.attr("orientation", 0)
        .attr("transform", "translate("+scaleX(setPosition(i).x)+","+scaleY(setPosition(i).y)+") rotate(0)")
        .attr("focusable", false)
        .on("click", function(){moveIt(i)})

    }
}

//Funzione che disegnerà le 10 nuvolette sullo sfondo.
function drawClouds(){
    var svg= d3.select("svg")
    for (let i = 0; i < 10; i++) {
        svg.append("svg:image")
        .attr("xlink:href", "images/clouds.png")
        .attr("id", "cloud"+i)
        .attr("locked", 0)
		.attr("width", 100 )
		.attr("height", 100)
		.attr("orientation", 0)
        .attr("transform", "translate("+scaleX(setPositionClouds(i).x)+","+scaleY(setPositionClouds(i).y)+") rotate(0)")
        .attr("focusable", false)

    }
}

function changePos(config) {
    for (let i = 0; i < 8; i++) {
        if(d3.select("#plane" +i).attr("locked")!=1)
        	d3.select("#plane" +i).transition().duration(1800).attr("transform", "translate("+scaleX(setPositions(i,config).x)+","+scaleY(setPositions(i,config).y)+") rotate(0)")
            
    }
};


var numNconfig = 0 //numero della configurazione attuale
var flagMouse = 1 //flag che avrà associato il valore 0 quando verrà effettuato il click con il mouse
var flagKeyX = 1 //flag che avrà associato il valore 0 quando verrà premuto x
var flagKeyY = 1 //flag che avrà associato il valore 0 quando verrà premuto y


//Qui si va a rilevare l'evento in cui l'utente preme il tasto x o y sulla tastiera
d3.select("body")
    .on("keydown", function() {
    	if(event.key === "x"){
    		flagKeyX = 0
    		flagMouse = 0
    	}
    	else if(event.key === "y"){
    		flagKeyY = 0
    		flagMouse = 0
    	}


    })
    .on("keyup", function(){
    	flagKeyX = 1
    	flagKeyY = 1
    	flagMouse=1})


var sound = document.getElementById('motore')
sound.volume = 0.4
/*
Funzione che va a determinare il movimento degli aeroplani e quindi il 
passaggio da un aloro configurazione a un'altra in base al rilevamento
della pressione del tasto x o y.
In particolare se viene premuto il primo insieme al click del mouse allora
tutti e 8 gli aeroplanini si muoveranno verso la prossima configurazione.
Altrimenti, verso la precedente.
*/
function moveIt(i){
        
        
        

		if( flagMouse == 0 && flagKeyX == 0 ){
            sound.play()
            if(numNconfig == 2){
               numNconfig = 0 
               changePos(numNconfig)
            }else{
                numNconfig +=1 
                changePos(numNconfig)
            }
            
    	}
    	else if(flagMouse == 0 && flagKeyY == 0 ){
            sound.play()
            if(numNconfig == 0){
                numNconfig = 2
                changePos(numNconfig)
            }else{
                numNconfig -=1 
                changePos(numNconfig)
            }
    		
    		
    	}

}

//Funzione che determina la posizione della nuova configurazione
function setPositions(i, idConf) {
    var aeroplane = dataCases[i]
    switch (idConf) {
        case 0: 
            return { x: eval(aeroplane.var1), y: eval(aeroplane.var2)}
        case 1: 
            return { x: eval(aeroplane.var3), y: eval(aeroplane.var4)}    
        case 2: 
            return { x: eval(aeroplane.var5), y: eval(aeroplane.var6)}
        }
}

function readFileJson(){
    return $.ajax({
    type: 'GET',
    url: 'http://localhost:8096/dates.json',
    async: false,
    dataType: 'json',
    data: { action : 'getList' },
    done: function(results) {
        JSON.parse(results);
        return results;
    },
    fail: function( jqXHR, textStatus, errorThrown ) {
        console.log( 'Could not get posts, server response: ' + textStatus + ': ' + errorThrown );
    }
   }).responseJSON;
}

function readFileJsonClouds(){
    return $.ajax({
    type: 'GET',
    url: 'http://localhost:8096/clouds.json',
    async: false,
    dataType: 'json',
    data: { action : 'getList' },
    done: function(results) {
        JSON.parse(results);
        return results;
    },
    fail: function( jqXHR, textStatus, errorThrown ) {
        console.log( 'Could not get posts, server response: ' + textStatus + ': ' + errorThrown );
    }
   }).responseJSON;
}

//Funzione che viene utilizzata per settare la posizione iniziale degli aeroplanini
function setPosition(i) {
    var aeroplane = dataCases[i]
    return { x: eval(aeroplane.var1), y: eval(aeroplane.var2)}
}

//Funzione che viene utilizzata per settare la posizione delle nuvolette
function setPositionClouds(i) {
    var cloud = configClouds[i]
    return { x: eval(cloud.var1), y: eval(cloud.var2)}
}