//加载配置文件--------------------------------------
function loadConfig() {
	var ABTFileUrl = $('#ABT').attr('src');
	URLPrefix = '';
	if (ABTFileUrl.indexOf('/') != -1) {
		URLPrefix = ABTFileUrl.substring(0, ABTFileUrl.lastIndexOf('/') + 1);
	} else {
		URLPrefix = '';
	}
	document.write('<link type="text/css" rel="stylesheet" id="ABTStyle" href="' + URLPrefix + 'skin_zh-CN.css" />');
	document.write('<script type="text/javascript" src="' + URLPrefix + 'soundmanager2.js"></script>');
	document.write('<script type="text/javascript" src="' + URLPrefix + 'getText.js"></script>');
	document.write('<script type="text/javascript" src="' + URLPrefix + 'config_zh-CN.js"></script>');
	document.write('<script type="text/javascript" src="' + URLPrefix + 'pinyin.js"></script>');
	document.write('<script type="text/javascript" src="' + URLPrefix + 'font.js"></script>');
}
loadConfig();

//页面加载完毕运行----------------------------------
if (window.addEventListener) {
	window.addEventListener('load', Initialization, false);
} else {
	window.attachEvent('onload', Initialization);
}

//工具条初始化--------------------------------------
var pageLoaded = false;

function Initialization() {
	pageLoaded = true;
	declareConfig();
	if (ABTConfig.mainSwitch) {
		browserTypeCheck();
		getElements(ABTConfig.container);
		toolbar.skin = ABTConfig.defaultSkin;
	}
}

//浏览器类型判断函数--------------------------------
function browserTypeCheck() {
	browserType = {};
	var ua = navigator.userAgent.toLowerCase();
	var s;
	(s = ua.match(/msie ([\d.]+)/)) ? browserType.ie = s[1]:
	(s = ua.match(/firefox\/([\d.]+)/)) ? browserType.firefox = s[1] :
	(s = ua.match(/chrome\/([\d.]+)/)) ? browserType.chrome = s[1] :
	(s = ua.match(/opera.([\d.]+)/)) ? browserType.opera = s[1] :
	(s = ua.match(/version\/([\d.]+).*safari/)) ? browserType.safari = s[1] : 0;
}

//公用节点获取函数----------------------------------
function getElements(elementId) {
	getE = new Object();
	if ($(elementId)) {
		getE.head = $('head');
		getE.body = $('body');
		getE.container = $(elementId);
		getE.allElements = $(elementId + ' *');
		getE.allImg = $(elementId + ' img');
		getE.allFrame = $(elementId + ' iframe');
		getE.allStyle = $('head link');
		getE.allScript = $('head script');
		getE.error = false;
	} else {
		getE.error = true;
	}
}

//获取文本功能函数----------------------------------
function getWebText(element) {
	var elementText,
		nativeElement = element[0];
	if (nativeElement.nodeName == 'H1' || nativeElement.nodeName == 'H2' || nativeElement.nodeName == 'H3' || nativeElement.nodeName == 'H4' || nativeElement.nodeName == 'H5' || nativeElement.nodeName == 'H6') {
		if (nativeElement.firstChild.nodeName == '#text') {
			if (nativeElement.firstChild.nodeValue.trim() == '') {
				if (nativeElement.childNodes.length > 1) {
					nativeElement = nativeElement.childNodes[1];
				} else {
					nativeElement = nativeElement.firstChild;
				}
			} else {
				nativeElement = nativeElement.firstChild;
			}
		} else {
			nativeElement = nativeElement.firstChild;
		}
	}
	if (nativeElement.nodeName == 'IMG') {
		if (element.attr('alt')) {
			elementText = element.attr('alt');
		} else if (element.attr('title')) {
			elementText = element.attr('title');
		} else {
			elementText = $(document).attr('title');
		}
	} else {
		elementText = nativeElement.innerText || nativeElement.textContent;
	}
	return elementText;
}

// 功能组装
var toolbar = new Object();
toolbar.Function = new Object();

