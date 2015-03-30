// global var

var map;
var marker;
var marProp;
var point;
var infowindow;

var initialZoom = 4;
var act1Zoom = 8;
var act1ZoomTo = 10;
var actTimeOut = 1000;
var loopTimeOut = 2000;
var markerTimeOut = 100;

var pInitial =	{lat :35.691855,			lng : 18.167149 } ;
var pStart =	{lat :47.496757,			lng : 19.036919 } ;
var pEnd =  	{lat :44.432187,			lng : 26.096011 } ;
var pRC =	    {lat :46.015965,			lng : 22.233067 } ;
var pROMA = 	{lat :45.831060,			lng : 24.756745 } ;
var pChina =	{lat :34.240485,			lng : 105.67419 } ;

var imglist = [//{{{
	'./images/go/1.png',
	'./images/go/2.png',
	'./images/go/3.png',
	'./images/go/4.png',
	'./images/go/5.png',
	'./images/go/6.png',
	'./images/roma/1.jpg',
	'./images/roma/2.jpg',
	'./images/roma/3.jpg',
	'./images/roma/4.jpg',
	'./images/roma/5.jpg',
	'./images/roma/6.jpg',
	'./images/roma/7.jpg',
	'./images/roma/8.jpg',
	'./images/roma/9.jpg',
	'./images/she/1.jpg',
	'./images/she/2.jpg',
	'./images/she/3.jpg',
	'./images/she/4.jpg',
	'./images/she/5.jpg',
	'./images/she/6.jpg',
	'./images/she/7.jpg',
	'./images/she/8.jpg',

	'./images/cover.png',
	'./images/ticket.jpg'
];//}}}

