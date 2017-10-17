var curr_url = '';
function geturl(cat_id)
{
	$("#new_url_err").css("display", "none");
	$("#new_url_same").css("display", "none");
	$("#new_url_ext").css("display", "none");
	var url= root_url+"/miscscript_urlmapper/geturl";
	$.ajax({
	  type: "POST",
	  url: url,
	  data: { cat_id: cat_id}
	}).done(function( msg ) {
		document.getElementById('catid').innerHTML='Cat ID: '+cat_id;
		$("#url_div").css("display", "block");
		$("#old_url").html( msg );
		curr_url = $.trim(msg);
	});
}

function validate()
{
//alert("")
	var new_url = $.trim($("#new_url").val());
	var old_url = $.trim($("#old_url").val());
	var error="0";
	
	if(new_url=="")
	{
		$("#new_url_err").css("display", "block");
		$("#new_url_same").css("display", "none");
		$("#new_url_ext").css("display", "none");
		error="1";
		return false;
	}else if(old_url=="")
	{
		$("#old_url_err").css("display", "block");
		$("#old_url_same").css("display", "none");
		$("#old_url_ext").css("display", "none");
		error="1";
		return false;
	}
	else if(old_url==new_url)
	{
		$("#new_url_same").css("display", "block");
		$("#new_url_err").css("display", "none");
		$("#new_url_ext").css("display", "none");
		error="1";
		return false;
	}else if(old_url!="")
	{
		var ext=old_url.split(".");
		if($.trim(ext[1]) != "html")
		{
			$("#old_url_ext").css("display", "block");
			$("#old_url_same").css("display", "none");
			$("#old_url_err").css("display", "none");
			error="1";
			return false;
		}
	}
	else if(new_url!="")
	{
		if(new_url!='/')
		{
			var ext=new_url.split(".");
			if($.trim(ext[1]) != "html")
			{
				$("#new_url_ext").css("display", "block");
				$("#new_url_same").css("display", "none");
				$("#new_url_err").css("display", "none");
				error="1";
				return false;
			}
		}
	}
		
	if(error=="0")
	{
		$("#new_url_err").css("display", "none");
		$("#new_url_same").css("display", "none");
		$("#new_url_ext").css("display", "none");
		$("#old_url_ext").css("display", "none");
		$("#old_url_same").css("display", "none");
		$("#old_url_err").css("display", "none");
		$("#save").val("Please wait....");
		var url= root_url+"/miscscript_urlmapper/save_newurl";
		$.ajax({
		  type: "POST",
		  url: url,
		  data: { old_url: old_url, new_url:new_url}
		}).done(function( msg ) {
			$("#save").val("Save");
			$("#new_url").val("");
			$("#old_url").html("");
			$("#cat_id").val("select");
			$("#message").html(msg);
				
			/* $("#url_div").css("display", "block");
			$("#old_url").html( msg );
			curr_url = $.trim(msg); */
		});
	}
}