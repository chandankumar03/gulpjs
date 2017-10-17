$(function () {
      
    $(document).on("click", ".addMoreOptions", function(e) {
        var div = addOptionFields();
        $("#partsDiv").append(div);
    });
    
    $(document).on("click", ".saveResponse", function(e) {
        
        saveQuestionData();
    });
    
    $(document).on("click", ".removeOptionFields", function(e) {
        var cntr = $(this).attr("cntr");
        var optionID = $(this).attr("optionID");
        var ftype = $('#ftype').val();
        var platform = $('#platform').val();
        
        var r = confirm("Are you sure you want to remove this option?");
        if (r == true)
        {
            var path = ROOT_URL + "/miscscript_feedback/removeOption";
            $.ajax({
                dataType: "json",
                url: path,
                data: {optionID:optionID, ftype:ftype, platform:platform},
                type: "POST",
                success: function (result) {
                    
                    if(result==1)
                    {
                        $('#OptionFields'+cntr).remove();
                    }
                    else
                    {
                        alert('Something went wrong, Please try again later!');
                    }
                    
                },
                error: function (x, y, z) {
                    alert('Something went wrong, Please try again later!');
                }
            });
            
        } 
        else 
        {
            return false;
        }
    });
});

$(document).ready(function(){
    $(".paging").click(function(){
        var page = $(this).attr('rel');
        $("#pageview").val(page);
        $("#submit").trigger("click");
    });
    
    $("#emailCSV").click(function(e) {
        $('#sendEmail').val('1');
        return true;
    });
});


function addOptionFields() 
{
        var id = 1;
        $('.OptionFields').each(function() {
            id = this.id.replace("OptionFields", "");
        });

        id = parseInt(id) + 1;

        return '<div style="padding-top:10px;" class="OptionFields" id="OptionFields'+id+'">'+
                    '<span style="width:300px;display: inline-block;"><input class="optionText" name="optionText[]" id="optionText'+id+'" value="" style="width:280px;" maxlength="400" /></span>'+
                    '<span style="width:100px;display: inline-block;"><input class="optionPosition" name="optionPosition[]" id="optionPosition'+id+'" value="" style="width:80px;" maxlength="15" /></span>'+
                    '<span style="width:54px;display: inline-block;"><a href="javascript:void(0)" cntr="'+id+'" optionID="" class="removeOptionFields">remove</a></span>'+
                    '<input type="hidden" name="optionIdNum[]" value="0" />'+
                    '<span style="width:504px;display: inline-block;color:red;" class="err" id="OptionFieldsErr'+id+'"></span>'+
                '</div>';
}


function saveQuestionData() 
{
    var fquestion = $.trim($('#fquestion').val());
    var fyesRes = $.trim($('#fyesRes').val());
    var fnoRes = $.trim($('#fnoRes').val());
    var qfeedType = $.trim($('#qfeedType').val());
    
    if (fquestion != '' && fyesRes != '' && fnoRes != '' && qfeedType != '')
    {
        var path = ROOT_URL + "/miscscript_feedback/saveQuestionData";
        $.ajax({
            url: path,
            data: {fquestion:fquestion, fyesRes:fyesRes, fnoRes:fnoRes, qfeedType:qfeedType},
            type: "POST",
            success: function () {

                alert('Saved successfully!');
            },
            error: function (x, y, z) {
                alert(z);
                alert('Something went wrong, Please try again later!');
            }
        });
        
    }
}


function getAllQuestions()
{
    var qfeedType = $.trim($('#qfeedType').val());
    
    if (qfeedType != '')
    {
        var path = ROOT_URL + "/miscscript_feedback/getQuestionData";
        
        $.ajax({
            dataType: "json",
            url: path,
            data: {qfeedType:qfeedType},
            type: "POST",
            success: function (result) {
                
                $('#fquestion').val(result['question_text']);
                $('#fyesRes').val(result['thank_you_yes']);
                $('#fnoRes').val(result['thank_you_no']);

            },
            error: function (x, y, z) {
                alert('An error has occurred:\n' + x + '\n' + y + '\n' + z);
            }
        });
    } 
}


