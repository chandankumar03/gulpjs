$(document).ready(function(){
	tinyMCE.init({
		// General options
		//mode : "textareas",
  		mode   : "specific_textareas",
  		editor_selector : "mceEditor",
		theme : "advanced",
		//plugins : "safari,advlink,imagemanager,autolink,lists,pagebreak,style,layer,table,save,advhr,advimage,advlink,emotions,iespell,inlinepopups,insertdatetime,preview,media,searchreplace,print,contextmenu,paste,directionality,fullscreen,noneditable,visualchars,nonbreaking,xhtmlxtras,template,wordcount,advlist,autosave,visualblocks",
		plugins : "safari,advlink,imagemanager,autolink,lists,pagebreak,style,layer,table,save,advhr,advimage,advlink,iespell,inlinepopups,preview,media,searchreplace,contextmenu,paste,directionality,noneditable,visualchars,nonbreaking,xhtmlxtras,template,wordcount,advlist,visualblocks",

		// Theme options
		//theme_advanced_buttons1 : "link,insertimage,|,code,save,newdocument,|,bold,italic,underline,strikethrough,|,justifyleft,justifycenter,justifyright,justifyfull,styleselect,formatselect",
		//theme_advanced_buttons2 : "cut,copy,paste,pastetext,pasteword,|,search,replace,|,bullist,numlist,|,outdent,indent,blockquote,|,undo,redo,|,link,unlink,anchor,image,cleanup,help,code,|,preview,",
		//theme_advanced_buttons3 : "tablecontrols,|,hr,removeformat,visualaid,|,sub,sup,|,charmap,emotions,iespell,media,advhr,|,print,|,ltr,rtl,|,fullscreen",
		//theme_advanced_buttons4 : "insertlayer,moveforward,movebackward,absolute,|,styleprops,|,cite,abbr,acronym,del,ins,attribs,|,visualchars,nonbreaking,template,pagebreak,restoredraft,visualblocks",
		
		theme_advanced_buttons1 : "bold,italic,underline|,justifyleft,justifycenter,justifyright,justifyfull,cut,copy,paste,pastetext,pasteword,|,search,replace,|,bullist,numlist,|,outdent,indent,blockquote,|,undo,redo",
		theme_advanced_buttons2 : "|,preview,tablecontrols,|,hr,removeformat,visualaid,|,sub,sup,|,iespell,advhr,|nonbreaking,",
		theme_advanced_buttons3 : "",
		theme_advanced_buttons4 : "",
		
		theme_advanced_toolbar_location : "top",
		theme_advanced_toolbar_align : "left",
		theme_advanced_statusbar_location : "bottom",
		theme_advanced_resizing : true,
		convert_urls : false,
		relative_urls: false,
		valid_elements : '+*[*]',
		
		// Example content CSS (should be your site CSS)
		//content_css : "/css/content.css",

		// Drop lists for link/image/media/template dialogs
		template_external_list_url : "/js/tiny_mce/template_list.js",
		external_link_list_url : "/js/tiny_mce/link_list.js",
		external_image_list_url : "/js/tiny_mce/image_list.js",
		media_external_list_url : "/js/tiny_mce/media_list.js",

		// Style formats
		style_formats : [
			{title : 'Bold text', inline : 'b'},
			{title : 'Red text', inline : 'span', styles : {color : '#ff0000'}},
			{title : 'Red header', block : 'h1', styles : {color : '#ff0000'}},
			{title : 'Example 1', inline : 'span', classes : 'example1'},
			{title : 'Example 2', inline : 'span', classes : 'example2'},
			{title : 'Table styles'},
			{title : 'Table row 1', selector : 'tr', classes : 'tablerow1'}
		],

		// Replace values for the template plugin
		template_replace_values : {
			username : "Some User",
			staffid : "991234"
		}
	});
});


$("#btnDraft").click(function(){
	tinyMCE.triggerSave();
	var $data = {'draft' : $.trim($("#txtDraft").val()),'name' : $.trim($("#txtName").val()), 'description' : $.trim($("#txtDescription").val())};
	$.ajax({
		type: "POST",
		url: "/product_cms/save_draft/" + listing_id,
		data: $data,
		 beforeSend: function() {
			 $("#div-inner-error-messages").empty();
			 $("#div-error-messages").hide();
			 $("#div-success-messages").empty();
			 $("#div-success-messages").hide();
			 $("#div-loader-wait").show();
		},
		success: function(){
			
		},
		complete: function(r){
			$("#div-loader-wait").hide();
			var ret = $.parseJSON(r.responseText);
			
			if(ret.error) {
				for(var x in ret['error']) {
					for(var y in ret['error'][x]) {
						$("#div-inner-error-messages").append(ret['error'][x][y]);
					}
				}
				$("#div-error-messages").show();
			}
			
			if(ret.success) {
				$("#div-success-messages").append(ret.success);
				$("#div-success-messages").show();
			}
			
			if(ret.redirect) {
				setTimeout(function(){
					_redirect(ret.redirect);
				}, 1000);
			}
		},
		error: function(r) {
			//console.log(r);
		}
	});
});