//语音指读功能------------------------------------
toolbar.Function.overSoundMode = {
	showHTML: function () {
		if (ABTConfig.overSoundMode.functionSwitch) {
			var html = '',
				buttonText = this.overSoundModeState ? ABTConfig.language.overSoundMode.on : ABTConfig.language.overSoundMode.off;
			html += '<li id="overSoundModebutton" onmouseover="toolbar.Function.overSoundMode.openMenu(0)" onmouseout="toolbar.Function.overSoundMode.openMenu(1)" onfocus="toolbar.Function.overSoundMode.openMenu(0)">' +
					'<a id="soundLink" href="javascript:toolbar.Function.overSoundMode.mainMethod()" >' + buttonText + '</a>' +
					'<ul id="soundcontrastlist" onmouseover="toolbar.Function.overSoundMode.openMenu(0)" onmouseout="toolbar.Function.overSoundMode.openMenu(1)">' +
					'<li>' +
					'<a href="javascript:toolbar.Function.overSoundMode.adjustSpeakingRate(0)">' + ABTConfig.language.soundVolume.high + '</a>' +
					'</li>' +
					'<li>' +
					'<a href="javascript:toolbar.Function.overSoundMode.adjustSpeakingRate(1)">' + ABTConfig.language.soundVolume.low + '</a>' +
					'</li>' +
					'</ul>' +
					'</li>';
			return html;
		} else {
			return '';
		}
	},
	soundVolume: 50,
	openMenu: function (mode) {
		if (mode == 0) {
			$('#soundcontrastlist').show();
		} else if (mode == 1) {
			$('#soundcontrastlist').hide();
		}
	},
	overSoundModeState: false,
	adjustSpeakingRate: function (volume) {
		if (!ABTConfig.overSoundMode.functionSwitch || getE.error) {
			return;
		}
		if (volume == 0) {
			if (this.soundVolume == 100) {
				alert('已经最大了');
				return;
			}
			this.soundVolume = this.soundVolume + 10;
			alert('当前音量为 ' + this.soundVolume);
		} else if (volume == 1) {
			if (this.soundVolume == 0) {
				alert('已经最小了');
				return;
			}
			this.soundVolume = this.soundVolume - 10;
			alert('当前音量为 ' + this.soundVolume);
		}
	},
	mainMethod: function () {
		if (!ABTConfig.overSoundMode.functionSwitch || getE.error) {
			return;
		}
		if (!this.overSoundModeState) {
			$('#overSoundModebutton') ? $('#soundLink').text(ABTConfig.language.overSoundMode.on) : '';
			this.overSoundModeState = true;
			startSoundMode();
		} else {
			$('#overSoundModebutton') ? $('#soundLink').text(ABTConfig.language.overSoundMode.off) : '';
			this.overSoundModeState = false;
			window.location.href = window.location.href;
			window.location.reload();
		}
	}
};

//纯文本模式功能------------------------------------
toolbar.Function.textMode = {
	showHTML: function () {
		if (ABTConfig.textMode.functionSwitch) {
			var html = '',
				buttonText = this.textModeState ? ABTConfig.language.textMode.on : ABTConfig.language.textMode.off;
			html += '<li id="textmodebutton">' +
					'	<a href="javascript:toolbar.Function.textMode.mainMethod()">' + buttonText + '</a>' +
					'</li>';
			return html;
		} else {
			return '';
		}
	},
	textModeState: false,
	mainMethod: function () {
		if (!ABTConfig.textMode.functionSwitch || getE.error) {
			return;
		}
		if (!this.textModeState) {
			getE.container.hide();
			$('#textmodebutton') ? $('#textmodebutton a').text(ABTConfig.language.textMode.on) : '';
			for (var c = 0; c < getE.allFrame.length; c++) {
				var newFrameContainer = '',
					newFrameChildContainer = '',
					iframeDOM = getE.allFrame.eq(c).contents();
				try {
					newFrameContainer = iframeDOM.find('body').html();
					for (var d = 0; d < iframeDOM.find('iframe').length; d++) {
						var iframeChildDOM = iframeDOM.find('iframe').eq(d).contents();
						try {
							newFrameChildContainer += '<div>' + iframeChildDOM.find('body').html() + '</div>';
						} catch (z) {}
					}
				} catch (z) {}
				newFrameContainer = newFrameContainer.replace(/<iframe(.*)\/iframe>/, '');
				getE.allFrame.eq(c).before('<div>' + newFrameContainer + newFrameChildContainer + '</div>') && getE.allFrame.eq(c).remove();
			}

			for (var d = 0; d < getE.allImg.length; d++) {
				var newImgContainer = '';
				newImgContainer = '<span>' + getWebText(getE.allImg.eq(d)) + '</span>';
				getE.allImg.eq(d).before(newImgContainer);
				getE.allImg.eq(d).remove();
			}

			var textModeStyleUrl = URLPrefix + 'textModule.css';
			var textModule = '<link type="text/css" rel="stylesheet" href="' + textModeStyleUrl + '" />';
			for (var a = 0; a < getE.allStyle.length; a++) {
				if (getE.allStyle.eq(a).attr('id') != 'ABTStyle') {
					getE.allStyle.eq(a).attr('href', '#');
				}
			}
			getE.head.append(textModule);
			for (var b = 0; b < getE.allElements.length; b++) {
				getE.allElements.eq(b).css({
					'cssText': 'null'
				});
			}
			getE.container.fadeIn();
			this.textModeState = true;
		} else {
			$('#textmodebutton') ? $('#textmodebutton a').text(ABTConfig.language.textMode.off) : '';
			this.textModeState = false;
			window.location.href = window.location.href;
			window.location.reload();
		}
	}
};

