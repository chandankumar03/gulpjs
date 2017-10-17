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
            $("#check-data").val('Please wait...............');	//disable button on submit
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
			if(res.error) {	//show errors
				status.append("Please rectify the below mentioned errors.<br /></br />");
				scan(res.error);
                status.append( body +"<br />");
				$("#check-data").val('Check Data');
				$("#check-data").attr("disabled", false);
				$("#behaviour").attr("disabled", false);
				hit=0;
			}
			else if(res.success){	//on success enable save button
				for(var i in res.success) {
					status.append(res.success[i]);
				}
				hit=1;
				$("#check-data").hide();
				$("#save-data").show();
			}
			else {
				alert("Please try again");
			}
		},
		error:function(t) {
			console.log(t);
		}
	}); 

	$("#save-data").click(function(){	//save data in db
		if(hit==1) {
			var $url = root_url + "/pincode_bulkupload/save";
			var $data = "action=" + $("#behaviour").val() + "&1=1&token="+$.trim($("#token").val());
			$.ajax({
				type: "POST",
				url: $url,
				data: $data,
				 beforeSend: function() {	//disable save button
				    status.empty();
				    $("#save-data").attr("disabled", true);
                    $("#behaviour").attr("disabled", true);
                    $("#save-data").val('Please wait...............');
                    timer = setTimeout('getProgress()',5000);
				},
				success: function(){
					
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
	
	
})(); 

