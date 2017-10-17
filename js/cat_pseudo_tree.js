    
$("#btnImport").on('click',function(){
    
    var responce = confirm('This will reset to initial state,Are you still want import ?');
    if(responce == true)
    {
        var import_url = $url+"email_import";
        $.get(import_url, function(data, status){
            data = JSON.parse(data);
            if (status == 'success') {                
                alert(data.msg);
                window.location= $url+"form";
                return true;
            }else{
                alert("Error in sending csv file");
            }
        });
    }
});

$("#btnExport").on('click',function(){    
    var responce = confirm('Are sure to export data ?');

    if(responce == true)
    {
        var export_url = $url+"email_export";
        $.get(export_url, function(data, status){
            data = JSON.parse(data);
            if (status == 'success') {                
                alert(data.msg);
                window.location= $url+"form";
                return true;
            }else{
                alert("Error in sending csv file");
            }
        });
    }
});

$("#btnFinalPrdCatStatus").on('click',function(){    
    var export_url = $url+"emailProductData";
    $.get(export_url, function(data, status){
        data = JSON.parse(data);
        if (status == 'success') {                
            alert(data.msg);
        }else{
            alert("Error in sending csv file");
        }
    });
});

