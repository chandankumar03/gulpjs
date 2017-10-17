/***
 * @Created by: Amitesh Bharti 
 * @Date : 23/08/2016
 * @description To handle Google reCaptcha v2 implementation based on  URL
 */
    var widgetId1; var widgetId2; var widgetId3; var widgetId_TYO; var widget_lgn; var widget_tstmonial;  var widgetId_mangiamo; 
    var widget_dummy;
    
    var myCallBack = (function() {
        
            if ( (typeof(ip_status) != "undefined" && ip_status=="Block") || window.location.pathname.split('/').pop().toString().toLowerCase()=='dummy.php'  ) {
                return function() {
                    widget_dummy = grecaptcha.render('RecaptchaField-dummyPage', {'sitekey' : recaptcha_site_key}); 
                }
            }else if (window.location.pathname.split('/').pop().toString().toLowerCase()=='write-to-us.html') {
                return function() {
                    
                    widget_tstmonial = grecaptcha.render('RecaptchaField-Tstmonil', {'sitekey' : recaptcha_site_key}); widget_lgn = grecaptcha.render('RecaptchaField-login', {'sitekey' : recaptcha_site_key}); widgetId_TYO = grecaptcha.render('RecaptchaField-TYO', {'sitekey' : recaptcha_site_key}); widgetId1 = grecaptcha.render('RecaptchaField1', {'sitekey' : recaptcha_site_key}); widgetId2 = grecaptcha.render('RecaptchaField2', {'sitekey' : recaptcha_site_key});widgetId3 = grecaptcha.render('RecaptchaField3', {'sitekey' : recaptcha_site_key});
                }
            }else if (window.location.pathname.split('/').pop().toString().toLowerCase()=='primorati-modular-wardrobes.html' || window.location.pathname.split('/').pop().toString().toLowerCase()=='modular-solution.html') {
                return function() {
                    
                    widget_tstmonial = grecaptcha.render('RecaptchaField-Tstmonil', {'sitekey' : recaptcha_site_key}); widget_lgn = grecaptcha.render('RecaptchaField-login', {'sitekey' : recaptcha_site_key}); widgetId_TYO = grecaptcha.render('RecaptchaField-TYO', {'sitekey' : recaptcha_site_key}); widgetId_Primo = grecaptcha.render('RecaptchaField-primorati', {'sitekey' : recaptcha_site_key}); widgetId_mangiamo= grecaptcha.render('RecaptchaField-mangiamo', {'sitekey' : recaptcha_site_key});
                }
            }else if (window.location.pathname.split('/').pop().toString().toLowerCase()=='mangiamo-modular-kitchen.html') {
                return function() {
                    
                    widget_tstmonial = grecaptcha.render('RecaptchaField-Tstmonil', {'sitekey' : recaptcha_site_key}); widget_lgn = grecaptcha.render('RecaptchaField-login', {'sitekey' : recaptcha_site_key}); widgetId_TYO = grecaptcha.render('RecaptchaField-TYO', {'sitekey' : recaptcha_site_key}); widgetId_mangiamo= grecaptcha.render('RecaptchaField-mangiamo', {'sitekey' : recaptcha_site_key});
                }
            }else if ($current=='/customer/login' || $current=='/customer/login/' || $current=='/customer/initiatereturnlogin' || $current=='/customer/initiatereturnlogin/') {
                return function() {
                    widgetId_TYO = grecaptcha.render('RecaptchaField-TYO', {'sitekey' : recaptcha_site_key});  
                    widget_lgn = grecaptcha.render('RecaptchaField-login', {'sitekey' : recaptcha_site_key}); 
                }
            }  else if (window.location.pathname.split('/').pop().toString().toLowerCase()=='franchise.html') {
                //added by NIshigandha N
                return function() {
                    widget_frn = grecaptcha.render('RecaptchaField1', {'sitekey' : recaptcha_site_key}); 
                }
            
            } else if ($current=='/checkout/cart/' || $current=='/checkout/cart') {
                
                return function() {
                    
                    if (!is_user_logged_in.trim()) {
                        widgetId_TYO = grecaptcha.render('RecaptchaField-TYO', {'sitekey' : recaptcha_site_key});  
                        widget_lgn = grecaptcha.render('RecaptchaField-login', {'sitekey' : recaptcha_site_key}); 
                    }else{
                        widget_lgn = grecaptcha.render('RecaptchaField-login', {'sitekey' : recaptcha_site_key});
                        widget_tstmonial = grecaptcha.render('RecaptchaField-Tstmonil', {'sitekey' : recaptcha_site_key});
                    }
                }
            }
            else if($current=='/') {
                return function() {
                    // var widgetId_TYO; var widget_lgn;     
                    widget_tstmonial = grecaptcha.render('RecaptchaField-Tstmonil', {'sitekey' : recaptcha_site_key});
                    widget_lgn = grecaptcha.render('RecaptchaField-login', {'sitekey' : recaptcha_site_key}); 
                    widgetId_TYO = grecaptcha.render('RecaptchaField-TYO', {'sitekey' : recaptcha_site_key}); 
                }
           }else{
                    return function() {
                        if (!is_user_logged_in.trim()) {
                            widgetId_TYO = grecaptcha.render('RecaptchaField-TYO', {'sitekey' : recaptcha_site_key}); 
                            widget_lgn = grecaptcha.render('RecaptchaField-login', {'sitekey' : recaptcha_site_key});
                            widget_tstmonial = grecaptcha.render('RecaptchaField-Tstmonil', {'sitekey' : recaptcha_site_key});
                        }else{
                            widget_tstmonial = grecaptcha.render('RecaptchaField-Tstmonil', {'sitekey' : recaptcha_site_key});
                        }
                    }
            }
        })();