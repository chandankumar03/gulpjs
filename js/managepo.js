/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
$(document).ready(function(){ 
    
 $( ".date_input_first" ).datepicker({dateFormat: 'yy-mm-dd'});
 $('#rowlist').change(function(){          
        document.forms['polist'].submit();
    });
    $('#paymentrowlist').change(function(){          
        document.forms['paymentlist'].submit();
    });
    $('#ordersrowlist').change(function(){          
        document.forms['orderlist'].submit();
    });
    $('#invoicerowlist').change(function(){          
        document.forms['invoicelist'].submit();
    });
    $('#inwardrowlist').change(function(){          
        document.forms['inwardlist'].submit();
    });
    $('#agrnrowlist').change(function(){          
        document.forms['agrnlist'].submit();
    });
    $('.download').click(function(){
        $file_name = this.id;
        $query_str='filename='+$file_name;
        $.ajax({
                type: "POST",
                url:url+'/managepo/checkforFile',                
                data:$query_str,
                success:function(res){
                        $('#display').html(res);
                },
                error:function(xhr, error){
                      alert('download failed');
                }
        });
    });
});

