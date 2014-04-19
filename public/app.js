
var projeto = projeto || {

socket : null,

joystick : null,

joystick2 : null,

container : null,

result : null,

init: function() {
	console.log("touchscreen is", VirtualJoystick.touchScreenAvailable() ? "available" : "not available");
	projeto.socket = io.connect('http://10.0.0.105:3000');
	projeto.createJoyStick1();
	projeto.createJoyStick2();
	projeto.run();
	projeto.socket.on('news', function (data) {
		console.log(data);
		projeto.socket.emit('my other event', { my: 'data' });
	});
},

createJoyStick1: function() {

	projeto.joystick = new VirtualJoystick({
		container	: document.getElementById('container'),
		strokeStyle	: 'cyan',
		limitStickTravel: true,
		stickRadius	: 120		
	});
	projeto.joystick.addEventListener('touchStartValidation', function(event){
		var touch = event.changedTouches[0];
		if( touch.pageX < window.innerWidth/2 )	return false;
		return true
	});
	projeto.joystick.addEventListener('touchStart', function(){
		console.log('down')
	});
	projeto.joystick.addEventListener('touchEnd', function(){
		console.log('up')
	});

},

createJoyStick2: function() {
	// one on the right of the screen
	projeto.joystick2	= new VirtualJoystick({
		container	: document.getElementById('container'),
		strokeStyle	: 'orange',
		limitStickTravel: true,
		stickRadius	: 120	
	});
	projeto.joystick2.addEventListener('touchStartValidation', function(event){
		var touch	= event.changedTouches[0];
		if( touch.pageX >= window.innerWidth/2 )	return false;
		return true
	});
},

run: function() {

	setInterval(function(){
		var outputEl	= document.getElementById('result');
		outputEl.innerHTML	= '<b>Result:</b> '
			+ ' dx:'+projeto.joystick.deltaX()
			+ ' dy:'+projeto.joystick.deltaY()
			+ (projeto.joystick.right()	? ' right'	: '')
			+ (projeto.joystick.up()	? ' up'		: '')
			+ (projeto.joystick.left()	? ' left'	: '')
			+ (projeto.joystick.down()	? ' down' 	: '')
			+ ' dx:'+projeto.joystick2.deltaX()
			+ ' dy:'+projeto.joystick.deltaY()
			+ (projeto.joystick2.right()	? ' right'	: '')
			+ (projeto.joystick2.up()	? ' up'		: '')
			+ (projeto.joystick2.left()	? ' left'	: '')
			+ (projeto.joystick2.down()	? ' down' 	: '');

		projeto.socket.emit('direction',
			{ "joystick" : { 'deltaX': projeto.joystick.deltaX(), 'deltaY': projeto.joystick.deltaY(), 'right': projeto.joystick.right(), 'up': projeto.joystick.up(), 'left': projeto.joystick.left(), 'down': projeto.joystick.down()},
			   "joystick2" : { 'deltaX': projeto.joystick2.deltaX(), 'deltaY': projeto.joystick2.deltaY(), 'right': projeto.joystick2.right(), 'up': projeto.joystick2.up(), 'left': projeto.joystick2.left(), 'down': projeto.joystick2.down()}
			});		
	}, 1/30 * 1000);

}


};

window.onload = projeto.init;


