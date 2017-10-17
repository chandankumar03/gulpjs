$.fn.stickyTopBottom = function(options) {
    var options = $.extend({
      container: $('body'),
      top_offset: 0,
      bottom_offset: 0,
      pjax:true,
	  bf_stickyInit:false,
      initialSidebarTop:0,
	  sticky_top_offset:0,
	  navbar:'',
	  bottom_class:'',
	  fixed_class:'',
      fetchData : typeof fetchData !== 'undefined' ? fetchData : false,
	  func:'',
	  }
    ,options);
	
	    var $productList  = $(this);
	    var $sidebar = options.navbar;
        var $window = $(window);
		options.bf_stickyInit = true;
		/*stickyScroll function */
		if(options.navbar.length > 0)
		{
			options.initialSidebarTop = $productList.offset().top;
			options.sticky_top_offset = 42;
			options.container=$productList;
			options.top_offset=options.sticky_top_offset;
		}
		/*-------------------*/
	var method = $.extend({
		getVisible:function (el) {    
		var $el = $(el),
			scrollTop = $window.scrollTop(),
			scrollBot = scrollTop + $window.height(),
			elTop = $el.offset().top,
			elBottom = elTop + $el.outerHeight(),
			visibleTop = elTop < scrollTop ? scrollTop : elTop,
			visibleBottom = elBottom > scrollBot ? scrollBot : elBottom;
		  return (visibleBottom - visibleTop);
		}
	},method);

    var lastScrollTop = $window.scrollTop();
    var wasScrollingDown = true;
    
    var container_height = options.container.height();
    var sidebar_height = $sidebar.outerHeight();
    
    if ($sidebar.length > 0 && container_height > sidebar_height) {
         $window.on('resize', function() {
          viewport_height = $(this).height();
        });
       $window.scroll(function(event) {
            container_top = options.container.offset().top;
            viewport_height = $window.height();

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

            if ((isWindowLarger && scrollTop > options.initialSidebarTop) || (!isWindowLarger && scrollTop > options.initialSidebarTop + heightDelta)) {
                $sidebar.addClass(options.fixed_class);
				$productList.addClass(options.sticky_class);
				$('#headerUserArea').hide();
				if(typeof options.func  =='function'){
					options.func();	
				}
            } else if (!isScrollingDown && scrollTop <= options.initialSidebarTop) {
                $sidebar.removeClass(options.fixed_class);
				$productList.removeClass(options.sticky_class);
				$('#headerUserArea').show();
				if(typeof options.func  =='function'){
					options.func();	
				}
            }

            var dragBottomDown = (sidebarBottom <= scrollBottom && isScrollingDown);
            var dragTopUp = (sidebarTop >= scrollTop && !isScrollingDown);
            $sidebar.removeClass(options.bottom_class);
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
                    if (options.fetchData) {
                        fetchNextPageData();
                    }
                    if (sidebarHeight >= viewport_height || method.getVisible(options.container) <= (sidebarHeight+options.top_offset)) {
                        $sidebar.addClass(options.bottom_class);
                    }
                }
                
            } else if (dragTopUp) {
                $sidebar.css('top', options.top_offset);
            } else if ($sidebar.hasClass(options.fixed_class)) {
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
                    if (sidebarHeight >= viewport_height || method.getVisible(options.container) <= (sidebarHeight+options.top_offset)) {
                        // scrolled past container bottom
                        $sidebar.addClass(options.bottom_class);
                    }
                    
                }
            }

            lastScrollTop = scrollTop;
            wasScrollingDown = isScrollingDown;

        });
    }
 
};
/*
$(document).ready(function() {
  $('#selectionProductList').stickyTopBottom({navbar:$("#selectionNavArea"),bottom_class:'bottom_touch',fixed_class:'fixed',sticky_class:'sticky-present'});
});*/