var timer;
var hit = 0;
var body;

$(document).ready(function()
{
    var bar = $('.bar');
    var percent = $('.percent');
    var status = $('#status');
    
    $('#status').html("");
	   
    $('#check-data').on('click',function()
    {
        var email_id=$('#email_id').val();
        var file_name=$('#value').val();
        var emailExp = /^[\w\-\.\+]+\@[a-zA-Z0-9\.\-]+\.[a-zA-z0-9]{2,4}$/;
        var flag=true;
        
        ext = file_name.substr(file_name.lastIndexOf('.') + 1);
        if(ext!="csv" || ext=="")
        {
            flag=false;
        }
        
        if(flag)
        {
            $('form').ajaxForm
            ({
            beforeSend: function() 
            {
                status.empty();
                body = '';
                $("#check-data").val('Please wait...............');
                $("#check-data").attr("disabled", true);
                $("#behaviour").attr("disabled", true);
            },
            success: function(){
                $("#bulk").empty();
                clearTimeout(timer);
            },
            complete: function(xhr) 
            {
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
                else if(res.success)
                {
                        for(var i in res.success) {
                                status.append(res.success[i]);
                        }
                        hit=1;
                        $("#check-data").hide();
                        $('#email_id').val("");
                        //$("#save-data").show();
                }
            }
        });
        }
        else
        {
            $("#status").html("Only .csv files are allowed").css('color','red');
        }
    }); 
    
    $('#email_id,#txtEmail').keyup(function(){
            if($(this).val().toLowerCase().indexOf("@") >= 0){
                var em=   $(this).val();
                var emSplitArr= em.split('@');

                /////if pepperfry.com is already there

                if(emSplitArr[1]!="pepperfry.com")
                {
                    if(emSplitArr[1].substring(0,3)=="p"){
                        $(this).val(" ");
                        $(this).val(emSplitArr[0]+'@pepperfry.com');
                        $('#check-data,#exportdata').focus();
                    }
                }
            }
        });
        
    $.validator.addMethod("requirePepperfryEmail", function(value, element) {
            var re = /^\s*[\w\-\+_]+(\.[\w\-\+_]+)*\@[\w\-\+_]+\.[\w\-\+_]+(\.[\w\-\+_]+)*\s*$/;
            if (re.test(value)) {
                if (value.indexOf("@pepperfry.com", value.length - "@pepperfry.com".length) !== -1) {
                    return true;
                } else {
                    return false;
                }
            } else {
                return false;
            }
        },
            "Your email address is not valid."
        );

        $("form[name='product_bupload']").validate(
            {
            rules: {
                email_id: {
                    required: true,
                    email: true,
                    requirePepperfryEmail: true
                }
            }, 
            messages: {
                email_id: {
                    requirePepperfryEmail: 'Must be a pepperfry.com e-mail address.'
                }
            }
        }
        );    
});

function scan(obj)
{
    var k;
    if (obj instanceof Object) 
    {
        for (k in obj)
        {
            if (obj.hasOwnProperty(k))
            {
                if(k instanceof String) 
                {
                   body += 'scanning property ' + k + '<br /> ';
                }
                scan( obj[k] );  
            }                
        }
    } 
    else 
    {
        body += ' ' + obj + '<br/>';
    };
};