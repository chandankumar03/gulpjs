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
                $("#check-data").val('Please wait....');
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
				$("#check-data").val('Upload CSV');
				$("#check-data").attr("disabled", false);
				$("#behaviour").attr("disabled", false);
				hit=0;
			}
			else if(res.success){
				for(var i in res.success) {
					status.append(res.success[i]);
                                        $("#check-data").val('Upload CSV');
                                        $("#check-data").attr("disabled", false);
                                        $("#behaviour").attr("disabled", false);
				}
				hit=1;
			}
			else {
				alert("ZOIKS");
			}
		},
		error:function(t) {
			console.log(t);
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


