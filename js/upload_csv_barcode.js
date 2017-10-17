var timer;
var hit = 0;
var body;
(function() {
    
	var bar = $('.bar');
	var percent = $('.percent');
	var status = $('#status');
	   
	$('#myForm').ajaxForm({
	    beforeSend: function() {
	    	status.empty();
	    	body = '';
                //$("#check-data").val('Please wait...............');
	    	$("#check-data").attr("disabled", true);
	    	$("#behaviour").attr("disabled", true);
	    	//timer = setTimeout('getProgress()',5000);
                //alert(timer); 
	    },
	    success: function() {
	    	$("#bulk").empty();
	    	clearTimeout(timer);
	    },
		complete: function(xhr) {
			//status.html(xhr.responseText);
			//status.empty();
			clearTimeout(timer);
			var res = $.parseJSON(xhr.responseText);
			if(res.error) {
				status.append("Please rectify the below mentioned errors.<br /></br />");
				//for(var i in res.error) {
				scan(res.error);
                                //console.log(body);
				status.append( body +"<br />");
				//}
				$("#check-data").val('Check Data');
				$("#check-data").attr("disabled", false);
				$("#behaviour").attr("disabled", false);
				hit=0;
			}
			else if(res.success){
				for(var i in res.success) {
					status.append(res.success[i]);
				}
                                
                                if(typeof res.all_data != 'undefined') {
                                    var appendTable = '';
                                    for(var i in res.all_data) {
                                        appendTable += '<tr>';
                                        appendTable += '<td style="text-align: center;" width="5%"><input class="print_barcode" name="ids[]" type="checkbox" value="'+res.all_data[i].increment_id+'"/></td>';
                                        appendTable += '<td style="text-align: center;" width="10%">'+res.all_data[i].increment_id+'</td>';
                                        appendTable += '<td style="text-align: center;" width="10%">'+res.all_data[i].product_id+'</td>';
                                        appendTable += '<td style="text-align: center;" width="5%">'+res.all_data[i].qty+'</td>';
                                        appendTable += '<td style="text-align: center;" width="20%">'+res.all_data[i].name+'</td>';
                                        appendTable += '<td style="text-align: center;" width="20%">'+res.all_data[i].sku+'</td>';
                                        appendTable += '</tr>';
                                        
                                    }
                                    if(appendTable != '') {
                                        $('#show_csv tbody').html(appendTable);
                                        $('#show_table').show();
                                    }
                            
                                }
                                
				hit=1;
				$("#check-data").hide();
				$("#save-data").show();
			}
                        else if(res.barcode)
                        {
                            $('#banner').show();
                            $('.hastable').show();
                            $('#printAll').show();
                            $('.new_table').append(res.barcode);
                            
                        }
			else {
				alert("ZOIKS");
			}
		},
		error:function(t) {
			console.log(t);
		}
	}); 

	
	
    $('.submit').click(function(event) {  //on click 
        if(this.checked) { // check select status
            $('.checkbox').each(function() { //loop through each checkbox
                this.checked = true;  //select all checkboxes with class "checkbox1"               
            });
        }else{
            $('.checkbox').each(function() { //loop through each checkbox
                this.checked = false; //deselect all checkboxes with class "checkbox1"                       
            });         
        }
    });
    

})(); 

var memcache_error_count=1;

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

function validatePrint() {
    $(".error").hide();
    var valid = false;
    
    if($(".print_barcode:checked").length > 0 ) {
        valid = true;
    } else {
        $(".error").show();
    }
    
    return valid;
}
