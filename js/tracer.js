(function( $ ) {
    // Rain plugin by Matt Davis gametroll@gmail.com 2013
    // Plugin definition.
    $.fn.removeTracer = function(){
    	$('ul.tracers').each(function(){
    		$(this).removeClass('tracers').addClass('removetracers');
    	});
    	$('ul.removetracers').fadeOut(5000,function(){
    		$(this).html('');
    		$(this).remove();
    	});
    };
    $.fn.tracer = function( options ) {
    	var defaults = {
	        numTracers: 4,
	        fadeSpeed: 5000,
	        slewSpeed: 10000
	    };
	    var settings = $.extend( {}, defaults, options );
	    return this.each(function() {
	        // Plugin code 
	        var parentEl = $(this);
	 		parentEl.append('<ul class="tracers" />');
	 		makeTracers(settings.numTracers);
	 		slewStar(settings.slewSpeed);
	 		window.setInterval(function(){	
				slewStar(settings.slewSpeed);
			}, 4000);
			window.setInterval(function(){
				starStats(settings.fadeSpeed,parentEl);
			}, 140);
			window.setInterval(function(){
				fadeStar(parentEl);
			}, 300);
	    });
    	function randomRange(min, max) {
		  return ~~(Math.random() * (max - min + 1)) + min
		}
		function makeTracers(numTracers){
			for (var i = 0; i < numTracers; i++){
				if (i % 2){
					$('ul.tracers').append('<li class="star animate-orbit" />');
				}else{
					$('ul.tracers').append('<li class="star animate-orbit-opp" />');
				}
			}
		}
		function slewStar(slewSpeed){
			$('.star').each(function(){
				var ranright = randomRange(-1800,1800);
				var rantop = randomRange(-100,1000);
				var rantargettop = randomRange(-10,120);
				var rantargetright = randomRange(-10,120);
				$('.starTarget').html(rantargettop+':target-v | '+rantargetright+':target-h');
				$(this).animate({
					'right':rantargetright+'%',
					'top':rantargettop+'%'
				},slewSpeed);
			});
		}
		function starStats(fadeSpeed,parentEl){
			$('.star').each(function(){
				var startop = $(this).offset().top.toFixed(2);
				var starleft = $(this).offset().left.toFixed(2);
				$('.starStats').html(starleft+':x '+startop+' :y');
				parentEl.append('<div class="starpop" style="left:'+starleft+';top:'+startop+';" />');
			});
			
			$('.fadestar').fadeOut(fadeSpeed,function(){
				$(this).remove();
			});
		}
		function fadeStar(parentEl){
			parentEl.find('div.starpop').addClass('fadestar');
		}
    };
})( jQuery );
