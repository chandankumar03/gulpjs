var localObj=[];
$(function () {
     $('.kys-land-begin-btn').on('click', function () {
         $(this).parents('.kys-landing-banner').slideUp(200);
         $(".kys-ques-ext-wrap:not(:first)").hide();;
         $('.kys-ques-page-wrap').slideDown(300);
     });
     
  $('.kys-answer-card').on('click', function () {
    var attrvalu=$(this).attr('data-id');
    var weightAge=parseInt($(this).parents('div.kys-ques-ext-wrap').attr('data-value'));
    var item = {}
        item ["weightAge"] = weightAge;
        item ["category"] = attrvalu;
        localObj.push(item);
    var questionCount=$(this).parents('.kys-ques-ext-wrap').next('.kys-ques-ext-wrap:hidden').length;
    if(questionCount==0){
        var categoryObj={};
        $.each(localObj,function(key,value){
            var category=value['category'];
            var weightAge=parseInt(value['weightAge']);
            if(categoryObj[category] === undefined ){
                categoryObj[category]=weightAge;
            }else{
                categoryObj[category]+=weightAge;
            }
        });
        var higestScore=0;
        var highestSelection='';
        $.each(categoryObj,function(key,value){
         if(higestScore<=value){
                higestScore=value;
                highestSelection=key;
            }
        });
        localObj.push({'resultflg':true,'category':highestSelection,'weightAge':higestScore})
        
        jsonString = JSON.stringify(localObj);
        $.ajax({
                url:root_url + "/site_product/saveStyleResponse",
                type:"POST",
                data:{data:jsonString,json:true},
                dataType:"json",
                beforeSend:function(){
                    //$('#loaderOverlay').show();
                },
                success:function(data){
                  if(data.flag){
                      window.location = root_url+"/know-your-style.html?style_id="+highestSelection;
                  }    
                },
                complete:function(){
                }
            });  
//        console.log(jsonString);
     }else{
      $(this).parents('.kys-ques-ext-wrap').fadeOut(200);
      $(this).parents('.kys-ques-ext-wrap').next('.kys-ques-ext-wrap:hidden:first').fadeIn(200);
     }

   });
   
   /*-----START TAB JS-----*/
    if($(".tab-content").length>0){
    var i = 0, changeTab = 2000, timer;
    tab();
    function tab() {
        var clickTab = $('[tab-open]');        
        $(".tab-content:first").show();        
        $(".studio-right-sec > .tab-content:first").show();
        clickTab.on('click', function (e) {
            var tabAttr = $(this).attr('tab-open');
            var curIndex = $(this).index();
            i = curIndex;
            //$(".tab-content").hide();
            $(this).siblings().removeClass("active");
            $(this).addClass("active");
            $('[tab-show="' + tabAttr + '"]').siblings().hide();             
            $('[tab-show="' + tabAttr + '"]').show();   
            $('[tab-show2="' + tabAttr + '"]').siblings().hide();             
            $('[tab-show2="' + tabAttr + '"]').show();       
            e.preventDefault();
        });
    }
    /*var timer;*/
    function startTimer() {
        var clickTab2 = $('.studio-auto-tab [tab-open]');
        timer = setInterval(function (e) {
            if (i < 4) {
                clickTab2.removeClass('active');
                clickTab2.eq(i).trigger('click');
                clickTab2.eq(i).addClass('active');
                i += 1;
            } else {
                i = 0;
            }
        }, changeTab);
    }
    startTimer();

    $(".bulk-tab-wrap.studio-auto-tab").hover(function () {
        clearInterval(timer);
    }, function () {
        startTimer(timer);
    });
   }
    /*-----End TAB JS-----*/
  
});



