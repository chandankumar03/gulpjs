$(document).ready(function(){ 
    $("#from").datepicker({dateFormat:'yy-mm-dd'});
    $("#to").datepicker({dateFormat:'yy-mm-dd'});
});
$('body').on('focus',"#from", function(){
    if( $(this).hasClass('hasDatepicker') === false )  {
        $(this).datepicker({dateFormat:'yy-mm-dd'});
    }
});
$('body').on('focus',"#to", function(){
    if( $(this).hasClass('hasDatepicker') === false )  {
        $(this).datepicker({dateFormat:'yy-mm-dd'});
    }
});
$(document).on("change", "#limit", function(){
    $("#submit").trigger("click");
});
	
$(document).on("click", ".paging", function(){
	var page = $(this).attr('rel');
	$("#pageview").val(page);
	$("#page").val(page);
	$("#submit").trigger("click");
});
	
$(document).on("click", "#export", function(){
	if($('#to').val() == '' || $('#from').val() == '') {
        alert('please select valid date range');
        return false;
    }
    else {
        var toDate = new Date($('#to').val());
        var fromDate = new Date($('#from').val());
        if(!(fromDate == toDate || fromDate < toDate)) {
            alert('please select valid date range');
            return false;
        }
    }

    var path = site_url+"miscscript_sendsms/send_report";
    $.ajax({
        type: 'POST',
        url: path,
        data:$('#smslogs').serializeArray(),
        //data: values1,
        success: function(result){
            alert(result);
            console.log(result);
        },
        error: function(message){
            alert('error');
        }
    });
});


$(document).on("click", ".sort", function(){
	var sort=$("#order_by").val();
	var arr=sort.split(" ");
	var name = $(this).attr('rel');
	var order='';
	if(sort!=''){
		if(name==sort){
			if(arr[1]=='desc')
				order='asc';
			else
				order='desc';
			
			var order_by=arr[0]+' '+order;
		}else{
			var order_by=name;
		}
	}else{
		var order_by=name;
	}

	$("#order_by").val(order_by);
	$("#submit").trigger("click");
});

$("#sort input").keydown(function(e) {
    if (e.keyCode == 13) {
        $("#submit").trigger("click");
    }
});


$(document).on('click','#unselectAll',function(){
    $("#chb_").removeAttr('checked');
	check_visibles();
});
$(document).on('click','#selectAll',function(){
    $("#chb_").attr('checked','checked');
	check_visibles();
});
$(document).on('click','.sms_data',function(){
    var checked = $("#chb_").prop("checked");
    if(checked) {
        $("#chb_").removeAttr('checked');
    }
	var checkedIds = ($(":checkbox:checked").length *1);
    $("#selectCount").html("| "+checkedIds+" Rows(s) selected.");
});

$(document).on("click", "#reset", function(){ 
    window.location.href = site_url+"miscscript_sendsms/resetFilter";
}); 

$(document).on('click', '#submit', function(){
	var searchIDs = $("input:checkbox:checked").map(function(){
    	return this.value;
	}).toArray();
	if($('#to').val() != '' && $('#from').val() == '') {
        alert('Please select from date.');
        return false;
    }
        
    var path = site_url+"miscscript_sendsms/sms_grid";
    $('#loading_img').html('<img src="../../img/ajax-loader.gif" alt="loading..."></img>');
    $.ajax({
        type: 'POST',
        url: path,
        data:$('#smslogs').serializeArray(),
        //data: values1,
        async: false,
        success: function(resulthtml){
            var data = $.parseJSON( resulthtml );
            if(data.tbody_data != ''){
                $('#pager').html(data.pagination);
                $('#tbody_data').html(data.tbody_data);
            }				
        },
        error: function(message){
            alert('error');
        }
    });
    $('#loading_img').html('');
});



function check_visibles() {
    var checked = $("#chb_").prop("checked");
    if(checked) {
        $('.sms_data').attr('checked','checked');
        $("#chb_").attr('checked','checked');
        
        var checkedIds = ($(":checkbox:checked").length *1) - 1;
        $("#selectCount").html("| "+checkedIds+" Rows(s) selected.");
    }
    else {
        $('.sms_data').removeAttr('checked');
        $("#chb_").removeAttr('checked');
        $("#selectCount").html("");
    }
    
}