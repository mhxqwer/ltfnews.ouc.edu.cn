$(function () {

       	$(".Scroll-to-top,.returnTop").click(function(){
		$('html, body').animate({
			scrollTop: 0
		});
	})
});
fontSize();
$(window).resize(function () {
	fontSize();
});
function fontSize() {
	var size;
	var winW = window.innerWidth;
	$("body").removeClass("mobile")
	if (winW <= 3800 && winW > 1920) {
		size = Math.round(winW / 19.2);
	} else if (winW <= 1920 && winW > 1720) {
		size = 100;
	} else if (winW <= 1720 && winW > 999) {
		size = Math.round(winW / 17.2);
	} else if (winW <= 999) {
		$("body").addClass("mobile")
		size = 65;
	}

	$('html').css({
		'font-size': size + 'px'
	})
}
//底部动态媒体
const slotItem = document.querySelectorAll(".slot .news_list .news")
slotItem[8].classList.add('active')
let activeIndex = 16
Array.prototype.forEach.call(slotItem,function (item,index) {
    item.addEventListener("mouseenter", function () {
        document.querySelector(".slot").style.setProperty('--position', (100-(100/activeIndex*index))+'%'); 
        if(item.getAttribute("img-src")!=null&&item.getAttribute("img-src")!=""){
        document.querySelector(".slot-img").classList.add("show");
        document.querySelector(".slot-img").style.left=100/activeIndex*index+(100/activeIndex)/2+"%"
        document.querySelector(".slot-img img").src=item.getAttribute("img-src");
        }


       Array.prototype.forEach.call(slotItem,function(t,i){
            i===index?t.classList.add('active'):t.classList.remove('active')
        })
    })
    item.addEventListener("mouseleave", function () {
        document.querySelector(".slot-img").classList.remove("show");
    })
})