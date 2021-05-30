
var config = readFileJson().dates
var configClouds = readFileJsonClouds().clouds
var scaleX = d3.scaleLinear()
scaleX.domain([0,500])
scaleX.range([0,1000])

var scaleY = d3.scaleLinear()
scaleY.domain([0,200])
scaleY.range([0,580])

//Quando clicco sul bottono start partirà
//questa funzione
function init() {
    removeButton();
	drawAirplanes()
	drawClouds()
}


//Rimuovo lo Start button
function removeButton() {
    var elem = document.getElementById('dummy');
    elem.parentNode.removeChild(elem);
    return false;
}


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
        	d3.select("#plane" +i).transition().duration(1800).attr("transform", "translate("+scaleX(setPosition2(i,config).x)+","+scaleY(setPosition2(i,config).y)+") rotate(0)")
            
    }
};

var numNconfig = 0
var flag = 1
var flagKeyX = 1
var flagKeyY = 1

d3.select("body")
    .on("keydown", function() {
    	if(event.key === "x"){
    		flagKeyX = 0
    		flag = 0
    	}
    	else if(event.key === "y"){
    		flagKeyY = 0
    		flag = 0
    	}


    })
    .on("keyup", function(){
    	flagKeyX = 1
    	flagKeyY = 1
    	flag=1})


function moveIt(i){


		if( flag == 0 && flagKeyX == 0){
    		numNconfig += 1
    		changePos(numNconfig)
    	}
    	else if(flag == 0 && flagKeyY == 0){
    		numNconfig -= 1
    		changePos(numNconfig)
    	}

}

function setPosition2(i, idConf) {
    var shortcut = config[i]
    switch (idConf) {
        case 0: //linearetta
            return { x: eval(shortcut.var1), y: eval(shortcut.var2)}
        case 1: //lineaverticale
            return { x: eval(shortcut.var3), y: eval(shortcut.var4)}    
        case 2: //slash
            return { x: eval(shortcut.var5), y: eval(shortcut.var6)}
        case 3: //backslash
                return {x: eval(shortcut.x)*(i+1), y: eval(shortcut.y)*(10-i)}
            //return { x: eval(shortcut.x)*i/10, y: (eval(shortcut.y)-63-eval(shortcut.y)*i/10)}
        }
}

function readFileJson(){
    return $.ajax({
    type: 'GET',
    url: 'http://localhost:8089/dates.json',
    async: false,
    dataType: 'json',
    data: { action : 'getList' },
    done: function(results) {
        // Uhm, maybe I don't even need this?
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
    url: 'http://localhost:8089/clouds.json',
    async: false,
    dataType: 'json',
    data: { action : 'getList' },
    done: function(results) {
        // Uhm, maybe I don't even need this?
        JSON.parse(results);
        return results;
    },
    fail: function( jqXHR, textStatus, errorThrown ) {
        console.log( 'Could not get posts, server response: ' + textStatus + ': ' + errorThrown );
    }
   }).responseJSON;
}

function setPosition(i) {
    var shortcut = config[i]
    return { x: eval(shortcut.var1), y: eval(shortcut.var2)}
}

function setPositionClouds(i) {
    var shortcut = configClouds[i]
    return { x: eval(shortcut.var1), y: eval(shortcut.var2)}
}