//页面缩放功能--------------------------------------
toolbar.Function.pageZoom = {
	showHTML: function () {
		if (ABTConfig.pageZoom.functionSwitch) {
			var html = '';
			html += '<li id="pagezoomin">' +
					'	<a href="javascript:toolbar.Function.pageZoom.mainMethod(1)">' + ABTConfig.language.pageZoom.zoomIn + '</a>' +
					'</li>' +
					'<li id="pagezoomout">' +
					'	<a href="javascript:toolbar.Function.pageZoom.mainMethod(0)">' + ABTConfig.language.pageZoom.zoomOut + '</a>' +
					'</li>';
			return html;
		} else {
			return '';
		}
	},
	pageZoomState: 1,
	firstRun: true,
	mainMethod: function (zoomMode) {
		if (!ABTConfig.pageZoom.functionSwitch || getE.error) {
			return;
		}
		if (zoomMode == 1) {
			if (this.pageZoomState == 2) {
				alert('已经最大了');
				return;
			}
			this.pageZoomState = (this.pageZoomState * 10 + ABTConfig.pageZoom.onceZoom * 10) / 10;
			if (this.pageZoomState > ABTConfig.pageZoom.Max) {
				this.pageZoomState = ABTConfig.pageZoom.Max;
			}
		} else if (zoomMode == 0) {
			if (this.pageZoomState == 1) {
				alert('已经最小了');
				return;
			}
			this.pageZoomState = (this.pageZoomState * 10 - ABTConfig.pageZoom.onceZoom * 10) / 10;
			if (this.pageZoomState < ABTConfig.pageZoom.Min) {
				this.pageZoomState = ABTConfig.pageZoom.Min;
			}
		}
		var containerWidth = getE.container.width();
		var containerHeight = getE.container.height();
		getE.container.hide();
		if (browserType.ie && browserType.ie < '9.0') {
			if (getE.body.width() > containerWidth * this.pageZoomState) {
				getE.container.css({
					'position': 'absolute',
					'left': '50%',
					'margin': '0',
					'marign-left': 0 - Math.round(containerWidth * this.pageZoomState / 2)
				});
			} else {
				getE.container.css({
					'position': 'absolute',
					'left': '0',
					'margin': '0'
				});
			}
			var lastClass = getE.body.attr('zoomClass'),
				zoomIndex = this.pageZoomState.toString().replace('.', '_'),
				zoomClass = 'zoom-' + zoomIndex;
			getE.body.removeClass(lastClass).attr('zoomClass', zoomClass).addClass(zoomClass);
		} else {
			var boxTranslate,
				containerY = Math.round(((containerHeight * this.pageZoomState - containerHeight) / this.pageZoomState) / 2);
			if (containerWidth * this.pageZoomState > getE.body.width()) {
				var punk = (containerWidth * this.pageZoomState - getE.body.width()) / 2;
				boxTranslate = Math.round(punk / this.pageZoomState);
			} else {
				boxTranslate = 0;
			}
			if (browserType.chrome || browserType.safari) {
				var oldBodyWidth = getE.body.width();
				if (oldBodyWidth < containerWidth * this.pageZoomState && zoomMode == 1) {
					bodyWidth = Math.round((containerWidth * this.pageZoomState - oldBodyWidth) / this.pageZoomState);
					getE.body.css({
						'width': Math.round(containerWidth * this.pageZoomState)
					});
					boxTranslate -= bodyWidth / 2;
				}
				if (zoomMode == 0) {
					if (screen.width > containerWidth * this.pageZoomState) {
						getE.body.css({
							'width': 'auto'
						});
					} else {
						getE.body.css({
							'width': Math.round(containerWidth * this.pageZoomState)
						});
					}
				}
			}
			getE.container.css({
				'transform': 'scale(' + this.pageZoomState + ') translate(' + boxTranslate + 'px, ' + containerY + 'px)'
			});
		}
		if (this.pageZoomState == 1) {
			getE.container.css({
				'transform': 'none'
			});
			getE.body.css({
				'width': 'auto'
			});
		}
		getE.container.fadeIn();
	}
};

