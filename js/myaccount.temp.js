$(function () {

        $(document).on('click tap', '.tyo-loggedin-track-button', function () {
            if ($(this).closest('.tyo-direct-order-sku-wrapper').find('.tyo_timeline_warp').length > 0) {
                $(this).closest('.tyo-direct-order-sku-wrapper').find('.tyo_timeline_warp').slideDown();
                $(this).hide();
                $(this).siblings('.tyo-loggedin-close-button').show();
            }
        });
        $(document).on('click tap', '.tyo-loggedin-close-button', function () {
            var self = $(this);
            $(this).closest('.tyo-direct-order-sku-wrapper').find('.tyo_timeline_warp').slideUp(function () {
                self.hide();
                self.siblings('.tyo-loggedin-track-button').show();
            });
        });

        $('.writeus-tabs li a').click(function () {
            var tab_id = $(this).attr('data-tab');

            $('.writeus-tabs li a').removeClass('current-tab');
            $('.writeus-tabs-content').removeClass('current-tab');

            $(this).addClass('current-tab');
            $("#" + tab_id).addClass('current-tab');

        });

        $('[data-pid=1]').click();
});
            
    function loadMoreOrders(){
        var slimit = $('#load-more').attr('pid');
        $.ajax({
                url: root_url + '/customer_trackOrder/trackOrderDetails',
                data: { slimit: slimit, is_load: 1},
                type: "POST",
                async: true,
                beforeSend : function(){
                    $("#load-more").addClass('btn-loader');
                },
                success: function (data) {
                   $('.view-more-return-orders').remove();
                   $('#order-wrapper').append(data);
                   $("#load-more").removeClass('btn-loader');
                }
         }); 
    }
            
    function TrackData(orderid,productid){
        var tid = orderid+''+productid;
         $.ajax({
            url: root_url + '/customer_trackOrder/trackItem/'+orderid+'/'+productid+'/timeline',
            beforeSend : function(){
                $('#'+tid).parent().parent().parent().parent().find('.time-container').css('display','block');
            },
            success: function (data) {
                $('#'+tid).parent().parent().parent().parent().find('.time-container').html(data);
                $('#'+tid).parent().parent().parent().parent().find('.time-container').css('display','block').find('.row.tyo-track-dtl-row').css('display','block');                           
            }
        }); 
    }
            
    function mousePosition(el,node)
    {
        var elOffsetLeft = el.offset().left;
        var elOffsetTop = el.offset().top;
        var elWidth = el.outerWidth(true);
        var elHeight = el.outerHeight(true);
        var elHalfWidth = elWidth / 2;

        var wrapperDiv = $('.track_your_order_wrap');
        var tooltipDiv = $('#track-order-tooltip');
        var tooltipDivHeight = tooltipDiv.outerWidth(true);
        var toopTipBottomOffset = tooltipDiv.offset().top + tooltipDiv.outerHeight(true);
        var wrapperBottomOffset = wrapperDiv.offset().top + wrapperDiv.outerHeight(true);
        if (el.hasClass('first'))
        {
            $('.tyo_hover_details').css('marginLeft', -49);
        }
        else if (el.hasClass('last'))
        {
            $('.tyo_hover_details').css('marginLeft', -288);
        }
        else
        {
            $('.tyo_hover_details').css('marginLeft', -165);
        }

        $(node).offset({
            left: elOffsetLeft + elHalfWidth,
            top: elOffsetTop + elHeight
        });

    }

    $(document).on('mouseenter','.bottom_timeline_content a',function() {
        $('.tyo_strip_'+$(this).attr('data-tip')).show();
        var $obj = $(this);
        var $node = '.tyo_strip_'+$(this).attr('data-tip');
        mousePosition($obj,$node);
    });

    $(document).on('mouseleave','.bottom_timeline_content a',function() {
        $('.tyo_strip_'+$(this).attr('data-tip')).hide();    
    }); 
