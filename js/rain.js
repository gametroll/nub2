(function( $ ) {
 	// Rain plugin by Matt Davis gametroll@gmail.com 2013
    // Plugin definition.
    $.fn.removeRain = function(){
    	$('ul.raindrops').each(function(){
    		$(this).removeClass('raindrops').addClass('removedrops');
    	});
    	$('ul.removedrops').fadeOut(5000,function(){
    		$(this).html('');
    		$(this).remove();
    	});
    };
    $.fn.rain = function( options ) {
        var defaults = {
	        smallestNumber: 10,
	        largestNumber: 50,
	        smallestSize: 3,
	        largestSize: 200,
	        smallestDuration: 1,
	        largestDuration: 15
	    };
	    var settings = $.extend( {}, defaults, options );
	    return this.each(function() {
	        // Plugin code 
	 		$(this).append('<ul class="raindrops" />');
	 		raindrops(settings.smallestNumber,settings.largestNumber,settings.smallestDuration,settings.largestDuration,settings.smallestSize,settings.largestSize);
	 		movedrops();
	 		var randomReset = randomRange(300,1000);
			window.setInterval(function(){
			  movedrops();
			}, randomReset);
	    });
	    // Private functions (where the sausage is made.)
	    function randomRange(min, max) {
		  return ~~(Math.random() * (max - min + 1)) + min
		}
		function raindrops(smallestNumber,largestNumber,smallestDuration,largestDuration,smallestSize,largestSize){
			var numdrops = randomRange(smallestNumber,largestNumber);
			$('ul.raindrops').html('');
			for (var i = 0; i < numdrops; i++){
				var animdur = randomRange(smallestDuration,largestDuration);
				var ransize = randomRange(smallestSize,largestSize);
				$('ul.raindrops').append('<li class="dropring drip-animation" style="animation-duration:'+animdur+'s; -webkit-animation-duration:'+animdur+'s; width:'+ransize+'px; height:'+ransize+'px" />');
			}
		}
		function movedrops(){
			$('ul.raindrops > li').each(function(){
				var curop = $(this).css('opacity');
				if ( curop <= 0.1){
					var maxh = $(window).height();
					var maxw = $(window).width();
					var ranv = randomRange(1,maxh);
					var ranh = randomRange(1,maxw);
					var ranofflr = randomRange(-2,2);
					var ranofftb = randomRange(-2,2);
					var ranblur = randomRange(4,10);
					var ranopac = randomRange(1,7);
					$(this).css({
						'box-shadow':' '+ranofflr+'px '+ranofftb+'px '+ranblur+'px 2px rgba(255,255,255,0.'+ranopac+')',
						'right':ranh,
						'top':ranv
					});
				}
			});
			// remove this section later
			var numelements = $( "*" ).length;
			var numimages = $('img').length;
			$('.numelements').html(numelements+' Active Elements<br>'+numimages+' Active Images');
		}
    };
})( jQuery );