// 字体缩放
toolbar.Function.fontZoom = {
	showHTML: function () {
		if (ABTConfig.fontZoom.functionSwitch) {
			var html = '';
			html += '<li id="fontzoomin">' +
					'	<a href="javascript:toolbar.Function.fontZoom.mainMethod(1)">' + ABTConfig.language.fontZoom.zoomIn + '</a>' +
					'</li>' +
					'<li id="fontzoomout">' +
					'	<a href="javascript:toolbar.Function.fontZoom.mainMethod(0)" onfocus="toolbar.Function.hightContrast.openMenu(1)">' + ABTConfig.language.fontZoom.zoomOut + '</a>' +
					'</li>';
			return html;
		} else {
			return '';
		}
	},
	fontZoomState: 0,
	mainMethod: function (zoomMode) {
		if (!ABTConfig.fontZoom.functionSwitch || getE.error) {
			return;
		}
		if (this.fontZoomState == 0) {
			this.fontZoomState = ABTConfig.fontZoom.Min;
		}
		if (zoomMode == 1) {
			if (this.fontZoomState == 24) {
				alert('已经最大了');
				return;
			}
			this.fontZoomState += ABTConfig.fontZoom.onceZoom;
			if (this.fontZoomState > ABTConfig.fontZoom.Max) {
				this.fontZoomState = ABTConfig.fontZoom.Max;
			}
		} else if (zoomMode == 0) {
			if (this.fontZoomState == 14) {
				alert('已经最小了');
				return;
			}
			this.fontZoomState -= ABTConfig.fontZoom.onceZoom;
			if (this.fontZoomState < ABTConfig.fontZoom.Min) {
				this.fontZoomState = 0;
			}
		}
		for (var a = 0; a < getE.allElements.length; a++) {
			if (this.fontZoomState > ABTConfig.fontZoom.Min) {
				getE.allElements.eq(a).css({
					'font-size': this.fontZoomState + 'px',
					'line-height': (this.fontZoomState + 20) + 'px'
				});
			} else {
				getE.allElements.eq(a).css({
					// 'cssText': 'null'
					'font-size': 'null',
					'line-height': 'null'
				});
			}
		}
		for (var c = 0; c < getE.allFrame.length; c++) {
			var iframeDOM = getE.allFrame.eq(c).contents();
			try {
				if (this.fontZoomState > ABTConfig.fontZoom.Min) {
					for (var d = 0; d < iframeDOM.find('*').length; d++) {
						iframeDOM.find('*').eq(d).css({
							'font-size': this.fontZoomState + 'px',
							'line-height': (this.fontZoomState + 2) + 'px'
						});
					}
				} else {
					for (var d = 0; d < iframeDOM.find('*').length; d++) {
						iframeDOM.find('*').eq(d).css({
							// 'cssText': 'null'
							'font-size': 'null',
							'line-height': 'null'
						});
					}
				}
			} catch (e) {}
			for (var k = 0; k < iframeDOM.find('iframe').length; k++) {
				var iframeChildDom = iframeDOM.find('iframe').eq(k).contents();
				try {
					if (this.fontZoomState > ABTConfig.fontZoom.Min) {
						for (var d = 0; d < iframeChildDom.find('*').length; d++) {
							iframeChildDom.find('*').eq(d).css({
								'font-size': this.fontZoomState + 'px',
								'line-height': (this.fontZoomState + 2) + 'px'
							});
						}
					} else {
						for (var d = 0; d < iframeChildDom.find('*').length; d++) {
							iframeChildDom.find('*').eq(d).css({
								// 'cssText': 'null'
								'font-size': 'null',
								'line-height': 'null'
							});
						}
					}
				} catch (e) {}
			}
		}
	}
};

// 高对比度
toolbar.Function.hightContrast = {
	showHTML: function () {
		if (ABTConfig.hightContrast.functionSwitch) {
			var html = '',
				contrastlist = ABTConfig.hightContrast.delimit;
			html += '<li id="hightcontrast" onmouseover="toolbar.Function.hightContrast.openMenu(0)" onmouseout="toolbar.Function.hightContrast.openMenu(1)" onfocus="toolbar.Function.hightContrast.openMenu(0)">' +
					'<a href="javascript:">' + ABTConfig.language.hightContrast.text + '</a>' +
					'<ul id="hightcontrastlist" onmouseover="toolbar.Function.hightContrast.openMenu(0)" onmouseout="toolbar.Function.hightContrast.openMenu(1)">' +
					'<li>' +
					'<a href="javascript:toolbar.Function.hightContrast.mainMethod(-1)">' + ABTConfig.language.hightContrast.dColor + '</a>' +
					'</li>';
			for (var a = 0; a < contrastlist.length; a++) {
				html += '<li style="background-color:' + contrastlist[a].split('|')[2] + '">' +
						'	<a href="javascript:toolbar.Function.hightContrast.mainMethod(' + a + ')" style="color:' + contrastlist[a].split('|')[1] + '">' + contrastlist[a].split('|')[3] + '</a>' +
						'</li>';
			}
			html += '</ul></li>';
			return html;
		} else {
			return '';
		}
	},
	openMenu: function (mode) {
		if (mode == 0) {
			$('#hightcontrastlist').show();
		} else if (mode == 1) {
			$('#hightcontrastlist').hide();
		}
	},
	contrastControl: function (element, mode, m, q, b) {
		if (mode == 0) {
			getE.body.css({
				'background-color': '',
				'background-image': '',
				'color': ''
			});
			element.css({
				'background-color': '',
				'background-image': '',
				'color': ''
			});
		} else if (mode == 1) {
			getE.body.css({
				'background-color': b,
				'background-image': 'none',
				'color': ABTConfig.hightContrast.linkSwitch ? $(element)[0].tagName == 'A' ? m : q : q
			});
			element.css({
				'background-color': b,
				'background-image': 'none',
				'color': ABTConfig.hightContrast.linkSwitch ? $(element)[0].tagName == 'A' ? m : q : q
			});
		}
	},
	mainMethod: function (colorNum) {
		if (!ABTConfig.hightContrast.functionSwitch || getE.error) {
			return;
		}
		var contrastlist = ABTConfig.hightContrast.delimit;
		if (colorNum != -1) {
			var mcolor = contrastlist[colorNum].split('|')[0];
			var qcolor = contrastlist[colorNum].split('|')[1];
			var bcolor = contrastlist[colorNum].split('|')[2];
			for (var b = 0; b < getE.allElements.length; b++) {
				this.contrastControl(getE.allElements.eq(b), 1, mcolor, qcolor, bcolor);
			}
			for (var c = 0; c < getE.allFrame.length; c++) {
				var iframeDOM = getE.allFrame.eq(c).contents();
				try {
					this.contrastControl(iframeDOM, 1, mcolor, qcolor, bcolor);
					for (var d = 0; d < iframeDOM.find('*').length; d++) {
						this.contrastControl(iframeDOM.find('*').eq(d), 1, mcolor, qcolor, bcolor);
					}
				} catch (e) {}
				for (var k = 0; k < iframeDOM.find('iframe').length; k++) {
					var iframeChildDom = iframeDOM.find('iframe').eq(k).contents();
					try {
						this.contrastControl(iframeChildDom, 1, mcolor, qcolor, bcolor);
						for (var d = 0; d < iframeChildDom.find('*').length; d++) {
							this.contrastControl(iframeChildDom.find('*').eq(d), 1, mcolor, qcolor, bcolor);
						}
					} catch (e) {}
				}
			}
		} else {
			for (var b = 0; b < getE.allElements.length; b++) {
				this.contrastControl(getE.allElements.eq(b), 0);
			}
			for (var c = 0; c < getE.allFrame.length; c++) {
				var iframeDOM = getE.allFrame.eq(c).contents();
				try {
					this.contrastControl(iframeDOM, 0);
					for (var d = 0; d < iframeDOM.find('*').length; d++) {
						this.contrastControl(iframeDOM.find('*').eq(d), 0);
					}
				} catch (e) {}
				for (var k = 0; k < iframeDOM.find('iframe').length; k++) {
					var iframeChildDom = iframeDOM.find('iframe').eq(k).contents();
					try {
						this.contrastControl(iframeChildDom, 0);
						for (var s = 0; s < iframeChildDom.find('*').length; s++) {
							this.contrastControl(iframeChildDom.find('*').eq(s), 0);
						}
					} catch (e) {}
				}
			}
		}
	}
};

