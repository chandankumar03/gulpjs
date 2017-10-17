$(document).ready(function () {
    //
    // tinyMCE.init({
    //     // General options
    //     mode: "exact",
    //     elements: "look_desc",
    //     theme: "advanced",
    //     plugins: "safari,advlink,imagemanager,autolink,lists,pagebreak,style,layer,table,save,advhr,advimage,advlink,emotions,iespell,inlinepopups,insertdatetime,preview,media,searchreplace,print,contextmenu,paste,directionality,fullscreen,noneditable,visualchars,nonbreaking,xhtmlxtras,template,wordcount,advlist,autosave,visualblocks",
    //     // Theme options
    //     theme_advanced_buttons1: "link,insertimage,|,code,save,newdocument,|,bold,italic,underline,strikethrough,|,justifyleft,justifycenter,justifyright,justifyfull,styleselect,formatselect,fontselect,fontsizeselect",
    //     theme_advanced_buttons2: "cut,copy,paste,pastetext,pasteword,|,search,replace,|,bullist,numlist,|,outdent,indent,blockquote,|,undo,redo,|,link,unlink,anchor,image,cleanup,help,code,|,insertdate,inserttime,preview,|,forecolor,backcolor",
    //     theme_advanced_buttons3: "tablecontrols,|,hr,removeformat,visualaid,|,sub,sup,|,charmap,emotions,iespell,media,advhr,|,print,|,ltr,rtl,|,fullscreen",
    //     theme_advanced_buttons4: "insertlayer,moveforward,movebackward,absolute,|,styleprops,|,cite,abbr,acronym,del,ins,attribs,|,visualchars,nonbreaking,template,pagebreak,restoredraft,visualblocks",
    //     theme_advanced_toolbar_location: "top",
    //     theme_advanced_toolbar_align: "left",
    //     theme_advanced_statusbar_location: "bottom",
    //     theme_advanced_resizing: true,
    //     convert_urls: false,
    //     relative_urls: false,
    //     // Example content CSS (should be your site CSS)
    //     content_css: "css/content.css",
    //     // Drop lists for link/image/media/template dialogs
    //     /*template_external_list_url : "<?php echo ROOT_URL; ?>/js/tiny_mce/template_list.js",
    //      external_link_list_url : "<?php echo ROOT_URL; ?>/js/tiny_mce/link_list.js",
    //      external_image_list_url : "<?php echo ROOT_URL; ?>/js/tiny_mce/image_list.js",
    //      media_external_list_url : "<?php echo ROOT_URL; ?>/js/tiny_mce/media_list.js",*/

    //     // Style formats
    //     style_formats: [
    //         {title: 'Bold text', inline: 'b'},
    //         {title: 'Red text', inline: 'span', styles: {color: '#ff0000'}},
    //         {title: 'Red header', block: 'h1', styles: {color: '#ff0000'}},
    //         {title: 'Example 1', inline: 'span', classes: 'example1'},
    //         {title: 'Example 2', inline: 'span', classes: 'example2'},
    //         {title: 'Table styles'},
    //         {title: 'Table row 1', selector: 'tr', classes: 'tablerow1'}
    //     ],
    //     // Replace values for the template plugin
    //     template_replace_values: {
    //         username: "Some User",
    //         staffid: "991234"
    //     }
    // });

});


/*==========Look Book Product============*/


var saveAction = 0
var sort_index_arr = [];
sort_index_arr[0] = Array();


