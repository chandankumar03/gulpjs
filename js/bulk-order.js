/*-----START TAB JS-----*/ 
var i = 0, changeTab = 2000, clickTab = $('[tab-open]');    
tab();
function tab(){
    $(".tab-content").hide();
    $(".tab-content:first").show();
    clickTab.on('click', function(e) {        	
        var tabAttr = $(this).attr('tab-open');                 
        $(".tab-content").hide();   
        $('[tab-open]').removeClass("active");        
        $(this).addClass("active"); 
        $('[tab-show="' + tabAttr + '"]').show();        
        e.preventDefault();
    });
}
var timer;
function startTimer() {
	timer = setInterval(function(e) {		
			    if(i<4){		  			      	
					clickTab.eq(i).trigger('click');
					clickTab.removeClass('active');
					clickTab.eq(i).addClass('active');					
					i+=1;
				}else{
					i=0;
				}	
			}, changeTab);
}
startTimer();

$(".bulk-tab-wrap").hover(function() {
    clearInterval(timer);
},function() {		
   startTimer();
});
/*-----START TAB JS-----*/ 