var markerText = [//{{{
{
	lng : 80.050373,
	lat : 39.924749
},
{
	lng : 80.064171,
	lat : 39.832612
},
{
	lng : 80.064171,
	lat : 39.747453
},
{
	lng : 80.054973,
	lat : 39.647966
},
{
	lng : 80.031976,
	lat : 39.566136
},
{
	lng : 80.022777,
	lat : 39.469951
},
{
	lng : 79.990582,
	lat : 39.366491
},
{
	lng : 79.93539,
	lat : 39.273603
},
{
	lng : 79.875599,
	lat : 39.216379
},
{
	lng : 80.165356,
	lat : 39.697727
},
{
	lng : 80.289538,
	lat : 39.70128
},
{
	lng : 80.427518,
	lat : 39.708386
},
{
	lng : 80.537902,
	lat : 39.708386
},
{
	lng : 80.666683,
	lat : 39.711938
},
{
	lng : 80.795464,
	lat : 39.715491
},
{
	lng : 80.123962,
	lat : 39.402184
},
{
	lng : 80.271141,
	lat : 39.420024
},
{
	lng : 80.418319,
	lat : 39.423591
},
{
	lng : 80.570097,
	lat : 39.423591
},
{
	lng : 80.726474,
	lat : 39.427159
},
{
	lng : 80.873652,
	lat : 39.434292
},
{
	lng : 81.039228,
	lat : 39.434292
},
{
	lng : 80.501107,
	lat : 40.105115
},
{
	lng : 80.501107,
	lat : 40.01676
},
{
	lng : 80.501107,
	lat : 39.921207
},
{
	lng : 80.501107,
	lat : 39.829066
},
{
	lng : 80.496508,
	lat : 39.623071
},
{
	lng : 80.496508,
	lat : 39.544773
},
{
	lng : 80.491908,
	lat : 39.370061
},
{
	lng : 80.491908,
	lat : 39.255725
},
{
	lng : 80.491908,
	lat : 39.166269
},
{
	lng : 80.491908,
	lat : 39.087453
},
{
	lng : 79.820407,
	lat : 39.015724
},
{
	lng : 79.949188,
	lat : 39.008548
},
{
	lng : 80.100966,
	lat : 39.030076
},
{
	lng : 80.252744,
	lat : 39.030076
},
{
	lng : 80.41372,
	lat : 39.030076
},
{
	lng : 80.611491,
	lat : 39.051598
},
{
	lng : 80.744871,
	lat : 39.05877
},
{
	lng : 80.924245,
	lat : 39.05877
},
{
	lng : 81.089821,
	lat : 39.073113
},
{
	lng : 81.517558,
	lat : 39.775851
},
{
	lng : 81.517558,
	lat : 39.708386
},
{
	lng : 81.512958,
	lat : 39.605284
},
{
	lng : 81.512958,
	lat : 39.480645
},
{
	lng : 81.494561,
	lat : 39.38434
},
{
	lng : 81.494561,
	lat : 39.262877
},
{
	lng : 81.632541,
	lat : 39.81488
},
{
	lng : 81.738325,
	lat : 39.811332
},
{
	lng : 81.867106,
	lat : 39.811332
},
{
	lng : 82.018884,
	lat : 39.804238
},
{
	lng : 82.018884,
	lat : 39.704833
},
{
	lng : 82.023483,
	lat : 39.598168
},
{
	lng : 82.023483,
	lat : 39.502027
},
{
	lng : 82.028083,
	lat : 39.395047
},
{
	lng : 82.023483,
	lat : 39.320062
},
{
	lng : 82.018884,
	lat : 39.24142
},
{
	lng : 81.853308,
	lat : 39.219957
},
{
	lng : 81.696931,
	lat : 39.230689
},
{
	lng : 81.56815,
	lat : 39.234266
},
{
	lng : 81.63714,
	lat : 39.530527
},
{
	lng : 81.765921,
	lat : 39.530527
},
{
	lng : 81.903901,
	lat : 39.530527
},
{
	lng : 82.621395,
	lat : 40.020297
},
{
	lng : 82.621395,
	lat : 39.921207
},
{
	lng : 82.621395,
	lat : 39.811332
},
{
	lng : 82.621395,
	lat : 39.708386
},
{
	lng : 82.616796,
	lat : 39.605284
},
{
	lng : 82.621395,
	lat : 39.459255
},
{
	lng : 82.621395,
	lat : 39.35935
},
{
	lng : 82.607598,
	lat : 39.24142
},
{
	lng : 82.607598,
	lat : 39.159108
},
{
	lng : 82.483416,
	lat : 39.647966
},
{
	lng : 82.446621,
	lat : 39.555455
},
{
	lng : 82.391429,
	lat : 39.469951
},
{
	lng : 82.736379,
	lat : 39.687067
},
{
	lng : 82.79617,
	lat : 39.59461
},
{
	lng : 82.846762,
	lat : 39.519841
},
{
	lng : 82.984742,
	lat : 39.829066
},
{
	lng : 83.122722,
	lat : 39.832612
},
{
	lng : 83.260702,
	lat : 39.836158
},
{
	lng : 83.398681,
	lat : 39.846795
},
{
	lng : 83.486068,
	lat : 39.860975
},
{
	lng : 83.509065,
	lat : 39.775851
},
{
	lng : 83.495267,
	lat : 39.694174
},
{
	lng : 83.47227,
	lat : 39.626628
},
{
	lng : 82.966345,
	lat : 39.544773
},
{
	lng : 83.150318,
	lat : 39.551895
},
{
	lng : 83.283698,
	lat : 39.551895
},
{
	lng : 83.426277,
	lat : 39.559016
},
{
	lng : 83.578055,
	lat : 39.559016
},
{
	lng : 83.711435,
	lat : 39.569696
},
{
	lng : 83.2699,
	lat : 40.140424
},
{
	lng : 83.251503,
	lat : 40.066253
},
{
	lng : 83.237705,
	lat : 39.97077
},
{
	lng : 83.187112,
	lat : 39.754553
},
{
	lng : 83.145718,
	lat : 39.658632
},
{
	lng : 83.095126,
	lat : 39.47708
},
{
	lng : 83.072129,
	lat : 39.337923
},
{
	lng : 83.021537,
	lat : 39.216379
},
{
	lng : 82.99854,
	lat : 39.159108
},
{
	lng : 83.219308,
	lat : 39.47708
},
{
	lng : 83.315893,
	lat : 39.387909
},
{
	lng : 83.380284,
	lat : 39.312917
},
{
	lng : 83.47687,
	lat : 39.259301
},
{
	lng : 83.596452,
	lat : 39.202065
},
{
	lng : 84.714088,
	lat : 40.249767
},
{
	lng : 84.626701,
	lat : 40.228618
},
{
	lng : 84.49332,
	lat : 40.179244
},
{
	lng : 84.364539,
	lat : 40.151014
},
{
	lng : 84.240358,
	lat : 40.112178
},
{
	lng : 84.148371,
	lat : 40.080387
},
{
	lng : 84.111577,
	lat : 39.992
},
{
	lng : 84.139172,
	lat : 39.914124
},
{
	lng : 84.198964,
	lat : 39.818426
},
{
	lng : 84.014991,
	lat : 39.690621
},
{
	lng : 84.175967,
	lat : 39.708386
},
{
	lng : 84.318546,
	lat : 39.751003
},
{
	lng : 84.479522,
	lat : 39.743902
},
{
	lng : 84.612903,
	lat : 39.772302
},
{
	lng : 84.810674,
	lat : 39.782949
},
{
	lng : 84.976249,
	lat : 39.807785
},
{
	lng : 85.114229,
	lat : 39.829066
},
{
	lng : 84.589906,
	lat : 40.101583
},
{
	lng : 84.589906,
	lat : 40.009687
},
{
	lng : 84.589906,
	lat : 39.892869
},
{
	lng : 84.580708,
	lat : 39.676405
},
{
	lng : 84.571509,
	lat : 39.519841
},
{
	lng : 84.571509,
	lat : 39.362921
},
{
	lng : 84.576108,
	lat : 39.255725
},
{
	lng : 84.576108,
	lat : 39.166269
},
{
	lng : 84.465724,
	lat : 39.64441
},
{
	lng : 84.350741,
	lat : 39.566136
},
{
	lng : 84.240358,
	lat : 39.480645
},
{
	lng : 84.024189,
	lat : 39.35578
},
{
	lng : 84.139172,
	lat : 39.427159
},
{
	lng : 84.695691,
	lat : 39.694174
},
{
	lng : 84.815273,
	lat : 39.605284
},
{
	lng : 84.916458,
	lat : 39.516279
},
{
	lng : 85.036041,
	lat : 39.452124
},
{
	lng : 85.123428,
	lat : 39.402184
},
{
	lng : 85.224613,
	lat : 39.352209
},
{
	lng : 85.376391,
	lat : 39.298623
},
{
	lng : 85.500572,
	lat : 39.373631
},
{
	lng : 85.51437,
	lat : 39.537651
},
{
	lng : 85.348795,
	lat : 39.555455
},
{
	lng : 85.24761,
	lat : 39.480645
},
{
	lng : 81.407174,
	lat : 40.573219
},
{
	lng : 81.250797,
	lat : 40.618798
},
{
	lng : 81.103618,
	lat : 40.639824
},
{
	lng : 80.95644,
	lat : 40.63632
},
{
	lng : 80.901248,
	lat : 40.562697
},
{
	lng : 80.951841,
	lat : 40.47143
},
{
	lng : 81.057625,
	lat : 40.383557
},
{
	lng : 81.204804,
	lat : 40.327257
},
{
	lng : 81.388777,
	lat : 40.306132
},
{
	lng : 81.526756,
	lat : 40.288523
},
{
	lng : 81.696931,
	lat : 40.277955
},
{
	lng : 81.526756,
	lat : 40.65734
},
{
	lng : 81.563551,
	lat : 40.804295
},
{
	lng : 81.696931,
	lat : 40.846222
},
{
	lng : 81.830312,
	lat : 40.83225
},
{
	lng : 81.922298,
	lat : 40.751849
},
{
	lng : 81.926898,
	lat : 40.653837
},
{
	lng : 81.9131,
	lat : 40.552172
},
{
	lng : 81.885504,
	lat : 40.48548
},
{
	lng : 81.848709,
	lat : 40.387074
},
{
	lng : 81.793517,
	lat : 40.313174
}
];//}}}

