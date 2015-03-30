// onloding action

function preLoadImages(imagesList, callback) {//{{{
	var len     = imagesList.length;
	var i       = 0;
	var images  = {};
	var callback = callback || function() {};
	function loadImage() {
		if( i == len ) {
			callback();
			return false;
		}
		images[i]           = new Image();
		images[i].src       = imagesList[i];
		i++;
		loadImage();
	}
	loadImage();
}//}}}

function loading() {
	soundManager.setup({
		url: './sm/',
		onready: initMP3
	});
	
	function initMP3() {//{{{
	
		MUSIC = soundManager.createSound({
			id: 'mp3',
			  url: './asset/1.mp3',
			  onload: function() {
				  preLoadImages(imglist, function() {
					  setTimeout(function() {
						  var loading = document.getElementById('loading');
						  loading.style.cursor = 'pointer';
						  loading.innerHTML = '点击开始';
						  loading.onclick = function() {
							  screenfull && screenfull.request();
							  initialize();
						  }
					  }, 3000);
				  });
			  }
		});
	
		MUSIC.load();
	}//}}}
	
}