// 辅助线
toolbar.Function.guides = {
	showHTML: function () {
		if (ABTConfig.guides.functionSwitch) {
			var html = '',
				guidesValue = this.guidesState ? ABTConfig.language.guides.on : ABTConfig.language.guides.off;
			html += '<li id="guidesbutton">' +
					'	<a href="javascript:toolbar.Function.guides.mainMethod()" onfocus="toolbar.Function.hightContrast.openMenu(1)">' + guidesValue + '</a>' +
					'</li>';
			return html;
		} else {
			return '';
		}
	},
	guidesState: false,
	mainMethod: function () {
		if (!ABTConfig.guides.functionSwitch) {
			return;
		}
		if (!this.guidesState) {
			$('#guidesbutton') ? $('#guidesbutton a').text(ABTConfig.language.guides.on) : '';
			getE.container.append('<div id="guidesbox"><div id="guidesXLine"></div><div id="guidesYLine"></div></div>');
			$('#guidesYLine').css({
				'height': $(document).height(),
				'background-color': '#f00'
			});
			$('#guidesXLine').css({
				'background-color': '#f00'
			});
			document.onmousemove = this.moveGuides;
			window.onscroll = this.moveGuides;
			this.guidesState = true;
		} else {
			$('#guidesbox').remove();
			this.guidesState = false;
			$('#guidesbutton') ? $('#guidesbutton a').text(ABTConfig.language.guides.off) : '';
		}
	},
	moveGuides: function (e) {
		if (!$('#guidesbox')) {
			return;
		}
		e = window.event ? window.event : e;
		var guidesX, guidesY;
		$('#guidesXLine').css({
			'position': 'absolute'
		});
		if (browserType.ie) {
			guidesX = e.clientX + ABTConfig.guides.skew;
			guidesY = e.clientY + (document.documentElement.scrollTop || document.body.scrollTop) + ABTConfig.guides.skew;
		} else {
			$('#guidesXLine').css({
				'position': 'fixed'
			});
			guidesX = e.pageX + ABTConfig.guides.skew;
			guidesY = e.pageY - (document.documentElement.scrollTop || document.body.scrollTop) + ABTConfig.guides.skew;
		}
		$('#guidesYLine').css({
			'left': guidesX
		});
		$('#guidesXLine').css({
			'top': guidesY
		});
	}
};

