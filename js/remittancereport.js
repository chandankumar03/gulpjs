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
	    	timer = setTimeout('getProgress()',10000);
	    },
	    success: function() {
	    	$("#bulk").empty();
	    	clearTimeout(timer);
	    },
		complete: function(xhr) {
			//status.html(xhr.responseText);
			status.empty();
			clearTimeout(timer);
			var res = $.parseJSON(xhr.responseText);
			
			var awb_check = false;
			if(res.error) {
				status.append("Please rectify the below mentioned errors.<br /></br />");
				//for(var i in res.error) {
				scan(res.error);	
				//alert(res.error.toSource());
				//alert(res.error.message.AWB);
				status.append( body +"<br />");
				//}
				
					$("#check-data").val('Check Data');
					$("#check-data").attr("disabled", false);
					$("#behaviour").attr("disabled", false);
					hit=0;
					
				
				
				
			}
			else if(res.success){
				for(var i in res.success) {
					status.append(res.success[i]+"<br />");
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
			var $url = ROOT_URL + "/remittancereport/save";
			var $data = "action=" + $("#behaviour").val() + "&1=1&token="+$.trim($("#token").val());
			$.ajax({
				type: "POST",
				url: $url,
				data: $data,
				 beforeSend: function() {
				    status.empty();
				    $("#save-data").attr("disabled", true);
			    	$("#behaviour").attr("disabled", true);
					$("#save-data").val('Please wait...............');
			    	timer = setTimeout('getProgress()',10000);
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
					$("#save-data").val('Download Data');
					$("#check-data").show();
					$("#save-data").hide();
					var res = $.parseJSON(xhr.responseText);
					status.empty();
					if(res.message!='')
					{
						status.append("<br /><br />");
						scan(res.message);	
						
						//alert(res.error.toSource());
						//alert(res.error.message.AWB);
						status.append( body +"<br /><br />");
						
						//status.append(res.message+"<br />");
						//status.append( body +"<br />");
					}else
					{
						alert('error comes while shipping');
						
					}
					//var download = '<a href="'+res.download+'" target="_blank"><b><u>Download Output</u></b></a>';
					//status.append(download);
					hit=0; // change this to 0
				},
				error: function(t) {
					console.log(t);
				}
			});
		}
	});
	
	
})(); 

var memcache_error_count=1;
function getProgress(){
	var $url = ROOT_URL + "/remittancereport/progress";
	var status = $('#status');
	$.ajax({
		type: "POST",
		url: $url,
		data: "token="+ $.trim($("#token").val()) +"&1=1",
		success: function(){
			
		},
		complete: function(xhr){
			
			if(xhr.responseText=="error"){
				memcache_error_count++;
				if(memcache_error_count>3){
					clearTimeout(timer);
					return false;
				}
			}
			else {
				memcache_error_count=0;
				status.html(xhr.responseText);
			}
			timer= setTimeout('getProgress()',10000);
		}
	});
}

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
        body += ' ' + obj + '<br/><br />';
    };
};