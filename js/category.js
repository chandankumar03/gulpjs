function loadtinty()
{
	tinyMCE.init({
			//mode : "textareas",
			mode : "specific_textareas",
			editor_selector : "mceEditor",
			//mode : "none",
			theme : "advanced",
			plugins : "autolink,lists,spellchecker,pagebreak,style,layer,table,save,advhr,advimage,advlink,emotions,iespell,inlinepopups,insertdatetime,preview,media,searchreplace,print,contextmenu,paste,directionality,fullscreen,noneditable,visualchars,nonbreaking,xhtmlxtras,template",

			theme_advanced_buttons1 : "bold,italic,underline,strikethrough,|,justifyleft,justifycenter,justifyright,justifyfull,|,styleselect,formatselect,fontselect,fontsizeselect",
			theme_advanced_buttons2 : "cut,copy,paste,pastetext,pasteword,|,search,replace,|,bullist,numlist,|,outdent,indent,blockquote,|,undo,redo,|,link,unlink,anchor,image,cleanup,help,code,|,insertdate,inserttime,preview,|,forecolor,backcolor",
			theme_advanced_buttons3 : "tablecontrols,|,hr,removeformat,visualaid,|,sub,sup,|,charmap,emotions,iespell,media,advhr,|,print,|,ltr,rtl,|,fullscreen",
			theme_advanced_buttons4 : "insertlayer,moveforward,movebackward,absolute,|,styleprops,spellchecker,|,cite,abbr,acronym,del,ins,attribs,|,visualchars,nonbreaking,template,blockquote,pagebreak,|,insertfile,insertimage",
			theme_advanced_toolbar_location : "top",
			theme_advanced_toolbar_align : "left",
			theme_advanced_resizing : true,

			// Skin options
			skin : "o2k7",
			skin_variant : "silver",

			// Example content CSS (should be your site CSS)
			content_css : "css/example.css",

			// Drop lists for link/image/media/template dialogs
			template_external_list_url : "js/template_list.js",
			external_link_list_url : "js/link_list.js",
			external_image_list_url : "js/image_list.js",
			media_external_list_url : "js/media_list.js"
		});
}
function alpha(evt)
 {
        var charCode = (evt.which) ? evt.which : event.keyCode;
        //if (charCode == 8 || charCode==39 || charCode==95 || ( charCode>=48 && charCode<=57) || (charCode>=65 && charCode<=90) || (charCode>=97 && charCode<=122)) {
        if (charCode == 8 || charCode == 32 || charCode==39 || charCode==95 || (charCode>=65 && charCode<=90) || (charCode>=97 && charCode<=122)) {
        return true;
        }
        else {
            return false;
        }
}

