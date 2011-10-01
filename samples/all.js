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
	$( "#jackie" ).bind( "transitionend", function(){
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

var Notifier = function( alertSelector ) {
	this.elem = $( alertSelector );
};

Notifier.prototype.notify = function() {
	if( this.isError(this.elem.text()) ){
    this.elem.addClass( "error" );
	}

  this.elem.show();
};

Notifier.prototype.isError = function( text ) {
	return text.search(/Error/) >= 0;
};

Notifier.prototype.isErrorOrWarning = function( text ) {
	return text.search(/Error/) >= 0;
};

test( "notify shows the alert element", function() {
  var notifier = new Notifier( "#alert" );

  // isolate the show in the notify method
  Notifier.prototype.isError = function() {
    return false;
  };

  notifier.notify();
  ok( notifier.elem.is(":visible") );
});

test( "empty input results in alert", function() {
	$( "#username" ).val("");

	$( "#submit" ).click();

  ok( $("#alert").is(":visible") );
});