function initVar() {
	photos = [//{{{
	{
		title: '一起玩...',
			content: '<img src="./images/roma/1.jpg" />',
			point: new google.maps.LatLng(46.860119, 19.684266)
	},
	{
		title: '臭美中...',
		content: '<img src="./images/she/1.jpg" />',
		point: new google.maps.LatLng(46.498320, 19.816102)
	},
	{
		title: '一起玩...',
		content: '<img src="./images/roma/2.jpg" />',
		point: new google.maps.LatLng(45.367511, 24.276551)
	},
	{
		title: '臭美中...',
		content: '<img src="./images/she/2.jpg" />',
		point: new google.maps.LatLng(44.496431, 25.572938)
	},
	{
		title: '一起玩...',
		content: '<img src="./images/roma/3.jpg" />',
		point: new google.maps.LatLng(44.886938, 25.616883)
	},
	{
		title: '臭美中...',
		content: '<img src="./images/she/3.jpg" />',
		point: new google.maps.LatLng(46.088399, 21.6178604)
	},
	{
		title: '一起玩...',
		content: '<img src="./images/roma/4.jpg" />',
		point: new google.maps.LatLng(45.889935, 23.639344)
	},
	{
		title: '臭美中...',
		content: '<img src="./images/she/4.jpg" />',
		point: new google.maps.LatLng(45.874639, 22.606629)
	},
	{
		title: '一起玩...',
		content: '<img src="./images/roma/5.jpg" />',
		point: new google.maps.LatLng(44.886938, 24.935731)
	},
	{
		title: '臭美中...',
		content: '<img src="./images/she/5.jpg" />',
		point: new google.maps.LatLng(45.675409, 24.188660)
	},
	{
		title: '一起玩...',
		content: '<img src="./images/roma/6.jpg" />',
		point: new google.maps.LatLng(45.905227, 22.980164)
	},
	{
		title: '臭美中...',
		content: '<img src="./images/she/6.jpg" />',
		point: new google.maps.LatLng(46.210177, 21.398133)
	},
	{
		title: '一起玩...',
		content: '<img src="./images/roma/7.jpg" />',
		point: new google.maps.LatLng(45.996889, 22.496766)
	},
	{
		title: '臭美中...',
		content: '<img src="./images/she/7.jpg" />',
		point: new google.maps.LatLng(44.512102, 25.748719)
	},
	{
		title: '一起玩...',
		content: '<img src="./images/roma/8.jpg" />',
		point: new google.maps.LatLng(46.498320, 19.925965)
	},
	{
		title: '臭美中...',
		content: '<img src="./images/she/8.jpg" />',
		point: new google.maps.LatLng(45.966352, 22.408875)
	}
	];//}}}

	wanna = [//{{{
	{
		title: '',
			content: '地图标上想去的地方，有一天，带着你去流浪。',
			point: new google.maps.LatLng(pChina.lat, pChina.lng)
	},
	{
		title: '澳大利 亚凯布尔海滩',
		content: '<img src="./images/go/1.png" width="500" height="338" alt="wannaTo" />',
		point: new google.maps.LatLng(-17.928765, 122.209973)
	},
	{
		title: '意大利 托斯卡纳草原',
		content: '<img src="./images/go/2.png" width="500" height="337" alt="wannaTo" />',
		point: new google.maps.LatLng(43.534102, 10.701916)
	},
	{
		title: '意大利 普利亚',
		content: '<img src="./images/go/3.png" width="499" height="399" alt="wannaTo" />',
		point: new google.maps.LatLng(40.794235, 17.095281)
	},
	{
		title: '印度尼西亚 雅加达',
		content: '<img src="./images/go/4.png" width="500" height="400" alt="wannaTo" />',
		point: new google.maps.LatLng(-6.205514, 106.852864)
	},
	{
		title: '尼泊尔 法里达巴德',
		content: '<img src="./images/go/5.png" width="500" height="327" alt="wannaTo" />',
		point: new google.maps.LatLng(28.488569, 77.343793)
	},
	{
		title: '印度尼西亚 卡哈扬河',
		content: '<img src="./images/go/6.png" width="500" height="327" alt="wannaTo" />',
		point: new google.maps.LatLng(-2.201686, 113.922030)
	}
	];//}}}
}
