var timer;
var hit = 0;
var body;

var SITE = SITE || {};

SITE.fileInputs = function() {
	var $this = $(this),
	$val = $this.val(),
	valArray = $val.split('\\'),
	newVal = valArray[valArray.length-1],
	$button = $this.siblings('.button'),
	$fakeFile = $this.siblings('.file-holder');
	if(newVal !== '') {
		$button.text('File Chosen');
		if($fakeFile.length === 0) {
			$button.after('<span class="file-holder">' + newVal + '</span>');
		} else {
			$fakeFile.text(newVal);
		}
	}
};

$(document).ready(function() {
	$('.file-wrapper input[type=file]').bind('change focus click', SITE.fileInputs);
});

(function() {
	var bar = $('.bar');
	var percent = $('.percent');
	var status = $('#status');

	$('form').ajaxForm({
	    beforeSend: function() {
	    	status.empty();
	    	body = '';
			$("#check-data").val('Please wait...............');
	    	$("#check-data").attr("disabled", true);
			$("#behaviour").attr("disabled", true);
	    },
	    success: function() {
	    	$("#bulk").empty();
	    	clearTimeout(timer);
	    },
		complete: function(xhr) {
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
			} else if(res.success) {
				for(var i in res.success) {
					status.append(res.success[i]);
				}
				hit=1;
				$("#check-data").hide();
				$("#save-data").show();
				$("#reset-data").show();
				$("#value").attr('disabled','disabled');
			} else {
				alert("Please try again.");
			}
		},
		error:function(t) {
			console.log(t);
		}
	});

	$("#reset-data").click(function(){
		$("#check-data").val('Check Data').removeAttr('disabled').show();
		$("#save-data").hide();
		$("#reset-data").hide();
		$("#value").attr('disabled',false);
		$("#behaviour").attr("disabled", false);
	});

	$("#save-data").click(function(){
		if(hit==1) {
			var $url = root_url + "/miscscript_uploadexceptionalremittance/save";
			var $data = "1=1&token="+$.trim($("#token").val());
			$.ajax({
				type: "POST",
				url: $url,
				data: $data,
				 beforeSend: function() {
				    status.empty();
				    $("#save-data").attr("disabled", true);
					$("#behaviour").attr("disabled", true);
					$("#save-data").val('Please wait...............');
					timer = setTimeout('getProgress()',5000);
				},
				success: function(result){

				},
				complete: function(xhr){
					var time = Math.floor(new Date().getTime() / 1000);
					$("#token").val(time);
					$("#behaviour").attr("disabled", false);
					$("#save-data").attr("disabled", false);
					$("#check-data").attr("disabled", false);
					$("#check-data").val('Check Data');
					$("#save-data").val('Save Data');
					$("#check-data").show();
					$("#save-data").hide();
					$("#reset-data").hide();
					$("#value").attr('disabled',false);
					var res = $.parseJSON(xhr.responseText);
					status.empty();
					status.append(res.message+"<br />");
					hit=0; // change this to 0
				},
				error: function(t) {
					console.log(t);
				}
			});
		}
	});
})();

function scan(obj) {
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