// 文字提示
toolbar.Function.textTips = {
	showHTML: function () {
		if (ABTConfig.textTips.functionSwitch) {
			var html = '';
			html += '<li id="texttipsbutton">' +
					'	<a href="javascript:toolbar.Function.textTips.mainMethod()">' + ABTConfig.language.textTips.text.off + '</a>' +
					'</li>';
			return html;
		} else {
			return '';
		}
	},
	testTipsState: false,
	pinyinState: false,
	fontState: false,
	allTextNode: new Array(),
	getTextNode: function (element) {
		var childNodes = element.childNodes ? element.childNodes : element[0].childNodes;
		for (var i = 0; i < childNodes.length; i++) {
			var thisChild = childNodes[i];
			switch (thisChild.nodeType) {
				case 1:
					this.getTextNode(thisChild);
					break;
				case 3:
					if (this.trim(thisChild.nodeValue).length == 0) {
						break;
					}
					this.allTextNode.push(thisChild);
					break;
			}
			if (thisChild.nodeName == 'IMG' || thisChild.nodeName == 'INPUT' || thisChild.nodeName == 'OBJECT' || thisChild.nodeName == 'SELECT') {
				this.allTextNode.push(thisChild);
			}
		}
	},
	AddTag: function () {
		if (this.firstRun) {
			return;
		}
		for (var a = 0; a < this.allTextNode.length; a++) {
			if (this.allTextNode[a].parentNode.nodeName == 'STYLE') {
				continue;
			}
			var tagNode = document.createElement('em');
			if (this.allTextNode[a].nodeName == 'IMG' || this.allTextNode[a].nodeName == 'INPUT' || this.allTextNode[a].nodeName == 'SELECT') {
				tagNode.setAttribute('class', 'getmessage');
				var newNode = this.allTextNode[a].cloneNode(true);
				tagNode.appendChild(newNode);
			} else if (this.allTextNode[a].nodeName == 'OBJECT' && this.allTextNode[a].parentNode.nodeName != 'OBJECT') {
				tagNode.setAttribute('class', 'getmessage');
				var newNode = this.allTextNode[a].cloneNode(true);
				tagNode.appendChild(newNode);
			} else {
				var newString = this.allTextNode[a].nodeValue;
				var reg = /[，。！？；、：]/;
				if (reg.exec(newString) == null) {
					tagNode.setAttribute('class', 'getmessage');
					tagNode.innerHTML = newString;
				} else {
					tagNode.setAttribute('class', 'getmainmessage');
					tagNode.innerHTML = this.mySplit(newString, /[，。！？；、：]/);
				}
			}
			if (this.allTextNode[a].parentNode) {
				this.allTextNode[a].parentNode.insertBefore(tagNode, this.allTextNode[a]);
			}
		}
		for (var b = 0; b < this.allTextNode.length; b++) {
			if (this.allTextNode[b].parentNode.nodeName == 'STYLE') {
				continue;
			}
			this.allTextNode[b].parentNode.removeChild(this.allTextNode[b]);
		}
		var allOption = getE.container.find('option');
		for (var c = 0; c < allOption.length; c++) {
			var thisMessage = allOption[c].firstChild.cloneNode(true);
			allOption[c].innerHTML = '';
			allOption[c].appendChild(thisMessage);
		}
		this.firstRun = true;

	},
	trim: function (str) {
		return str.replace(/(^\s*)|(\s*$)/g, '');
	},
	mySplit: function (str, reg) {
		var result,
			x = str,
			zzz = true;
		var stringArray = new Array();
		do {
			result = reg.exec(x);
			if (result != null) {
				var stringIndex = result.index;
				stringArray.push(x.substring(0, stringIndex + 1));
				x = x.substring(stringIndex + 1);
			} else {
				stringArray.push(x);
				zzz = false;
			}
		}
		while (zzz);
		var yy = '<em class="getmessage">';
		for (var a = 0; a < stringArray.length; a++) {
			yy += (a < stringArray.length - 1) ? (stringArray[a] + '</em><em class="getmessage">') : (stringArray[a]);
		}
		yy += '</em>';
		return yy;
	},
	getTipsText: function () {
		if (!document.getElementById('gettextmessagecontent')) {
			return;
		}
		var messagebox = document.getElementById('gettextmessagecontent');
		var textMessage = '';
		if (this.firstChild.nodeName == 'IMG') {
			if (this.parentNode.parentNode.nodeName == 'A' || this.parentNode.nodeName == 'A') {
				textMessage = ABTConfig.language.textTips.textName.tagName1 + '' + getText(this.firstChild);
			} else {
				textMessage = ABTConfig.language.textTips.textName.tagName2 + '' + getText(this.firstChild);
			}
		} else if (this.firstChild.nodeName == 'OBJECT') {
			textMessage = ABTConfig.language.textTips.textName.tagName3 + '' + this.firstChild.getAttribute('title');
		} else if (this.firstChild.nodeName == 'SELECT') {
			textMessage = ABTConfig.language.textTips.textName.tagName4;
		} else if (this.firstChild.nodeName == 'INPUT') {
			var inputType = this.firstChild.getAttribute('type');
			switch (inputType) {
				case 'button':
					textMessage = ABTConfig.language.textTips.textName.tagName5 + '' + this.firstChild.getAttribute('value');
					break;
				case 'image':
					textMessage = ABTConfig.language.textTips.textName.tagName6 + '' + this.firstChild.getAttribute('alt');
					break;
				case 'submit':
					textMessage = ABTConfig.language.textTips.textName.tagName7 + '' + this.firstChild.getAttribute('value');
					break;
				case 'reset':
					textMessage = ABTConfig.language.textTips.textName.tagName8 + '' + this.firstChild.getAttribute('value');
					break;
				case 'file':
					textMessage = ABTConfig.language.textTips.textName.tagName9 + '' + this.firstChild.getAttribute('title');
					break;
				case 'password':
					textMessage = ABTConfig.language.textTips.textName.tagName10 + '' + this.firstChild.getAttribute('title');
					break;
				case 'radio':
					textMessage = ABTConfig.language.textTips.textName.tagName11 + '' + this.firstChild.getAttribute('title');
					break;
				case 'checkbox':
					textMessage = ABTConfig.language.textTips.textName.tagName12 + '' + this.firstChild.getAttribute('title');
					break;
				case 'text':
					textMessage = ABTConfig.language.textTips.textName.tagName13 + '' + this.firstChild.getAttribute('title');
					break;
			}
		} else if (this.parentNode.parentNode.nodeName == 'A' || this.parentNode.nodeName == 'A') {
			var thisContent;
			if (this.parentNode.parentNode.nodeName == 'A') {
				if (this.parentNode.parentNode.getAttribute('title')) {
					thisContent = this.parentNode.parentNode.getAttribute('title');
				} else {
					thisContent = this.innerText || this.textContent;
				}
			} else if (this.parentNode.nodeName == 'A') {
				if (this.parentNode.getAttribute('title')) {
					thisContent = this.parentNode.getAttribute('title');
				} else {
					thisContent = this.innerText || this.textContent;
				}
			}
			textMessage = ABTConfig.language.textTips.textName.tagName14 + '' + thisContent;
		} else if (this.parentNode.nodeName == 'H1' || this.parentNode.nodeName == 'H2' || this.parentNode.nodeName == 'H3' || this.parentNode.nodeName == 'H4' || this.parentNode.nodeName == 'H5' || this.parentNode.nodeName == 'H6') {
			var thisContent = this.innerText || this.textContent;
			textMessage = ABTConfig.language.textTips.textName.tagName15 + '' + thisContent;
		} else {
			var thisContent = this.innerText || this.textContent;
			textMessage = ABTConfig.language.textTips.textName.tagName16 + '' + thisContent;
		}
		var messageboxWidth = messagebox.offsetWidth;
		var fontRatio = messageboxWidth / textMessage.length;
		if (fontRatio < 30) {
			if (fontRatio > 18) {
				messagebox.style.fontSize = parseInt(fontRatio) + 'px';
				messagebox.style.lineHeight = parseInt(fontRatio) + 'px';
			}
			if (fontRatio < 10) {
				messagebox.style.fontSize = parseInt(fontRatio * 2) + 'px';
				messagebox.style.lineHeight = parseInt(fontRatio * 2) + 'px';
			}
		} else {
			messagebox.style.fontSize = '';
		}
		if (toolbar.Function.textTips.pinyinState) {
			textMessage = toolbar.Function.textTips.pinyinText(textMessage);
		}
		if (toolbar.Function.textTips.fontState) {
			textMessage = toolbar.Function.textTips.fontText(textMessage);
		}
		messagebox.innerHTML = textMessage;
		textMessage = '';
		if (toolbar.Function.textTips.textbgState) {
			this.style.backgroundColor = '#F00';
			this.style.color = '#FFF';
		}
	},
	pinyinText: function (text) {
		var messayArray = text.split('');
		var newString = '';
		for (var a = 0; a < messayArray.length; a++) {
			var testVar = '';
			if (pinyin[messayArray[a]]) {
				testVar = pinyin[messayArray[a]];
			} else {
				testVar = ' ';
			}
			if (messayArray[a] == ' ') {
				messayArray[a] = ' ';
			}
			newString += '<span>' + messayArray[a] + '<sup>' + testVar + '</sup></span>';
		}
		return newString;
	},
	fontText: function (text) {
		var newText = '';
        for( var i = 0; i < text.length; i++){
            var word = text.charAt(i);
            var isExtant = zh_s.indexOf(word);
            newText += isExtant < 0 ? word : zh_t.charAt(isExtant);
        }
        return newText;
	},
	getEvent: function () {
		var allSpan = getE.container.find('em');
		for (var c = 0; c < allSpan.length; c++) {
			if (allSpan[c].getAttribute('class') == 'getmessage') {
				allSpan[c].onmouseover = this.getTipsText;
				allSpan[c].onmouseout = this.clearTextbg;
			}
		}
	},
	pinyinControl: function () {
		this.pinyinState = this.pinyinState ? false : true;
		if (this.pinyinState) {
			$('#pinyinbuttonbox a').text(ABTConfig.language.textTips.pinyin.on);
		} else {
			$('#pinyinbuttonbox a').text(ABTConfig.language.textTips.pinyin.off);
		}
	},
	fontControl: function () {
		this.fontState = this.fontState ? false : true;
		if (this.fontState) {
			$('#fontbuttonbox a').text(ABTConfig.language.textTips.font.on);
		} else {
			$('#fontbuttonbox a').text(ABTConfig.language.textTips.font.off);
		}
	},
	firstRun: false,
	textbgState: false,
	textbg: function () {
		this.textbgState = this.textbgState ? false : true;
		if (this.textbgState) {
			$('#textbgbuttonbox a').text(ABTConfig.language.textTips.textbg.on);
		} else {
			$('#textbgbuttonbox a').text(ABTConfig.language.textTips.textbg.off);
		}
	},
	clearTextbg: function () {
		this.style.backgroundColor = '';
		this.style.color = '';
	},
	mainMethod: function () {
		if (!ABTConfig.textTips.functionSwitch || getE.error) {
			return;
		}
		if (!this.textGetState) {
			var newMessageBox = '';
			$('#texttipsbutton') ? $('#texttipsbutton a').text(ABTConfig.language.textTips.text.on) : '';
			newMessageBox += '<div id="gettextmessagebox">' +
							'	<div id="closetextmessagebox">' +
							'		<a href="javascript:" onclick="toolbar.Function.textTips.mainMethod()">X</a>' +
							'	</div>' +
							'	<div id="textbgbuttonbox">' +
							'		<a href="javascript:" onclick="toolbar.Function.textTips.textbg()">' + ABTConfig.language.textTips.textbg.off + '</a>' +
							'	</div>' +
							'	<div id="pinyinbuttonbox">' +
							'		<a href="javascript:" onclick="toolbar.Function.textTips.pinyinControl()">' + ABTConfig.language.textTips.pinyin.off + '</a>' +
							'	</div>' +
							'	<div id="fontbuttonbox">' +
							'		<a href="javascript:" onclick="toolbar.Function.textTips.fontControl()">' + ABTConfig.language.textTips.font.off + '</a>' +
							'	</div>' +
							'	<div id="gettextmessagecontent"></div>' +
							'</div>';
			getE.body.append(newMessageBox);
			getE.body.css({
				'padding-bottom': '140'
			});
			$('#pinyinbuttonbox').find('a').focus();
			$('#fontbuttonbox').find('a').focus();
			this.getTextNode(getE.container);
			this.AddTag();
			this.getEvent();
			this.textGetState = true;
		} else {
			this.pinyinState = false;
			this.fontState = false;
			this.textbgState = false;
			$('#gettextmessagebox').remove();
			getE.body.css({
				'padding-bottom': '0'
			});
			this.textGetState = false;
			$('#texttipsbutton') ? $('#texttipsbutton a').text(ABTConfig.language.textTips.text.off) : '';
		}
	}
};

