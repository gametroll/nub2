function randomRange(min, max) {
  return ~~(Math.random() * (max - min + 1)) + min
}

$(document).ready(function() {
	$('body').on('click touch','.inbox',function(){
		if ( $(this).closest('.box').hasClass('rotate90') ){
			$('.message').fadeOut(500,function(){
				$('.box').removeClass('rotate90');
			});
		} else {
			$(this).closest('.box').addClass('rotate90');
			$('.message').delay(500).fadeIn(500);
		}
		
	}).on('click touch','.onswitch',function(){
		$(this).removeClass('onswitch');
		$(this).find('.switch').removeClass('flip-off').addClass('flip-on');
	}).on('click touch','#menu > ul > li:not(.onswitch)',function(){
		$(this).addClass('onswitch');
		$(this).find('.switch').removeClass('flip-on').addClass('flip-off');
	}).on('click touch','#rainswitch',function(){
		if ( $(this).hasClass('rainoff') ){
			$( "#content" ).rain({
				smallestNumber: 50,
				largestNumber: 80
			});
			$(this).removeClass('rainoff');
		} else {
			$( "#content" ).removeRain();
			$(this).addClass('rainoff');
		}
	}).on('click touch','#tracerswitch',function(){
		if ( $(this).hasClass('traceroff') ){
			$( "#content" ).tracer({
				numTracers: 2,
			    fadeSpeed: 5000,
			    slewSpeed: 10000
			});
			$(this).removeClass('traceroff');
		} else {
			$( "#content" ).removeTracer();
			$(this).addClass('traceroff');
		}
	}).on('click touch','#orbitswitch',function(){
		if ( $(this).hasClass('orbitoff') ){
			$('#orbitMe').orbitals({
				setPlanets:'9'
			});
			$(this).removeClass('orbitoff');
		} else {
			$('#orbitMe').removeOrbitals();
			$(this).addClass('orbitoff');
		}
	}).on('click touch','#tracercode',function(){
		$.ajax({
            url : "js/tracer.js",
            dataType: "text",
            success : function (data) {
            	data = data.replace(/</g, "&lt;");
            	data = '<pre>'+data+'</pre>';
                $(".codeText").html(data);
            }
        });
		$('#codeBlock').show();
	}).on('click touch','.close',function(){
		$('.codeText').html('');
		$('#codeBlock').hide();
	});
	$('#menuSlide').mouseenter(function() {
		console.log('in');
	    $('#menu').stop().animate({"right":"0px"}, 300);
	  })
	  .mouseleave(function() {
	  	console.log('out');
	   $('#menu').stop().animate({"right":"-120%"}, 300);
	  });
	$('body').tracer({
		numTracers: 2,
	    fadeSpeed: 5000,
	    slewSpeed: 10000
	});
	$( "#content" ).rain({
		smallestNumber: 50,
		largestNumber: 80
	});
	$('#orbitMe').orbitals({
		setPlanets:'9'
	});


	// code for cube
	var randomReset = randomRange(1000,5000);
			window.setInterval(function(){
			  rotateCube();
			}, randomReset);
	function rotateCube(){
		
		// var cube = $('#cube');

		// cube.removeClass('show-front show-back show-right show-left show-top show-bottom');
		// var randomSide = randomRange(1,6);
		// var panelClassName = '';
		// switch (randomSide)
		// {
		// case 1:
		//   panelClassName = 'show-front';
		//   break;
		// case 2:
		//   panelClassName = 'show-back';
		//   break;
		// case 3:
		//   panelClassName = 'show-right';
		//   break;
		// case 4:
		//   panelClassName = 'show-left';
		//   break;
		// case 5:
		//   panelClassName = 'show-top';
		//   break;
		// case 6:
		//   panelClassName = 'show-bottom';
		//   break;
		// }
  //       cube.addClass( panelClassName );
	}
	
});
