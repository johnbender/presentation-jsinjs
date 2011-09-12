$( "#show-it" ).click(function(e) {
	$( "#jackie" ).addClass( "opacity-transition" );
});

// bad
test( "image becomes opaque on click", function() {
	setTimeout(function(){
		same( $("#jackie").css("opacity"), "1" );
		start();
	}, 2100);

	$( "#show-it" ).click();

	stop();
});

// good
test( "image becomes opaque on click", function() {
	$( "#jackie" ).bind( "webkitTransitionEnd", function(){
		same( $("#jackie").css("opacity"), "1" );
		start();
	});

	$( "#show-it" ).click();

	stop();
});

// client side integration
$.onlyForPathname( "/foos", function() {
	module( "truthsaying" );

	test( "truthyness", function() {
		assert( true );
	});
});