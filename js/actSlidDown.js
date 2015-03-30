// act 4
// answer a curtain call

function slideDown(id, speed, callback) {//{{{
	var object  = document.getElementById(id);
	var timeout = speed*0.001;
	var callback= callback || function() {};
	var loop    = '';
	object.style.display = 'block';
	object.style.height = '0%';
	function slideDownInner() {
		var curHeight = parseFloat(object.style.height) || 0;
		if( curHeight >= 100 ) {
			clearTimeout(loop);
			callback();
			return false;
		}
		object.style.height = (curHeight + 0.1) + '%';
		loop = setTimeout(slideDownInner, timeout);
	}
	slideDownInner();
}//}}}

// The End !!!