// 重置
toolbar.Function.resetToolbar = {
	showHTML: function () {
		if (ABTConfig.resetToolbar.functionSwitch) {
			var html = '';
			html += '<li id="resetbutton">' +
					'	<a href="javascript:toolbar.Function.resetToolbar.mainMethod()">' + ABTConfig.language.resetToolbar + '</a>' +
					'</li>';
			return html;
		} else {
			return '';
		}
	},
	mainMethod: function () {
		if (!ABTConfig.resetToolbar.functionSwitch) {
			return;
		}
		window.location.reload();
	}
};

// 开启/关闭
toolbar.Function.show = {
	showHTML: function () {
		if (ABTConfig.show.functionSwitch) {
			var html = '';
			html += '<li id="closetoolbar">' +
					'	<a href="javascript:toolbar.Function.show.mainMethod()">' + ABTConfig.language.show + '</a>' +
					'</li>';
			return html;
		} else {
			return '';
		}
	},
	toolbarState: false,
	mainMethod: function () {
		if (!ABTConfig.show.functionSwitch) {
			return;
		}
		if (!this.toolbarState) {
			var toolbarHTML = '<ul id="toolbarList">';
			for (var a in toolbar.Function) {
				try {
					toolbarHTML += toolbar.Function[a].showHTML();
				} catch (e) {}
			}
			toolbarHTML += '<li id="abtClear"></li></ul>';
			var newToolbar = '<div id="ABTToolbar">' + toolbarHTML + '</div>';
			getE.body.prepend(newToolbar);
			var toobarHeight = $('#ABTToolbar').height();
			toobarHeight = toobarHeight > (ABTConfig.skin[toolbar.skin].bodyPadding * 2.1) ? toobarHeight : ABTConfig.skin[toolbar.skin].bodyPadding;
			getE.body.css({
				'padding-top': "200px"
			});
			this.toolbarState = true;
		} else {
			$('#ABTToolbar').remove();
			getE.body.css({
				'padding-top': '0'
			});
			this.toolbarState = false;
			toolbar.Function.resetToolbar.mainMethod();
		}
	}
};