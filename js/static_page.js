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