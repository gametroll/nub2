(function( $ ) {
 	// Rain plugin by Matt Davis gametroll@gmail.com 2013
    // Plugin definition.
    $.fn.removeOrbitals = function(){
    	$('div.orbitals').addClass('removeOrbitals');
    	$('div.removeOrbitals').fadeOut(5000,function(){
    		$(this).html('');
    		$(this).remove();
    	});
    };
    $.fn.orbitals = function( options ) {
    	console.log('running orbitals');
        var defaults = {
	        smallestNumber: 2,
	        largestNumber: 8,
	        smallestSize: 10,
	        largestSize: 150,
	        smallestDuration: 4,
	        largestDuration: 15,
	        setPlanets: 0
	    };
	    var settings = $.extend( {}, defaults, options );
	    return this.each(function() {
	        // Plugin code 
	 		$(this).append('<div class="orbitals" />');
	 		var thisorbital = $(this).find('div.orbitals');
	 		orbits(settings.smallestNumber,settings.largestNumber,settings.smallestDuration,settings.largestDuration,settings.smallestSize,settings.largestSize,settings.setPlanets,thisorbital);
	 		moveorbs();
	 	// 	var randomReset = randomRange(300,1000);
			// window.setInterval(function(){
			//   moveorbs();
			// }, randomReset);
	    });
	    // Private functions (where the sausage is made.)
	    function randomRange(min, max) {
		  return ~~(Math.random() * (max - min + 1)) + min
		}
		function orbits(smallestNumber,largestNumber,smallestDuration,largestDuration,smallestSize,largestSize,setPlanets,thisorbital){
			if (typeof(setPlanets) !== 'undefined' && setPlanets > 0){
				var numplanets = setPlanets;
			} else {
				var numplanets = randomRange(smallestNumber,largestNumber);
			}
			var nummoons = randomRange(smallestNumber,largestNumber);
			thisorbital.html('');
			// create sun
			var sunspin = randomRange(0,1);
				if ( sunspin == 0 ){
						var animnamesun = 'orbit-counter-animation';
					} else {
						var animnamesun = 'orbit-animation';
					}
			thisorbital.append('<div class="orbit sun halfSecondTransEase white-outer-glow animate-white-pulse-outer-2 '+animnamesun+'" style="margin-left:-25px; margin-top:-25px; left:50%; top:50%; width:50px; height:50px; -webkit-animation-duration:60s; animation-duration:60s;"></div>');
			for (var i = 0; i < numplanets; i++){
				// create axis of rotation
				var direction = randomRange(0,1);
				if ( direction == 0 ){
						var animname = 'orbit-counter-animation';
					} else {
						var animname = 'orbit-animation';
					}
				var multiplyer = parseFloat(i+1+'.'+i+5);
				var animdur = randomRange(smallestDuration,largestDuration)*multiplyer;
				var randomRotate = randomRange(0,359);
				thisorbital.find('.sun').append('<div class="axis orbit '+animname+'" style="width:0px; height:0px; left:50%; animation-duration:'+animdur+'s; -webkit-animation-duration:'+animdur+'s; top:50%; position:absolute;"></div>');
			}
			for (var i = 0; i < numplanets; i++){
				//var multiplyer = parseFloat('1.'+(i*10));

				var animdur = randomRange(smallestDuration,largestDuration);
				
				var marginoffset = ransize/2;
				var ranoffsetleft = randomRange(10,100);
				var ranoffsettop = randomRange(10,100);
				var direction = randomRange(0,1);
				var orbitchild = randomRange(0,10);
				if ( direction == 0 ){
					var animname = 'orbit-counter-animation';
				} else {
					var animname = 'orbit-animation';
				}
				var newmaxsize = parseInt(thisorbital.find('.sun').width()*0.6);
				var ransize = randomRange(smallestSize,newmaxsize);
				ranoffsetleft = (ranoffsetleft*1.4)*i+1;
				ranoffsettop = (ranoffsettop*1.4)*i+1;
				if ( thisorbital.find('.planet').length == 0 ){
					var minoffset = parseInt($('.sun').width()/2)+ransize+10;
					if (ranoffsettop < minoffset){
						ranoffsettop = minoffset;
						ranoffsetleft = minoffset;
					}
				} else {
					var x = i;
					var lastPlanet = thisorbital.find('.sun > .axis:nth-child('+x+')').find('.planet');
					var lastoffset = parseInt(lastPlanet.css('top')) + parseInt(lastPlanet.width());
					var minoffset = lastoffset*1.4;
					if (ranoffsettop < minoffset){
						ranoffsettop = minoffset;
						ranoffsetleft = minoffset;
					}
				}
				
				var x = i+1;
				thisorbital.find('.sun > .axis:nth-child('+x+')').append('<div class="orbit planet '+animname+'" style="left:'+ranoffsetleft+'px; top:'+ranoffsettop+'px; animation-duration:'+animdur+'s; -webkit-animation-duration:'+animdur+'s; width:'+ransize+'px; height:'+ransize+'px"></div>');
				
			}
			var planetID = 1;
			for (var i = 0; i < nummoons; i++){
				var animdur = randomRange(smallestDuration,largestDuration);
				var direction = randomRange(0,1);
				var orbitchild = randomRange(0,10);
				if ( direction == 0 ){
					var animname = 'orbit-counter-animation';
				} else {
					var animname = 'orbit-animation';
				}

				var ranPlanet = thisorbital.find('.sun .planet:nth-child('+planetID+')');
				planetID++;
				// make moon smaller than planet
				var parentPlanetSize = parseInt(ranPlanet.width());
				var newmaxsize = parentPlanetSize*0.6;
				var maxoffset = newmaxsize*2;
				var ranoffsetleft = randomRange(parentPlanetSize/0.7,maxoffset);
				var ranoffsettop = randomRange(parentPlanetSize/0.7,maxoffset);
				var ransize = randomRange(smallestSize,newmaxsize);
				var minoffset = parentPlanetSize/2+ransize+10;
				if (ranoffsettop < minoffset){
					ranoffsettop = minoffset;
					ranoffsetleft = minoffset;
				}
				ranPlanet.append('<div class="orbit moon '+animname+'" style="left:'+ranoffsetleft+'px; top:'+ranoffsettop+'px; animation-duration:'+animdur+'s; -webkit-animation-duration:'+animdur+'s; width:'+ransize+'px; height:'+ransize+'px" />');
			
			}
		}
		function moveorbs(){
			thisorbital.find('.planet,.moon').each(function(){
				var lefswitch = randomRange(0,1);
				var curleft = $(this).css('left');
				var curtop = $(this).css('top');
				if (lefswitch == 0){
					$(this).css('left',-curleft);
				}
				var topswitch = randomRange(0,1);
				if(topswitch == 0){
					$(this).css('top',-curtop);
				}
				var numplants = $('.planet').length;
				var nummoon = $('.moon').length;
				$('.planetStats').html('Planets: '+numplants+' Moons: '+nummoon);


			});
			// $('div.orbitals div:not(.sun .axis)').each(function(){
			// 		var maxh = $(window).height();
			// 		var maxw = $(window).width();
			// 		var ranv = randomRange(1,maxh/2);
			// 		var ranh = randomRange(1,maxw/2);
			// 		var ranofflr = randomRange(-2,2);
			// 		var ranofftb = randomRange(-2,2);
			// 		var ranblur = randomRange(4,10);
			// 		var ranopac = randomRange(1,7);
			// 		$(this).css({
			// 			'right':ranh,
			// 			'top':ranv
			// 		});
			// });
		}
    };
})( jQuery );
