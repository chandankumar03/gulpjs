var timer;
var hit = 0;
var body;
(function() {

	var bar = $('.bar');
	var percent = $('.percent');
	var status = $('#status');

	$('#behaviour').on('change', function(){
            //alert(this.value);
		if(this.value == "1") {
			$('form').prop('action', ROOT_URL + '/product_imageupload/imageupload');
		}
	});

	$('form').ajaxForm({
	    beforeSend: function() {
	    	status.empty();
	    	body = '';
	    	$("#check-imagedata").attr("disabled", true);
	    	$("#behaviour").attr("disabled", true);
	    	timer = setTimeout('getProgress()',5000);
	    },
	    success: function() {
	    	$("#bulk").empty();
	    	clearTimeout(timer);
	    },
		complete: function(xhr) {
			//status.html(xhr.responseText);
			status.empty();
			clearTimeout(timer);
			var res = $.parseJSON(xhr.responseText);
			if(res.error) {
				status.append("Please rectify the below mentioned errors.<br /></br />");
				//for(var i in res.error) {
				scan(res.error);
				status.append( body +"<br />");
				//}
				$("#check-imagedata").attr("disabled", false);
				$("#behaviour").attr("disabled", false);
				hit=0;
			}
			else if(res.success){
				for(var i in res.success) {
					status.append(res.success[i]+"<br />");
				}
				hit=1;
				$("#check-imagedata").hide();
				$("#imagesave-data").show();
			}
			else {
				alert("ZOIKS");
			}
		},
		error:function(t) {
			console.log(t);
		}
	});

	$("#imagesave-data").click(function(){
		if(hit==1) {
                        var behaviour_val=$('#behaviour').val();
                        var $url="";
                        if(behaviour_val == 1 || behaviour_val == 2)
                        {
                            $url = ROOT_URL + "/product_imageupload/save";
                        }
                        var $data = "action=" + $("#behaviour").val() + "&1=1&token="+$.trim($("#token").val());
			$.ajax({
				type: "POST",
				url: $url,
				data: $data,
				 beforeSend: function() {
				    status.empty();
				    $("#imagesave-data").attr("disabled", true);
			    	$("#behaviour").attr("disabled", true);
			    	timer = setTimeout('getProgress()',5000);
				},
				success: function(){
					clearTimeout(timer);
				},
				complete: function(xhr){
					//var time = Math.floor(new Date().getTime() / 1000);
					$("#behaviour").attr("disabled", false);
					$("#imagesave-data").attr("disabled", false);
					$("#check-imagedata").attr("disabled", false);
					$("#check-imagedata").show();
					$("#imagesave-data").hide();
					var res = $.parseJSON(xhr.responseText);
					$("#token").val(res.token);
					status.empty();
					status.append(res.message+"<br />");
					var download = '<a href="'+res.download+'" target="_blank"><b><u>Download Output</u></b></a>';
					status.append(download);
					hit=0; // change this to 0
				},
				error: function(t) {
					console.log(t);
				}
			});
		}
	});

	$('#download-data').click(function(){
		var download_url = ROOT_URL +'/product_imageupload/downloadData';
		$.ajax({
			type: "POST",
			url: download_url,
			success: function(result){
				var res = $.parseJSON(result);
				$('.message').html(res.message);
			},
			error: function(t) {
				console.log(t);
			}
		});
	})
})();

var memcache_error_count=1;
function getProgress(){
	var $url = ROOT_URL + "/product_bulk/progress";
	var status = $('#status');

	$.ajax({
		type: "POST",
		url: $url,
		data: "token="+ $.trim($("#token").val()) +"&1=1",
		success: function(){

		},
		complete: function(xhr){

			if(xhr.responseText=="error"){
				memcache_error_count++;
				if(memcache_error_count>10){
					clearTimeout(timer);
					return false;
				}
			}
			else {
				memcache_error_count=0;
				status.html(xhr.responseText);
			}
			timer= setTimeout('getProgress()',5000);
		}
	});

	//status.html("Checking data.. This will take some time.");
}

function scan(obj)
{
    var k;
    if (obj instanceof Object) {
        for (k in obj){
            if (obj.hasOwnProperty(k)){
                if(k instanceof String) {
                   body += 'scanning property ' + k + '<br /> ';
                }
                scan( obj[k] );
            }
        }
    } else {
        body += ' ' + obj + '<br/>';
    };
};
