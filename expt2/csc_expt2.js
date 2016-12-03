var model={

	instruction1: 'Step:1 Click on the beaker to take into experiment table.',
	instruction2:'Step:2 Add required quantity of agar-agar powder to the beaker for the preparation of a 1.0%'
	+ 'agar-agar aqueous solution. [Click on the agar container’s spoon to transfer',
	instruction3:'Step:3 Add required volume of (1x TBE (Tris-Borate-EDTA), pH 8.6) buffer solution'
	+'[by clicking on the buffer container].',
	instruction4:'Step:4 Click on the watch glass to cover the top of the beaker with a wrap loosely'+
	'to prevent the solution from boiling over.',
	instruction5:'Step:5 Place the beaker in the microwave oven [by clicking on the beaker]. In real operation,'+ 
	'one should adjust time and power settings according to the oven output strength.'+
	'Alternatively, the solution can be heated on a hot plate or over a Bunsen burner.',
	instruction6:'Step:6 Remove the beaker at regular intervals from the microwave oven, swirl it gently,'+
	'heat again by placing it back in the oven until the agar melts completely.',
	instruction7:'Step:7 Remove the wrap. Pour about half of the hot solution in the mould[by clicking on the beaker].',
	instruction8:'Step:8 Place an appropriate thermometer in the in the beaker containing half of the hot solution.'
	+'[by clicking on the thermometer]',
	instruction9:'Step:9 Remove the wrap. Pour about half of the hot solution in the mould [by clicking on the beaker].'+
	'In order to avoid bubble formation and warping of casting tray, one should cool the solution to ~60°C'+ 
	'(until the beaker is just comfortable to touch) and pour it carefully into the gel mould.',
	instruction10:'Step:10 Place an appropriate thermometer in the in the beaker containing half of the hot solution.',
	instruction11:'Step:11 Place the beaker containing gel in a water bath at 70°C for 1 h.[by clicking on the beaker].',
	instruction12:'Step:12 Increase the temperature of the water bath to 90°C, and observe the gel melting temperature'+
	'when the gel in the beaker is liquefied forming a clear solution. The melting temperature is marked down as the'+ 
	'midpoint between the last time (temperature) when there was no flow and first time when there is flow of the agar sample'+
	'on tumbling the beaker. If one observes the sample carefully, one may recognise the gel melting temperature visually too.',
}

var view ={
	step_no : 0,
	//count = 0;
	// enableElement: makes element disable.
	enableElement: function(Id) {
		document.getElementById(Id).disabled = false;
	},
	//hideElements: used to hide elements when it is called.
	hideElements: function(id){
		document.getElementById(id).style.visibility = 'hidden';
	},
	//showElements: used to make the hidden elements visible when it is called.
	showElements: function(id){
		document.getElementById(id).style.visibility = 'visible';
	},
	//setCursor: Used to set cursor pointers to the elements when it is called.
	setCursor: function(id){
		document.getElementById(id).style.cursor = 'pointer';
	},
	//unsetCursor: Used to unset cursor pointers to the elements when it is called.
	unsetCursor: function(id){
		document.getElementById(id).style.cursor = 'default';
	},
	// setInnerHtml: set innerText to a element.
	setInnerHTML: function (id, innerHTML) {
		document.getElementById(id).innerHTML = innerHTML;
	},
	// addClickEvent: add EventListener to other methods.
	addClickEvent: function(id, method){
		var element = document.getElementById(id);
		element.addEventListener('click', method);
	},
	// removeClickEvent: removes click event to the element on calling this method.
	removeClickEvent: function(id) {
		var element = document.getElementById(id);
		element.removeEventListener('click');
	},
	// replaceElements: replaces the element with an other element on calling this method.
	replaceElements: function(id, image) {
		var element = document.getElementById(id);
		element.src = image;
	},
	// activateEvents: calls addClickEvent method to add EventListener to other methods.
	activateEvents: function() {
		this.addClickEvent('reset_btn', function() { view.resetPage(); });
		this.addClickEvent('restart', function() { view.resetPage(); });
		this.addClickEvent('beaker', function() { view.moveBeaker(); });
		this.addClickEvent('solution', function() { view.movesolBottle(); });
		this.addClickEvent('spatula', function() { view.moveSpatula(); });
		// this.addClickEvent('gel_mold', function() { view.stopExperiment() });
		// this.addClickEvent('watch_glass', function() { view.stopExperiment() });
		// this.addClickEvent('bottle', function() { view.stopExperiment() });
		// this.addClickEvent('thermometer', function() { view.stopExperiment() });
		// this.addClickEvent('micro_wave', function() { view.stopExperiment() });
		// this.addClickEvent('restart', function() { view.stopExperiment() });
	},
	//initialInstructions: set of methods to be called when the page loads.
	initialInstructions: function(){
		this.setInnerHTML('instruction', model.instruction1);
		this.setCursor('beaker');
		this.hideElements('restart');
		this.hideElements('instruction_box');
		this.hideElements('hand_cursor');
		this.hideElements('spatula');
		this.hideElements('cap');
		this.hideElements('open_bottle');
	},
	//fade Elements
	fadeElements: function(id){
		$('#'+id).fadeIn().fadeOut();
	},
	
	// resetPage: Resets page on clicling the reset button.
	resetPage: function(){
		location.reload();
	},
	//animateElements: calls setInnerhtml method and sets the instruction. Calls animate method and moves the beaker.
	animateElements:function(id,top,left){
		$('#'+id).animate({
			top: '+='+top+'%', 
			left: '+='+left+'%'
		}, {
			duration: 1500
		});
	},

	// Moves beaker
	moveBeaker: function(){
		if(this.step_no == 0){
			this.setInnerHTML('instruction', model.instruction2);
			this.animateElements('beaker',60, 8);
			this.unsetCursor('beaker');
			this.setCursor('solution');
			this.step_no++;
		}
	},
	// Moves bottle
	movesolBottle: function(){
		if(this.step_no == 1) {
			if(!$('*').is(':animated')){
				this.setInnerHTML('instruction', model.instruction3);
				this.animateElements('solution',60, 6);
				this.unsetCursor('solution');
				this.step_no++;
				setTimeout(function(){
					view.hideElements('solution');
					view.showElements('cap');
					view.showElements('open_bottle');
					view.animateElements('cap',12, 4);
				}, 2000);
				setTimeout(function(){
					view.showElements('spatula');
					view.unsetCursor('solution');
					view.setCursor('spatula');
					view.animateElements('spatula',10, 0);
					view.showElements('spatula');
					view.showElements('instruction_box');
					view.showElements('hand_cursor');
				setInterval(function(){
					view.fadeElements('hand_cursor');
				}, 50);
				}, 4000);
			}
		}
	},

	//movespatuala
	moveSpatula: function(){
		if(this.step_no == 2){
			this.replaceElements('spatula', 'images/spatula_with_sol.png');
		}
	},
	// init: calls methods to set instructions and activate events.
	init:function(){
		this.activateEvents();
		this.initialInstructions();
	}
}

// onload function: call init method on window onload.
window.onload=function() {
	view.init();
}