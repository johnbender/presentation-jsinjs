$( "#show-it" ).click(function() {
	$( "#jackie" ).slideDown( 2000 );
});

$( "#show-it" ).click(function() {
	$( "#jackie" ).slideDown( 4000, function(){
		$( this ).trigger( "jackieishere" );
	});
});

test( "image slides down when click", function() {
	$( "#jackie" ).bind( "jackieishere", function(){
		ok( $(this).outerHeight() > 300 );
		start();
  });

	$( "#show-it" ).click();

	stop();
});
