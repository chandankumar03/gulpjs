var timer;
var hit = 0;
var body;
(function() {
    
    var bar = $('.bar');
    var percent = $('.percent');
    var status = $('#status');

    $('#behaviour').on('change', function(){
            $("#partsDiv").html('');
            $('#displaySets').hide();
            if(this.value == "1") { 
                    $('#productbulkupload').prop('action', ROOT_URL + '/product_bulkjava/upload');
                    getAllOptions();
            } else if(this.value == "2" || this.value == "3" || this.value == "8") {
                    $('#productbulkupload').prop('action', ROOT_URL + '/product_bulkjava/upload');
            }else if(this.value == "4") {
                    $('#productbulkupload').prop('action', ROOT_URL + '/product_bulkaddreplace/process');
            }else if(this.value == "5") {
                    $('#productbulkupload').prop('action', ROOT_URL + '/product_bulkproductattrmovement/productattrmove');
            }else if(this.value == "1001") {
                    $('#productbulkupload').prop('action', ROOT_URL + '/product_categorysortranking/validate');
            }
    });
	
    $('form').ajaxForm({
        beforeSend: function() {
            status.empty();
            body = '';
            $("#check-data").attr("disabled", true);
            $("#behaviour").attr("disabled", true);
            $("#check-data").val("Please wait...");
        },
        success: function() {
            $("#bulk").empty();
            clearTimeout(timer);
            $("#behaviour").attr("disabled", false);
            $("#check-data").attr("disabled", false);
            $("#check-data").val("Upload Data");
        },
        complete: function(xhr) {            
                
                status.empty();
                clearTimeout(timer);
                var res = $.parseJSON(xhr.responseText);
                console.log("response");
                console.log(res);
                if(res.error) 
                {
                    status.append("Please rectify the below mentioned errors.<br /></br />");
                    
                    scan(res.error);	
                    status.append( body +"<br />");
                    
                    $("#check-data").attr("disabled", false);
                    $("#behaviour").attr("disabled", false);
                    $("#check-data").val("Upload Data");
                    hit=0;
                    if(res.notice)
                    {
                        body = '';
                        scan(res.notice);	
                        status.append( body +"<br />");
                    }
                }
                else if(res.success)
                {
                    for(var i in res.success) 
                    {					
                        status.append(res.success[i]+"<br />");
                    }
                    hit=1;
                    if(res.notice)
                    {
                        body = '';
                        scan(res.notice);	
                        status.append( body +"<br />");
                    }
                    
                    $("#behaviour").attr("disabled", false);
                    $("#check-data").attr("disabled", false);
                    $("#check-data").val("Upload Data");
                    //$("#check-data").hide();
                    //$("#get-status").show();

                }else {
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


function getAllOptions()
{
    var path = ROOT_URL + "/product_bulkjava/getAllOptions";
    $.ajax({
        dataType: "json",
        url: path,
        type: "GET",
        success: function (result) {

            var strOptions = '';
            var totalRecords = result['totalRecords'];
            if(totalRecords > 0)
            {
                strOptions += '<select id="attribute_set_name" name="attribute_set_name">';
                strOptions += '<option value="0">Select attribute set name</option>';
                for(var cntr = 1; cntr <= totalRecords; cntr++)
                {
                    strOptions += '<option value="'+result[cntr]['attribute_set_id']+'">'+result[cntr]['attribute_set_name']+'</option>';
                }
                strOptions += '</select>';
            }

            $("#partsDiv").html(strOptions);
            $('#displaySets').show();
        },
        error: function (x, y, z) {
            alert('An error has occurred:\n' + x + '\n' + y + '\n' + z);
        }
    });
}

 $(".deletebtn").click(function(){
     var jobid = $(this).attr('id');
     var r = confirm("Are you sure you want to delete the Job "+jobid +" Details ?");
     if (r == true) {
        
        var path = root_url + "/miscscript_bulkuploadstatus/deletestatus/"+jobid;
        if(jobid!=""){
        $.ajax({
        type:"post",
        url:path,
        success:function(response){	

            var x = JSON.parse(response);
            console.log(x);
            console.log("Succcess--");
            console.log(x.success);
            console.log("Error ---");
            console.log(x.error);
            
            if(x.success != undefined ){
                alert(x.success);
            }
            else if(x.error!= undefined){
                alert(x.error);
            }
            else{
                alert("Something went wrong");
            }
            
            window.location.reload();
        }
        });
        }
     }

 });