$("#btn-save-look, #btn-save-look-edit").on('click', function(e){
    e.preventDefault();
    saveAction = 1;

    /*
    * Form validation
    */

    var valid_check = 0;

    $('#div-error-messages').empty();

    if($('select[name="select_room"]').val() == ''){        
        $('#div-error-messages').append("<label style='color:red;'>Room can not be blank.</label><br />");
        valid_check = 1;
    }
     if($('select[name="style"]').val() == ''){        
        $('#div-error-messages').append("<label style='color:red;'>Style can not be blank.</label><br />");
        valid_check = 1;
    }
     if($('input[name="product_name"]').val() == ''){        
        $('#div-error-messages').append("<label style='color:red;'>Please enter Product Name.</label><br />");
        valid_check = 1;
    }
    if($('textarea[name="look_desc"]').val() == ''){       
        $('#div-error-messages').append("<label style='color:red;'>Please enter Look Description.</label><br />");
        valid_check = 1;
    }
     if($('select[name="bespman_name"]').val() == ''){       
        $('#div-error-messages').append("<label style='color:red;'>Bespoke Manager is mandatory.</label><br />");
        valid_check = 1;
    }
     if($('input[name="lk_image"]').val() == '' && $('input[name="look_image"]').val() == ''){       
        $('#div-error-messages').append("<label style='color:red;'>Please select image for this look.</label><br />");
        valid_check = 1;
    }

     if($('input[name="serviceable[]"]:checked').size() > 0){

        $('input[name="serviceable[]"]:checked').each(function(){
              if($(this).closest('tr').find('.service_unit').val() == '' ){
                $('#div-error-messages').append("<label style='color:red;'>Please choose unit for serviceablity.</label><br />");
                    valid_check = 1;
                    return false;
              }
        });             
    }

    if(valid_check){
        $('#div-error-messages').css('display', 'block');
        return false;
    }else{
         $('#div-error-messages').css('display', 'none');
    }

    /*
    * Form validation
    */

    var valid_check = 0;

    $('#div-error-messages').empty();

    if($('select[name="select_room"]').val() == ''){        
        $('#div-error-messages').append("<label style='color:red;'>Room can not be blank.</label><br />");
        valid_check = 1;
    }
     if($('select[name="style"]').val() == ''){        
        $('#div-error-messages').append("<label style='color:red;'>Style can not be blank.</label><br />");
        valid_check = 1;
    }
     if($('input[name="product_name"]').val() == ''){        
        $('#div-error-messages').append("<label style='color:red;'>Please enter Product Name.</label><br />");
        valid_check = 1;
    }
    if($('textarea[name="look_desc"]').val() == ''){       
        $('#div-error-messages').append("<label style='color:red;'>Please enter Look Description.</label><br />");
        valid_check = 1;
    }
     if($('select[name="bespman_name"]').val() == ''){       
        $('#div-error-messages').append("<label style='color:red;'>Bespoke Manager is mandatory.</label><br />");
        valid_check = 1;
    }
     if($('input[name="lk_image"]').val() == '' && $('input[name="look_image"]').val() == ''){       
        $('#div-error-messages').append("<label style='color:red;'>Please select image for this look.</label><br />");
        valid_check = 1;
    }

     if($('input[name="serviceable[]"]:checked').size() > 0){

        $('input[name="serviceable[]"]:checked').each(function(){
              if($(this).closest('tr').find('.service_unit').val() == '' ){
                $('#div-error-messages').append("<label style='color:red;'>Please choose unit for serviceablity.</label><br />");
                    valid_check = 1;
                    return false;
              }
        });             
    }

    if(valid_check){
        $('#div-error-messages').css('display', 'block');
        return false;
    }else{
         $('#div-error-messages').css('display', 'none');
    }

    // sort_index_arr.length = 0;

    $(".sortable").each(function() {
        mrkid = $(this).closest('div.mrk_container').attr('data-mrkid');

        // Get array only if element is sortable
        if ($(this).hasClass('ui-sortable')){            
            sort_index_arr[mrkid] = $(this).sortable('toArray');
        }else{
            sort_index_arr[mrkid] = Array('i_'+mrkid+'-0');
        }        
    });    

    $('#btn_save_type').val($(this).attr('id'));
    $('#sort_index_arr').val(encodeURIComponent(JSON.stringify(sort_index_arr)));
    $('#marker_prd_arr').val(encodeURIComponent(JSON.stringify(markers_parent_arr))); //
    $('#del_product_arr').val(encodeURIComponent(JSON.stringify(del_product_arr))); 
    $('#del_marker_arr').val(encodeURIComponent(JSON.stringify(del_marker_arr))); 

    $("#look_form").submit();

});

$("#marker_class tr:even").css("background-color", "#cccccc");

/*
* To create a new look url, for urlkey on save
*/
$("select[name='select_room']").change(function(){
  $("input[name='room_name']").val($(this).find(":selected").text());
});

$("select[name='style']").change(function(){
  $("input[name='style_name']").val($(this).find(":selected").text());
});

/*============================*/

/*=============Marker Table ==============*/
 $('.service_unit').prop('disabled', true);

 $('input[name="serviceable[]"]:checked').each(function () {
    $(this).closest('tr').find('.service_unit').removeAttr('disabled');
 });

$('input[name="serviceable[]"]').on('change', function(){

    service_mark_id     = $(this).closest('tr').data('mrk');
    service_prod_indx   = $(this).closest('tr').data('indx');

    if($(this).prop('checked') === true){ 

        $(this).closest('tr').find('.service_unit').removeAttr('disabled');
        if($(this).closest('tr').find('.service_unit').val() != ''){                 
            $.extend(markers_parent_arr[service_mark_id][service_prod_indx], {'serviceable': $(this).closest('tr').find('.service_unit').val()});
        }
    }else{
         $(this).closest('tr').find('.service_unit').prop('selectedIndex',0);
        $(this).closest('tr').find('.service_unit').prop('disabled', true);
        $.extend(markers_parent_arr[service_mark_id][service_prod_indx], {'serviceable': ''}); 

    }

});

//
$('.service_unit').on('change', function(){

    if($(this).val() != ''){          
            service_mark_id     = $(this).closest('tr').data('mrk');
            service_prod_indx   = $(this).closest('tr').data('indx');
            $.extend(markers_parent_arr[service_mark_id][service_prod_indx], {'serviceable': $(this).closest('tr').find('.service_unit').val()});
      
    }
});



/*=============Marker Table ==============*/