$(function () {

//    Need Help Search dropdown
    $('.st-nh-search-ip').on('keypress change keyup', function () {
        if (($(this).val()).length >= 3) {
            $(this).parents('.st-nh-sr-ip-wrap').find('.st-nh-sr-sug-wrap').slideDown(300);
        } else if (($(this).val()).length === 0) {
            $(this).parents('.st-nh-sr-ip-wrap').find('.st-nh-sr-sug-wrap').slideUp(300);
        }

    });
    $('.st-nh-search-ip').on('focusout', function () {

        if (($(this).val()).length === 0) {
            $(this).parents('.st-nh-sr-ip-wrap').find('.st-nh-sr-sug-wrap').slideUp(300);
        }

    });

// Detail faq section trigger   
    $('.st-faq-sec-name-listitem').on('click', function () {
        var sectab_id = $(this).attr('data-tab');
        $('.st-faq-sec-name-listitem').removeClass('current-tab');
        $('.st-faq-sec-content-int-wrap').removeClass('current-tab');
        $(this).addClass('current-tab');
        $("#" + sectab_id).addClass('current-tab');
    });

    //Write To Us Tabs Script
    $('.wtu-tabs-row .wtu-tab').on('click', function () {
        var wtutab_id = $(this).attr('data-tab');
        $('.wtu-tabs-row .wtu-tab').removeClass('current-tab');
        $('.wtu-tab-content-row .wtu-tab-int-content').removeClass('current-tab');
        $(this).addClass('current-tab');
        $("#" + wtutab_id).addClass('current-tab');
        $('.wtu-frm-row input[type=text],.wtu-frm-row input[type=number],.wtu-frm-row textarea').val('');
        $('.wtu-thank-wrap').hide();
        $("#"+wtutab_id + "  "+ '.wtu-from-wrap').show();
        $("#" + wtutab_id+"Frm").find("input,select,textarea,file,select2").each(function(){ $(this).parent("div").removeClass("frm-error-wrap").removeClass("frm-success-wrap");});
        $(".wtuUnResolvedComplaintFrm_orderid").css("display","none");
        $(".wtuUnResolvedIssueFrm_orderid").css("display","none");
        $(".wtuUnResolvedIssueFrm_block").css("display","none");
        grecaptcha.reset(widgetId1);
        grecaptcha.reset(widgetId2);
        grecaptcha.reset(widgetId3);
        $(".error-msg,.pf-text-red,.error-text").css('display','none');
//        $(".pf-text-red").css("display",'none');
    });

//    Remove Uploaded Images
    $('.wtu-file-uploaded-wrap .wtu-file-uloaded-rmv').on('click', function () {
        var wtuUpFileLen = $('.wtu-file-uploaded-wrap').children('.wtu-file-uloaded-row').length;
        if (wtuUpFileLen > 1) {
            $(this).closest('.wtu-file-uloaded-row').siblings('.wtu-file-addmore-row').slideDown(200);
            $(this).parent('.wtu-file-uloaded-row').remove();
        } else if (wtuUpFileLen === 1) {
            $(this).closest('.wtu-file-uloaded-row').siblings('.wtu-file-addmore-row').hide();
            $(this).parents('.wtu-upload-row').find('.wtu-file-upload-wrap').show();
            $(this).parent('.wtu-file-uloaded-row').remove();
        }

    });

//    Question Accordian
   $(document).on('click','.st-nh-results-list-item-q', function () {
        if ($(this).hasClass('active')) {
            $(this).removeClass('active');
            $(this).parents('.st-nh-results-list').find('.st-nh-results-list-item-a').slideUp(300);
        }
        else {
            $(this).parents('.st-nh-results-list').find('.st-nh-results-list-item-q').removeClass('active');
            $(this).parents('.st-nh-results-list').find('.st-nh-results-list-item-a').slideUp(200);
            $(this).addClass('active');
            $(this).siblings('.st-nh-results-list-item-a').slideDown(300);
        }
    });

    $('.wtu-frm-row .fname-ip').on('focusout', function () {
        var frmId = $(this).closest('form').attr('id');
        verifyFirstname(frmId);
    });
    $('.wtu-frm-row .email-ip').on('focusout', function () {
        var frmId = $(this).closest('form').attr('id');
        verifyEmailId(frmId);
    });
    $('.wtu-frm-row .mobile-ip').on('focusout', function () {
        var frmId = $(this).closest('form').attr('id');
        verifyMobileNo(frmId);
    });
    $('.wtu-frm-row .orderid-ip').on('focusout', function () {
        var frmId = $(this).closest('form').attr('id');
        //verifyOrderNo(frmId);
    });
    $('.wtu-frm-row .comments').on('focusout',function(){
        var frmId = $(this).closest('form').attr('id');
        verifyComment(frmId);
    })
    $('#wtuNewComplaintFrm .wtu-submit-btn').on('click', function () {
//        alert("in static page js");
//        var frmId = $(this).closest('form').attr('id');
//        verifyFirstname(frmId);
//        verifyEmailId(frmId);
//        verifyMobileNo(frmId);
//        verifyOrderNo(frmId);
    });
    $('#wtuUnResolvedComplaint .wtu-submit-btn,#wtuUnResolvedIssue  .wtu-submit-btn').on('click', function () {
        var frmId = $(this).closest('form').attr('id');
        verifyOrderNo(frmId);
    });

//Comment Validation Function
function verifyComment(frmId){
    var commentIp = $("#" + frmId).find('.comments');
    var commentVal = commentIp.val();
    if (commentVal === '') {
    commentIp.parent('div').addClass('frm-error-wrap').removeClass('frm-success-wrap');
    } else {
    commentIp.parent('div').removeClass('frm-error-wrap').addClass('frm-success-wrap');
    }
}

//    FirstName Validation Function
    function verifyFirstname(frmId) {
        var fnameIp = $("#" + frmId).find('.fname-ip');
        var fnameVal = fnameIp.val();
        if (fnameVal === '') {
            fnameIp.parent('div').addClass('frm-error-wrap').removeClass('frm-success-wrap');
        } else {
            fnameIp.parent('div').removeClass('frm-error-wrap').addClass('frm-success-wrap');
        }
    }
    //    Email Validation Function
    function verifyEmailId(frmId) {
        var emailIp = $("#" + frmId).find('.email-ip');
        var emailIpVal = emailIp.val();
        if (IsEmail(emailIpVal) === false) {
            emailIp.parent('div').addClass('frm-error-wrap').removeClass('frm-success-wrap');
        } else {
            emailIp.parent('div').removeClass('frm-error-wrap').addClass('frm-success-wrap');
        }
    }
    //    MObile Validation Function
    function verifyMobileNo(frmId) {
        var mobileIp = $("#" + frmId).find('.mobile-ip');
        var mobileIpVal = mobileIp.val();
        if (mobileIpVal === '') {
            mobileIp.parent('div').addClass('frm-error-wrap').removeClass('frm-success-wrap');
        } else if (mobileIpVal.length < 10) {
            mobileIp.parent('div').addClass('frm-error-wrap').removeClass('frm-success-wrap');
        } else if (mobileIpVal.length > 10) {
            mobileIp.parent('div').addClass('frm-error-wrap').removeClass('frm-success-wrap');
        }
        else if (isNaN(mobileIpVal)) {
            mobileIp.parent('div').addClass('frm-error-wrap').removeClass('frm-success-wrap');
        } else {
            mobileIp.parent('div').removeClass('frm-error-wrap').addClass('frm-success-wrap');
        }
    }
    //    MObile Validation Function
    function verifyOrderNo(frmId) {
        var mobileIp = $("#" + frmId).find('.orderid-ip');
        var mobileIpVal = mobileIp.val();
        if (mobileIpVal === '') {
            mobileIp.parent('div').addClass('frm-error-wrap').removeClass('frm-success-wrap');
        } else if (mobileIpVal.length < 9) {
            mobileIp.parent('div').addClass('frm-error-wrap').removeClass('frm-success-wrap');
        } 
        else if (isNaN(mobileIpVal)) {
            mobileIp.parent('div').addClass('frm-error-wrap').removeClass('frm-success-wrap');
        } else {
            mobileIp.parent('div').removeClass('frm-error-wrap').addClass('frm-success-wrap');
        }
    }

//     login form validation
    $('.ck-login-frm-wrap .log-email').on('focusout', function () {

        verifyErLoginEmail();
    });    
    $('.ck-login-frm-wrap .log-pwd').on('keypress change keyup focus', function () {
        verifyErLoginPwd();
    });
    
    function verifyErLoginEmail() {        
        if (IsEmail(($('.ck-login-frm-wrap .log-email').val())) === false) {
            $('.ck-login-frm-wrap .log-email').parent('div').addClass('frm-error-wrap').removeClass('frm-success-wrap');
            eremailFlag = 0;
        } else {
            $('.ck-login-frm-wrap .log-email').parent('div').removeClass('frm-error-wrap').addClass('frm-success-wrap');
            eremailFlag = 1;
        }
        
    };
    function verifyErLoginEmailfr() {        
        if (IsEmail(($('.ck-login-forgot-wrap .log-email').val())) === false) {
            $('.ck-login-forgot-wrap .log-email').parent('div').addClass('frm-error-wrap').removeClass('frm-success-wrap');
            eremailFlag = 0;
            $('.ck-forgot-email-sub-text').hide();
        } else {
            $('.ck-login-forgot-wrap .log-email').parent('div').removeClass('frm-error-wrap').addClass('frm-success-wrap');
            eremailFlag = 1;
            $('.ck-login-frm-wrap,.ck-login-forgot-wrap').hide();
            $('.ck-login-forgot-reseted-wrap,.ck-forgot-email-sub-text').show();
        }
        
    };
    function verifyErLoginPwd() {
        if (($('.ck-login-frm-wrap .log-pwd').val()) === '') {
            $('.ck-login-frm-wrap .log-pwd').parent('div').addClass('frm-error-wrap').removeClass('frm-success-wrap');
            erpwdFlag = 0;
        } else if (($('.ck-login-frm-wrap .log-pwd').val()).length < 6) {
            $('.ck-login-frm-wrap .log-pwd').parent('div').addClass('frm-error-wrap').removeClass('frm-success-wrap');
            erpwdFlag = 0;
        }
        else {
            $('.ck-login-frm-wrap .log-pwd').parent('div').removeClass('frm-error-wrap').addClass('frm-success-wrap');
            erpwdFlag = 1;
        }
    }    ;
//Password Reset Form Validation    
    $('#retrive-pwd-btn').on('click', function () {
        verifyResetEmail();
    });

    function verifyResetEmail() {
        if (IsEmail(($('.ck-login-forgot-initial-wrap .log-email').val())) === false) {
            $('.ck-login-forgot-initial-wrap .log-email').parent('div').addClass('frm-error-wrap').removeClass('frm-success-wrap');
            $('.ck-forgot-email-sub-text').hide();
        } else {
            $('.ck-login-forgot-initial-wrap .log-email').parent('div').removeClass('frm-error-wrap').addClass('frm-success-wrap');
            $('.ck-login-frm-wrap,.ck-login-forgot-wrap').hide();
            $('.ck-login-forgot-reseted-wrap,.ck-forgot-email-sub-text').show();
            // Add the email id the user has entered in the forgot password form
            $("#forgotemailid").html($("#emailid_forgot").val());
        }
    };
    $('.ck-login-m-forgot-link,.ck-pwd-reset-send-again').on('click', function () {
        $('.ck-login-frm-wrap,.ck-login-forgot-reseted-wrap').hide();
        // $('.ck-login-forgot-wrap').show();
        $('.ck-login-forgot-wrap').css('display','block');
        
    });
    $('.ck-login-m-login-link').on('click', function () {
        $('.ck-login-forgot-reseted-wrap,.ck-login-forgot-wrap,.ck-login-reg-wrap').hide();
        $('.ck-login-guest-modal,.ck-login-frm-wrap').show();
        allInputReset();
    });
    function allInputReset() {
        $('.ck-login-guest-modal input[type=text],.ck-login-guest-modal input[type=password],.ck-login-reg-wrap input[type=text],.ck-login-reg-wrap input[type=radio],.ck-login-reg-wrap input[type=number],.ck-login-reg-wrap input[type=password]').val('');
        $('.ck-login-guest-modal input').parent('div').removeClass('frm-error-wrap');
        $('.ck-login-guest-modal input').parent('div').removeClass('frm-success-wrap');        
    };
    
//    Track Your Order details function
    $('body').on('click','.st-nh-pro-tyo-btn', function () {
//        $('.tyo-track-dtl-row').slideUp(200);
        $(this).parents('.tyo-mul-sku-dtl-row').find('.tyo-track-dtl-row').slideDown(300);
        $(this).hide();
        $(this).siblings('.st-nh-pro-tyo-close-btn').css('display','block');
    });
    $('body').on('click','.st-nh-pro-tyo-close-btn', function () {
        $(this).parents('.tyo-mul-sku-dtl-row').find('.tyo-track-dtl-row').parent(".time-container").css("display","none");
        $(this).parents('.tyo-mul-sku-dtl-row').find('.tyo-track-dtl-row').slideUp(200);
        $(this).hide();
        $(this).siblings('.st-nh-pro-tyo-btn').show();
    });
    
//    TYO TT position
function mousePosition(el)
                                    {
                                        var elOffsetLeft = el.offset().left;  
                                        var elOffsetTop =  el.offset().top;  
                                        var elWidth = el.outerWidth(true);
                                        var elHeight = el.outerHeight(true);
                                        var elHalfWidth = elWidth/2;
                                        
                                        var wrapperDiv = $('.st-nh-tyo-wrap');
                                        var tooltipDiv = $('#track-order-tooltip');
                                        var tooltipDivHeight = tooltipDiv.outerWidth(true);
                                        var toopTipBottomOffset = tooltipDiv.offset().top+tooltipDiv.outerHeight(true);
                                        var wrapperBottomOffset = wrapperDiv.offset().top+wrapperDiv.outerHeight(true);
                                        if(el.hasClass('first'))
                                        {
                                            $('.tyo_hover_details').css('marginLeft',-49);
                                        }
                                        else if(el.hasClass('last'))
                                        {
                                            $('.tyo_hover_details').css('marginLeft',-288);
                                        }
                                        else
                                        {
                                           $('.tyo_hover_details').css('marginLeft',-165); 
                                        }
//                                      
                                      
                                       
                                            $('#track-order-tooltip').offset({
                                                left:elOffsetLeft+elHalfWidth,
                                                top:elOffsetTop+elHeight
                                            });
                                        
                                }
                                        
                                   
                                    
                            $(function () {
                            $('.bottom_timeline_content a').each(function(){
                                      var $obj = $(this);
                                    $(this).on('mouseenter', function () {

                                     $('#track-order-tooltip').show();
                                              mousePosition($obj);
                                     }).mouseleave(function() {
                                         $('#track-order-tooltip').hide();
                                         
                                      });
                            });
                            
                       
                            });
                         
    
});
//Generic Email Validation function
function IsEmail(email) {
    var regex = /^([a-zA-Z0-9_\.\-\+])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    if (!regex.test(email)) {
        return false;
    } else {
        return true;
    }
}
;



$(document).ready(function () {
    //added by Nishigandha N
    $('#franCity').select2({
        placeholder: 'Select City'
    });
    $('#city').select2({
        placeholder: 'Select City'
    });
    
    if($('.wtu-reason-sel').length>0){
        $('.wtu-reason-sel').select2();
    }
    if($('.st-er2-orders-list-row:first-child .st-nh-pro-tyo-btn').length>0){
        $('.st-er2-orders-list-row:first-child .st-nh-pro-tyo-btn').trigger('click');
    }
});

var filterInput = document.getElementById("furniture-filter-input"),
    filterInputHidden = document.getElementById("furniture-filter-input-val"),
    filterInputVal = [];
    filterHolder = document.getElementById("furex-filter-holder"),
    filterResult = document.getElementById("furex-filter-result"),
    furApply = document.getElementById("furApply"),
    furDiscard = document.getElementById("furDiscard"),
    filterLiList = filterHolder.querySelectorAll("li")

filterInput.addEventListener("click", showHidefilter);
filterInput.addEventListener("keyup", searchFilter);
furApply.addEventListener("click", applyFurnitureFilter);
furDiscard.addEventListener("click", resetFurnitureFilter);

function showHidefilter(event) {
  filterInput.className = "inpt active";
  filterHolder.style.display = "block";
  document.addEventListener("click", hidefilter);
  event.stopPropagation();
};
function searchFilter() {
  var filter = filterInput.value.toLowerCase();

  for (var i = 0; i < filterLiList.length; i++) {
    if (filterLiList[i].innerText.toLowerCase().indexOf(filter) > -1) {
      filterLiList[i].style.display = "block";
    } else {
      filterLiList[i].style.display = "none";
    }
  }
}
function hidefilter(event) {
  $(event.target).closest('#furex-filter-holder').length < 1 ? (
    filterInput.classList.contains("active") ? (
      event.stopPropagation(),
      filterInput.className = "inpt",
      filterHolder.style.display = "none",
      filterInput.value = "",
      showAllFilterOption(),
      checkInput()
    ) : null
  ) : null
}

function showAllFilterOption() {
  for (var i = 0; i < filterLiList.length; i++) {
    filterLiList[i].style.display = "block";
  }
}

function checkInput() {
  for (var li in filterLiList) {
    filterLiList.hasOwnProperty(li) && filterLiList[li] != undefined ?
      filterLiList[li].classList.contains("selected") ? filterLiList[li].querySelector("input").checked = true : filterLiList[li].querySelector("input").checked = false : null
  }
    document.removeEventListener("click", hidefilter)
}

