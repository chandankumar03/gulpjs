/***
 * @Created by: Prathamesh.S
 * @Date : 24/07/2017
 * @description To handle Google Invisible reCaptcha implementation
 */  

"use strict";

var PF = PF || {};
var widgetId_login;var widgetId_tyo_login;var widgetId_dedicated_login;var widgetId_TYO;
var widgetId1; var widgetId2; var widgetId3;var widget_tstmonial;  var widgetId_Mangiamo;
var widget_frn;var widgetId_Primo;
var widget_dummy;
if( typeof PF.RECAPTCHA === 'undefined' ) {
	(function (a, $) {
		var retryTime = 300;
		var x = {
			init: function(){
				if(typeof grecaptcha != 'undefined'){
					//For Dedicated Login Page Form
					if($('#login_dedicatedlogin-form #RecaptchaField-Dedicated-Login').length > 0){

					    PF.RECAPTCHA.setInvisibleCaptcha('login_dedicatedlogin-form','RecaptchaField-Dedicated-Login','dedicated-login','captchaError');
					}
					//For Header Login Popup Form
					if($('#login_popup_login_form #login_invisible_recaptcha').length > 0 && $current != '/customer/checkoutlogin'){
					    PF.RECAPTCHA.setInvisibleCaptcha('login_popup_login_form','login_invisible_recaptcha','login','captchaError');
					}
					//For Header Login Popup in TYO Form
					if($('#login_popup_login_tyo_form #RecaptchaField-TYO-Login').length > 0){
					    PF.RECAPTCHA.setInvisibleCaptcha('login_popup_login_tyo_form','RecaptchaField-TYO-Login','tyo-login','captchaError');
					}
					//For Testimonials Form
					if($('#testimonial_form #RecaptchaField-Tstmonil').length > 0){
					    PF.RECAPTCHA.setInvisibleCaptcha('testimonial_form','RecaptchaField-Tstmonil','testimonial','captchaError');
					}
					//For Track my order Form
					if($('#track_form_1 #RecaptchaField-TYO').length > 0){
					     PF.RECAPTCHA.setInvisibleCaptcha('track_form_1','RecaptchaField-TYO','TYO','captchaError');
					     $('#RecaptchaField-TYO').css('display','none');
					}
					//For Franchise Form
					if($('#franForm #RecaptchaField1').length > 0){
						PF.RECAPTCHA.setInvisibleCaptcha('franForm','RecaptchaField1','franchise');
						$('#RecaptchaField1').css('display','none');
					}	
					//For Primorati Forms
					if($('#primorati_form #RecaptchaField-primorati').length > 0){
					    $("#captcha_container").css("display","none");
				        PF.RECAPTCHA.setInvisibleCaptcha('primorati_form','RecaptchaField-primorati','primorati');
				    }
					//For Write To Us Forms
					if($('#wtuNewComplaintFrm #RecaptchaField1').length > 0){
					    PF.RECAPTCHA.setInvisibleCaptcha('wtuNewComplaintFrm','RecaptchaField1','WTU_1');
				        PF.RECAPTCHA.setInvisibleCaptcha('wtuUnResolvedComplaintFrm','RecaptchaField2','WTU_2');
				        PF.RECAPTCHA.setInvisibleCaptcha('wtuUnResolvedIssueFrm','RecaptchaField3','WTU_3');
				        $('#RecaptchaField1,#RecaptchaField2,#RecaptchaField3').css('display','none');
					}
				}else{
					setTimeout(function(){ x.init();} , retryTime);
				}
			},
			renderInvisibleReCaptcha: function(recaptchaID,callbackFunction){
					return grecaptcha.render(recaptchaID, {
						    'sitekey' 	: recaptcha_site_key,
						    "theme"		: "light",
						    'size'		: 'invisible',
						    'badge'		: 'inline',
						    'callback' 	: callbackFunction
						});
			},
			createCallbackFn: function (widget,formID,callbackFn,errMsgID) {
				return function(token) {
			                $('#'+formID+' .g-recaptcha-response').val(token);
			                if($.trim(token) == ''){
			                	if(typeof errMsgID != 'undefined' && errMsgID != ''){
		                			$('#'+formID+' #'+errMsgID).html('reCAPTCHA Error').css('display','block');
		                		}
		                		grecaptcha.reset(widget);
		                	}else{
		                		callbackFn.action();
		                	}
		                }
			},
			setInvisibleCaptcha: function (formID,captchaID,action,errMsgID) {
				switch(action) {
					case "login" : 
						var callbackFn = {
						    action : function(){
						    	PF.HEADER.loginSubmit(formID);
						  	}
						}
						widgetId_login = x.renderInvisibleReCaptcha(captchaID,x.createCallbackFn(widgetId_login,formID,callbackFn,errMsgID));
		                
		                break;
		            case "tyo-login" : 
						var callbackFn = {
						    action : function(){
						    	PF.HEADER.loginSubmit(formID);
						  	}
						}
						widgetId_tyo_login = x.renderInvisibleReCaptcha(captchaID,x.createCallbackFn(widgetId_tyo_login,formID,callbackFn,errMsgID));		                
		                break;
		            case "dedicated-login" : 
						var callbackFn = {
						    action : function(){
						    	PF.HEADER.loginSubmit(formID);
						  	}
						}
						widgetId_dedicated_login = x.renderInvisibleReCaptcha(captchaID,x.createCallbackFn(widgetId_dedicated_login,formID,callbackFn,errMsgID));	                
		                break;
		            case "TYO" : 
		            	var callbackFn = {
						    action : function(){
						    	checkOrderDetails();
						  	}
						}
						widgetId_TYO = x.renderInvisibleReCaptcha(captchaID,x.createCallbackFn(widgetId_TYO,formID,callbackFn,errMsgID));	                
		                break;
		            case "WTU_1" : 
		            	var callbackFn = {
						    action : function(){
						    	PF.CONTACTPAGE.newComplaintSubmit();
						  	}
						}
						widgetId1 = x.renderInvisibleReCaptcha(captchaID,x.createCallbackFn(widgetId1,formID,callbackFn,errMsgID));               
		                break;
		            case "WTU_2" : 
		            	var callbackFn = {
						    action : function(){
						    	PF.CONTACTPAGE.unresolvedComplaintSubmit(formID,1);
						  	}
						}
						widgetId2 = x.renderInvisibleReCaptcha(captchaID,x.createCallbackFn(widgetId2,formID,callbackFn,errMsgID));
		                break;
		            case "WTU_3" : 
		            	var callbackFn = {
						    action : function(){
						    	PF.CONTACTPAGE.unresolvedComplaintSubmit(formID,2);
						  	}
						}
						widgetId3 = x.renderInvisibleReCaptcha(captchaID,x.createCallbackFn(widgetId3,formID,callbackFn,errMsgID));
		                break;
		            case "primorati" : 
		            	var callbackFn = {
						    action : function(){
						    	primoratiSubmitForm(formID);
						  	}
						}
						widgetId_Primo = x.renderInvisibleReCaptcha(captchaID,x.createCallbackFn(widgetId_Primo,formID,callbackFn,errMsgID));
		                break;
		            case "testimonial" : 
		            	var callbackFn = {
						    action : function(){
						    	PF.HEADER.testimonialSubmit(formID); 
						  	}
						}
						widget_tstmonial = x.renderInvisibleReCaptcha(captchaID,x.createCallbackFn(widget_tstmonial,formID,callbackFn,errMsgID));
		                break;
		            case "franchise" : 
		            	var callbackFn = {
						    action : function(){
						    	PF.LLP.submitBespoke(formID);
						  	}
						}
		                widget_frn = x.renderInvisibleReCaptcha(captchaID,x.createCallbackFn(widget_frn,formID,callbackFn,errMsgID));
		                break;
				}   
			}
		}
		a.RECAPTCHA = x;
	})( PF, $ );
}

$(window).load(function(){
	PF.RECAPTCHA.init();
});
