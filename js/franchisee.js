$(function () {
 //for add and update franchisee
 $(".addDevice").on('click',function(){
    $(".deviceId:first").clone("true").find("input:text").val("").end().insertAfter("div.deviceId:last");
    $(".deviceId:last").find(".addDevice").hide();
    $(".deviceId:last").find(".removeDevice").show();
});
$(".removeDevice").on('click',function(){
       $(this).parents("div.deviceId").remove(); 
});

function validateFrom(){
   var obj = {}
  obj={
        validReg:{
            email:/^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/,
            phone: /^[0-9]{10}$/,
            landline: /^[0-9]{11}$/,
            pincode: /^[1-9][0-9]{5}$/,
            advPhone: /^[1-9][0-9]{9}$/,
            name:/^[a-z\sA-Z]+$/,
            alphaNum:/^[a-z\sA-Z0-9]+$/,
            fname:/^[a-z\sA-Z]+$/,
            lname:/^[a-z\sA-Z]+$/,
        },
        errorMsg:{
            email:'Enter a valid Email ID',
            phone: 'Need a valid 10-digit number',
            landline:'Need a valid 11-digit number',
            advPhone: 'Number can\'t start with 0',
            name: 'Enter a valid name',
            alphaNum: 'Only Alphanumeric Character allowed',
            fname: 'Enter a valid First name',
            lname: 'Enter a valid Last name',
            pincode: 'Needs to be 6 digit numeric value',
            defaultMsg: 'This field is mandatory'
        } 
    };
        var ObjArr =  $('#franchiseeForm [validate="1"]');
        var error=false;
        $('b.error').remove();
        $(ObjArr).each(function(){
            var currentValue=$.trim($(this).val());
            var validationType=$(this).attr("data-valid-attr");
            if(currentValue==''){
               error=true;
               if("uniqe"==validationType){
                   $("#uniqeArr").html("<b class='error'>"+obj['errorMsg']['defaultMsg']+"</b>"); 
               }else{
                    $(this).parents('td').append("<b class='error'>"+obj['errorMsg']['defaultMsg']+"</b>");
                }
           }else{
               if("uniqe"==validationType){
                   var ar = $('#franchiseeForm .deviceId input[type="text"]').map(function() {
                        if ($(this).val() != '') return $(this).val()
                       }).get();
                   //Create array of duplicates if there are any
                   var unique = ar.filter(function(item, pos) {
                      return ar.indexOf(item) != pos;
                    });
                    if((unique.length != 0)){
                        error=true;
                       $("#uniqeArr").html("<b class='error'>Duplicates not Allowed</b>"); 
                    }
                    
                }else if(typeof obj['validReg'][validationType]!=="undefined"){
                  if(obj['validReg'][validationType].test(currentValue) == false){
                       error=true;
                         $(this).parents('td').append("<b class='error'>"+obj['errorMsg'][validationType]+"</b>");                    
                   }
                 }
           }
       });
       return error;
}
  
    
 $("#submitForm").on("click",function(){
      var errorStatus=validateFrom();
       if(!errorStatus){
           document.getElementById('franchiseeForm').submit();
       }
 });
 $("#cancel").on("click",function(){
      window.location = root_url+'/Franchisee/listfranchisee';
 });
 //for list page
   $(".paging").click(function(){
        var page = $(this).attr('rel');
          $("#pageview").val(page);
           $("#submit1").trigger("click");
   });
});