function applyFurnitureFilter(event) {
  event.preventDefault();
  for (var li in filterLiList) {
    if(filterLiList.hasOwnProperty(li) && filterLiList[li] != undefined) {
      if(filterLiList[li].querySelector("input").checked && filterLiList[li].classList.contains("selected")) {

      } else if(filterLiList[li].querySelector("input").checked && !(filterLiList[li].classList.contains("selected"))) {
        filterLiList[li].className = "selected"
        var newLi = document.createElement("li");
        newLi.innerHTML = filterLiList[li].innerText.trim() + "<a href='javascript:void(0)' class='filter-remove'></a>";
        filterResult.querySelector("ul").appendChild(newLi);
        newLi.querySelector(".filter-remove").addEventListener("click", filterRemove);
        filterInputVal.push(filterLiList[li].innerText.trim());

      } else if(filterLiList[li].querySelector("input").checked !== "false" && filterLiList[li].classList.contains("selected")) {
        filterLiList[li].className = "";
        filterLiList[li].querySelector("input").checked = false;
        for(var filterList in filterResult.querySelectorAll("li")) {
          if(filterResult.querySelectorAll("li").hasOwnProperty(filterList) && filterResult.querySelectorAll("li")[filterList] != undefined) {
            filterResult.querySelectorAll("li")[filterList].innerText.trim() === filterLiList[li].innerText.trim() ? (filterResult.querySelectorAll("li")[filterList].outerHTML = "") : null
          }
        }
        for(var i=0;i<filterInputVal.length;i++) {
          filterInputVal[i].trim() === filterLiList[li].innerText.trim() ? filterInputVal.splice(i, 1) : null
        }

      } else {
        filterLiList[li].className = "";
        filterLiList[li].querySelector("input").checked = false;
        filterLiList[li].style.display = "block"
      }
    }
  }
  if(filterInputVal.length == 0) {
    filterInputHidden.value = '';
  } else {
    filterInputHidden.value = JSON.stringify(filterInputVal)
  }
  filterInput.parentElement.className = "furniture-ex-search-wrap";
  filterInput.nextElementSibling.style.display = "none";

  document.body.click();
  document.querySelector(".furniture-ex-search-wrap .error-msg").style.display = "none";
  filterResult.style.display = "block";
}

function resetFurnitureFilter(event) {
  event.preventDefault();
  for (var li in filterLiList) {
    if(filterLiList.hasOwnProperty(li) && filterLiList[li] != undefined) {
      filterLiList[li].className = "";
      filterLiList[li].querySelector("input").checked = false;
      filterLiList[li].style.display = "block"
    }
  }
  filterResult.querySelector("ul").innerHTML = "";
  filterInputVal = [];
  if(filterInputVal.length == 0) {
    filterInputHidden.value = '';
  } else {
    filterInputHidden.value = JSON.stringify(filterInputVal)
  }
  document.body.click();
}
function filterRemove(event) {
  for (var li in filterLiList) {
    if(filterLiList.hasOwnProperty(li) && filterLiList[li] != undefined) {
      filterLiList[li].querySelector("input").checked && filterLiList[li].innerText.trim() === this.parentElement.innerText ? (
        filterLiList[li].className = "",
        filterLiList[li].querySelector("input").checked = false,
        removeFilterVal(this.parentElement.innerText.trim()),
        this.parentElement.outerHTML = ""
      ) : null
    }
  }
}

function removeFilterVal(parentElementText) {
  for(var i=0;i<filterInputVal.length;i++) {
    filterInputVal[i] === parentElementText ? filterInputVal.splice(i, 1) : null
  }
  if(filterInputVal.length == 0) {
    filterInputHidden.value = '';
  } else {
    filterInputHidden.value = JSON.stringify(filterInputVal);
  }
}
/**
 * My Account script
 */
"use strict";

var PF = PF || {};

// force utilities library
if (typeof PF.UTILITIES === 'undefined') {
    (function () {
        window.root_url = (typeof root_url === 'undefined') ? 'http://' + window.location.hostname : root_url;
        window.secure_url = (typeof secure_url === 'undefined') ? 'https://' + window.location.hostname : secure_url;
        var _node = document.createElement('script');
        _node.type = 'text/javascript';
        _node.src = ((window.location.protocol === 'http:') ? root_url : secure_url) + '/js/utilities.js';
        document.getElementsByTagName('head')[ 0 ].appendChild(_node);
    })();
}

