var hit = 0;
var body;

(function () {
    var status = $('#status');

    $('form').ajaxForm({
        beforeSend: function (xhr) {
            if (confirm('This will upload the file for refund processing.\n\nDo you wish to continue?')) {
                status.empty();
                $('#output').empty();
                body = '';
                $("#check-data").val('Please wait...............');
                $("#check-data").attr("disabled", true);
                $('#dwd').hide();
                $('#processRefundbtn').hide();
                $('#abortBtn').hide();
            } else {
                xhr.abort();
            }
        },
        success: function () {
            $("#bulk").empty();
        },
        complete: function (xhr) {
            status.empty();
            var res = $.parseJSON(xhr.responseText);

            if (res.error) {
                status.removeClass('success').addClass('error');
                status.append("Please rectify the below mentioned errors.<br /></br />");
                scan(res.error);
                status.append(body + "<br />");
                $("#check-data").val('Upload Refund File');
                $("#check-data").attr("disabled", false);
                hit = 0;
            } else if (res.success) {
                status.removeClass('error').addClass('success');
                //for(var i in res.success.message) {
                status.append(res.success.message + "<br />");
                //}

                hit = 1;
                $("#check-data").show();
                $("#check-data").val('Upload Refund File');
                $("#check-data").attr("disabled", false);

                $('#output').html(res.success.data);
                $('#dwd').show();
                $('#processRefundbtn').show();
                $('#abortBtn').show();
                $('#d_key').val(res.success.key);
                $('#d_filename').val(res.success.filename);
            } else {
                status.removeClass('success').removeClass('error');
                status.empty();
                $("#check-data").val('Upload Refund File');
                $("#check-data").attr("disabled", false);
                $("#check-data").show();
                alert("Please try again");
            }
        },
        error: function (t) {
            console.log(t);
        }
    });

    $('#dwd').on('click', function () {
        window.open(ROOT_URL + '/sales_uploadbulkrefund/download/' + $('#d_key').val());
    });

    $('#abortBtn').on('click', function () {
        if (confirm('Are you sure?')) {
            $('#processRefundbtn').hide();
            $('#abortBtn').hide();
            location.href = location.href;
        }
    });

    $('#processRefundbtn').on('click', function () {
        if (confirm('Refund processing.\n\nDo you wish to continue?')) {
                        
            var url = ROOT_URL + "/sales_uploadbulkrefund/processRefund"; 
            var data = "file="+$('#d_filename').val();            
            $.ajax({
                type: "POST",
                url: url,
                data: data,
                beforeSend: function () {
                    $('#dwd').hide();
                    $('#abortBtn').hide();
                    $('#processRefundbtn').hide();
                    timer = setTimeout('getProgress()',5000);
                },
                success: function () {
                    clearTimeout(timer);
                },
                complete: function (xhr) {
                    status.empty();
                    status.append(xhr.responseText + "<br />");   
                },
                error: function (t) {
                    console.log(t);
                }
            });
        } else {
            return false;
        }
    });

})();

function scan(obj) {
    var k;
    if (obj instanceof Object) {
        for (k in obj) {
            if (obj.hasOwnProperty(k)) {
                if (k instanceof String) {
                    body += 'scanning property ' + k + '<br /> ';
                }
                scan(obj[k]);
            }
        }
    } else {
        body += ' ' + obj + '<br/><br />';
    }
}