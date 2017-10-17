/* 
 *@Developed By : Shreenivas 
 *@Desc : For wardrobe, the static block js shifted here
 */


 $(function ()
 {
        if ($(window).width() > 1024)
        {
            $('#home-slide-next,#home-slide-prev').hide();
            $('#primo-slide-next,#primo-slide-prev').hide();
            $('#home-slide-show,#home-slide-next,#home-slide-prev').hover(function () {
                $('#home-slide-next,#home-slide-prev').show();
            }, function () {
                $('#home-slide-next,#home-slide-prev').hide();
            });
            $('.sliderprimo,#primo-slide-next,#primo-slide-prev').hover(function () {
                $('#primo-slide-next,#primo-slide-prev').show();
            }, function () {
                $('#primo-slide-next,#primo-slide-prev').hide();
            });
            $('#home-slide-show').cycle({
                slides: '> .home-slide-block',
                fx: 'scrollHorz',
                timeout: 000,
                speed: 800,
                manualSpeed: 800,
                pause: 1,
                slideResize: true,
                pauseOnHover: true
            });

            $('.sliderprimo').cycle({
                slides: '> .primo-wardrobe-slider-wrap',
                fx: 'scrollHorz',
                timeout: 000,
                speed: 800,
                manualSpeed: 800,
                pause: 1,
                slideResize: true,
                pauseOnHover: true,
                continueAuto: false
            });
                setTimeout(function() {
            var obj_slider_id, string_html, final_html,first_div_child;
            obj_slider_id = $("#home-slide-show");
            first_div_child = $(obj_slider_id).find('div:first');
            string_html = first_div_child.html();
            first_div_child.html('');
            final_html = '';
            if(typeof string_html !== "undefined" && string_html != "") {
                final_html = string_html.replace("autoplay=1", "autoplay=0");
            }
            first_div_child.html('');
            first_div_child.append(final_html);
         }, 500);  

        }
        else
        {
            $('#home-slide-show').cycle({
                slides: '> .home-slide-block',
                fx: 'scrollHorz',
                timeout: 0,
                speed: 800,
                manualSpeed: 800,
                pause: 1,
                slideResize: true,
                swipe: true
            });

            $('.sliderprimo').cycle({
                slides: '> .primo-wardrobe-slider-wrap',
                fx: 'scrollHorz',
                timeout: 000,
                speed: 800,
                manualSpeed: 800,
                pause: 1,
                slideResize: true,
                swipe: true,
                continueAuto: false
            });
           
           
        }
       
        $('#home-slide-show').on('cycle-next cycle-prev', function () {
            var data = $(this).data('cycle.opts');
            data.continueAuto = false;
        });
        $('.sliderprimo').on('cycle-next cycle-prev', function () {
            var data = $(this).data('cycle.opts');
            data.continueAuto = false;
        });
        $(document).on('click', '#home-slide-next', function () {
            $('#home-slide-show').cycle('next');
        });
        $(document).on('click', '#home-slide-prev', function () {
            $('#home-slide-show').cycle('prev');
        });
        $(document).on('click', '#primo-slide-next', function () {
            $('.sliderprimo').cycle('next');
        });
        $(document).on('click', '#primo-slide-prev', function () {
            $('.sliderprimo').cycle('prev');
        });
    });
    $('.home-slide-block.cycle-sentinel').css('zIndex', 90);
    $('.primo-wardrobe-slider-wrap.cycle-sentinel').css('zIndex', 90);
    $(document).ready(function () {
    if(recaptcha == 'VISIBLE'){
    $.ajax
    ({
        url: root_url+'/site_page/show_hide_captch',
            data:{"from_page":"primorati_wardrobe"},
        type: "POST",
        success: function(data)
            {
               if(data!="" && data==1)
               {
            $("#captcha_container").css("display","block");
//            $("#frm_wardrobe_6_letters_code").removeAttr('disabled');
            $("#txt_container").addClass("input-half");
                        $("#captcha_status").val(1);
           }
           else
        {
            $("#captcha_container").css("display","none");
//            $("#frm_wardrobe_6_letters_code").attr('disabled',true);
            $("#txt_container").removeClass("input-half");
            $("#txt_container_parent").removeClass("primorati-modular-captcha");
                        $("#captcha_status").val(0);
        }
              

             },
            error: function(x,y,z)
        {
             
            }
         });
        }
        $(function () {
            $('.guide-animated img:gt(0)').hide();
            setInterval(function () {
                $('.guide-animated :first-child').fadeOut(700).next('img').fadeIn(700).end().appendTo('.guide-animated');
            }, 3000);
        });

        /*$(function () {
        
         global_function.sliderHorizontal('.sliderprimo', '.primo-wardrobe-slider-wrap', 1, '.primo-nxt', '.primo-prev', 1);
        
         });*/


    });
   
    function primoratiSubmit(form_id)
    {
        $("#tokenErrorWadrobe").hide();
        var primorati_name = $.trim($('#' + form_id + '_name').val());
        var primorati_email = $.trim($('#' + form_id + '_email').val());
        var primorati_phone = $.trim($('#' + form_id + '_phone').val());
        var primorati_comment = $.trim($('#' + form_id + '_comment').val());
        var show_captcha=  $("#captcha_container").css("display");
       
        var errors = 0;
        var scroll = 0;
        if (primorati_name == "Name" || primorati_name == "")
        {
            $('#' + form_id + ' #nameError').html('Required').css('display', 'block').parent().addClass('input-error');
            if (scroll === 0) {
                $('#' + form_id + '_name').focus();
                scroll = 1;
            }
            errors = 1;
        }
        else
        {
            var nameFilter = /^[a-zA-Z]*$/;
          
            if (nameFilter.test(primorati_name))
            {               
                $('#' + form_id + ' #nameError').css('display', 'none').parent().removeClass('input-error');
            }
            else
            {       
                errors = 1;
                $('#' + form_id + ' #nameError').css('display', 'block').html('Letters Only');
                if (scroll === 0) {
                    $('#' + form_id + '_name').focus();
                    scroll = 1;
                }               
            }
        }

        if (primorati_email == "")
        {
            $('#' + form_id + ' #emailError').html('Required').css('display', 'block').parent().addClass('input-error');
            if (scroll === 0) {
                $('#' + form_id + '_email').focus();
                scroll = 1;
            }
            errors = 1;
        }
        else
        {
            var filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
            if (filter.test(primorati_email))
            {
                $('#' + form_id + ' #emailError').css('display', 'none').parent().removeClass('input-error');
            }
            else
            {
                $('#' + form_id + ' #emailError').html('Incorrect email ID').css('display', 'block').parent().addClass('input-error');
                if (scroll === 0)
                {
                    $('#' + form_id + '_email').focus();
                    scroll = 1;
                }
                errors = 1;
                
            }
        }

        if (primorati_phone == "")
        {
            $("#" + form_id + " #phoneError").html('Required').css('display', 'block').parent().addClass('input-error');
            if (scroll === 0) {
                $('#' + form_id + '_phone').focus();
                scroll = 1;
            }
            errors = 1;
        }
        else if (primorati_phone.length > 11 || primorati_phone.length < 10)
        {
            $("#" + form_id + " #phoneError").html('Enter Only Mobile Or Phone Number').css('display', 'block').parent().addClass('input-error');
            if (scroll === 0) {
                $('#' + form_id + '_phone').focus();
                scroll = 1;
            }
            errors = 1;
        }
        else
        {
            var numberFilter = /^[0-9]+$/;

            if (numberFilter.test(primorati_phone) && !(primorati_phone.charAt(0) == 0)) {
                $("#" + form_id + " #phoneError").css('display', 'none').parent().removeClass('input-error');
            }
            else
            {
                $("#" + form_id + " #phoneError").html('Invalid phone number').css('display', 'block').parent().addClass('input-error');
                if (scroll === 0) {
                    $('#' + form_id + '_phone').focus();
                    scroll = 1;
                }
                errors = 1;                
            }
        }

        if (primorati_comment == "Comment" || primorati_comment == "")
        {
            $("#" + form_id + " #commentError").html('Required').css('display', 'block').parent().addClass('input-error');
            if (scroll === 0) {
                $('#' + form_id + '_comment').focus();
                scroll = 1;
            }
            errors = 1;
        }
        else if (primorati_comment.length >= 256)
        {
            $("#" + form_id + " #commentError").html('Only 256 Character Allowed!!').css('display', 'block').parent().addClass('input-error');
            if (scroll === 0) {
                $('#' + form_id + '_comment').focus();
                scroll = 1;
            }
            errors = 1;            
        }
        else
        {
            $("#" + form_id + " #commentError").css('display', 'none').parent().removeClass('input-error');
        }

        if(recaptcha == 'VISIBLE' && show_captcha=="block") {
            var v = grecaptcha.getResponse(widgetId_Primo);
            if(v=="")
            {
                if($("#captcha_error").length>0)
                {
                    $("#captcha_error").html("Please re-enter your reCAPTCHA.").addClass("error-text");
                }
                else
                {
                    $("#captcha_container").after("<span id='captcha_error' class='error-text'>Please re-enter your reCAPTCHA.</span>");
                }
                errors=1;
            }    
        }
        else{
            if(!errors) {
                grecaptcha.execute(widgetId_Primo);
                //errors=1;
                /*if($.trim(isRecaptcha) != 'success'){
                    errors=1;
                    grecaptcha.reset(widgetId_Primo);
                }*/
            }

        }           
        //alert(errors); return false;
        if(recaptcha == 'VISIBLE') {
            if (errors == 0)
            {
                primoratiSubmitForm(form_id) 
            } else {
                 grecaptcha.reset(widgetId_Primo);
                $('#primorati_submit').removeAttr("disabled");
                PF.HEADER.removeBlueButtonLoader(form_id);
                $(".btn").removeAttr("disabled");
                return false;
            }
        }

    }

    function primoratiSubmitForm(form_id) {
        var formData = $("#" + form_id).serialize();           
            var path = root_url + "/site_page/primoratiFormSubmit";
            $.ajax({
                url: path,
                type: "POST",
                processData: false,
                cache: false,
                data: formData,
                beforeSend: function () {
                    PF.HEADER.addBlueButtonLoader(form_id);
                    $("#primorati_submit").prop('disabled', true);
                },
                success: function (data) {
                    if (data == "success")
                    {
                        $('.cs_thankyou_block_for_priorati').show(400);
                        $('.primo-form .primo-para, .primo-form .primo-heading').hide();
                        $('#primorati_form').hide(400);
                        PF.HEADER.removeBlueButtonLoader(form_id);
                        $("#primorati_form").remove();
                    }
                    else
                    {
                        $("#primorati_submit").prop('disabled', false);
                        var json_obj;
                        try {
                            json_obj = $.parseJSON(data);
                        } catch (e) {
                            json_obj = data;
                        }
                        $.each(json_obj, function (index, value) {
                            if(index=="frm_wardrobe_6_letters_code")
                            {
                                if($("#captcha_error").length>0)
                                {
                                    $("#captcha_error").html("Please re-enter your reCAPTCHA.").addClass("error-text");
                                }
                                else
                                {
                                    $("#captcha_container").after("<span id='captcha_error' class='error-text'>Please re-enter your reCAPTCHA.</span>");
                                }
                            }
                            else if(index == 'token_expired'){
                                $("#tokenErrorWadrobe").html("An error has occurred. Please refresh the page and try again.");
                                $("#tokenErrorWadrobe").show();
                            }
                            else
                            {
                                $('#' + index + "Error").html(value).show();
                            }
                           
                        });
                        PF.HEADER.removeBlueButtonLoader(form_id);
                        return false;
                    }
                },
                complete:function(data){
                    
                    return false;
                }
            });
    }