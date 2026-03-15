/*
** basic extends for sudy
 */
function runJs(a) { var b = document.createElement("script"); b.type = "text/javascript", b.text = a; var c = document.getElementsByTagName("body"); c.length ? c[0].appendChild(b) : document.documentElement.appendChild(b) } function loadJs(a) { var b = document.createElement("script"); b.type = "text/javascript", b.src = a; var c = document.getElementsByTagName("head"); c.length ? c[0].appendChild(b) : document.documentElement.appendChild(b) } function Imgpd(a, b, c, d) { this.title = a, this.url = b, this.text = c, this.src = d } function getImgJson(p) { var imgJson = []; if ("undefined" !== eval("typeof imgText" + p)) { eval("var title = imgText" + p + ", url = imgLink" + p + ", text = imgContent" + p + ", img = imgUrl" + p + ";"); var i; for (i = 1; i < title.length; i++)imgJson[i - 1] = new Imgpd(title[i], url[i], text[i], img[i]) } else "undefined" !== eval("typeof w" + p + "imgJsons") && eval("imgJson = w" + p + "imgJsons"); return imgJson }
function ieIE() {
     var userAgent = navigator.userAgent; 
    var browser = navigator.appName;
    var b_version = navigator.appVersion;
    var version = b_version.split(";");
    if (version[1] === undefined) return;
    var trim_Version = version[1].replace(/[ ]/g, "");
        if (userAgent.indexOf("rv:11.0")!=-1||trim_Version == "MSIE10.0"||trim_Version == "MSIE9.0" || trim_Version == "MSIE8.0" || trim_Version == "MSIE7.0" || trim_Version == "MSIE6.0" || trim_Version == "MSIE5.0") {
            return true;
        }else{
            return false
        }
}
function tipsHide() {
    document.getElementById('pageTips').style.visibility = "hidden"
}
/*
** load jquery and jquery plugins for sudy
 */
var EXTEND_PATH, exScripts = document.getElementsByTagName("script"); EXTEND_PATH = exScripts[exScripts.length - 1].getAttribute("src").replace('extends.js', ''); document.write('<link rel="stylesheet" type="text/css" href="' + EXTEND_PATH + 'extends.css" >'); var DEFAULT_VERSION = "9.0"; var ua = navigator.userAgent.toLowerCase(); var is_IE = ua.indexOf("msie") > -1; var safariVersion; if (is_IE) { safariVersion = ua.match(/msie ([\d.]+)/)[1]; } if (safariVersion < DEFAULT_VERSION) { window.jQuery || document.write('<script type="text/javascript" src="' + EXTEND_PATH + 'libs/jquery.min.js"><\/script>'); } else { window.jQuery || document.write('<script type="text/javascript" src="' + EXTEND_PATH + 'libs/jquery.min.js"><\/script>'); window.jQuery || document.write('<script type="text/javascript" src="' + EXTEND_PATH + 'libs/jquery-3.7.1.min.js"><\/script>'); } document.write('<script type="text/javascript" src="' + EXTEND_PATH + 'libs/jquery.sudy.js"><\/script>');
document.write('<script type="text/javascript" src="' + EXTEND_PATH + 'gsap/libs/custom_slide.js"><\/script>');
document.write('<script type="text/javascript" src="' + EXTEND_PATH + 'gsap/libs/gsap.min.js"><\/script>');
document.write('<script type="text/javascript" src="' + EXTEND_PATH + 'gsap/libs/ScrollTrigger.min.js"><\/script>');
document.write('<script type="text/javascript" src="' + EXTEND_PATH + 'gsap/libs/Flip.min.js"><\/script>');
document.write('<script type="text/javascript" src="' + EXTEND_PATH + 'gsap/libs/MotionPathPlugin.min.js"><\/script>');
if(ieIE()){
    document.write('<div class="pageTips" id="pageTips"><div class="container"><a href="javascript:;" onclick="tipsHide()" class="close">X</a><div class="msg">抱歉，我们不再支持您的浏览器兼容模式。请升级您的Internet Explorer（IE）浏览器到最新版本，或将搜狗、360、QQ 等浏览器切换到极速模式，您还可以下载安装谷歌、火狐浏览器以达到最佳观看模式。</div></div></div>')
    document.write('<script src="https://cdn.jsdelivr.net/npm/css-vars-ponyfill@2"></script>');
    document.write('<script src="https://cdn.jsdelivr.net/npm/js-beautify@1/js/lib/beautify-css.min.js"></script>');
       window.addEventListener('DOMContentLoaded', function () {
                cssVars({
			preserveStatic: true
		});
        });
}
document.write('<script type="text/javascript" src="' + EXTEND_PATH + 'gsap/until.js"><\/script>');
