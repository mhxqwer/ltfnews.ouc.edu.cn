$(function () {
  /*栏目图片高度*/
  var $lbannerImg = $(".l-banner").find("img");
  var imgsrc = $lbannerImg.attr("src");
  if (imgsrc == "" || imgsrc == undefined) {
    var imgsrc = $lbannerImg.data("imgsrc");
  }
  //$lbannerImg.attr("src",imgsrc);
  $(".l-banner").css("backgroundImage", "url(" + imgsrc + ")");

  var os = (function () {
    var ua = navigator.userAgent,
      isWindowsPhone = /(?:Windows Phone)/.test(ua),
      isSymbian = /(?:SymbianOS)/.test(ua) || isWindowsPhone,
      isAndroid = /(?:Android)/.test(ua),
      isFireFox = /(?:Firefox)/.test(ua),
      isChrome = /(?:Chrome|CriOS)/.test(ua),
      isTablet = /(?:iPad|PlayBook)/.test(ua) || (isAndroid && !/(?:Mobile)/.test(ua)) || (isFireFox && /(?:Tablet)/.test(ua)),
      isPhone = /(?:iPhone)/.test(ua) && !isTablet,
      isPc = !isPhone && !isAndroid && !isSymbian;
    return {
      isTablet: isTablet,
      isPhone: isPhone,
      isAndroid: isAndroid,
      isPc: isPc,
    };
  })();

  if (os.isAndroid || os.isPhone || os.isTablet) {
    scrollTable();
  }
  if (os.isPhone || os.isTablet) {
    var idIframe = "wrapperinner-iframe-t";
    $(".wp_articlecontent iframe").each(function (i, iframe) {
      var idsIframe = idIframe + "-" + i;
      $wrapper = $('<div class="wrapperiframe" id="' + idsIframe + '" />');
      $(iframe).wrap($wrapper);
      var resultContentH = $(iframe).height();
      $("#" + ids).height(resultContentH + 20);
    });
  }
  function scrollTable() {
    setTimeout(function () {
      var id = "wrapperinner-tab-t";
      $(".wp_articlecontent table").each(function (i, table) {
        var ids = id + "-" + i;
        $wrapper = $('<div class="wrapperinner" id="' + ids + '" />');
        $scroller = $('<div class="scroller" />');
        $(table).wrap($wrapper);
        $(table).wrap($scroller);

        var resultContentH = $(table).height();
        $("#" + ids).height(resultContentH + 20);
        var scroller = new IScroll("#" + ids, { eventPassthrough: true, scrollX: true, scrollY: false, preventDefault: false });
        setTimeout(function () {
          scroller.refresh();
        }, 60);
        $(table).data("scroller", scroller);
      });
    }, 30);
  }

  if ($("#wp_paging_w6").length > 0) {
    $("#wp_paging_w6").after('<div id="page1" class="page_div"></div>');
    var totalNum = parseInt($(".all_pages").text());
    var totalList = parseInt($("em.all_pages").text());
    var curpage = parseInt($(".curr_page").text());
    var precount = parseInt($(".per_count").text());
    // pageMe.js 使用方法
    $("#page1").paging({
      pageNum: curpage, // 当前页面
      totalNum: totalNum, // 总页码
      totalList: totalList, // 记录总数量
      preCount: precount,
      callback: function (num) {
        //回调函数
        var url = location.pathname;
        window.location.href = url.replace(/list(\d*)/gi, "list" + num);
      },
    });
  }
  $(".column-switch").click(function () {
    $(".col_menu_con").slideToggle();
  });
  if ($(".wp_column ").length < 1) {
    $(".column-switch").hide();
    $(".col_list").hide();
    $(".col_menu_head").unbind("click");
  }
});