if (typeof PF.MYACCOUNT === 'undefined') {
    (function (z, $) {
        var utils = z.UTILITIES;
        var o = {
            d: $(document),
            w: $(window),
            processError: 'An error has occurred. Please refresh the page and try again.',
            formErrorHtml: '<div class="error-text">{{ERROR}}</div>',
            lastEnteredPin: '',
            formErrorMsg: {                
                file_error: {
                    file : 'Please select a file',
                    file_extension : 'Please select a valid file',
                    file_size : 'Max 5Mb allowed!',
                    file_noselect_flag: true,
                    file_size_error: true
                }
            },
            dashboard: {
                click: { '.tab-inner-content a.track-item-link': ['PF.MYACCOUNT.trackOrder',"#page"],
                    '.return-order-submit': ['PF.MYACCOUNT.submitReturnFrom', '#page'],
                    '.add-more-file': ['PF.MYACCOUNT.callUploadFile', '#page'],
                    '.remove-file': ['PF.MYACCOUNT.removeUploadedFile', '#page'],
                    'return-popup-show':['PF.MYACCOUNT.resetReturnItemPopup', '#page'],
                    '.fdbck-wrprmyacc.ratable .feedback-rate input,.myacc-fdbcksbmt-btn':'PF.MYACCOUNT.save_rating',                    
                    '.myacc-fdbcksbmt-btnwrpr .myacc-fdbckskip-btn':'PF.MYACCOUNT.slideHtml'
                },
                change:{
                    '.rpImage': ['PF.MYACCOUNT.uploadFileOnSelect', '#page'],
                },
                mouseenter:{'.myacnt-shrfdbck-container':'PF.MYACCOUNT.openRatingHtml'},
                mouseleave:{'.myacnt-shrfdbck-container':'PF.MYACCOUNT.closeRatingHtml'}
            },
            orders: {
                click: {
                    '.tab-inner-content a.track-item-link': ['PF.MYACCOUNT.trackOrder','#page'],
                    '.return-order-submit': ['PF.MYACCOUNT.submitReturnFrom', '#page'],
                    '.remove-file': ['PF.MYACCOUNT.removeUploadedFile', '#page'],
                    '.add-more-file': ['PF.MYACCOUNT.callUploadFile', '#page'],
                    'return-popup-show':['PF.MYACCOUNT.resetReturnItemPopup', '#page'],
                    '#clear_order_search_box': 'PF.MYACCOUNT.myOrdersClearSearchBox',
                    '.fdbck-wrprmyacc.ratable .feedback-rate input,.myacc-fdbcksbmt-btn':'PF.MYACCOUNT.save_rating',                    
                    '.myacc-fdbcksbmt-btnwrpr .myacc-fdbckskip-btn':'PF.MYACCOUNT.slideHtml',
                },
                change: {'#maOrderselect2': ['PF.MYACCOUNT.myOrdersMonthFilter', '#page'],
                    '.rpImage': ['PF.MYACCOUNT.uploadFileOnSelect', '#page'],
                        
                },                
                keyup: {'#order_no': ['PF.MYACCOUNT.myOrdersSearchByOrderNo','#page']},
                mouseenter:{'.myacnt-shrfdbck-container':'PF.MYACCOUNT.openRatingHtml'},
                mouseleave:{'.myacnt-shrfdbck-container':'PF.MYACCOUNT.closeRatingHtml'}
            },
            wishlist: {
                click: {
                    '#wishlistTab a.remove-wishlist-item': ['PF.MYACCOUNT.removeFromWishlist', '#page'],
                    '#wishlistTab #popup_login_form':['PF.MYACCOUNT.submitWishlistComment', '#page']
                }
            },
            account: {
                click:{
                    '.my-profile-container .editBtn': ['PF.MYACCOUNT.editInputBoxes', '#page'],
                    '#save-basic-profile': ['PF.MYACCOUNT.updateProfile', '#page'],
                    '#saveChangePassword': ['PF.MYACCOUNT.updatePassword', '#page']
                },
                change:{
                    "input[name='gender']": ['PF.MYACCOUNT.verifyGender', '#page']
                }
            },
            addressBook: {
                click: {
                    '#maEnterYourNewAdd #saveAddress': ['PF.MYACCOUNT.saveAddress', '#page'],
                    '.address_delete': ['PF.MYACCOUNT.deleteAddress', '#page'],
                    '.address_edit,.add-new-address': ['PF.MYACCOUNT.editAddressModal', '#page'],
                },
                change: {
                    '#maEnterYourNewAdd .ck-state-select': ['PF.MYACCOUNT.verifyState', '#page'],
                    '#maEnterYourNewAdd .ck-country-select': ['PF.MYACCOUNT.verifyCountry', '#page'],
                    '.ma-address-tab input.radio_select': ['PF.MYACCOUNT.setDefaultAddress', '#page'],
                },
                submit: {                    
                },
                keyup: {
                    '#postcode': ['PF.MYACCOUNT.pinAutoComplete', '#page']
                },
            },
            returnItem: {
                click: {
                      '.return-order-submit': ['PF.MYACCOUNT.submitReturnFrom', '#page'],
                      '.remove-file': ['PF.MYACCOUNT.removeUploadedFile', '#page'],
                      '.add-more-file': ['PF.MYACCOUNT.callUploadFile', '#page'],
                      'return-popup-show':['PF.MYACCOUNT.resetReturnItemPopup', '#page'],
                      '.view-more-return-orders': ['PF.MYACCOUNT.loadOrders', '#page'],
                },
                change: {
                     '.rpImage': ['PF.MYACCOUNT.uploadFileOnSelect', '#page'],
                },  
            },
            returnItemLogin: {
                click: {
                    // '.cs-return-tabs ul li' : ['PF.MYACCOUNT.switchTab', '#page']
                }
            },
            dedicatedNotification:{
              click:{
                  '.feedback-rate input' : ['PF.MYACCOUNT.chooseRating', '#page'],
              },
              change:{
                  '.rating-reason': ['PF.MYACCOUNT.changeFeedbackReason', '#page'],
              }
            },
            init: function () {                
                o.oneTimeLoad=true;
                o.addressBookLoad=false;
                o.maxFilesToUpload = 3;
                if($(".rating-reason").length>0){
                    $(".rating-reason").select2({ minimumResultsForSearch: Infinity });
                }
                
                $("#maOrderselect2").select2({
                    minimumResultsForSearch: -1
                });
                $("#maInitiateReturnselect2").select2({
                    minimumResultsForSearch: -1
                });
                $("#selectCountry").select2();
                $("#selectState").select2();

                $("#selectCountry2").select2();
                $("#selectState2").select2();
                
                if (window.location.pathname.indexOf('customer/dashboard') !== -1) {
                    utils.listen(o.dashboard);
                } else if (window.location.pathname.indexOf('customer/myorders') !== -1) {
                    utils.listen(o.orders);
                    var currentPeriod = parseInt(utils.getParameterByName('period'));
                    if (!isNaN(currentPeriod)) {
                        $('#viewOrderTab div.month-filter-wrap select option').filter(function () {
                            return parseInt($(this).val()) === currentPeriod;
                        }).prop('selected', true);
                    }
                } else if (window.location.pathname.indexOf('customer/wishlist') !== -1) {
                    utils.listen(o.wishlist);                    
                } else if (window.location.pathname.indexOf('customer/account') !== -1) {
                    utils.listen(o.account);
                } else if (window.location.pathname.indexOf('customer/address_book') !== -1) {
                    utils.listen(o.addressBook);
                } else if (window.location.pathname.indexOf('customer/returnitem') !== -1) {
                    utils.listen(o.returnItem);
                } else if (window.location.pathname.indexOf('customer/initiatereturnlogin') !== -1) {
                    utils.listen(o.returnItemLogin);
                }
                else if (window.location.pathname.indexOf('customer/dedicatedNotification') !== -1) {
                    utils.listen(o.dedicatedNotification);
                }
                
                if(!XMLHttpRequest.prototype.sendAsBinary){ 
                        XMLHttpRequest.prototype.sendAsBinary = function(datastr) {  
                                function byteValue(x) {  
                                        return x.charCodeAt(0) & 0xff;  
                                }  
                                var ords = Array.prototype.map.call(datastr, byteValue);  
                                var ui8a = new Uint8Array(ords);  
                                try{
                                        this.send(ui8a);
                                }catch(e){
                                        this.send(ui8a.buffer);
                                }  
                        };  
                }

            },
            pinAutoComplete: function () {
                var pin = parseInt($(this).val());
                if (pin.toString().length === 6 && pin > 0 && o.lastEnteredPin !== pin) {
                    o.lastEnteredPin = pin;
                    var country = $("#selectCountry").val();
                    var _url = secure_url + '/config_pincode/getpindata';

                    if (country === 'IN') {
                        utils.makeRequest(
                            _url,
                            'POST',
                            {pincode: pin},
                            o.pinAutoCompleteResponse,
                            PF.ERROR.raiseError,
                            '',
                            {},
                            {dataType: 'json'}
                        );
                    }
                }
            },
            pinAutoCompleteResponse : function ( d ) {
                if( d ) {
                    d = $.parseJSON( d );
                    if( typeof( d.city ) != 'undefined' && ( d.city.length > 1 ) ) {
                        $('#city').val(d.city).parent().addClass('input-filled');
                    } else {
                        $('#city').val( '' ).parent().removeClass('input-filled');
                    }

                    if( typeof( d.state ) != 'undefined' && ( d.state.length > 1 ) ) {
                        // add state only if it's valid
                        if( $( '#selectState option[value="' + d.state + '"]' ).length > 0 ) {
                            $("#selectState").val(d.state).select2().removeClass('disabled');
                        } else {
                            $( '#selectState' ).select2( 'val', $( '#region option:first' ).val() );
                        }
                    } else {
                        $( '#selectState' ).select2( 'val', $( '#region option:first' ).val() );
                    }

//commented this code for removing autocomplete since no design provided in redesign ( changes added by Nishigandha N)
//                    if (d.locality) {
//                        var locality = $.parseJSON(d.locality);
//
//                        if (Object.keys(d.locality).length > 0) {
//                            $("#area").autocomplete({source: locality, appendTo: "#form-area"});
//                            //for perfect autocomplete, it will search string that starts with typed character
//                            $.ui.autocomplete.filter = function (array, term) {
//                                var matcher = new RegExp("^" + $.ui.autocomplete.escapeRegex(term), "i");
//                                return $.grep(array, function (value) {
//                                    return matcher.test(value.label || value.value || value);
//                                });
//                            };
//                        }
//                    }
                } else {
                    $("#form-area .ui-autocomplete,#form-area .ui-helper-hidden-accessible").remove();
                    $('#city').val('').removeClass('input-filled');
                    $("#selectState").val('').select2().removeClass('disabled');
                }
            },
            verifyState:function(){
                var frmId = $('.ck-state-select').closest('form').attr('id');
                if(o.addressBookLoad === true) {
                    return true;
                }
                if($(".ck-state-select").parent("div").css("display")=="block"){
                    var stateIp = $("#" + frmId).find('.ck-state-select');
                    var stateIpVal = stateIp.val();
                    if (stateIpVal === '') {
                        stateIp.addClass('error-inpt').parent('div').addClass('frm-error-wrap').removeClass('frm-success-wrap');
                    }
                    else {
                        stateIp.removeClass('error-inpt').parent('div').removeClass('frm-error-wrap').addClass('frm-success-wrap');
                    }
                }
                else{
                    var stateIp = $("#" + frmId).find('.ck-state-input');
                    var stateIpVal = stateIp.val();
                    if (stateIpVal === '') {
                        stateIp.parent('div').addClass('frm-error-wrap').removeClass('frm-success-wrap');
                    }
                    else {
                        stateIp.parent('div').removeClass('frm-error-wrap').addClass('frm-success-wrap');
                    }
                }
            },
            saveAddress: function () {
                var $this = $("#maEnterYourNewAdd");
                var error = false;                
                var formId = 'maEnterYourNewAdd';
                
                var postcode = parseInt($("#maEnterYourNewAdd #postcode").val());
                var city = $("#maEnterYourNewAdd #city").val().trim();
                var country = $("#maEnterYourNewAdd #selectCountry").val().trim();
                var state = "";
                
                if($(".ck-state-select").parent("div").css("display")=="block"){
                    state = $.trim($(".ck-state-select").val());
                }
                else{
                    state = $.trim($(".ck-state-input").val());
                }
                
                if (country === 'IN' || country === '') {
                    
                    var pincodeval = $("#postcode").val().trim();
                    var pincodelen = pincodeval.length;
                    $("#postcode").parent("div").removeClass("frm-error-wrap").removeClass("frm-success-wrap");
                    if(pincodeval==""){
                        $("#postcode").parent("div").addClass("frm-error-wrap").removeClass("frm-success-wrap");
                        error = true;
                    }
                    else if(pincodelen!=6){                        
                        $("#postcode").parent("div").removeClass("frm-success-wrap1").addClass("frm-error-wrap");
                        error = true;
                    }
                    else if(isNaN(pincodeval)){
                        $("#postcode").parent("div").addClass("frm-error-wrap").removeClass("frm-success-wrap");
                        error = true;
                    }
                    else{
                        $("#postcode").parent("div").removeClass("frm-error-wrap").addClass("frm-success-wrap");
                        
                    }
                }
                if(error==false){
                    error = PF.HEADER.validateForm("",formId);
                }
                var alphaOnly = /^[A-Za-z ]+$/;

                if (error==false && (state === '' || !(state.match(alphaOnly)))) {
                    //o.verifyState();    
                    if($(".form-select").css("display")=="block"){
                        $(".ck-state-input").parent("div").addClass("frm-error-wrap").removeClass("frm-success-wrap")
                    }
                    else{
                        $(".form-state-select").parent("div").addClass("frm-error-wrap").removeClass("frm-success-wrap")
                    }
                    error = true;
                }
                else{
                    if($(".form-select").parent("div").css("display")=="block"){
                        $(".ck-state-input").parent("div").removeClass("frm-error-wrap").removeClass("frm-success-wrap")
                    }
                    else
                    {
                        $(".form-state-select").parent("div").removeClass("frm-error-wrap").removeClass("frm-success-wrap")
                    }
                }
                
                if (!error) {                    
                    var _url = secure_url + "/address/addEditAddress/";
                    var _data = $this.serialize();
                    $.ajax
                    ({ 
                        url: _url,
                        data:_data, 
                        type: "POST",
                        beforeSend : function(){
                            $("#saveAddress").attr('disabled', 'disabled').addClass('btn_loader');
                        },
                        success: function(response)
                        {       
                            if(response ==  '"invalid"'){
                                alert(o.processError);
                            }else{
                                var _path = secure_url + '/customer/address_book';
                                window.location = _path;
                            }
                        },
                        error:function(){
                            alert("Some error occured");
                        },
                        complete:function(msg)
                        {
                            $("#saveAddress").removeAttr("disabled").removeClass('btn_loader');
                        }
                    });                   
                }
                return false;
            },
            verifyCountry:function(){
                var frmId = $('.ck-country-select').closest('form').attr('id');
                var countryIp = $("#" + frmId).find('.ck-country-select');
                var countryIpVal = countryIp.val();
                
                $("#" + frmId).find('.ck-state-input').val("");
                $("#" + frmId).find('.ck-state-select').val("").change();
                
                
                if(countryIpVal!='IN'){
                    $(".ck-state-input").parent("div").css("display","block");                    
                    $(".ck-state-select").parent("div").css("display","none").attr("disabled");
                    $(".ck-state-input").removeAttr("disabled");
                    $(".ck-state-select").attr("disabled","true");
                }
                else{
                    $(".ck-state-input").parent("div").css("display","none").attr("disabled");
                    $(".ck-state-select").parent("div").css("display","block").removeAttr("disabled")
                    $(".ck-state-input").attr("disabled","true");
                    $(".ck-state-select").removeAttr("disabled");
                    
                }
                
                if (countryIpVal === '') {
                    countryIp.addClass('error-inpt').parent('div').addClass('frm-error-wrap').removeClass('frm-success-wrap');
                } else {                    
                    countryIp.removeClass('error-inpt').parent('div').removeClass('frm-error-wrap').addClass('frm-success-wrap');
                    
                }
                
            },
            setDefaultAddress: function (e) {
                $('input[name=address_select]').prop('checked', false);
                var _url = secure_url + '/address/makeDefault/' + this.value;
                utils.makeRequest(
                        _url,
                        'GET',
                        {},
                        function (d, e) {
                            $('#addressBook_' + e.id).prop('checked', true);
                        },
                        PF.ERROR.raiseError,
                        '',
                        {
                            id: this.value
                        }
                );
            },
            deleteAddress: function (e) {
                if (!confirm('Do you want to delete this address?')){
                    return;
                }
                else{
                    var id = $(this).attr('value');
                    var _url = secure_url + '/address/deleteAddress';
                    utils.makeRequest(
                            _url,
                            'POST',
                            {
                                address_id: id
                            },
                            function (d, e) {
                                $("#address-" + e.id).remove();
                                $('label.ship-address-main').each(function(i) {
                                    var j = i+1;
                                    $(this).find('div:first').html('Address ' + j);
                                });
                                var addressCnt = $('.ship-address-row').size();
                                if (addressCnt === 0) {
                                    $('#editAddressBlock').addClass('no-address');
                                }
                                if (addressCnt < 10) {
                                    $('#editAddressBlock').show();
                                }
                            },
                            PF.ERROR.raiseError,
                            '',
                            {
                                id: id
                            }
                    );
                }
            },
            editAddressModal:function(e){
                var _modal = $(this).attr('modal-val');    
                $(this).attr('data-modal',_modal);
                $('#my-addr-book-newaddr-popup').attr('data-modalname', _modal).find('.pf-semi-bold-text').html('Edit Address');
                var id = $(this).attr('data-id');
                $("#update_id").val(id);
                
                $("#maEnterYourNewAdd #name").val($.trim($("#fname-" + id).val()));
                $("#maEnterYourNewAdd #name2").val($.trim($("#lname-" + id).val()));
                $("#maEnterYourNewAdd #mobile").val($.trim($("#mobile-" + id).val()));
                $("#maEnterYourNewAdd #street").val($.trim($("#street-" + id).val()));
                $("#maEnterYourNewAdd #area").val($.trim($("#street1-" + id).val()));
                $("#maEnterYourNewAdd #landmark").val($.trim($("#landmark-" + id).val()));
                $("#maEnterYourNewAdd #city").val($.trim($("#city-" + id).val()));
                
                var state = $.trim($("#state-" + id).val())?$.trim($("#state-" + id).val()):'';
                var countryName =($("#countryid-" + id).val() != '' && $("#countryid-" + id).val()!='IN' )? $("#countryid-" + id).val():'IN';
                
                if($(this).hasClass('address_edit') === false){
                    $('#my-addr-book-newaddr-popup').find('h5').html('Enter a New Address');
                    o.addressBookLoad=true;
                    $("#selectCountry").val('IN').change();
                    
                }
                
                if($(this).hasClass('address_edit')){
                    $("#selectCountry").val(countryName).change();               
                }
                
                
                $("#form-contry").removeClass("frm-error-wrap").removeClass("frm-success-wrap");
                o.addressBookLoad=false;
                if ($.trim($("#countryid-" + id).val()) === "IN" || $.trim($("#countryid-" + id).val()) === "") {
                   $("#form-state-select").css("display","block");
                   $("#form-state").css("display","none");
                   
                   if(_modal!="add-address"){
                        $("#maEnterYourNewAdd #selectState").val(state).change();
                        $("#form-state-select").removeClass("frm-error-wrap").removeClass("frm-success-wrap");
                    }
                   $("#selectState").removeAttr('disabled');
                   $("#state_input").val(state).attr("disabled","disabled");
                }
                else{
                    if(_modal!="add-address"){
                        $("#form-state").removeClass("frm-error-wrap").removeClass("frm-success-wrap");
                    }
                    
                    
                    $("#selectState").attr("disabled","disabled");
                    $("#state_input").val(state).removeAttr('disabled');
                   $("#form-state-select").css("display","none");
                   $("#form-state").css("display","block"); 
                }
                
                $("#maEnterYourNewAdd #postcode").val($.trim($("#postcode-" + id).val()));
                $("#maEnterYourNewAdd #country").val($.trim($("#countryid-" + id).val())).select2();
                $('#popup_overlay').fadeIn(function () {
                    $('[data-modalname=' + _modal + ']').fadeIn();
                    $('body').addClass('active');
                });
                
                $(document).on('click', '.popup-close,.popup_overlay', function (e) {
                    $('[data-modalname=' + _modal + ']').fadeOut(function () {
                        $('#my-addr-book-newaddr-popup').attr('data-modalname', 'add-address').find('h5').html('Enter a New Address');
                        $('#popup_overlay').fadeOut();
                        $('body').removeClass('active');
                    });
                    e.preventDefault();
                });
                $(document).keyup(function (e) {
                    if (e.keyCode === 27) {
                        $('[data-modalname=' + _modal + ']').fadeOut(function () {                            
                            $('#my-addr-book-newaddr-popup').attr('data-modalname', 'add-address').find('h5').html('Enter a New Address');
                            $('#popup_overlay').fadeOut();
                            $('body').removeClass('active');
                        });
                    }
                });
            },
            editInputBoxes:function(e){
                $(this).hide().siblings(".inpt").focus().removeClass('disabled');
                $(this).parents('.edit-info-sec').find('.pf-btn').removeClass("disabled").addClass("pf-hover-primary-color");
            },
            updateProfile:function(e){
                var error = true; 
                var formId = 'maEditAddress';
                error= PF.HEADER.validateForm("",formId);
                if(error === false){
                    $("#"+formId).submit();
                }
            },            
            verifyGender:function(){
                $("#save-basic-profile").removeClass("disabled").addClass("pf-hover-primary-color");
            },            
            updatePassword:function(e){
                var $this = $("#maresetPass");
                var error = true;
                var formId = "maresetPass";
                error = PF.HEADER.validateForm("",formId);
                if(!error){
                    $("#maresetPass").submit();
                }
                
            },
            removeFromWishlist: function () {
                var id = $(this).attr('data-id');
                var type = $(this).attr('data-type'); //added data type for wardrobe products
                var response = confirm('Do you want to remove this item from wishlist ?');
                if (response === false)
                {
                    return false;
                }
                if (type == "bundle") {
                    utils.removeFromWishlist(id, o.removeFromWishlistHandler, '', 1);
                } else if(type == "look") {
                    utils.removeFromWishlist(id, o.removeFromWishlistHandler, '', undefined, 1);
                } else{
                    utils.removeFromWishlist(id, o.removeFromWishlistHandler);
                }
            },
            removeFromWishlistHandler: function (d) {
                d = parseInt(d);
                if (!isNaN(d) && d === 1) {
                    window.location.reload();
                }
                else {
                    alert(o.processError);
                }
            },            
            submitWishlistComment: function (e) { 
                
                var id = $(this).closest("form").attr('data-id');                
                var type = $(this).closest("form").attr('data-type'); //added data type for wardrobe products
                var $form = $('#wishlist_form-' + id);
                var $textarea = $form.find('textarea');
                var formId="wishlist_form-"+id;
                var validation=PF.HEADER.validateForm('',formId);
                var comments = $.trim(o.escapeHtml($textarea.val()));
                if(!validation)
                {
                    $textarea.html(comments);

                    if (type == 'bundle') {
                        var _url = secure_url + "/site_wardrobe/addComments";
                    } else if(type == 'look') {
                        var _url = secure_url + "/look/addComments";
                    } else {
                        var _url = secure_url + "/customer_wishlist/addComments";
                    }
                    utils.makeRequest(
                            _url,
                            'POST',
                            {
                                comments: comments,
                                item_id: id
                            },
                    o.submitWishlistCommentSuccess,
                            PF.ERROR.raiseError,
                            '',
                            {
                                id: id,
                                comments: comments
                            }
                    );
                }

                return false;
            },
            myOrdersSearchByOrderNo: function () {
                var $this = $(this),
                val = $.trim($this.val());
                if (isNaN(val)) {
                    $this.val('');
                    return;
                }
                $this.parent().find('#clear_order_search_box').css('visibility', function () {
                    if(val !== ''){
                        $("#maSrchBtn").css("visibility","hidden");
                    }
                    else{
                        $("#maSrchBtn").css("visibility","visible");
                    }
                    return (val !== '') ? 'visible' : 'hidden';
                    
                });
                
            },
            myOrdersMonthFilter: function () {                
                var period = this.options[this.selectedIndex].value;
                window.location =  (!isNaN(period) && period !== 0)?secure_url + '/customer/myorders?period=' + period: secure_url+'/customer/myorders';
            },
            trackOrder: function () {
                var $this = $(this);
                if ($this.attr('disabled') === 'disabled')
                    return;
                $this.attr('disabled', 'disabled');
                var id = $this.attr('data-id');
                var pid = $this.attr('data-pid');
                var _url = secure_url + '/customer_trackOrder/trackItem/' + id + '/' + pid + '/myorders';
                $('.tyo_popup_box').remove();

                var _container = ($('#viewOrderTab').length > 0) ? '#viewOrderTab' : '#accountDashboardTab';

                utils.makeRequest(
                        _url,
                        'GET',
                        {},
                        function (d, e) {
                            $('.tyo_popup_box').remove();
                            $("#deliveryStatus").html(d);
                            $this.removeAttr('disabled');
                        },
                        PF.ERROR.raiseError,
                        function(){
                            //before Send handler
                        },
                        {
                            id: id,
                            container: _container
                        }
                );
                
            },
            submitReturnFrom: function (e) {
                var currentItemId = $(this).attr("itemid");
                e.preventDefault();
                // Validation
                var is_valid = true;
                var $this = $(this);
                var errorHtml;
                var page_type = $this.attr('form-type');
                var reason = $('#reason_select_'+$this.attr('itemid')).val();
                var comments = $('#ws_comments_'+$this.attr('itemid')).val();
                currentItemId = $("#return-item-form-"+currentItemId+" .currentItemId").val();
                var fileSize = 0;
                var file = "";
                var file_extension = "";
                if($('.file-uploaded-wrap .uploade-img-list').length>0){
                    file = $('.file-uploaded-wrap .uploade-img-list:first').find("p").text();
                    file_extension =file.split('.').pop().toLowerCase();
                    fileSize= parseInt($('.file-uploaded-wrap .uploade-img-list:first').attr('fsize'));
                }
                $("#return-item-form-"+currentItemId+" .invalid_file2").css({"display":"none","color":"#969696"});
                $("#return-item-form-"+currentItemId+" #invalid_file").html("Choose File .jpg, .jpeg, .png, .bmp Only. Max Size 5 Mb").css({"color":"#969696"});
                $this.find("#return-item-form-"+currentItemId+" .error-msg").css("display","none");
                
                if(reason == '') {
                    $('#reason-wrap-'+$this.attr('itemid')).find(".error-msg").css("display","block");
                    is_valid = false;
                }
                else{
                    $('#reason-wrap-'+$this.attr('itemid')).find(".error-msg").css("display","none");
                }                
                if(file === '' && is_valid === true && reason!='Incomplete items or contents missing') {
                    $("#return-item-form-"+currentItemId+" .invalid_file2").css({"display":"block","color":"#d0021b"});
                    is_valid = false;
                }
                else{
                    $("#return-item-form-"+currentItemId+" .invalid_file2").css({"display":"none","color":"#969696"});
                }
                
                if(file_extension === "" && is_valid === true && reason!='Incomplete items or contents missing'){
                    $("#return-item-form-"+currentItemId+" #invalid_file").css('color','#d0021b');
                        is_valid = false;                        
                }
                else{
                    if($.inArray(file_extension, ['doc','docx','jpg','jpeg','bmp','png']) === -1 && is_valid === true && reason!='Incomplete items or contents missing') {
                        $("#return-item-form-"+currentItemId+" #invalid_file").css('color','#d0021b');
                        is_valid = false;
                    }
                    else{
                        $("#return-item-form-"+currentItemId+" #invalid_file").css('color','#969696');                    
                    }
                }
                if(is_valid === true && (fileSize==0 || fileSize>1049576*5) && reason!='Incomplete items or contents missing') {
                    $("#return-item-form-"+currentItemId+" #invalid_file").css('color','#d0021b');
                    is_valid = false;
                }else{
                    $("#return-item-form-"+currentItemId+" #invalid_file").css('color','#969696');                    
                }
                
                if(is_valid){                    
                    is_valid = !(PF.HEADER.validateForm("","return-item-form-"+currentItemId));
                }
                
                if(is_valid) {
                    $this.attr('disabled', 'disabled').addClass('btn-blue btn-loader');
                    var formData = $('#return-item-form-'+$this.attr('itemid')).serialize();
                    o.callBack(formData, $this, page_type);
                }
            },
            callBack : function( formData, t ,page_type) {
                var $this = t;
                var _url = secure_url + '/customer/return_request';
                // fire ajax call
                var _ajaxSetUpOptions = {
                    //contentType : false,
                    processData : false,
                    cache : false
                };
                utils.makeRequest(
                    _url,
                    'POST',
                    formData,
                    function (d) {
                       var return_data = $.parseJSON(d);
                       if(return_data.status == 1) {
                           if(page_type == 1) {
                                $("#returnItemModal-"+$this.attr('itemid')).removeAttr('data-modal').attr('href', 'javascript:void(0);').css('cursor', 'default').addClass('disabled-tt').text('Return Initiated').attr('data-tooltip', 'Return Already initiated');
                                $(".popup-close").click();
                                $this.removeAttr("disabled").removeClass('btn-blue btn-loader');
                            } else { 
                                // replace div with success message
                                $("#return-reason-form-"+$this.attr('itemid')).hide();
                                $('#return-form-success-message-'+$this.attr('itemid')).show();
                           } 
                       } else {
                          // error
                          $this.removeAttr("disabled").removeClass('btn-blue btn-loader');
                          if(return_data.status == 2) {
                            $('div.error-text').remove();  
                            var file_warp = $("#file-wrap-"+$this.attr('itemid'));
                            var errorHtml;
                            if(return_data.error.upload_error === 'Upload error!!, Please select a file again'){
                                errorHtml = o.formErrorHtml.replace('{{ERROR}}', return_data.error.upload_error);
                            }else{
                                errorHtml = o.formErrorHtml.replace('{{ERROR}}', return_data.error.invalid_size);
                            }
                            file_warp.addClass('input-error').append(errorHtml);
                            file_warp.find('div.error-text').show();
                          }
                          if(return_data.status == -1) {
                            alert(return_data.message);
                          }
                       }
                    },
                    PF.ERROR.raiseError,
                    '',
                    {
                        //id : id,
                        //container : _container
                    },
                    _ajaxSetUpOptions
            );
            },
            loadOrders: function (e) {
                e.preventDefault();
                var current_element = $(this);
                var current_page = parseInt(current_element.attr('page')) + 1;
                // load the order template by ajax call and append
                var _url = secure_url + '/customer/loadorders';

                utils.makeRequest(
                        _url,
                        'GET',
                        {
                            p: current_page
                        },
                function (d, e) {
//                    current_element.remove();
                    $(".view-more-return-orders").remove();
                    $("#return-orders-wrap-container").append(d);
                    $("#return_item_load_btn").attr('page', current_page);
                },
                        PF.ERROR.raiseError,
                        '',
                        {
                            //id : id,
                            //container : _container
                        }
                );
            },
            callUploadFile:function(){
                $(this).closest("form").find(".rpImage").trigger('click');
            },
            resetReturnItemPopup:function(){
                $(this).closest("form").trigger("trigger");
                $(this).closest("file-uploaded-wrap").html("");
            },
            uploadFileOnSelect:function(){
                var currentItemId = $(this).closest("form").find(".return-order-submit").attr("itemId");
                var currentId = parseInt($("#return-item-form-"+currentItemId+" .file-uploaded-wrap .uploade-img-list").length)+1;
                if(currentId>0){
                    $("#return-item-form-"+currentItemId+" .file-upload-wrap").hide();
                }
                else{
                    $("#return-item-form-"+currentItemId+" .file-upload-wrap").show();
                }
                var type = $('#filesUpload-'+currentItemId)[0].files[0].name.split('.').pop().toLowerCase();
                var size = $('#filesUpload-'+currentItemId)[0].files[0].size;
                 switch (type) {
                        case 'doc': 
                        case 'docx': 
                        case 'jpg':
                        case 'jpeg': 
                        case 'png': 
                        case 'bmp':
                                if(currentId>=o.maxFilesToUpload){
                                    $('#return-item-form-'+currentItemId+' .add-more-file').hide();
                                }    
                                if(size<=1049576*5){
                                    $('#return-item-form-'+currentItemId+' #invalid_file').hide();
                                    if(currentId <=o.maxFilesToUpload){
                                        o.getDataFeedback(type,currentId,currentItemId);
                                    }
                                    else{
                                        
                                        $('#return-item-form-'+currentItemId+' .add-more-file').hide();
                                        $('#return-item-form-'+currentItemId+' #invalid_file').html('Max 5 files are allowed!').css('color','#d0021b');
                                        if(currentId >= 5){
                                            $('#return-item-form-'+currentItemId+' .add-more-file').hide();
                                        }
                                        return false;
                                    }
                                }
                                else{
                                    if(currentId ==1){
                                        $(".file-upload-wrap").show();
                                    }
                                    $('#return-item-form-'+currentItemId+' #invalid_file').html('Max 5Mb allowed!').css('color','#d0021b').show();
                                    if(currentId >= o.maxFilesToUpload){
                                        $('#return-item-form-'+currentItemId+' .add-more-file').hide();
                                    }
                                    return false;
                                }
                            break;
                        default:
                            $(".file-upload-wrap").show();
                            $('#return-item-form-'+currentItemId+' #invalid_file').css('color','#d0021b');
                            $('#return-item-form-'+currentItemId+' .return-order-submit').removeAttr('disabled');
                            $('#return-item-form-'+currentItemId+' .return-order-submit').removeClass('disabled');
                            $('#return-item-form-'+currentItemId+' .return-order-submit').val('Return Item');
                            var file_warp = $("#return-item-form-"+currentItemId+" #file-wrap-"+currentItemId);
                            $('div.error-text').remove();
                            var errorHtml = o.formErrorHtml.replace('{{ERROR}}', o.formErrorMsg.file_error.file_extension);
                            file_warp.addClass('input-error').append(errorHtml);
                            file_warp.find('div.error-text').show();
                        return false;
                    }
            },
            getDataFeedback : function(type,currentId,formId){
                var currentItemId = $("#return-item-form-"+formId+" .currentItemId").val();
                if(typeof(currentId)=='undefined'){
                    currentId='';
                }
                var i =1;
                var loaded = 0;
                var step = 1048576;
                var total =$('#filesUpload-'+currentItemId)[0].files[0].size;
                var totalRequest = 5;//Math.ceil(total/step);
                var start = 0;
                var name = encodeURIComponent( $("#return-item-form-"+currentItemId+' #filesUpload-'+currentItemId)[0].files[0].name );
                var randName = Math.random().toString(36).substr(2, 30);
                var parts = name.split(".");
                var fileNameWA = parts[0];
                name = encodeURIComponent( fileNameWA+randName+"."+type );
                var resFlag = 1;
                var uploaded = document.getElementById('feddback_rpImage_'+currentId);

                var reader = new FileReader();

                reader.onload = function(e){
                        var xhr = new XMLHttpRequest();
                        var upload = xhr.upload;
                        xhr.onreadystatechange = function() {
                                // if( xhr.readyState == XMLHttpRequest.DONE ) {
                                if( this.readyState == 4 && this.status == 200 ) {
                                        var fileRes = xhr.responseText;
                                        if (fileRes === "invalid_file" && resFlag === 1)
                                        {
                                            alert("Invalid image file!");
                                            $('#invalid_size').html('Invalid image file!');
                                            $('#feddback_rpImage_'+currentId).html('Choose File');
                                            $('#return-item-form-'+formId+' .return-order-submit').removeClass('disabled');
                                            $('#return-item-form-'+formId+' .return-order-submit').removeAttr('disabled');
                                            $('#return-item-form-'+formId+' .return-order-submit').val('Return Item');                                           
                                            
                                            xhr.abort();
                                            resFlag = 0;
                                            loaded=total*100;
                                            return;
                                        }
                                        if( totalRequest < i ) {
                                            if(fileRes === "image_size_exeeded" && resFlag === 1){
                                                alert("Image is too big! Please reduce the size of your photo using an image editor. Max 5 MB is allowed.");
                                                $('#invalid_file').html('Max 5Mb allowed!');
                                                $('#feddback_rpImage_'+currentId).html('Choose File');
                                                $('#return-item-form-'+formId+' .return-order-submit').removeClass('disabled');
                                                $('#return-item-form-'+formId+' .return-order-submit').removeAttr('disabled');
                                                $('#return-item-form-'+formId+' .return-order-submit').val('Return Item');
                                                xhr.abort();
                                                resFlag = 0;
                                                loaded=total*100;
                                                return;
                                            }
                                        }
                                        
                                        if(loaded >= total){
                                            $('#return-item-form-'+formId+' .return-order-submit').removeClass('disabled');
                                            $('#return-item-form-'+formId+' .return-order-submit').removeAttr('disabled');
                                            $('#return-item-form-'+formId+' .return-order-submit').val('Return Item');
                                            if(resFlag){
                                                //$('#feddback_rpImage_'+currentId).html($('#rpImage_'+currentId).val().replace(/C:\\fakepath\\/i, ''));
                                                //$('#fileContaier_'+currentId).show();
                                                $("#return-item-form-"+currentItemId+" .rpImage").val("");
                                                var srNo = parseInt($("#return-item-form-"+currentItemId+" .file-uploaded-wrap .uploade-img-list").length)+1;

                                                var htmlStr="<div class='uploade-img-list' sr-no='"+srNo+"' fsize='"+total+"'>"+"<p class='uploaded-img'>"+fileRes+"</p>"+"  <a href='javascript:;' class='pf-text-brown remove-file font-12'>Remove</a> </div>";
                                                
                                                if(o.oneTimeLoad){
                                                    $(".remove-file, .add-more-file").css({'display':'inline-block', 'margin-top':'-1.5rem'});
                                                    var htmlDom  = $("#return-item-form-"+currentItemId+" .file-uploaded-wrap").html(htmlStr);
                                                     $(".remove-file").css({'display':'inline-block', 'margin-top':'-1.5rem'});
                                                    o.oneTimeLoad=false;
                                                }else{                                                           
                                                    $("#return-item-form-"+currentItemId+" .file-uploaded-wrap .uploade-img-list").parent().append(htmlStr);
                                                    $(".remove-file").css({'display':'inline-block', 'margin-top':'-1.5rem'});
                                                    if($("#return-item-form-"+currentItemId+' .uploade-img-list').length == o.maxFilesToUpload){
                                                        $("#return-item-form-"+currentItemId+".add-more-file").hide();        
                                                    }
                                                }
                                                
                                            }else{
                                                $('#feddback_rpImage_'+currentId).html('Choose File');
                                            }
                                            
                                            xhr.abort();
                                            resFlag = 0;
                                            loaded=total*100;
                                            return;
                                        }
                                }
                        }
                        upload.addEventListener('load',function(){
                                loaded += step;
                                var _p = (loaded/total) * 100;
                                if( _p > 100 ) {
                                        _p = 100;
                                }
                                $("#return-item-form-"+currentItemId).find("input[type=submit]").addClass("btn-loader").attr('disabled','disabled');
                                if(loaded <= total){
                                        blob = $('#filesUpload-'+currentItemId)[0].files[0].slice(loaded,loaded+step);

                                        reader.readAsBinaryString(blob,o.log);
                                }else{
                                        loaded = total;
                                        $("#return-item-form-"+currentItemId).find("input[type=submit]").removeClass("btn-loader").removeAttr('disabled');
                                }
                        },false);                        
                        if(resFlag){
                            xhr.open("POST", root_url+"/customer/feedbackFileUpload?fileName="+name+"&fileType="+type+"&fileSize="+total+"&nocache="+new Date().getTime()+"&totalRequest="+totalRequest+"&currentId="+currentId+"&count="+i++);
                            xhr.overrideMimeType("application/octet-stream");
                            xhr.sendAsBinary(e.target.result);
                        }
                };

                var blob = $('#filesUpload-'+currentItemId)[0].files[0].slice(start,step);
                reader.readAsBinaryString(blob,o.log);
            },
            removeUploadedFile : function(){
                var wrapLength = $(this).parent('.uploade-img-list').parent('.file-uploaded-wrap').find('.uploade-img-list').length;           
                $(this).parents(".uploade-img-list").remove();
                $(".rpImage").val("");
                $(".rpImage").parent("div").find("label").text("Choose file");
                
                if(wrapLength == 1){                    
                    o.oneTimeLoad=true; 
                    $(".file-upload-wrap").show();
                    $(".add-more-file").hide();
                }else{
                    $(".file-upload-wraped").hide();    
                    $(".add-more-file").show();        
                }
                
                var srno = $(this).parent("div.uploade-img-list").attr('sr-no');
                $.ajax
                ({
                    url: root_url + '/customer/delUploadedImage',
                    data: { "srno":srno},
                    type: "POST",
                    async: true,                
                    success: function (data) 
                    {                         

                    }
                });
                
            },
            escapeHtml : function(unsafe) {
                return unsafe.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
            },
            submitWishlistCommentSuccess: function (d, e) {
                d = parseInt(d);
                if (!isNaN(d) && d === 1) {
                    var commentsText = e.comments.length>50?e.comments.slice(0, 50):e.comments;
                    var readmore = e.comments.length>50?"<a href='javascript:;' class='ma-comment-readmore' data-modal='wishlist_comment_popup_"+e.id+"'>Read More</a>":"";
                    $("#comment_" + e.id).html(o.escapeHtml(commentsText)).append(readmore);
                    $('#wishListCommentPopupClose').trigger('click');
                } else {
                    alert(o.processError);
                }
            },
            myOrdersClearSearchBox: function () {
                $(this).css('visibility', 'hidden');
                $("#maSrchBtn").css('visibility', 'visible');
                $('#order_no').val('').focus();
                var orderNo = parseInt(utils.getParameterByName('order_id'));
                if (!isNaN(orderNo) && orderNo !== 0) {
                    window.location = secure_url + '/customer/myorders';
                }
            },
            chooseRating:function(){
                if ($(this).val() <= '3') {                          
                    $(this).parent('.feedback-rate').siblings('.Detail-Reason').show();
                    $(this).parent('.feedback-rate').siblings('.thank-for-reviewDetail').hide();
                } 
                else {
                    saveRating($(this).closest("form").attr("id"));
                    $(this).closest("form").find("input,select").attr("disabled","disabled");
                    $(this).parent('.feedback-rate').siblings('.Detail-Reason').hide();
                    $(this).parent('.feedback-rate').siblings('.thank-for-reviewDetail').show();
                }
            },
            changeFeedbackReason:function(){
                $(this).parent().hide('.Detail-Reason');
                $(this).parent('.Detail-Reason').siblings('.thank-for-reviewDetail').show();
                if($(this).val().trim().length>0){
                    saveRating($(this).closest("form").attr("id"));
                    $(this).closest("form").find("input,select").attr("disabled","disabled");
                } 
            },
            openRatingHtml:function(){
                $(this).find('.myacnt-shrfdbck').addClass('strt-fdbckstp');
            },
            closeRatingHtml:function(){
                $(this).find('.myacnt-shrfdbck').removeClass('strt-fdbckstp');
            },
            slideHtml:function(){
                $(this).parents('.fdbck-wrprmyacc').addClass('slide');
                $(this).parents('.fdbck-wrprmyacc').remove();      
            },
            save_rating:function(){    
                
                if(!$(this).hasClass('myacc-fdbcksbmt-btn')){
                    var currentPositionDiv = $(this).closest('.myacc-fdbckcntnt');
                    var feedbackScrnno = parseInt($(this).closest('.myacnt-shrfdbck').find('.fdbck-scrn-no').text());
                    feedbackScrnno++;
                    $(this).closest('.myacnt-shrfdbck').find('.fdbck-scrn-no').html(feedbackScrnno);
                    $(currentPositionDiv).addClass('slide'); 
                }
                
                var $this = $(this);
                var rating = $this.attr('value');
                var oId = $this.attr('order_id');
                var iId = $this.attr('item_id');
                var ratingType = $this.attr('rating_type');
                
                var slide_count = 1;
                if (ratingType == 'over_all_rating') {
                    slide_count = 1;
                } else if (ratingType == 'delivery_time_rating') {
                    slide_count = 2;
                } else if (ratingType == 'item_quality_rating') {
                    slide_count = 3;
                } else {
                    slide_count = 4;
                }
                
                var comment = '';
                if (ratingType == 'comment') {
                    var feedbackBox = $("#feedback_text_" + oId + "_" + iId);
                    comment = feedbackBox.val().trim();
                    if(comment == ''){
                        feedbackBox.next('.myacc-errmsg').addClass('show');
                    }
                    else{
                        $(this).closest('.fdbck-wrprmyacc').addClass('slide');
                        $(this).closest('.fdbck-wrprmyacc').remove();
                    }
                }

                var _url = secure_url + '/customer/save_rating';
                
                utils.makeRequest(
                    _url,
                    'POST',{ rating: rating,comment: o.escapeHtml(comment),order_id: oId,item_id: iId,rating_type: ratingType},
                    function (d, e) {   
                        var json_data = $.parseJSON(d);
                        if (json_data.status == '2') {
                            window.location.reload();
                        }
                    },
                    PF.ERROR.raiseError,
                    '',
                    {}
                ); 
                
            }
            
        };
        z.MYACCOUNT = o;
    }(PF, $));

    $(document).ready(function () {
        PF.MYACCOUNT.init();

        /* Show Learn more tab selected to link easy returns across the site*/        
        //PF.MYACCOUNT.loadlmreturn();        
    });
}

