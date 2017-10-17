$(function () {

        $(document).on('click tap', '.tyo-loggedin-track-button', function () {
            if ($(this).closest('.tyo-direct-order-sku-wrapper').find('.tyo_timeline_warp').length > 0) {
                $(this).closest('.tyo-direct-order-sku-wrapper').find('.tyo_timeline_warp').slideDown();
                $(this).hide();
                $(this).siblings('.tyo-loggedin-close-button').show();
            }
        });
        $(document).on('click tap', '.tyo-loggedin-close-button', function () {
            var self = $(this);
            $(this).closest('.tyo-direct-order-sku-wrapper').find('.tyo_timeline_warp').slideUp(function () {
                self.hide();
                self.siblings('.tyo-loggedin-track-button').show();
            });
        });

        $('.writeus-tabs li a').click(function () {
            var tab_id = $(this).attr('data-tab');

            $('.writeus-tabs li a').removeClass('current-tab');
            $('.writeus-tabs-content').removeClass('current-tab');

            $(this).addClass('current-tab');
            $("#" + tab_id).addClass('current-tab');

        });

        $('[data-pid=1]').click();
});
            
    function loadMoreOrders(){
        var slimit = $('#load-more').attr('pid');
        $.ajax({
                url: root_url + '/customer_trackOrder/trackOrderDetails',
                data: { slimit: slimit, is_load: 1},
                type: "POST",
                async: true,
                beforeSend : function(){
                    $("#load-more").addClass('btn-loader');
                },
                success: function (data) {
                   $('.view-more-return-orders').remove();
                   $('#order-wrapper').append(data);
                   $("#load-more").removeClass('btn-loader');
                }
         }); 
    }
            
    function TrackData(orderid,productid){
        var tid = orderid+''+productid;
         $.ajax({
            url: root_url + '/customer_trackOrder/trackItem/'+orderid+'/'+productid+'/timeline',
            beforeSend : function(){
                $('#'+tid).parent().parent().parent().parent().find('.time-container').css('display','block');
            },
            success: function (data) {
                $('#'+tid).parent().parent().parent().parent().find('.time-container').html(data);
                $('#'+tid).parent().parent().parent().parent().find('.time-container').css('display','block').find('.row.tyo-track-dtl-row').css('display','block');                           
            }
        }); 
    }
            
    function mousePosition(el,node)
    {
        var elOffsetLeft = el.offset().left;
        var elOffsetTop = el.offset().top;
        var elWidth = el.outerWidth(true);
        var elHeight = el.outerHeight(true);
        var elHalfWidth = elWidth / 2;

        var wrapperDiv = $('.track_your_order_wrap');
        var tooltipDiv = $('#track-order-tooltip');
        var tooltipDivHeight = tooltipDiv.outerWidth(true);
        var toopTipBottomOffset = tooltipDiv.offset().top + tooltipDiv.outerHeight(true);
        var wrapperBottomOffset = wrapperDiv.offset().top + wrapperDiv.outerHeight(true);
        if (el.hasClass('first'))
        {
            $('.tyo_hover_details').css('marginLeft', -49);
        }
        else if (el.hasClass('last'))
        {
            $('.tyo_hover_details').css('marginLeft', -288);
        }
        else
        {
            $('.tyo_hover_details').css('marginLeft', -165);
        }

        $(node).offset({
            left: elOffsetLeft + elHalfWidth,
            top: elOffsetTop + elHeight
        });

    }

    $(document).on('mouseenter','.bottom_timeline_content a',function() {
        $('.tyo_strip_'+$(this).attr('data-tip')).show();
        var $obj = $(this);
        var $node = '.tyo_strip_'+$(this).attr('data-tip');
        mousePosition($obj,$node);
    });

    $(document).on('mouseleave','.bottom_timeline_content a',function() {
        $('.tyo_strip_'+$(this).attr('data-tip')).hide();    
    }); 