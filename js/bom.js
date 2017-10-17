$(function () {
    $("#addMoreParts").bind("click", function () {
        var div = addBoMFields();
        $("#partsDiv").append(div);
    });    
});

function addBoMFields() {
    
        var id = 1;
        $('.BoMFields').each(function() {
            id = this.id.replace("BoMFields", "");
        });
        id = parseInt(id) + 1;
        //alert(id);
        return '<div style="padding-top:10px;" class="BoMFields" id="BoMFields'+id+'">'+
            '<span style="width:204px;display: inline-block;"><input name="partName[]" id="partName'+id+'" value="" style="width:180px;" maxlength="250"/></span>'+
            '<span style="width:104px;display: inline-block;"><input name="partLength[]" id="partLength'+id+'" value="" style="width:80px;" maxlength="10"/></span>'+
            '<span style="width:104px;display: inline-block;"><input name="partBreadth[]" id="partBreadth'+id+'" value="" style="width:80px;" maxlength="10"/></span>'+
            '<span style="width:104px;display: inline-block;"><input name="partHeight[]" id="partHeight'+id+'" value="" style="width:80px;" maxlength="10"/></span>'+
            '<span style="width:104px;display: inline-block;"><input name="partWeight[]" id="partWeight'+id+'" value="" style="width:80px;" maxlength="10"/></span>'+
            '<span style="width:54px;display: inline-block;"><a href="javascript:void(0)" onclick="removeBoMFields('+id+')">remove</></span>'+
            '<span style="width:504px;display: inline-block;color:red;" class="err" id="BoMFieldsErr'+id+'"></span>'
        '</div>';
}

function removeBoMFields(id){
    $('#BoMFields'+id).remove();
}

function validateForm(){
    var err = 0;
    //var valid = /^\d*(\.\d{1,2})?$/;
    var valid = /^(?=.*[1-9])\d*(?:\.\d{1,2})?$/;
    $('.BoMFields').each(function() {
        var id = this.id.replace("BoMFields", "");
        
        //check part name
        var partName = this.id.replace("BoMFields", "partName");
        partName = $('#'+partName).val().trim();
        if(partName == ''){
            err = 1
            $('#BoMFieldsErr'+id).html('Part Name is mandatory');
            return true;
        }else{
            $('#BoMFieldsErr'+id).html('');
        }
        
        //check dimensions
        var partLength = this.id.replace("BoMFields", "partLength");
        partLength = $('#'+partLength).val().trim();
        
        var partBreadth = this.id.replace("BoMFields", "partBreadth");
        partBreadth = $('#'+partBreadth).val().trim();
        
        var partHeight = this.id.replace("BoMFields", "partHeight");
        partHeight = $('#'+partHeight).val().trim();
        
        if(partLength != '' || partBreadth != '' || partHeight != ''){
            if(partLength != '' && valid.test(partLength) == false){
                err = 1
                $('#BoMFieldsErr'+id).html('Length must be a postitive real number with max. 2 digits after decimal point');
                return true;
            }else{
                $('#BoMFieldsErr'+id).html('');
            }
            
            if(partBreadth != '' && valid.test(partBreadth) == false){
                err = 1
                $('#BoMFieldsErr'+id).html('Breadth must be a postitive real number with max. 2 digits after decimal point');
                return true;
            }else{
                $('#BoMFieldsErr'+id).html('');
            }
            
            if(partHeight != '' && valid.test(partHeight) == false){
                err = 1
                $('#BoMFieldsErr'+id).html('Height must be a postitive real number with max. 2 digits after decimal point');
                return true;
            }else{
                $('#BoMFieldsErr'+id).html('');
            }
            
            if((partLength != '' && (partBreadth == '' || partHeight == '')) || (partBreadth != '' && (partLength == '' || partHeight == '')) || (partHeight != '' && (partBreadth == '' ||  partLength == ''))){
                err = 1
                $('#BoMFieldsErr'+id).html('Length, Breadth and Height are mandatory');
                return true;
            }else{
                $('#BoMFieldsErr'+id).html('');
            }
        }    
        
        //check weight
        var partWeight = this.id.replace("BoMFields", "partWeight");
        partWeight = $('#'+partWeight).val().trim();
        if(partWeight != '' && valid.test(partWeight) == false){
            err = 1
            $('#BoMFieldsErr'+id).html('Weight must be a postitive real number with max. 2 digits after decimal point');
            return true;
        }else{
            $('#BoMFieldsErr'+id).html('');
        }
        
    });
    
    if(err == 1){
        return false;
    }else{
        return true;
    }
    
}

$(document).ready(function(){
    $(".paging").click(function(){
        var page = $(this).attr('rel');
        $("#pageview").val(page);
        $("#submit").trigger("click");
    });
    
//    $("#product_id").keypress(function(event){
//        return numeric(event);
//    });


    
/* Code added by Prashant Pawar for BOM dashboard Email BOM data, Start */
$("#emailCSV").click(function(e) {
  $('#sendEmail').val('1');
  //e.preventDefault();
  return true;
});
/* Code added by Prashant Pawar for BOM dashboard Email BOM data, End */

});

//function numeric(evt){
//    var charCode = (evt.which) ? evt.which : event.keyCode;
//    if (charCode == 8 || charCode == 43 || ( charCode>=48 && charCode<=57)) {
//        return true;
//    }else {
//        return false;
//    }
//}

function realnumValidation(val,evt){
    //var valid = /^\d*(?:\.\d\d)?$/;
    //var valid = /^[0-9]+([,.][0-9]+)?$/g;
   // alert(valid.test(val));
   //var valid = /^[1-9]\d*(\.\d\d)?$/;
   var valid = /^[0-9]\d{0,6}(\.\d{1,2})?$/;   
   return valid.test(val);
}