/*function makeWishWardrobe(product_id, success_location) {
    if ($('.pf-wishlist-wardrobe-ic').hasClass('active-wishlist')) {
        PF.UTILITIES.removeFromWishlist(product_id, '', 'vip',1);
        $('.pf-wishlist-wardrobe-ic').removeClass('active-wishlist');
    } else {
        PF.UTILITIES.addToWishlist(product_id, '',1);
        $('.pf-wishlist-wardrobe-ic').addClass('active-wishlist');
    }
}*/
/*$(document).ready(function() {
    $('.action_buy_now_wardrobe').click(function() {
        var pid = $('#product_id').val();
        var quantity = parseInt($('#quantity').val());
        var cat_crum = $('#cat_crum').val();
        //alert(cat_crum);
        PF.UTILITIES.addToCart(product_id, quantity,'','',cat_crum, 1,1);
        //setCart(pid, quantity,"buy_imm",'','',1,1);//product_id, qty, redirect_callback, configure, prod_crum,buy_now
    })
})*/

var PF = PF || {};
(function (z, $) {
    var utils = z.UTILITIES;

    var w = {
        /* CREATING LITERALS BASED ON ID's CLASS AND ELEMENT FOR BINDING ON INITIALIZATION*/
        listenOnClass: {
            click: {'action_buy_now_wardrobe': 'PF.W_VIP.buyNow',
                // 'pf-wishlist-wardrobe-ic': 'PF.W_VIP.wishList',
                'add-to-wishlist': 'PF.W_VIP.wishList',
                'print_your_design': 'PF.W_VIP.printDesign',
                'vip-share-fb': 'PF.W_VIP.fbShare',
                'vip-share-twitter': 'PF.W_VIP.twitterShare',
                'vip-share-insta': 'PF.W_VIP.pinterestShare',
                'customize-wardrobe-new-design': 'PF.W_VIP.loadNewDesign',
                'details_header_tab': 'PF.W_VIP.detailsTab'
            },
            
        },
        init: function () {
            for (var i in this.listenOnClass) {
                if (this.listenOnClass.hasOwnProperty(i)) {
                    var _obj = this.listenOnClass[ i ];

                    for (var j in _obj) {
                        if (_obj.hasOwnProperty(j)) {
                            PF.UTILITIES.addListener(
                                    $('.' + j), i, _obj[ j ]
                                    );
                        }
                    }
                }
            }
        },
        buyNow: function (event) {
            event.preventDefault();
            event.stopImmediatePropagation();
            if (!$('.third_wardrobe').hasClass('inactive')) {
                var quantity = parseInt($('#quantity').val());
                var product_id = $('#product_id').val();
                var cat_crum = $('#cat_crum').val();
                //alert(cat_crum);
                //PF.UTILITIES.addToCart(product_id, quantity,'','',cat_crum, 1,1);
                if (typeof (quantity) === 'undefined' || isNaN(quantity) || quantity == 0) {
                    /*THROW ERROR PLEASE SELECT SIZE*/
                    $('.vip-config-sizes-wrap ').addClass('vip-config-sizes-error');
                    $('.vip-configurable .error-text').show();
                    return false;
                } else {

                    $('.vip-config-sizes-wrap ').removeClass('vip-config-sizes-error');
                    $('.vip-configurable .error-text').hide();
                }

                $(this).find('a').addClass('loading');
                var cat_crum = $("#cat_crum").val();
                PF.W_VIP.addEventTracker('Buy Now', itemData.name+'|'+itemData.price);
                utils.pushToDataLayer({'category': 'VIP', 'action': 'Click', 'label': 'Menu Buy Now', 'opt': true, 'event': 'legacyevent'});
                utils.addToCart(product_id, quantity, w.buy_imm, '', cat_crum, 1,1);

            }
        },
        buy_imm: function () {
            utils.setLocation(root_url + '/checkout/cart');
        },
        wishList: function () {
            $(this).toggleClass('selected');
            PF.W_VIP.addEventTracker('Add to Wishlist', itemData.name);
            var product_id = $('#product_id').val();
            if ($(this).hasClass('active-wishlist')) {
                utils.removeFromWishlist(product_id, '', 'vip',1);
                $(this).removeClass('active-wishlist');
                 $(this).children('.font-13').text('Add to wishlist');
        } else {
                utils.addToWishlist(product_id, '',1);
                $(this).addClass('active-wishlist');
                $(this).children('.font-13').text('In Your Wishlist');               
            }
        },
        printDesign: function(){
            PF.W_VIP.addEventTracker('Print Your Design', itemData.name);
        },
        fbShare: function(){
            PF.W_VIP.addEventTracker('Share', 'Facebook|'+itemData.name);
        },
        twitterShare: function(){
            PF.W_VIP.addEventTracker('Share', 'Twitter|'+itemData.name);
        },
        pinterestShare: function(){
            PF.W_VIP.addEventTracker('Share', 'Pinterest|'+itemData.name);
        },
        loadNewDesign: function(){
            PF.W_VIP.addEventTracker('New Design', itemData.name);
        },
        detailsTab: function(){
            var selected_tab = $(this).attr('data-ref');
            var label = 'Overview';
            if(selected_tab == 'vip_details') {
                label = 'Details';
            } else if(selected_tab == 'vip_faq_tab') {
                label = 'FAQS';
            } else if(selected_tab == 'furniture_care_tab') {
                label = 'Care';
            } else if (selected_tab == 't_and_c_tab') {
                label = 'Terms';
            } 
            
            PF.W_VIP.addEventTracker('Right Box', label);
        },
        addEventTracker: function(action, label) {
            utils.pushToDataLayer({'category': 'Customized Wardrobe', 'action': action, 'label': label, 'event': 'event Customized Wardrobe'});
        }
    }
    z.W_VIP = w;
}(PF, $));