function getAllOptions()
{
    var platform = $.trim($('#platform').val());
    var ftype = $.trim($('#ftype').val());
    document.getElementById('partsDiv').innerHTML = '';
    document.getElementById('partsSubmit').innerHTML = '';
    document.getElementById('partsAdd').innerHTML = '';
    if (platform != '' && ftype != '' )
    {
        var path = ROOT_URL + "/miscscript_feedback/getAllOptions";
        $.ajax({
            dataType: "json",
            url: path,
            data: $("#frm").serialize(),
            type: "POST",
            success: function (result) {

                var strOptions = '<div style="width: 99%;background-color: #cccccc;padding: 10px 5px;margin: 20px auto;">'+
                                '<span style="width:300px;display: inline-block;">Option Text</span>'+
                                '<span style="width:150px;display: inline-block;">Position</span>'+
                                '<span style="width:504px;display: inline-block;"></span>'+
                                '</div>';
                var totalRecords = result['totalRecords'];
                if(totalRecords > 0)
                {
                    for(var cntr = 1; cntr <= totalRecords; cntr++)
                    {
                        strOptions += '<div style="padding-top:10px;" class="OptionFields" id="OptionFields'+cntr+'">'+
                                        '<span style="width:300px;display: inline-block;"><input class="optionText" name="optionText[]" id="optionText'+cntr+'" value="'+result[cntr]['option_text']+'" style="width:280px;" maxlength="400" /></span>'+
                                        '<span style="width:100px;display: inline-block;"><input class="optionPosition" name="optionPosition[]" id="optionPosition'+cntr+'" value="'+result[cntr]['position']+'" style="width:80px;" maxlength="15" /></span>'+
                                        '<input type="hidden" name="optionIdNum[]" value="'+result[cntr]['option_id']+'" />'+
                                        '<span style="width:54px;display: inline-block;"><a href="javascript:void(0)" cntr="'+cntr+'" optionID="'+result[cntr]['option_id']+'" class="removeOptionFields">remove</a></span>'+
                                        '<span style="width:504px;display: inline-block;color:red;" class="err" id="OptionFieldsErr'+cntr+'"></span>'+
                                    '</div>';
                    }
                }

                $("#partsDiv").append(strOptions);
                $("#partsAdd").html('<button type="button" id="addMoreOptions" class="addMoreOptions" style="margin: 10px 0;">Add more Option</button>');
                $("#partsSubmit").html('<input type="submit" name="optionForm" id="optionForm" value="Save" onClick="return validate();">');
            },
            error: function (x, y, z) {
                alert('An error has occurred:\n' + x + '\n' + y + '\n' + z);
            }
        });
    } 
}
        
        
function checkValidations()
{
    if (document.getElementById('ftype').value == '')
    {
        alert('Please select data feedback type');
        return false;
    }

    if (document.getElementById('platform').value == '')
    {
        alert('Please enter Platform');
        return false;
    }

    var res = checkOptionsText();
    if(res==0)
    {
        alert('Please fill all the option text');
        return false;
    }

    var resVal = checkOptionsPosition();
    if(resVal==0)
    {
        alert('Please fill all the option position');
        return false;
    }

}
        
        
function checkOptionsText()
{
    var opTextFlag = 1;
    $('.optionText').each(function() {
        opText = $.trim(this.value);
        if(opText=='')
        {
            opTextFlag = 0;
        }
    });

    return opTextFlag;
}
        
function checkOptionsPosition()
{
    var opPositionFlag = 1;
    $('.optionPosition').each(function() {
        opPos = $.trim(this.value);
        if(opPos=='')
        {
            opPositionFlag = 0;
        }
    });

    return opPositionFlag;
}


function resetFilter()
{
    var feedT = $.trim($('#feedT').val());
    var redirectUrl = ROOT_URL + "/miscscript_feedback/dashboard/"+feedT;
    location.href = redirectUrl;
}
