function getVisible(el) {    
    var $el = $(el),
        scrollTop = $(this).scrollTop(),
        scrollBot = scrollTop + $(this).height(),
        elTop = $el.offset().top,
        elBottom = elTop + $el.outerHeight(),
        visibleTop = elTop < scrollTop ? scrollTop : elTop,
        visibleBottom = elBottom > scrollBot ? scrollBot : elBottom;
    return (visibleBottom - visibleTop);
}

var initialSidebarTop = 0,sticky_top_offset=0,sticky_bottom_offset=0;
var stickyInit = true;

var fetchData = typeof fetchData !== 'undefined' ? fetchData : false;

$.fn.stickyTopBottom = function(options) {

    //initialization
    var options = $.extend({
      container: $('body'),
      //reference element for starting and stopping the sticking (doesn't actually have to contain the element)
      top_offset: 0,
      // distance from top of viewport to stick top of element
      bottom_offset: 0,
      // distance from bottom of viewport to stick bottom of element
      pjax:true}
    ,options);

    $sidebar = $(this);

    var $window = $(window);
    var lastScrollTop = $window.scrollTop();
    var wasScrollingDown = true;
    
    var container_height = options.container.height();
    var sidebar_height = $sidebar.outerHeight();
    
    if ($sidebar.length > 0 && container_height > sidebar_height) {

        $(window).on('resize', function() {
          viewport_height = $(window).height();
        });


        $window.scroll(function(event) {
            container_top = options.container.offset().top;
            viewport_height = $(window).height();

            var windowHeight = $window.height();
            var sidebarHeight = $sidebar.outerHeight();

            var scrollTop = $window.scrollTop();
            var scrollBottom = scrollTop + windowHeight;

            var sidebarTop = $sidebar.offset().top;
            var sidebarBottom = sidebarTop + sidebarHeight;

            var heightDelta = Math.abs(windowHeight - sidebarHeight);
            var scrollDelta = lastScrollTop - scrollTop;

            var isScrollingDown = (scrollTop > lastScrollTop);
            var isWindowLarger = (windowHeight > sidebarHeight);

            if ((isWindowLarger && scrollTop > initialSidebarTop) || (!isWindowLarger && scrollTop > initialSidebarTop + heightDelta)) {
                $sidebar.addClass('fixed');
            } else if (!isScrollingDown && scrollTop <= initialSidebarTop) {
                $sidebar.removeClass('fixed');
            }

            var dragBottomDown = (sidebarBottom <= scrollBottom && isScrollingDown);
            var dragTopUp = (sidebarTop >= scrollTop && !isScrollingDown);
            $sidebar.removeClass('bottom_touch');
            if (dragBottomDown) {
                if (isWindowLarger) {
                    $sidebar.css('top', options.top_offset);
                } else {
                    $sidebar.css('top', -heightDelta);
                }
                viewport_top = (document.documentElement && document.documentElement.scrollTop) || document.body.scrollTop;
                viewport_bottom = viewport_top + viewport_height;
                container_bottom = container_top + options.container.height();
                effective_viewport_bottom = viewport_bottom;
                if (effective_viewport_bottom > container_bottom) {
                    if (fetchData) {
                        fetchNextPageData();
                    }
                    if (sidebarHeight >= viewport_height || getVisible(options.container) <= (sidebarHeight+options.top_offset)) {
                        // scrolled past container bottom
                        $sidebar.addClass('bottom_touch');
                    }
                }
                
            } else if (dragTopUp) {
                $sidebar.css('top', options.top_offset);
            } else if ($sidebar.hasClass('fixed')) {
                var currentTop = parseInt($sidebar.css('top'), 10);
                
                var minTop = -heightDelta;
                var scrolledTop = currentTop + scrollDelta;
                var isPageAtBottom = (scrollTop + windowHeight >= $(document).height());
                var newTop = (isPageAtBottom) ? minTop : scrolledTop;
                if (newTop > 0) {
                    $sidebar.css('top', options.top_offset);
                } else {
                    $sidebar.css('top', newTop);
                }
                
                viewport_top = (document.documentElement && document.documentElement.scrollTop) || document.body.scrollTop;
                viewport_bottom = viewport_top + viewport_height;
                container_bottom = container_top + options.container.height();
                effective_viewport_bottom = viewport_bottom;
                if (effective_viewport_bottom > container_bottom) {
                    if (sidebarHeight >= viewport_height || getVisible(options.container) <= (sidebarHeight+options.top_offset)) {
                        // scrolled past container bottom
                        $sidebar.addClass('bottom_touch');
                    }
                    
                }
            }

            lastScrollTop = scrollTop;
            wasScrollingDown = isScrollingDown;
        });
    }
 
};
var bf_stickyInit = false;
function stickyScroll() {
    bf_stickyInit = true;
    if($('#clip_sidebar').length > 0)
    {
    	initialSidebarTop = $('#clip_grid').offset().top;
        if(window.innerWidth <= 980){
            sticky_top_offset = $('.header').outerHeight();;
        } else {
            sticky_top_offset = 42;
        }
        $('#clip_sidebar').addClass('clearfix');
        $('#clip_sidebar').stickyTopBottom({container: $('#clip_grid'),top_offset:sticky_top_offset});
    }
    $(".clip_box a:not(.addto_cart_1)").click(function(){
        save_pos($(this).attr('href').split("pos=")[1]);
    });
}
if (window.location.hash.length == 0) {
    stickyScroll();
}
$(document).ready(function() {
    if (!bf_stickyInit && window.location.hash.length > 0) {
        stickyScroll();
    }
});