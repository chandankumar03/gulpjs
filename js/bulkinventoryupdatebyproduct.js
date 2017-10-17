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
	    	timer = setTimeout('getProgress()',5000);
	    },
            beforeSubmit: function() {
                //validateData returns boolean
                if(validateEmail($("#email").val()) === false){
                    status.empty();
                    status.append("Please provide valid email address of pepperfry");
                    return false;
                }
             },
	    success: function() {
	    	$("#bulk").empty();
                $("#emailId").hide();
	    	clearTimeout(timer);
	    },
		complete: function(xhr) {
			//status.html(xhr.responseText);
			status.empty();
			clearTimeout(timer);
			var res = $.parseJSON(xhr.responseText);
			if(res.error) {
				status.append("Please rectify the below mentioned errors.<br /></br />");
				//for(var i in res.error) {
				scan(res.error);	
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
			var $url = ROOT_URL + "/product_bulkinventoryupdatebyproduct/save";
			var $data = "action=" + $("#behaviour").val() + "&1=1&token="+$.trim($("#token").val()) + "&email="+$.trim($("#email").val());
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
//					var download = '<a href="'+res.download+'" target="_blank"><b><u>Download Output</u></b></a>';
//					status.append(download);
					hit=0; // change this to 0
                                        clearTimeout(timer);
				},
				error: function(t) {
					console.log(t);
				}
			});
		}
	});
	
	
})(); 
function validateEmail(email) { 
var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
if(re.test(email)){
    //Email valid. Procees to test if it's from the right domain (Second argument is to check that the string ENDS with this domain, and that it doesn't just contain it)
    if(email.indexOf("@pepperfry.com", email.length - "@thedomain.com".length) !== -1){
        //VALID
       return true;
    }
    
}
return false;
}
var memcache_error_count=1;
function getProgress(){
	var $url = ROOT_URL + "/product_bulkinventoryupdatebyproduct/progress";
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
			timer= setTimeout('getProgress()',5000);
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
        body += ' ' + obj + '<br/>';
    };
};