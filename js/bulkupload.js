var timer;
var hit = 0;
var body;
(function() {
    
    var bar = $('.bar');
    var percent = $('.percent');
    var status = $('#status');

    $('#behaviour').on('change', function(){
            if(this.value == "1") { 
                    $('#productbulkupload').prop('action', ROOT_URL + '/product_bulk/upload');
            } else if(this.value == "2") {
                    $('#productbulkupload').prop('action', ROOT_URL + '/product_updateuploadedattribute/selectiveupload');
            }else if(this.value == "3") {
                    $('#productbulkupload').prop('action', ROOT_URL + '/product_bulkmerchant/upload');
            }else if(this.value == "4") {
                    $('#productbulkupload').prop('action', ROOT_URL + '/product_bulkaddreplace/process');
            }else if(this.value == "5") {
                    $('#productbulkupload').prop('action', ROOT_URL + '/product_bulkproductattrmovement/productattrmove');
            }else if(this.value == "8") {
                    $('#productbulkupload').prop('action', ROOT_URL + '/product_bulkbomdetails/validate');
            }else if(this.value == "1001") {
                    $('#productbulkupload').prop('action', ROOT_URL + '/product_categorysortranking/validate');
            }else if(this.value == "1002") {
                    $('#productbulkupload').prop('action', ROOT_URL + '/product_tawhbulkupload/validate');
            }
            /*
            else if(this.value == "1000") {
            $('#productbulkupload').prop('action', ROOT_URL + '/category_categorypseudo/process');
            }
            */
    });
	
    $('form').ajaxForm({
        beforeSend: function() {
            status.empty();
            body = '';
            $("#check-data").attr("disabled", true);
            $("#behaviour").attr("disabled", true);
            timer = setTimeout('getProgress()',5000);
            $("#check-data").val("Please wait...");
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
                if(res.error) {
                    status.append("Please rectify the below mentioned errors.<br /></br />");
                    //for(var i in res.error) {
                    scan(res.error);	
                    status.append( body +"<br />");
                    //}
                    $("#check-data").attr("disabled", false);
                    $("#behaviour").attr("disabled", false);
                    $("#check-data").val("Check Data");
                    hit=0;
                    if(res.notice){
                        body = '';
                        scan(res.notice);	
                        status.append( body +"<br />");
                    }
                }else if(res.success){
                    if ($('#behaviour').val() == "gst_hsn_sac" || $('#behaviour').val() == "gst_multi_code" || $('#behaviour').val() == "ts_gst_merchant")
                    {
                        status.append(res.success);
                    }
                    else
                    {
                        for(var i in res.success) {					
                                status.append(res.success[i]+"<br />");
                        }
                    }
                    hit=1;
                    if(res.notice){
                        body = '';
                        scan(res.notice);	
                    status.append( body +"<br />");
                    }
                    $("#check-data").val("Check Data");
                    $("#check-data").hide();
                    $("#save-data").show();

                }else {
                    alert("ZOIKS");
                }
        },
        error:function(t) {
                console.log(t);
        }
    }); 

    $("#save-data").click(function(){       
        if(hit==1) {
            var behaviour_val=$('#behaviour').val();

            var $url="";                        
            if(behaviour_val == 1) {
                $url = ROOT_URL + "/product_bulk/save";                            
            }
            else if(behaviour_val == 2) {
                $url = ROOT_URL + "/product_updateuploadedattribute/save_to_queue";                           
            }else if(behaviour_val == 3) {
                $url = ROOT_URL + "/product_bulkmerchant/save";                           
            }else if(behaviour_val == 4) {
                $url = ROOT_URL + "/product_bulkaddreplace/save";                           
            }else if(behaviour_val == 5) {
                $url = ROOT_URL + "/product_bulkproductattrmovement/save";                           
            }else if(behaviour_val == 6) {
            	$url = ROOT_URL + "/customer/save_admin_update_cart";                           
            }else if(behaviour_val == 7) {
            	$url = ROOT_URL + "/miscscript_bulkcategoryattrfilter/save";                           
            }else if(behaviour_val == 8) {
            	$url = ROOT_URL + "/product_bulkbomdetails/save";                           
            }else if(behaviour_val == 9) {
                $url = ROOT_URL + "/miscscript_housejoy/save";                           
            }else if(behaviour_val == 10) {
                $url = ROOT_URL + "/pincode_bulkupload/bulkinsertsave";                           
            }else if(behaviour_val == 'STOP_NPS') {
                $url = ROOT_URL + "/miscscript_npsfeedbackbulkupload/save";                           
            }else if(behaviour_val == 'tab_pincode') {
                $url = ROOT_URL + "/product_tryandbuy/save";                           
            }
            else if(behaviour_val == "gst_hsn_sac") {
                $url = ROOT_URL + "/gst_bulkuploadhsnsac/save";
            }
            else if(behaviour_val == "gst_multi_code") {
                $url = ROOT_URL + "/gst_bulkuploadgstmulticode/save";
            }
            else if(behaviour_val == "ts_gst_merchant") {
                $url = ROOT_URL + "/gst_bulkuploadmerchantgst/save";
            }
            else if(behaviour_val == 1001) {
                $url = ROOT_URL + "/product_categorysortranking/save";                           
            }
            else if(behaviour_val == 1002) {
                $url = ROOT_URL + "/product_tawhbulkupload/save";                           
            }
            /*
            else if(behaviour_val == 1000) {
                $url = ROOT_URL + "/category_categorypseudo/save";
            }*/

            var $data = "action=" + $("#behaviour").val() + "&1=1&token="+$.trim($("#token").val());
            $.ajax({
                type: "POST",
                url: $url,
                data: $data,
                beforeSend: function() {
                    status.empty();
                    $("#save-data").attr("disabled", true);
                    $("#behaviour").attr("disabled", true);
                    $("#save-data").val('Please wait...');
                    timer = setTimeout('getProgress()',5000);
                },
                success: function(){
                    clearTimeout(timer);
                },
                complete: function(xhr){
                    //var time = Math.floor(new Date().getTime() / 1000);


                    var res = $.parseJSON(xhr.responseText);
                    // console.log(res);
                    $("#token").val(res.token);

                    status.empty();


                    if(res.error) {
                        status.append("Please rectify the below mentioned errors.<br /></br />");
                        //for(var i in res.error) {
                        scan(res.error);	
                        status.append( body +"<br />");
                        //}
                        $("#check-data").attr("disabled", false);
                        $("#behaviour").attr("disabled", false);
                        $("#check-data").val("Check Data");
                        hit=0;
                        if(res.notice){
                            body = '';
                            scan(res.notice);	
                            status.append( body +"<br />");
                        }
                    }else if(res.message){
                        status.append(res.message+"<br />");

                        $("#behaviour").attr("disabled", false);
                        $("#save-data").val('Save Data');
                        $("#save-data").attr("disabled", false);
                        $("#check-data").attr("disabled", false);
                        $("#check-data").val('Check Data');
                        $("#check-data").show();
                        $("#save-data").hide();
                    }
                    if('download' in res) {
                        var download = '<a href="'+res.download+'" target="_blank"><b><u>Download Output</u></b></a>';
                        status.append(download);
                    }
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
	var $url = ROOT_URL + "/product_bulk/progress";
	var status = $('#status');

	/*$.ajax({
		type: "POST",
		url: $url,
		data: "token="+ $.trim($("#token").val()) +"&1=1",
		success: function(){
			
		},
		complete: function(xhr){
			
			if(xhr.responseText=="error"){
				memcache_error_count++;
				if(memcache_error_count>10){
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
	});*/

	//status.html("Checking data.. This will take some time.");
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

function download_csv() {
    if(typeof csvdata === "undefined"){
        csvdata = [
                        ['test', 'test'],
                    ];
    }
    if(typeof csvheader === "undefined"){
       csvheader='order_id,sku\n';
    }
    if(typeof fileName === "undefined"){
       fileName='sample.csv';
    }
    
    csvdata.forEach(function(row) {
            csvheader += row.join(',');
            csvheader += "\n";
    });
    if($("#testDownload").length>0){
        var hiddenElement = document.getElementById('testDownload');
    }else{
        var hiddenElement = document.createElement('a');
    }
    
    hiddenElement.href = 'data:text/csv;charset=utf-8,' + encodeURI(csvheader);
    hiddenElement.target = '_blank';
    hiddenElement.download = fileName;
    hiddenElement.click();
}