$("#btnSave").click(function(){
	tinyMCE.triggerSave();
	
	var error = false;
	var msg = '';
	
	if($.trim($("#txtDescription").val()).length == 0) {
		msg += 'Please make sure description is not empty\n';
		error = true;
	}
	
	if($.trim($("#txtDescription").val()).length < 300) {
		msg += 'Please make sure description is of minimum 300 characters. Current charachter count ' + $.trim($("#txtDescription").val()).length + ' \n';
		error = true;
	}
	
	if($.trim($("#txtName").val()).length == 0) {
		msg += 'Please make sure name is not empty\n';
		error = true;
	}
	
	if($.trim($("#txtName").val()).length < 10) {
		msg += 'Please make sure name is more than 9 charachters\n';
		error = true;
	}
	
	if(error == false) {
		var $data = {'name' : $.trim($("#txtName").val()), 'description' : $.trim($("#txtDescription").val())};
		$.ajax({
			type: "POST",
			url: "/product_cms/save/" + listing_id,
			data: $data,
			 beforeSend: function() {
				 $("#div-inner-error-messages").empty();
				 $("#div-error-messages").hide();
				 $("#div-success-messages").empty();
				 $("#div-success-messages").hide();
				 $("#div-loader-wait").show();
			},
			success: function(){
				
			},
			complete: function(r){
				$("#div-loader-wait").hide();
				var ret = $.parseJSON(r.responseText);
				
				if(ret.error) {
					for(var x in ret['error']) {
						for(var y in ret['error'][x]) {
							$("#div-inner-error-messages").append(ret['error'][x][y]);
						}
					}
					$("#div-error-messages").show();
				}
				
				if(ret.success) {
					$("#div-success-messages").append(ret.success);
					$("#div-success-messages").show();
				}
				
				if(ret.redirect) {
					setTimeout(function(){
						_redirect(ret.redirect);
					}, 1000);
				}
			},
			error: function(r) {
				//console.log(r);
			}
		});
		
	} else {
		alert(msg);
	}
});

$("#btnApprove").click(function(){
	tinyMCE.triggerSave();
	var error = false;
	var msg = '';
	if( $.trim($("#drpRating").val()) == '') {
		error = true;
		msg += 'Please select a rating to approve\n';
	} else if( $.trim($("#drpRating").val()) == '3' && $.trim($("#txtExtraComments").val()).length == 0) {
		msg += 'Please enter your reason for rejection\n';
		error = true;
	}
	
	if($.trim($("#txtDescription").val()).length == 0) {
		msg += 'Please make sure description is not empty\n';
		error = true;
	}
	
	if($.trim($("#txtDescription").val()).length < 300) {
		msg += 'Please make sure description is of minimum 300 characters. Current charachter count ' + $.trim($("#txtDescription").val()).length + ' \n';
		error = true;
	}
	
	if($.trim($("#txtName").val()).length == 0) {
		msg += 'Please make sure name is not empty\n';
		error = true;
	}
	
	if($.trim($("#txtName").val()).length < 10) {
		msg += 'Please make sure name is more than 9 charachters\n';
		error = true;
	}
	
	if(error == false) {
		var $data = {'rating' : $.trim($("#drpRating").val()), 'extra_comments' : $.trim($("#txtExtraComments").val()),
					'name' : $.trim($("#txtName").val()), 'description' : $.trim($("#txtDescription").val()) };
		$.ajax({
			type: "POST",
			url: "/product_cms/approve/" + listing_id,
			data: $data,
			 beforeSend: function() {
				 $("#div-inner-error-messages").empty();
				 $("#div-error-messages").hide();
				 $("#div-success-messages").empty();
				 $("#div-success-messages").hide();
				 $("#div-loader-wait").show();
			},
			success: function(){
				
			},
			complete: function(r){
				$("#div-loader-wait").hide();
				var ret = $.parseJSON(r.responseText);
				
				if(ret.error) {
					for(var x in ret['error']) {
						for(var y in ret['error'][x]) {
							$("#div-inner-error-messages").append(ret['error'][x][y]);
						}
					}
					$("#div-error-messages").show();
				}
				
				if(ret.success) {
					$("#div-success-messages").append(ret.success);
					$("#div-success-messages").show();
				}
				
				if(ret.redirect) {
					setTimeout(function(){
						_redirect(ret.redirect);
					}, 100);
				}
			},
			error: function(r) {
				//console.log(r);
			}
		});
		
	} else {
		alert(msg);
	}
});

$("#btnBack").click(function(){
	_redirect('/product_cms/listings');
});

$("#drpRating").change(function(){
	$("#txtExtraComments").val("");
	if(this.value == 3) {
		$("#txtExtraComments").show();
	} else {
		$("#txtExtraComments").hide();
	}
})

function _redirect(url) {
	window.location.replace(url);
}