$(document).ready(function(){
		var currentTime = new Date();
		var day = currentTime.getDate();
		var month = currentTime.getMonth() + 1;
		var year = currentTime.getFullYear();
		var today_date = year + "/" + month + "/" + day;


		//console.log($tree);

		$('.cat_type').click(function()
		{
			var val=this.id;
			if (val=='child')
			{
				$("#cat_opt").css("display", "block");
				$("#chnmap").css("display", "none");
				$('#new_map_cat_opt').css("display","none");

				var attr_name_id=$("#attr_name_id").val();
				$('#myform').find(':input').each(function() {
					if(this.type!='button')
					 {
						$(this).val('');
					 }
				});
				//$("#main_cat option").remove();
				$("#sub_cat option").remove();
				$("#sub_subcat option").remove();
				$("#final_cat option").remove();
				$('#submit').val('Save Category');
				$('#delete').hide();
				catid = 0;
				$("#attr_name_id").val(attr_name_id);
				$(this).val('child');
				$("#h3-title-cat").html("Add New Category");
			}
			else if(val=='new')
			{
				$("#cat_opt").css("display", "none");
				$("#chnmap").css("display", "none");
				$('#new_map_cat_opt').css("display","none");

				var attr_name_id=$("#attr_name_id").val();
				$('#myform').find(':input').each(function() {
					 if(this.type!='button')
					 {
						$(this).val('');
					 }
				});
				$('#submit').val('Save Category');
				$('#delete').hide();
				catid = 0;
				$("#attr_name_id").val(attr_name_id);
				$(this).val('new');
				$("#h3-title-cat").html("Add New Category");
			}
			else if(val=='edit')
			{
				$("#cat_opt").css("display", "block");
				$("#chnmap").css("display", "block");
				$('#new_map_cat_opt').css("display","none");

				var attr_name_id=$("#attr_name_id").val();
				$('#myform').find(':input').each(function() {
					 if(this.type!='button')
					 {
						$(this).val('');
					 }
				});
				$("#sub_cat option").remove();
				$("#sub_subcat option").remove();
				$("#final_cat option").remove();
				$('#submit').val('Update Category');
				catid=0;
				$('#delete').show();
				$("#attr_name_id").val(attr_name_id);
				$(this).val('edit');
				$("#h3-title-cat").html("Add New Category");
			}
		});

		$('#chnmap').click(function(){
			$('#new_map_cat_opt').css("display","block");
		});
		$( ".date_input_first" ).datepicker();
		$("#new").attr('checked',true);;
		/*
		$('#tabs div').hide();
		$('#tabs div:first').show();
		$('#tabs ul li:first').addClass('active');

		$('#tabs ul li a').click(function()
		{
			$('#tabs ul li').removeClass('active');
			$(this).parent().addClass('active');
			var currentTab = $(this).attr('href');
			$('#tabs div').hide();
			$(currentTab).show();
			return false;
		});
*/
		$( "#tabs" ).tabs();
		$('.load').click(function()
		{
			loadtinty();
			$(this).attr("disabled", true);
		});
		$('.toggle').click(function()
		{
			tinymce.execCommand('mceToggleEditor',false,this.name);
		});



		$("#main_cat").change(function()
		{
			if($("#main_cat").val()!="") {
				$("#h3-title-cat").html($("#main_cat option:selected").text() + " (" + $("#main_cat").val() + ")");
				catid=$("#main_cat").val();
			}
			var cat_id=$(this).val();
			var val = $('.cat_type:checked').attr('id');
			var attr_name_id=$('#attr_name_id').val();
			if(cat_id!='' && !isNaN(cat_id))
			{
				$("#sub_subcat option").remove();
				$("#final_cat option").remove();
				$.ajax({
						type: 'POST',
						url: $url + 'ajaxCategory',
						data: {Ajax_catid:$(this).val(),option:1,attr_name_id:attr_name_id},
						dataType:"json",
						async: false,
						success: function(resulthtml)
						{
							$("#sub_cat option").remove();
							$('#sub_cat').append( new Option('Select Sub Category',''));
                                                        //console.log(resulthtml);
							if(resulthtml)
							{
								$.each(resulthtml,function(my1,my2){
									$('#sub_cat').append( new Option(my2,my1) );
								});
							}
						},
						error: function(message)
						{
							$("#sub_cat option").remove();
							$('#sub_cat').append( new Option('No data',''));
						}
					});

				if(val=='edit')
				{
					$.ajax({
							type: 'POST',
							url: $url + 'ajaxCategory',
							data: {Ajax_catid:$(this).val(),data:1},
							dataType:"json",
							async: false,
							success: function(resulthtml)
							{
								if(resulthtml)
								{
									$('#tab-1 input').val(''); $('#tab-2 input').val(''); $('#tab-3 input').val('');
									$('.load').val('Load Editor');
									$('.toggle').val('Open / Close Editor');
									$.each(resulthtml,function(my1,my2){
										$("#"+my1).val(my2);
									});
								}
							},
							error: function(message)
							{
								alert('error');
							}
						});
				}
			} else {
				$("#sub_cat option").remove();
				$("#sub_subcat option").remove();
				$("#final_cat option").remove();
				$("#h3-title-cat").html("Add New Category");
				/*
				 * Clear the form.
				*/
			}
		});
		$("#sub_cat").change(function(){
			if($("#sub_cat").val()!="") {
				$("#h3-title-cat").html($("#sub_cat option:selected").text() + " (" + $("#sub_cat").val() + ")");
				catid=$("#sub_cat").val();
			}
				var cat_id=$(this).val();
				var val = $('.cat_type:checked').attr('id');
				var attr_name_id=$('#attr_name_id').val();
				if(cat_id!='' && !isNaN(cat_id))
				{
					$("#final_cat option").remove();
					$.ajax({
							type: 'POST',
							url: $url + 'ajaxCategory',
							data: {Ajax_catid:$(this).val(),option:1,attr_name_id:attr_name_id},
							dataType:"json",
							async: false,
							success: function(resulthtml)
							{
								$("#sub_subcat option").remove();
								$('#sub_subcat').append( new Option('Select Sub Sub Category',''));
								if(resulthtml)
								{
									$.each(resulthtml,function(my1,my2){
										$('#sub_subcat').append( new Option(my2,my1) );
									});
								}
							},
							error: function(message)
							{
								$("#sub_subcat option").remove();
								$('#sub_subcat').append( new Option('No data',''));
							}
						});

					if(val=='edit')
					{
						$.ajax({
							type: 'POST',
							url: $url + 'ajaxCategory',
							data: {Ajax_catid:$(this).val(),data:1},
							dataType:"json",
							async: false,
							success: function(resulthtml)
							{
								if(resulthtml)
								{
									$('#tab-1 input').val(''); $('#tab-2 input').val(''); $('#tab-3 input').val('');
									$('.load').val('Load Editor');
									$('.toggle').val('Open / Close Editor');
									$.each(resulthtml,function(my1,my2){
										$("#"+my1).val(my2);
									});
								}
							},
							error: function(message)
							{
								alert('error');
							}
						});
					}
				} else {
					$("#sub_subcat option").remove();
					$("#final_cat option").remove();
					if($("#main_cat").val()!="") {
						$("#h3-title-cat").html($("#main_cat option:selected").text() + " (" + $("#main_cat").val() + ")");
						$("#main_cat").trigger('change');
					} else {
						$("#h3-title-cat").html("Add New Category");
					}
				}

			});
		$("#sub_subcat").change(function(){
			if($("#sub_subcat").val()!="") {
				$("#h3-title-cat").html($("#sub_subcat option:selected").text() + " (" + $("#sub_subcat").val() + ")");
				catid=$("#sub_subcat").val();
			}
				var cat_id=$(this).val();
				var val = $('.cat_type:checked').attr('id');
				var attr_name_id=$('#attr_name_id').val();
				if(cat_id!='' && !isNaN(cat_id))
				{
					$.ajax({
							type: 'POST',
							url: $url + 'ajaxCategory',
							data: {Ajax_catid:$(this).val(),option:1,attr_name_id:attr_name_id},
							dataType:"json",
							async: false,
							success: function(resulthtml)
							{
								$("#final_cat option").remove();
								$('#final_cat').append( new Option('Select Final Category',''));
								if(resulthtml)
								{
									$.each(resulthtml,function(my1,my2){
										$('#final_cat').append( new Option(my2,my1) );
									});
								}
							},
							error: function(message)
							{
								$("#final_cat option").remove();
								$('#final_cat').append( new Option('No data',''));
							}
						});

					if(val=='edit')
					{
						$.ajax({
							type: 'POST',
							url: $url + 'ajaxCategory',
							data: {Ajax_catid:$(this).val(),data:1},
							dataType:"json",
							async: false,
							success: function(resulthtml)
							{
								if(resulthtml)
								{
									$('#tab-1 input').val(''); $('#tab-2 input').val(''); $('#tab-3 input').val('');
									$('.load').val('Load Editor');
									$('.toggle').val('Open / Close Editor');
									$.each(resulthtml,function(my1,my2){
										$("#"+my1).val(my2);
									});
								}
							},
							error: function(message)
							{
								alert('error');
							}
						});
					}
				} else {
					$("#final_cat option").remove();
					if($("#sub_cat").val()!="") {
						$("#h3-title-cat").html($("#sub_cat option:selected").text() + " (" + $("#sub_cat").val() + ")");
						$("#sub_cat").trigger('change');
					}
				}
			});

			$("#final_cat").change(function(){
				if($("#final_cat").val()!="") {
					$("#h3-title-cat").html($("#final_cat option:selected").text() + " (" + $("#final_cat").val() + ")");
					catid=$("#final_cat").val();
				}
				var cat_id=$(this).val();
				var val = $('.cat_type:checked').attr('id');
				var attr_name_id=$('#attr_name_id').val();
				if(cat_id!='' && !isNaN(cat_id))
				{
					if(val=='edit')
					{
						$.ajax({
							type: 'POST',
							url: $url + 'ajaxCategory',
							data: {Ajax_catid:$(this).val(),data:1,attr_name_id:attr_name_id},
							dataType:"json",
							async: false,
							success: function(resulthtml)
							{
								if(resulthtml)
								{
									$('#tab-1 input').val(''); $('#tab-2 input').val(''); $('#tab-3 input').val('');
									$('.load').val('Load Editor');
									$('.toggle').val('Open / Close Editor');
									$.each(resulthtml,function(my1,my2){
										$("#"+my1).val(my2);
									});
								}
							},
							error: function(message)
							{
								alert('error');
							}
						});
					}
				} else {
					if($("#sub_subcat").val()!="") {
						$("#h3-title-cat").html($("#sub_subcat option:selected").text() + " (" + $("#sub_subcat").val() + ")");
						$("#sub_subcat").trigger('change');
					}
				}
			});

		// js for change category mapping functionality start
		$("#new_map_cat").change(function()
		{
			var cat_id=$(this).val();
			var attr_name_id=$('#attr_name_id').val();
			if(cat_id!='' && !isNaN(cat_id))
			{
				$("#new_map_subsubcat option").remove();
				$("#new_map_finalcat option").remove();
				$.ajax({
						type: 'POST',
						url: $url + 'ajaxCategory',
						data: {Ajax_catid:$(this).val(),option:1,attr_name_id:attr_name_id},
						dataType:"json",
						async: false,
						success: function(resulthtml)
						{
							$("#new_map_subcat option").remove();
							$('#new_map_subcat').append( new Option('Select Sub Category',''));
							if(resulthtml)
							{
								$.each(resulthtml,function(my1,my2){
									$('#new_map_subcat').append( new Option(my2,my1) );
								});
							}
						},
						error: function(message)
						{
							$("#new_map_subcat option").remove();
							$('#new_map_subcat').append( new Option('No data',''));
						}
					});
			} else {
				$("#new_map_subcat option").remove();
				$("#new_map_subsubcat option").remove();
				$("#new_map_finalcat option").remove();
			}
		});
		$("#new_map_subcat").change(function(){
				var cat_id=$(this).val();
				var attr_name_id=$('#attr_name_id').val();
				if(cat_id!='' && !isNaN(cat_id))
				{
					$("#new_map_finalcat option").remove();
					$.ajax({
							type: 'POST',
							url: $url + 'ajaxCategory',
							data: {Ajax_catid:$(this).val(),option:1,attr_name_id:attr_name_id},
							dataType:"json",
							async: false,
							success: function(resulthtml)
							{
								$("#new_map_subsubcat option").remove();
								$('#new_map_subsubcat').append( new Option('Select Sub Sub Category',''));
								if(resulthtml)
								{
									$.each(resulthtml,function(my1,my2){
										$('#new_map_subsubcat').append( new Option(my2,my1) );
									});
								}
							},
							error: function(message)
							{
								$("#new_map_subsubcat option").remove();
								$('#new_map_subsubcat').append( new Option('No data',''));
							}
						});
				} else {
					$("#new_map_subsubcat option").remove();
					$("#new_map_finalcat option").remove();
				}
			});
		$("#new_map_subsubcat").change(function(){
				var cat_id=$(this).val();
				var attr_name_id=$('#attr_name_id').val();
				if(cat_id!='' && !isNaN(cat_id))
				{
					$.ajax({
							type: 'POST',
							url: $url + 'ajaxCategory',
							data: {Ajax_catid:$(this).val(),option:1,attr_name_id:attr_name_id},
							dataType:"json",
							async: false,
							success: function(resulthtml)
							{
								$("#new_map_finalcat option").remove();
								$('#new_map_finalcat').append( new Option('Select Final Category',''));
								if(resulthtml)
								{
									$.each(resulthtml,function(my1,my2){
										$('#new_map_finalcat').append( new Option(my2,my1) );
									});
								}
							},
							error: function(message)
							{
								$("#new_map_finalcat option").remove();
								$('#new_map_finalcat').append( new Option('No data',''));
							}
						});
				} else {
					$("#new_map_finalcat option").remove();
				}
			});
		// js for change category mapping functionality end

		/*
		$("#name").keypress(function(event)
		{
			return alpha(event);
		});
*/
		$("#myform").submit(function()
		{
			var err=false;
			var is_active=$("#is_active").val();
			var incl=$("#include_in_menu").val();
			var name = $.trim($("#name").val());
			if(name == "")
			{
				err=true;
				$("#nameMsg").html('This Is Required Field');
			}
			if(err==true)
			{
				return false;
			}
		});

		$('#delete').on('click', function(){
			if(catid > 0) {
				$.ajax({
					type: 'POST',
					url: $url + 'delete',
					data: {catid:catid},
					dataType:"json",
					async: false,
                                        beforeSend : function(){
                                            $('#notices').text("Loading , plese wait ...........").css("display","block");
                                        },
					success: function(response)
					{
						if(response.failed) {
                                                    alert(response.failed);
                                                    $('#notices').text("");
						} else {
                                                    //alert(response.success);
                                                    $('#notices').text(response.success);
                                                    for(i=0;i<2;i++) {
                                                        $('#notices').fadeTo('slow', 0.5).fadeTo('slow', 1.0);
                                                    }
                                                    $('#notices').fadeOut( 'slow' );

                                       //            var res = $.parseJSON($cat_parent);
                                       //            $parent_id=res[catid];//get parent of deletedcat
                                       //            getnewCategory($parent_id,0);

                                                    $parent_id = response.pid;//get parent of deleted node
                                                    initExtJSTree(response.pid);
                                                    /*to set parent data in form */
                                                    $.ajax({
                                                            type: 'POST',
                                                            url: $url + 'ajaxCategory',
                                                            data: {Ajax_catid:$parent_id,data:1,attr_name_id:0},
                                                            dataType:"json",
                                                            async: false,
                                                            success: function(resulthtml)
                                                            {
                                                                    if(resulthtml)
                                                                    {
                                                                            $('#tab-1 input').val(''); $('#tab-2 input').val(''); $('#tab-3 input').val('');
                                                                            $('.load').val('Load Editor');
                                                                            $('.toggle').val('Open / Close Editor');
                                                                            $.each(resulthtml,function(my1,my2){
                                                                                    $("#"+my1).val(my2);
                                                                            });
                                                                            $("#h3-title-cat").html($("#name").val() + " (" + catid + ")");
                                                                    }
                                                            },
                                                            error: function(message)
                                                            {
                                                                    alert('error');
                                                            }
                                                    });
						}

					},
					error: function(message)
					{
						alert('BLAH');
					}
				});
			} else {
				alert('Select category to delete');
			}
		});
//		body += '<ul id=\'ul-'+ROOT_CATALOG+'\'><li ondrop="drop(event)" ondragover="allowDrop(event)" id=\'li-'+ROOT_CATALOG+'\' class="trees" ><span id=\''+ROOT_CATALOG+'\' href=\'javascript://\'>Root Catalog</span></li>';
//		body += '<ul id=\'root\' class=\'root droppable\'>';
//		scan($tree);
//		body += '</ul>';

                initExtJSTree();

		$('#tree-div').html(body);

		$("ul.trees").each(
			function() {
				var elem = $(this);
				if (elem.children().length == 0) {
					elem.show();
				}
			}
		);

		$($("ul.root").children(':last-child')).children('img.close').removeClass('close').addClass('close-end');
		$($("ul.root").children(':last-child')).children('img.x-tree-elbow').removeClass('x-tree-elbow').addClass('x-tree-elbow-end');

		/*
		$(  "#tree-div ul" ).sortable({
			placeholder: "ui-state-highlight",
			connectWith: "#tree-div ul",
			cursor: "move",
			items: "> li",

		});
		*/

		$(document).on('click','img.toggle', function(e){

			var cat_id = $(this).siblings(".opentree").prop('id');
			var child_e = '#ul-' + cat_id;
			if($(child_e).is(':visible')) {
				$(child_e).hide(); // hide the sibling
				if($(this).hasClass('open-end')) {
					$(this).addClass('close-end'); // add class to re-call the sibling
					$(this).removeClass('open-end');
				} else {
					$(this).addClass('close'); // add class to re-call the sibling
					$(this).removeClass('open');
				}
			} else {

				if($(child_e).parent().next().size() == 0) {
					var indents = $(child_e).find('li > span.x-tree-node-indent');
					var dLevel = parseInt($(child_e).data('level')) - 2;
					indents.each(function(key, value) {
						$(value).children().each(function(k, v){
							if($(v).data('level') == dLevel) {
								if($(v).hasClass('x-tree-elbow-line')) {
									$(v).addClass('x-tree-icon').removeClass('x-tree-elbow-line');
								}
							}
						});
					});

				}

				$($(child_e).children(':last-child')).children('img.close').removeClass('close').addClass('close-end');
				$($(child_e).children(':last-child')).children('img.x-tree-elbow').removeClass('x-tree-elbow').addClass('x-tree-elbow-end');
				/*$(child_e).children().each(function(i,e){
					var next = $(e).next();
					if(next.length == 0) {
						$(e).children('.close').removeClass('close').addClass('close-end');
						$(e).children('.x-tree-elbow').removeClass('x-tree-elbow').addClass('x-tree-elbow-end');

					}
				});*/

				if($(this).hasClass('close')) {
					$(this).addClass('open'); // add class to re-call close
					$(this).removeClass('close');
				} else {
					$(this).addClass('open-end');
					$(this).removeClass('close-end');
				}
				$(child_e).show(); // show the sibling
			}
			return false;
			//e.stopPropagation();

		});

		$(document).on('click','li.trees span', function(e){
			var cat_id = $(this).prop('id');
                        /*added by pradip*/
                        if(catid == 0)
                        {
                            catid=cat_id;
                        }
                        if(cat_id > ROOT_CATALOG)
                        {
                            $('#delete').css('display','block');
                            $('#submit').css('display','block');
                        }
                        else
                        {
                            $('#delete').css('display','none');
                            $('#submit').css('display','none');
                        }
                        catid=cat_id;
                        $('#'+$('#lastselected_cat').text()).css("background-color","");
                       /*end */
			//if(cat_id > ROOT_CATALOG) {
				$.ajax({
					type: 'POST',
					url: $url + 'ajaxCategory',
					data: {Ajax_catid:cat_id,data:1,attr_name_id:0},
					dataType:"json",
					async: false,
					success: function(resulthtml)
					{
						if(resulthtml)
						{
							$('#tab-1 input').val(''); $('#tab-2 input').val(''); $('#tab-3 input').val('');
							$('.load').val('Load Editor');
							$('.toggle').val('Open / Close Editor');
                                                        $('#btnSubcategory').attr('title',"add");
							$.each(resulthtml,function(my1,my2){
								$("#"+my1).val(my2);
							});
							$("#h3-title-cat").html($("#name").val() + " (" + cat_id + ")");
                                                        $('#'+cat_id).css("background-color","#f5d6c7");
                                                        $('#lastselected_cat').text(cat_id);
						}
					},
					error: function(message)
					{
						alert('error');
					}
				});
			//} else {
				//alert('Root Catalog is non-editable');
			//}

		});

		//$('img.toggle').click(function(e){});

		//$('li.trees a').on('click', function(e){});
		//$( "ul, li" ).disableSelection();
});