$(document).ready(function () {
    PF.W_VIP.init();
    $('.acc_header').click(function () {
    if ($(this).hasClass('active')) {
            $(this).removeClass('active');
            $('.acc_body').slideUp(300);
        } else {
            $('.acc_header').removeClass('active');
            $(this).addClass('active');
            $('.acc_body').slideUp(300);
            $(this).siblings('.acc_body').slideDown(300, function () {

            });
        }
    });
})
/*!
 * jQuery pagination plugin v1.4
 * http://esimakin.github.io/twbs-pagination/
 *
 * Copyright 2014-2015, Eugene Simakin
 * Released under Apache 2.0 license
 * http://apache.org/licenses/LICENSE-2.0.html
 */
(function ($, window, document, undefined) {

    'use strict';

    var old = $.fn.twbsPagination;

    // PROTOTYPE AND CONSTRUCTOR

    var TwbsPagination = function (element, options) {
        this.$element = $(element);
        this.options = $.extend({}, $.fn.twbsPagination.defaults, options);

        if (this.options.startPage < 1 || this.options.startPage > this.options.totalPages) {
            throw new Error('Start page option is incorrect');
        }

        this.options.totalPages = parseInt(this.options.totalPages);
        if (isNaN(this.options.totalPages)) {
            throw new Error('Total pages option is not correct!');
        }

        this.options.visiblePages = parseInt(this.options.visiblePages);
        if (isNaN(this.options.visiblePages)) {
            throw new Error('Visible pages option is not correct!');
        }

        if (this.options.totalPages < this.options.visiblePages) {
            this.options.visiblePages = this.options.totalPages;
        }

        if (this.options.onPageClick instanceof Function) {
            this.$element.first().on('page', this.options.onPageClick);
        }

        if (this.options.href) {
            var match, regexp = this.options.href.replace(/[-\/\\^$*+?.|[\]]/g, '\\$&');
            regexp = regexp.replace(this.options.pageVariable, '(\\d+)');
            if ((match = new RegExp(regexp, 'i').exec(window.location.href)) != null) {
                this.options.startPage = parseInt(match[1], 10);
            }
        }

        var tagName = (typeof this.$element.prop === 'function') ?
            this.$element.prop('tagName') : this.$element.attr('tagName');

        if (tagName === 'UL') {
            this.$listContainer = this.$element;
        } else {
            this.$listContainer = $('<ul></ul>');
        }

        this.$listContainer.addClass(this.options.paginationClass);

        if (tagName !== 'UL') {
            this.$element.append(this.$listContainer);
        }

        if (this.options.initiateStartPageClick) {
            this.show(this.options.startPage);
        } else {
            this.render(this.getPages(this.options.startPage));
            this.setupEvents();
        }

        return this;
    };

    TwbsPagination.prototype = {

        constructor: TwbsPagination,

        destroy: function () {
            this.$element.empty();
            this.$element.removeData('twbs-pagination');
            this.$element.off('page');

            return this;
        },

        show: function (page) {
            if (page < 1 || page > this.options.totalPages) {
                throw new Error('Page is incorrect.');
            }

            this.render(this.getPages(page));
            this.setupEvents();

            this.$element.trigger('page', page);

            return this;
        },

        buildListItems: function (pages) {
            var listItems = [];

            // Add "first" page button
            if (this.options.first) {
                listItems.push(this.buildItem('first', 1));
            }
            // Add "previous" page button
            if (this.options.prev) {
                var prev = pages.currentPage > 1 ? pages.currentPage - 1 : this.options.loop ? this.options.totalPages  : 1;
                listItems.push(this.buildItem('prev', prev));
            }
            // Add "pages"
            for (var i = 0; i < pages.numeric.length; i++) {
                listItems.push(this.buildItem('page', pages.numeric[i]));
            }
            // Add "next" page button
            if (this.options.next) {
                var next = pages.currentPage < this.options.totalPages ? pages.currentPage + 1 : this.options.loop ? 1 : this.options.totalPages;
                listItems.push(this.buildItem('next', next));
            }
            // Add "last" page button
            if (this.options.last) {
                listItems.push(this.buildItem('last', this.options.totalPages));
            }

            return listItems;
        },

        buildItem: function (type, page) {
            var $itemContainer = $('<li></li>'),
                $itemContent = $('<a></a>'),
                itemText = null;

            itemText = this.options[type] ? this.makeText(this.options[type], page) : page;
            $itemContainer.addClass(this.options[type + 'Class']);
            $itemContainer.data('page', page);
            $itemContainer.data('page-type', type);
            $itemContainer.append($itemContent.attr('href', this.makeHref(page)).html(itemText));

            return $itemContainer;
        },

        getPages: function (currentPage) {
            var pages = [];

            var half = Math.floor(this.options.visiblePages / 2);
            var start = currentPage - half + 1 - this.options.visiblePages % 2;
            var end = currentPage + half;

            // handle boundary case
            if (start <= 0) {
                start = 1;
                end = this.options.visiblePages;
            }
            if (end > this.options.totalPages) {
                start = this.options.totalPages - this.options.visiblePages + 1;
                end = this.options.totalPages;
            }

            var itPage = start;
            while (itPage <= end) {
                pages.push(itPage);
                itPage++;
            }

            return {"currentPage": currentPage, "numeric": pages};
        },

        render: function (pages) {
            var _this = this;
            this.$listContainer.children().remove();
            var items = this.buildListItems(pages);
            jQuery.each(items, function(key, item){
                _this.$listContainer.append(item);
            });

            this.$listContainer.children().each(function () {
                var $this = $(this),
                    pageType = $this.data('page-type');

                switch (pageType) {
                    case 'page':
                        if ($this.data('page') === pages.currentPage) {
                            $this.addClass(_this.options.activeClass);
                        }
                        break;
                    case 'first':
                            $this.toggleClass(_this.options.disabledClass, pages.currentPage === 1);
                        break;
                    case 'last':
                            $this.toggleClass(_this.options.disabledClass, pages.currentPage === _this.options.totalPages);
                        break;
                    case 'prev':
                            $this.toggleClass(_this.options.disabledClass, !_this.options.loop && pages.currentPage === 1);
                        break;
                    case 'next':
                            $this.toggleClass(_this.options.disabledClass,
                                !_this.options.loop && pages.currentPage === _this.options.totalPages);
                        break;
                    default:
                        break;
                }

            });
        },

        setupEvents: function () {
            var _this = this;
            this.$listContainer.find('li').each(function () {
                var $this = $(this);
                $this.off();
                if ($this.hasClass(_this.options.disabledClass) || $this.hasClass(_this.options.activeClass)) {
                    $this.on('click', false);
                    return;
                }
                $this.click(function (evt) {
                    // Prevent click event if href is not set.
                    !_this.options.href && evt.preventDefault();
                    _this.show(parseInt($this.data('page')));
                });
            });
        },

        makeHref: function (page) {
            return this.options.href ? this.makeText(this.options.href, page) : "#";
        },

        makeText: function (text, page) {
            return text.replace(this.options.pageVariable, page)
                .replace(this.options.totalPagesVariable, this.options.totalPages)
        }

    };

    // PLUGIN DEFINITION

    $.fn.twbsPagination = function (option) {
        var args = Array.prototype.slice.call(arguments, 1);
        var methodReturn;

        var $this = $(this);
        var data = $this.data('twbs-pagination');
        var options = typeof option === 'object' ? option : {};

        if (!data) $this.data('twbs-pagination', (data = new TwbsPagination(this, options) ));
        if (typeof option === 'string') methodReturn = data[ option ].apply(data, args);

        return ( methodReturn === undefined ) ? $this : methodReturn;
    };

    $.fn.twbsPagination.defaults = {
        totalPages: 1,
        startPage: 1,
        visiblePages: 5,
        initiateStartPageClick: true,
        href: false,
        pageVariable: '{{page}}',
        totalPagesVariable: '{{total_pages}}',
        page: null,
        first: 'First',
        prev: 'Previous',
        next: 'Next',
        last: 'Last',
        loop: false,
        onPageClick: null,
        paginationClass: 'pagination',
        nextClass: 'next',
        prevClass: 'prev',
        lastClass: 'last',
        firstClass: 'first',
        pageClass: 'page',
        activeClass: 'active',
        disabledClass: 'disabled'
    };

    $.fn.twbsPagination.Constructor = TwbsPagination;

    $.fn.twbsPagination.noConflict = function () {
        $.fn.twbsPagination = old;
        return this;
    };

})(window.jQuery, window, document);
