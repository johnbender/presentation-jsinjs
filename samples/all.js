$( "#show-it" ).click(function(e) {
  $( "#jackie" ).addClass( "opaque-animation" );
});

test( "image slides down on click", function() {
	setTimeout(function(){
		same( $("#jackie").css("opacity"), "1" );
		start();
  }, 2100);

	$( "#show-it" ).click();

	stop();
});

test( "image becomes opaque on click", function() {
	$( "#jackie" ).bind( "webkitTransitionEnd", function(){
		same( $("#jackie").css("opacity"), "1" );
		start();
  });

	$( "#show-it" ).click();

	stop();
});

$.onlyFor( "/foos", function() {
	module( "truthsaying" );
	
	test( "truthyness", function() {
		assert( true );
  });
});