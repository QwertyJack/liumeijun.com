// initial var

function initialize() {//{{{
	var script = document.createElement("script");
	script.type = "text/javascript";
	script.src = "http://maps.googleapis.com/maps/api/js?key=AIzaSyCxCLzBRYpS8-zBeY3eJBCVYhnuVd6gdNA&sensor=false&callback=initMap";
	//script.src = 'https://maps.googleapis.com/maps/api/js?v=3.exp&signed_in=true&callback=initMap';
	document.body.appendChild(script);
}//}}}

function initMap() {//{{{
	point = new google.maps.LatLng(pInitial.lat,pInitial.lng);
	var mapOptions = {
		zoom: initialZoom,
		center: point,
		draggable: false,
		disableDoubleClickZoom: true
	};
	map = new google.maps.Map(document.getElementById("map-canvas"), mapOptions);
	initVar();
	init();
}//}}}

function init() {//{{{
	document.getElementById('loading').style.display = 'none';
	document.getElementById('theEnd').style.height = '0';
	document.getElementById('theEnd').innerHTML = '';
	map.setCenter(point);
	map.setZoom(initialZoom);
	MUSIC.play();
	point = new google.maps.LatLng(pEnd.lat, pEnd.lng);
	map.panTo(point);
	panZoom_endPoint();
}//}}}

function zoomTo(zoom, time, callback, pointlocal) {//{{{
	var time     = time || actTimeOut;
	var callback = callback || function() {};
	var loop     = '';
	function loopZoom() {
		var curZoom  = map.getZoom();
		if( curZoom == zoom ) {
			clearTimeout(loop);
			callback();
			return false;
		}
		var plus    = curZoom > zoom ? -1 : 1;
		var toZoom  = curZoom + plus;
		map.setZoom(toZoom);
		if( pointlocal ) {
			map.setCenter(pointlocal);
		}
		var center = map.getCenter();
		loop = setTimeout(loopZoom, time);
	}
	loopZoom();
}//}}}

function loopWin(loopList, time, callback) { //{{{
	var i    = 0;
	var len  = loopList.length;
	var callback = callback || function () {};
	var timeout = '';
	function loopWinInner() {
		if( i == len ) {
			clearTimeout(timeout);
			setTimeout(callback, actTimeOut);
			return false;
		}
		var opts = {
			content: loopList[i].title + '<br>' + loopList[i].content,
			maxWidth: 800,
		}
		if (infowindow) {
			infowindow.close();
		}
		infowindow = new google.maps.InfoWindow(opts);
		marker = new google.maps.Marker({
			title: loopList[i].title,
			   position: loopList[i].point,
			   map: map
		});
		infowindow.open(map, marker);
		i++;
		if( loopList[i] ) {
			var time = loopList[i].timeout || loopTimeOut;
		} else {
			var time = loopTimeOut;
		}
		timeout = setTimeout(loopWinInner, time);
	}
	loopWinInner();
}//}}}

