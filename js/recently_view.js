var recently_viewed_cl = {
    curEelement: '',
    showRecentViewedProducts:function () {
        $('#recent_view').animate({bottom: 0}, 200);
        $('#popup_overlay, #recent_view').addClass('active');
        dataLayer.push({
            'event': 'event RecentView',
            'category' : 'RVIEW',
            'action': 'Click',
            'label' : 'Show Recently Viewed',
            'opt' : true
        });
        return false;
    },
    getRecentlyViewed:function () {
        $.ajax({
            url:'/site_page/get_recent_views',
            type:'get',
            success: function (data){
                recently_viewed_cl.renderRecentlyViewed(data,'');
                return false;
            },
            error : function(){
                return false;
            }
        });
    },
    renderRecentlyViewed:function(data,ev){
        try {
            var d = $.parseJSON(data);
        }
        catch(e) {
            return false;
        }
        if(d.hasOwnProperty('op') && d.op == '1') {
            var count = Object.keys(d.data).length;
            if(count > 0) {
                var htmlFirst = '<a class="recent_view_icon" onclick="return recently_viewed_cl.showRecentViewedProducts();" href="javascript:void(0)">&nbsp;</a><div id="recent_view"><div id="recent_view_inner" class="v_scroll">';
                var htmlLast = '</div></div>';
                var html = '';
                var productData = d.data;
                for(var i in productData) {
                    if(typeof product_id == 'undefined' || productData[i].product_id != product_id) {
                        html += '<div class="recent_view_item">';
                            html += '<div class="img_box">';
                                html += '<img src="' + productData[i].image + '" alt="'+ productData[i].name + '" />';
                            html += '</div>';
                            html += '<div class="data_box">';
                                html += '<div>';
                                    html += '<a type="recview" href="' + productData[i].url + '" class="title_1">' + productData[i].name + '</a>';
                                    html += '<span class="price_1">Rs.'+productData[i].price+'</span>';
                                html += '</div>';
                            html += '</div>';
                            html += '<a id="rv_' + productData[i].product_id + '_' + productData[i].score + '" href="javascript:void(0)" onclick="return recently_viewed_cl.deleteRecentlyViewedProduct(this);" class="close_view_item">&nbsp;</a>';
                        html += '</div>';
                    }
                }
                if(html != '') {
                    if(ev == 'remove_recent') {
                        $('#recent_view').html('<div id="recent_view_inner" class="v_scroll">'+html+'</div>');
                        $('#recent_view_inner').jScrollPane().data('jsp');
                    }
                    else {
                        $('body').append(htmlFirst+html+htmlLast);
                        v_scroll_reinitialize();
                    }
                }
                else { //vip page after deleting last item remove recently view icon
                    $('#popup_overlay').trigger('click');
                    $('.recent_view_icon').remove(); 
                }
            }
            else {
                if(ev == 'remove_recent') {
                    $('#popup_overlay').trigger('click');
                    $('.recent_view_icon').remove();
                }
            }
        }
        else {
            if(ev == 'remove_recent') {
                $('#popup_overlay').trigger('click');
                $('.recent_view_icon').remove();
            }
        }
        return false;
    },
    deleteRecentlyViewedProduct: function(t){
        recently_viewed_cl.curEelement = t;
        var id = $(t).prop('id');
        $.ajax({
            url:'/site_page/remove_recent_view',
            type:'post',
            data:{id:id},
            success: function (data){
                $(recently_viewed_cl.curEelement).parent().slideUp(400,function() {
                    $(recently_viewed_cl.curEelement).parent().remove();
                    recently_viewed_cl.renderRecentlyViewed(data,'remove_recent');
                });
                return false;
            },
            error : function(){
                return false;
            }
        });
    },
    initialise: function () {
        
        if (window.innerWidth >= 1280) {
            var proto = document.location.protocol;
            var current_url = document.URL;
            if(typeof page_type == 'undefined'){
               page_type = '';
            }
            if ((proto == 'http:' && page_type != 'static_pages') ||
                (proto == 'https:' &&
                    (current_url.indexOf("/checkout/cart") > -1 ||
                        current_url.indexOf("/customer/") > -1))) {
                recently_viewed_cl.getRecentlyViewed();
            }
        }
    }
};
$(window).load(function (){
    recently_viewed_cl.initialise();
});
