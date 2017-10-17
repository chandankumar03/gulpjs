var timer;
var hit = 0;
var body;

(function() {
    
	var bar = $('.bar');
	var percent = $('.percent');
	var status = $('#status');
	   
	$('form').ajaxForm({
	    beforeSend: function() {
	    	status.empty();
	    	body = '';
                $("#check-data").val('Please wait...............');
	    	$("#check-data").attr("disabled", true);
	    	$("#behaviour").attr("disabled", true);

	    },
	    success: function() {
	    	$("#bulk").empty();
	    	clearTimeout(timer);
	    },
		complete: function(xhr) {

			clearTimeout(timer);
			var res = $.parseJSON(xhr.responseText);
			if(res.error) {
                            
				status.append("Please rectify the below mentioned errors.<br /></br />");
				scan(res.error);
				status.append( body +"<br />");
				$("#check-data").val('Check Data');
				$("#check-data").attr("disabled", false);
				$("#behaviour").attr("disabled", false);
				hit=0;
			}
			else if(res.success){
				for(var i in res.success) {
					status.append(res.success[i]);
				}
				hit=1;
				$("#check-data").hide();
				$("#save-data").show();
			}
			else {
				alert("ZOIKS");
			}
		},
		error:function(t) {
			console.log(t);
		}
	}); 

	$("#save-data").click(function(){

		if(hit==1) {
			var $url = root_url + "/product_tryandbuy/saveBulkOrderData";
			var $data = "1=1&token="+$.trim($("#token").val());

			$.ajax({
				type: "POST",
				url: $url,
				data: $data,
				 beforeSend: function() {
				    status.empty();
				    $("#save-data").attr("disabled", true);
                                    $("#behaviour").attr("disabled", true);
                                    $("#save-data").val('Please wait...............');
                                    timer = setTimeout('getProgress()',5000);
				},
				success: function(result){
					
				},
				complete: function(xhr){
					var time = Math.floor(new Date().getTime() / 1000);
					$("#token").val(time);
					$("#behaviour").attr("disabled", false);
					$("#save-data").attr("disabled", false);
					$("#check-data").attr("disabled", false);
					$("#check-data").val('Check Data');
					$("#save-data").val('Save Data');
					$("#check-data").show();
					$("#save-data").hide();
					var res = $.parseJSON(xhr.responseText);
					status.empty();
					status.append(res.message+"<br />");
					hit=0; // change this to 0
				},
				error: function(t) {
					console.log(t);
				}
			});
		}
	});
	
        $("#editData").click(function(){
        var form_data = $("#listForm").serialize();
        var path = root_url+"/product_tryandbuy/updateOrderData"; 
        var address = $("#address").val().trim();
        var landmark = $("#landmark").val().trim();
        var city = $("#city").val().trim();
        var state = $("#state").val().trim();
        var is_gift_card_issued = $("#is_gift_card_issued").val().trim();
        var giftcard_number = $("#giftcard_number").val().trim();
        var order_status = $("#order_status").val().trim();

        var error = false;
        var errorMsg = "";
        if(address.length<=0){
            error = true;
            errorMsg+="Address field is required<br>";
        }
        if(city.length<=0){
            error = true;
            errorMsg+="City field is required<br>";
        }
        if(state.length<=0){
            error = true;
            errorMsg+="State field is required<br>";
        }

        if(is_gift_card_issued!="Y" && is_gift_card_issued!="N"){
            error = true;
            errorMsg+="Invalid value for Is gift card issued field <br>";
        }

        if(giftcard_number!="" && giftcard_number.length!=16 && !isNaN(giftcard_number)){
            error = true;
            errorMsg+="Giftcard number should be 16 digit numeric value <br>";
        }
        
        if(order_status!="confirmed" && order_status!="shipped" && order_status!="delivered"){
            error = true;
            errorMsg+="Invalid status for order.<br>";
        }
        $("#updateStatus").html("Processing .........");

        if(!error){
            $.ajax
            ({ 
                    url: path,
                    data:form_data, 
                    type: "POST",
                    beforeSend : function(){
                        $("#updateStatus").html("Processing .........");
                    },
                    success: function(response)
                    {
                        var response = JSON.parse(response);
                        if(response.status=='error'){
                            for(i=0;i<response.msg.length;i++){
                                errorMsg+=response.msg[i]+"<br>";
                            }
                            $("#updateStatus").html(errorMsg);                        

                        }else if(response.status=='success'){
                            $("#updateStatus").html("Order data updated succesfully").css("color","green");
                            location.reload();
                        }
                    },
                    error:function(msg)
                    {
                        $("#updateStatus").html("Error occured while saving data.");
                    }
                });        
        }else{
            $("#updateStatus").html(errorMsg);
        }
    });
})(); 

function scan(obj)
{
    var k;
    if (obj instanceof Object) {
        for (k in obj){
            if (obj.hasOwnProperty(k)){
                if(k instanceof String) {
                   body += 'scanning property ' + k + '<br /> ';
                }
                scan( obj[k] );  
            }                
        }
    } else {
        body += ' ' + obj + '<br/>';
    };
};