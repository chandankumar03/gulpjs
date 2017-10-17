$(document).ready(function(){ 
    $( "#tabs" ).tabs({
        active: 0
    });
    $("#myform").submit(function()
    {
        $('.errornew').css('display','none');
        $("#div-inner-error-messages").html('');
        var title = $.trim($("#title").val());
        var content = $.trim($("#content").val());
        var url = $.trim($("#url").val());
        var brand_id = $('.brands_id').val();
        var uploaded_img_data = JSON.stringify(uploadedImages);
        var err=false;
        imgpos = {};
        
        $('#images').val(uploaded_img_data);

        if(deletedImages.length > 0) {
            $('#delete_images').val(JSON.stringify(deletedImages));
        }
        
        $(".live_image_pos").each(function(index, element){
            var tmpId = element.id.split('-');
            var id = tmpId[2];
            if($(element).val() in imgpos) {
                    $('.errornew').css('display','block');
                    $("#div-inner-error-messages").append("Duplicate image position " + $(element).val() + ".<br />");
                    err=true;
            } else {
                    imgpos[$(element).val()] = {};
                    imgpos[$(element).val()] = id ;
            }
        });

        $('#updateimgs').val(JSON.stringify(imgpos));
      
        if(title == "")
        {
                err=true;
                $("#nameMsg").html('This Is Required Field');
        }
        if(url != "")
        {
                var url_arr=url.split(".");
                if(url_arr[0]=="")
                {
                        err=true;
                        $("#urlMsg").html('Please fill valid url');
                }
                if(url_arr[1]!="html")
                {
                        err=true;
                        $("#urlMsg").html('Please fill valid url');
                }
        }
        /*if(content == "")
        {
                err=true;
                $("#contentMsg").html('This Is Required Field');
        }*/
        var count = Object.keys(JSON.parse(uploaded_img_data)).length ;
        var delcount = $('#countdel').val();
        var total_count = parseInt(img_count)+parseInt(count)-parseInt(delcount);
        if(total_count>10){
            err=true;
            $('.errornew').css('display','block');
            $("#div-inner-error-messages").append("You can add only maximum 10 images<br/>");
            $('#imgMsg').html('You can add only maximum 10 images');

        }
        if(err==true)
        {
                return false;
        }
    });

    $("#col_submit").click(function(){
        var coll_data = [];
        var brand_id = $('.brands_id').val();
        var brand_name = $('#title').val();
        var i = 0;
        $('.priority').each(function() {
            var collection_id = $(this).attr('data-collection_id');
            var sort_id = $(this).val();
            coll_data[i]  = collection_id+'-'+sort_id;
            i++;
        });
        var path1 = ROOT_URL+'/brand/validateCollection';
        var path = ROOT_URL+'/brand/saveCollection';
        
        $.ajax({
            url: path1,
            data:{coll_data:coll_data},
            type: "POST",
            success: function(data){
                if(data==1){
                        $.ajax({
                        url: path,
                        data:{coll_data:coll_data,brand_id:brand_id,brand_name:brand_name},
                        type: "POST",
                        success: function(data){
                            if(data==1){
                                alert('Brand Collection Data successfully Updated');
                                $('.errornew').css('display','none');
                                $("#div-inner-error-messages").html('');
                            }
                            else{
                                //alert('Sorry, Some error occurred');
                                $('.errornew').css('display','block');
                                $("#div-inner-error-messages").html("Sorry, Some error occurred, Please check collections data again<br/>");
                            }
                        }
                    });
                }else{
                    //alert('You can not add same priority for more than one brand collection');
                    $('.errornew').css('display','block');
                    $("#div-inner-error-messages").html("You can not add same priority for more than one brand collection<br/>");
                }
            }
        });
    });

    $(".paging").click(function()
    {
            var page = $(this).attr('rel');
            $("#pageview").val(page);
            $("#submit").trigger("click");
    });

    $("#export").click(function()
    {
            $("#submit").val('Export');
            $("#submit").trigger("click");
            $("#submit").val('Submit');
    });

    $("#limit").change(function()
    {
            $("#submit").trigger("click");
    });

    $(".sort").click(function()
    {
            var sort=$("#order_by").val();
            var arr=sort.split(" ");
            var name = $(this).attr('rel');
            var order='';
            if(sort!='')
            {
                    if(name==sort)
                    {
                            if(arr[1]=='desc')
                                    order='asc';
                            else
                                    order='desc';

                            var order_by=arr[0]+' '+order;
                    }
                    else
                            var order_by=name;
            }
            else
                    var order_by=name;

            $("#order_by").val(order_by);
            $("#submit").trigger("click");
    });

    $("#inputid").keypress(function(event)
    {
                    return numeric(event);
    });

    $("#selectAll").click(function()
    {
            $('.brandid_cb').attr('checked','checked');
    });

    $("#unselectAll").click(function()
    {
            $('.brandid_cb').removeAttr('checked');
    });

    $("#inputid").keydown(function(e) {
            if (e.keyCode == 13) {
                    $("#submit").trigger("click");
            }
    });
    $("#description").keydown(function(e) {
            if (e.keyCode == 13) {
                    $("#submit").trigger("click");
            }
    });
    $("#hasHtml").keydown(function(e) {
            if (e.keyCode == 13) {
                    $("#submit").trigger("click");
            }
    });
    $("#CmName").keydown(function(e) {
            if (e.keyCode == 13) {
                    $("#submit").trigger("click");
            }
    });
    $("#status").keydown(function(e) {
            if (e.keyCode == 13) {
                    $("#submit").trigger("click");
            }
    });
    $("#createDate").keydown(function(e) {
            if (e.keyCode == 13) {
                    $("#submit").trigger("click");
            }
    });
});

function numeric(evt)
 {
        var charCode = (evt.which) ? evt.which : event.keyCode;
        if (charCode == 8 || charCode == 43 || ( charCode>=48 && charCode<=57)) {
        //if (charCode == 8 || charCode==39 || charCode==95 || (charCode>=65 && charCode<=90) || (charCode>=97 && charCode<=122)) {
        return true;
        }
        else {
            return false;
        }
}
