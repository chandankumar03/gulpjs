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
            processError: 'There was a problem processing your request. Please try again later.',
            formErrorHtml: '<div class="error-text">{{ERROR}}</div>',
            lastEnteredPin: '',
            formErrorMsg: {
                gender: 'Choose gender',
                firstName: 'Enter valid first name',
                lastName: 'Enter valid last name',
                mobile: 'Enter valid phone number',
                oldPassword: 'Invalid old password',
                newPassword: 'Enter your new password',
                confirmPassword: 'Confirm your new password',
                passwordMismatch: 'Both passwords should be same',
                newPasswordLength: 'New password length should be greater than 6 and less than 20 characters',
                passwordsAreSame: 'New password and current password should not be same',
                invalidNewPassword: 'Invalid new password',
                country: 'Select your country',
                area: 'Enter your area',
                street: 'Enter your address',
                landmark: 'Enter a landmark',
                city: 'Enter your city',
                state: {
                    enter: 'Enter your state',
                    select: 'Select your state'
                },
                postcode: 'Enter your pincode',
                comments: 'Enter comments',
                reason: 'Please select a reason',
                file_error: {
                    file : 'Please select a file',
                    file_extension : 'Please select a valid file',
                    file_size : 'Max 5Mb allowed!',
                    file_noselect_flag: true,
                    file_size_error: true
                }
            },
            dashboard: {
                click: {
                    '#accountDashboardTab div.order-data a.track-item-link': 'PF.MYACCOUNT.trackOrder',
                    '.return-order-submit': ['PF.MYACCOUNT.submitReturnFrom', '#page']
                }
            },
            orders: {
                click: {
                    '#clear_order_search_box': 'PF.MYACCOUNT.myOrdersClearSearchBox',
                    '#viewOrderTab div.order-data a.track-item-link': 'PF.MYACCOUNT.trackOrder',
                    'div.rating-stars-wrap a': ['PF.MYACCOUNT.saveRating', '#page'],
                    'div.rating-feature button': ['PF.MYACCOUNT.saveRating', '#page'],
                    '.return-order-submit': ['PF.MYACCOUNT.submitReturnFrom', '#page']
                },
                change: {'#viewOrderTab div.month-filter-wrap select': 'PF.MYACCOUNT.myOrdersMonthFilter'},
                keyup: {'#order_no': 'PF.MYACCOUNT.myOrdersSearchByOrderNo'}
            },
            wishlist: {
                click: {'#wishlistTab a.remove-wishlist-item': ['PF.MYACCOUNT.removeFromWishlist', '#page']},
                submit: {'#wishlistTab form[name=wishlist_form]': ['PF.MYACCOUNT.submitWishlistComment', '#page']}
            },
            account: {
                submit: {
                    '#basic_cust_details': ['PF.MYACCOUNT.updateProfile', '#page'],
                    '#cust_pass_details': ['PF.MYACCOUNT.updatePassword', '#page']
                }
            },
            addressBook: {
                click: {
                    '#address-book a.address_delete': ['PF.MYACCOUNT.deleteAddress', '#page'],
                    '#address-book a.address_edit': ['PF.MYACCOUNT.editAddressModal', '#page'],
                    '#popup_overlay': ['PF.MYACCOUNT.resetForm', 'body'],
                    '.popup-close': ['PF.MYACCOUNT.resetForm', 'body']
                },
                change: {
                    '#address-book input.radio_select': ['PF.MYACCOUNT.setDefaultAddress', '#page'],
                    '#country': ['PF.MYACCOUNT.countryChange', '#page']
                },
                submit: {
                    '#address_form': ['PF.MYACCOUNT.saveAddress', '#page']
                },
                keyup: {
                    '#postcode': ['PF.MYACCOUNT.pinAutoComplete', '#page']
                }
            },
            returnItem: {
                click: {
                    '.return-item-button': ['PF.MYACCOUNT.loadReturnItemForm', '#page'],
                    '.return-form-hide': ['PF.MYACCOUNT.hideReturnForm', '#page'],
                    '.return-order-submit': ['PF.MYACCOUNT.submitReturnFrom', '#page'],
                    '.view-more-return-orders': ['PF.MYACCOUNT.loadOrders', '#page'],
                    '.cs-return-tabs ul li' : ['PF.MYACCOUNT.switchTab', '#page']
                }
            },
            returnItemLogin: {
                click: {
                    '.cs-return-tabs ul li' : ['PF.MYACCOUNT.switchTab', '#page']
                }
            },
            init: function () {
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
                    $(document).on('click', '#wishlistTab a.hide_wishlist_comment', function () {
                        $('#popup_overlay').trigger('click');
                    });
                } else if (window.location.pathname.indexOf('customer/account') !== -1) {
                    utils.listen(o.account);
                } else if (window.location.pathname.indexOf('customer/address_book') !== -1) {
                    utils.listen(o.addressBook);
                } else if (window.location.pathname.indexOf('customer/returnitem') !== -1) {
                    utils.listen(o.returnItem);
                } else if (window.location.pathname.indexOf('customer/initiatereturnlogin') !== -1) {
                    utils.listen(o.returnItemLogin);
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
                var uploadFileOnSelect =function(){
                    o.formErrorMsg.file_noselect_flag=true;
                    $('#feddback_rpImage_'+currentId).html('');
                    var currentId = $(this).attr('myAttr');
                    var formIdSelectedArr=currentId.split("_");
                    if(typeof $('#rpImage_'+currentId)[0].files[0]== "undefined"){
                        o.formErrorMsg.file_noselect_flag=false;
                    }else{
                        $('#return-item-form-'+formIdSelectedArr[0]+' .return-order-submit').attr('disabled', 'disabled');
                        $('#return-item-form-'+formIdSelectedArr[0]+' .return-order-submit').addClass('disabled');
                        $('#return-item-form-'+formIdSelectedArr[0]+' .return-order-submit').val('Uploading...');
                        $('#return-item-form-'+formIdSelectedArr[0]+' #invalid_size').html('');
                        $('div.error-text').remove();
                        $('#return-item-form-'+formIdSelectedArr[0]+' #invalid_size').html('');
                    }
           
                    
                    var type = $('#rpImage_'+currentId)[0].files[0].name.split('.').pop().toLowerCase();
                    var size = $('#rpImage_'+currentId)[0].files[0].size;
                    switch (type) {
                        case 'doc': 
                        case 'docx': 
                        case 'jpg':
                        case 'jpeg': 
                        case 'png': 
                        case 'bmp':
                            if(size<=1049576*5){
                                $('#return-item-form-'+formIdSelectedArr[0]+' #invalid_size').html('');
                                $('#invalid_file').css('color','#c7c7c7');
                                $('#feddback_rpImage_'+currentId).removeClass('add-link');
                                $('#feddback_rpImage_'+currentId).html($('#rpImage_'+currentId).val().replace(/C:\\fakepath\\/i, ''));
                                o.getDataFeedback(type,currentId,formIdSelectedArr[0]);                                

                            } else{
                                $('#return-item-form-'+formIdSelectedArr[0]+' #invalid_size').html('Max 5Mb allowed!');
                                $('#return-item-form-'+formIdSelectedArr[0]+' .return-order-submit').removeAttr('disabled');
                                $('#return-item-form-'+formIdSelectedArr[0]+' .return-order-submit').removeClass('disabled');
                                $('#return-item-form-'+formIdSelectedArr[0]+' .return-order-submit').val('Return Item');
                                return false;
                            }
                            break;
                        default:
                            $('#return-item-form-'+formIdSelectedArr[0]+' #invalid_file').css('color','red');
                            $('#return-item-form-'+formIdSelectedArr[0]+' .return-order-submit').removeAttr('disabled');
                            $('#return-item-form-'+formIdSelectedArr[0]+' .return-order-submit').removeClass('disabled');
                            $('#return-item-form-'+formIdSelectedArr[0]+' .return-order-submit').val('Return Item');
                            var file_warp = $("#file-wrap-"+formIdSelectedArr[0]);
                            $('div.error-text').remove();
                            var errorHtml = o.formErrorHtml.replace('{{ERROR}}', o.formErrorMsg.file_error.file_extension);
                            file_warp.addClass('input-error').append(errorHtml);
                            file_warp.find('div.error-text').show();
                            
                            return false;
                    }
                };
                $('#return-orders-wrap-container').on('change','input:file',uploadFileOnSelect);
                $('.rpImage').on('change',uploadFileOnSelect);

                
            },
            myOrdersMonthFilter: function () {
                var period = this.options[this.selectedIndex].value;
                window.location = (!isNaN(period) && period !== 0) ? secure_url + '/customer/myorders?period=' + period : secure_url + '/customer/myorders';
            },
            myOrdersSearchByOrderNo: function () {
                var $this = $(this),
                        val = $.trim($this.val());
                if (isNaN(val)) {
                    $this.val('');
                    return;
                }
                $this.parent().find('#clear_order_search_box').css('visibility', function () {
                    return (val !== '') ? 'visible' : 'hidden';
                });
            },
            myOrdersClearSearchBox: function () {
                $(this).css('visibility', 'hidden');
                $('#order_no').val('').focus();
                var orderNo = parseInt(utils.getParameterByName('order_id'));
                if (!isNaN(orderNo) && orderNo !== 0) {
                    window.location = secure_url + '/customer/myorders';
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
            submitWishlistComment: function () {
                var id = $(this).attr('data-id');
                var type = $(this).attr('data-type'); //added data type for wardrobe products
                var $form = $('#wishlist_form-' + id);
                var $input = $form.find('div.input.input-effect');
                var $textarea = $form.find('textarea');
                var comments = $.trim(o.escapeHtml($textarea.val()));
                if (comments === '') {
                    if (!$input.hasClass('input-error')) {
                        $input.addClass('input-error');
                        $input.after('<div class="error-text">Please enter a comment</div>');
                    }
                }
                else
                {
                    if ($input.hasClass('input-error')) {
                        $input.removeClass('input-error');
                        $form.find('div.error-text').remove();
                    }

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
            escapeHtml : function(unsafe) {
                return unsafe.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
            },
            submitWishlistCommentSuccess: function (d, e) {
                d = parseInt(d);
                if (!isNaN(d) && d === 1) {
                    $("#comment_" + e.id).html(o.escapeHtml(e.comments.slice(0, 90)));
                    $('#popup_overlay').trigger('click');
                } else {
                    alert(o.processError);
                }
            },
            updateProfile: function () {
                var $this = $(this);

                var $gender = $this.find('#form-gender');
                var $firstName = $this.find('#form-firstname');
                var $lastName = $this.find('#form-lastname');
                var $mobile = $this.find('#form-mobile');

                var gender = $.trim($gender.find("input[type='radio'][name='gender']:checked").val());
                var firstName = $.trim($firstName.find('#firstname').val());
                var lastName = $.trim($lastName.find("#lastname").val());
                var mobile = parseInt($.trim($mobile.find("#mobile").val()));

                var error = 0,
                    errorHtml;

                var nameFilter = /^[a-zA-Z]*$/;

                if (gender === '') {
                    if (!$gender.hasClass('input-error')) {
                        errorHtml = o.formErrorHtml.replace('{{ERROR}}', o.formErrorMsg.gender);
                        $gender.addClass('input-error').append(errorHtml);
                    }
                    error = 1;
                } else {
                    if ($gender.hasClass('input-error')) {
                        $gender.removeClass('input-error');
                        $gender.find('div.error-text').remove();
                    }
                }

                if (firstName.length < 2 || !nameFilter.test(firstName)) {
                    if (!$firstName.hasClass('input-error')) {
                        errorHtml = o.formErrorHtml.replace('{{ERROR}}', o.formErrorMsg.firstName);
                        $firstName.addClass('input-error').append(errorHtml);
                    }
                    error = 1;
                } else {
                    if ($firstName.hasClass('input-error')) {
                        $firstName.removeClass('input-error');
                        $firstName.find('div.error-text').remove();
                    }
                }

                if (lastName.length < 2 || !nameFilter.test(lastName)) {
                    if (!$lastName.hasClass('input-error')) {
                        errorHtml = o.formErrorHtml.replace('{{ERROR}}', o.formErrorMsg.lastName);
                        $lastName.addClass('input-error').append(errorHtml);
                    }
                    error = 1;
                } else {
                    if ($lastName.hasClass('input-error')) {
                        $lastName.removeClass('input-error');
                        $lastName.find('div.error-text').remove();
                    }
                }

                if (mobile.toString().length !== 10 || mobile === 0) {
                    if (!$mobile.hasClass('input-error')) {
                        errorHtml = o.formErrorHtml.replace('{{ERROR}}', o.formErrorMsg.mobile);
                        $mobile.addClass('input-error').append(errorHtml);
                    }
                    error = 1;
                } else {
                    if ($mobile.hasClass('input-error')) {
                        $mobile.removeClass('input-error');
                        $mobile.find('div.error-text').remove();
                    }
                }

                return (error === 1) ? false : true;
            },
            updatePassword: function () {
                var $this = $(this);

                var $old = $this.find('#form-oldpass');
                var $new = $this.find('#form-newpass');
                var $newConfirm = $this.find('#form-confirmpass');

                var old = $.trim($old.find('#oldPassword').val());
                var newPass = $.trim($new.find('#newPassword').val());
                var newConfirm = $.trim($newConfirm.find('#conPassword').val());

                var error = 0,
                        errorHtml;

                var passRegex = /^\S+$/;

                if (old.length < 4) {
                    if (!$old.hasClass('input-error')) {
                        errorHtml = o.formErrorHtml.replace('{{ERROR}}', o.formErrorMsg.oldPassword);
                        $old.addClass('input-error').append(errorHtml);
                    }
                    error = 1;
                } else {
                    if ($old.hasClass('input-error')) {
                        $old.removeClass('input-error');
                        $old.find('div.error-text').remove();
                    }
                }

                if (newPass === '') {
                    if (!$new.hasClass('input-error')) {
                        errorHtml = o.formErrorHtml.replace('{{ERROR}}', o.formErrorMsg.newPassword);
                        $new.addClass('input-error').append(errorHtml);
                    } else {
                        $new.find('div.error-text').html(o.formErrorMsg.newPassword);
                    }
                    error = 1;
                } else if (newPass.length < 6 || newPass.length > 20) {
                    if (!$new.hasClass('input-error')) {
                        errorHtml = o.formErrorHtml.replace('{{ERROR}}', o.formErrorMsg.newPasswordLength);
                        $new.addClass('input-error').append(errorHtml);
                    } else {
                        $new.find('div.error-text').html(o.formErrorMsg.newPasswordLength);
                    }
                    error = 1;
                } else if (newPass === old) {
                    if (!$new.hasClass('input-error')) {
                        errorHtml = o.formErrorHtml.replace('{{ERROR}}', o.formErrorMsg.passwordsAreSame);
                        $new.addClass('input-error').append(errorHtml);
                    } else {
                        $new.find('div.error-text').html(o.formErrorMsg.passwordsAreSame);
                    }
                    error = 1;
                } else if (!passRegex.test(newPass)) {
                    if (!$new.hasClass('input-error')) {
                        errorHtml = o.formErrorHtml.replace('{{ERROR}}', o.formErrorMsg.invalidNewPassword);
                        $new.addClass('input-error').append(errorHtml);
                    } else {
                        $new.find('div.error-text').html(o.formErrorMsg.invalidNewPassword);
                    }
                    error = 1;
                } else {
                    if ($new.hasClass('input-error')) {
                        $new.removeClass('input-error');
                        $new.find('div.error-text').remove();
                    }
                }

                if (newConfirm === '') {
                    if (!$newConfirm.hasClass('input-error')) {
                        errorHtml = o.formErrorHtml.replace('{{ERROR}}', o.formErrorMsg.confirmPassword);
                        $newConfirm.addClass('input-error').append(errorHtml);
                    } else {
                        $newConfirm.find('div.error-text').html(o.formErrorMsg.confirmPassword);
                    }
                    error = 1;
                } else if (newPass !== newConfirm) {
                    if (!$newConfirm.hasClass('input-error')) {
                        errorHtml = o.formErrorHtml.replace('{{ERROR}}', o.formErrorMsg.passwordMismatch);
                        $newConfirm.addClass('input-error').append(errorHtml);
                    } else {
                        $newConfirm.find('div.error-text').html(o.formErrorMsg.passwordMismatch);
                    }
                    error = 1;
                } else {
                    if ($newConfirm.hasClass('input-error')) {
                        $newConfirm.removeClass('input-error');
                        $newConfirm.find('div.error-text').remove();
                    }
                }

                return (error === 1) ? false : true;
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
                if (!confirm('Do you want to delete this address?'))
                    return;
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
                            $('div.ship-address-main').each(function(i) {
                                var j = i+1;
                                $(this).find('p:first b').html('Address ' + j);
                            });
                            var addressCnt = $('.ship-address-row').size();
                            if (addressCnt === 0) {
                                $('#address-book').hide();
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
            },
            saveAddress: function () {

                var $this = $(this);

                var $firstName = $this.find('#form-firstname');
                var $lastName = $this.find('#form-lastname');
                var $mobile = $this.find('#form-mobile');
                var $postcode = $this.find('#form-postcode');
                var $city = $this.find('#form-city');
                var $street = $this.find('#form-street');
                var $area = $this.find('#form-area');
                var $landmark = $this.find('#form-landmark');
                var $state = $this.find('#form-state');
                var $country = $this.find('#form-country');

                var firstName = $.trim($firstName.find('#firstname').val());
                var lastName = $.trim($lastName.find("#lastname").val());
                var mobile = parseInt($.trim($mobile.find("#mobile").val()));
                var postcode = parseInt($postcode.find("#postcode").val());
                var city = $.trim($city.find("#city").val());
                var street = $.trim($street.find("#street").val());
                var area = $.trim($area.find("#area").val());
                var landmark = $.trim($landmark.find("#landmark").val());
                var country = $.trim($country.find("#country").val());

                if (country === 'IN' || country === '') {
                    var pincodelen=$("#postcode").length;
                    var pincodeval=$("#postcode").val();
                    
                    if(pincodeval==""){
                        $("#form-postcode .error-text").text("Enter Your Pincode");
                        error = 1;
                    }
                    if(pincodelen>6 && pincodeval !=""){
                        $("#form-postcode .error-text").text("Invalid Pincode");
                        error=1;
                    }
                    if(isNaN(pincodeval)){
                        $("#postcode").val("");
                        $("#form-postcode .error-text").text("Invalid Pincode");
                        error=1;
                    }

                    var state = $.trim($state.find("#region").val());
                } else {
                    var state = $.trim($state.find("#region_input").val());
                }

                var error = 0,
                        errorHtml;

                var nameFilter = /^[a-zA-Z]*$/;

                if (firstName.length < 2 || !nameFilter.test(firstName)) {
                    if (!$firstName.hasClass('input-error')) {
                        errorHtml = o.formErrorHtml.replace('{{ERROR}}', o.formErrorMsg.firstName);
                        $firstName.addClass('input-error').append(errorHtml);
                    }
                    $firstName.find('div.error-text').show();
                    error = 1;
                } else {
                    if ($firstName.hasClass('input-error')) {
                        $firstName.removeClass('input-error');
                        $firstName.find('div.error-text').remove();
                    }
                }

                if (lastName.length < 2 || !nameFilter.test(lastName)) {
                    if (!$lastName.hasClass('input-error')) {
                        errorHtml = o.formErrorHtml.replace('{{ERROR}}', o.formErrorMsg.lastName);
                        $lastName.addClass('input-error').append(errorHtml);
                    }
                    $lastName.find('div.error-text').show();
                    error = 1;
                } else {
                    if ($lastName.hasClass('input-error')) {
                        $lastName.removeClass('input-error');
                        $lastName.find('div.error-text').remove();
                    }
                }

                if (mobile.toString().length !== 10 || mobile === 0) {
                    if (!$mobile.hasClass('input-error')) {
                        errorHtml = o.formErrorHtml.replace('{{ERROR}}', o.formErrorMsg.mobile);
                        $mobile.addClass('input-error').append(errorHtml);
                    }
                    $mobile.find('div.error-text').show();
                    error = 1;
                } else {
                    if ($mobile.hasClass('input-error')) {
                        $mobile.removeClass('input-error');
                        $mobile.find('div.error-text').remove();
                    }
                }

                if (street === '') {
                    if (!$street.hasClass('input-error')) {
                        errorHtml = o.formErrorHtml.replace('{{ERROR}}', o.formErrorMsg.street);
                        $street.addClass('input-error').append(errorHtml);
                    }
                    $street.find('div.error-text').show();
                    error = 1;
                } else {
                    if ($street.hasClass('input-error')) {
                        $street.removeClass('input-error');
                        $street.find('div.error-text').remove();
                    }
                }

                if (city === '') {
                    if (!$city.hasClass('input-error')) {
                        errorHtml = o.formErrorHtml.replace('{{ERROR}}', o.formErrorMsg.city);
                        $city.addClass('input-error').append(errorHtml);
                    }
                    $city.find('div.error-text').show();
                    error = 1;
                } else {
                    if ($city.hasClass('input-error')) {
                        $city.removeClass('input-error');
                        $city.find('div.error-text').remove();
                    }
                }

                if (state === '') {
                    if (!$state.hasClass('input-error')) {
                        var _errorMsg = (country === 'IN' || country === '') ? o.formErrorMsg.state.select : o.formErrorMsg.state.enter;
                        errorHtml = o.formErrorHtml.replace('{{ERROR}}', _errorMsg);
                        $state.addClass('input-error').append(errorHtml);
                    }
                    $state.find('div.error-text').show();
                    error = 1;
                } else {
                    if ($state.hasClass('input-error')) {
                        $state.removeClass('input-error');
                        $state.find('div.error-text').remove();
                    }
                }

                if (postcode === '' || (country === 'IN' && postcode.toString().length !== 6) || isNaN(postcode)) {
                // if (postcode === '' || (country === 'IN' && postcode.toString().length !== 6)) {
                    if (!$postcode.hasClass('input-error')) {
                        errorHtml = o.formErrorHtml.replace('{{ERROR}}', o.formErrorMsg.postcode);
                        $postcode.addClass('input-error').append(errorHtml);
                    }
                    $postcode.find('div.error-text').show();
                    error = 1;
                } else {
                    if ($postcode.hasClass('input-error')) {
                        $postcode.removeClass('input-error');
                        $postcode.find('div.error-text').remove();
                    }
                }

                if (country === '') {
                    if (!$country.hasClass('input-error')) {
                        errorHtml = o.formErrorHtml.replace('{{ERROR}}', o.formErrorMsg.country);
                        $country.addClass('input-error').append(errorHtml);
                    }
                    $country.find('div.error-text').show();
                    error = 1;
                }
                 if(country=="IN"){
                    var postcodeval=$("#postcode").val();
                    
                    if(postcodeval===''){                                            
                        if (!$postcode.hasClass('input-error')) {
                            errorHtml = o.formErrorHtml.replace('{{ERROR}}', o.formErrorMsg.postcode);
                            $postcode.addClass('input-error').append(errorHtml);
                        }
                        $postcode.find('div.error-text').show();
                        error = 1;   
                    }
                }
                if(country!="IN"){
                    var postcodeval=$("#postcode").val();
                    if ($postcode.hasClass('input-error')) {
                        $postcode.removeClass('input-error');
                        $postcode.find('div.error-text').remove();
                        error=0;
                    }
                    if(postcodeval===''){                                            
                        if (!$postcode.hasClass('input-error')) {
                            errorHtml = o.formErrorHtml.replace('{{ERROR}}', o.formErrorMsg.postcode);
                            $postcode.addClass('input-error').append(errorHtml);
                        }
                        $postcode.find('div.error-text').show();
                        error = 1;   
                    }
                }
                 else {
                    if ($country.hasClass('input-error')) {
                        $country.removeClass('input-error');
                        $country.find('div.error-text').remove();
                    }
                }

                if (error === 0) {
                    $("#myaddr-new-save-btn2").attr('disabled', 'disabled').addClass('btn_loader');

                    var _url = secure_url + "/address/addEditAddress/";
                    var _data = $(this).serialize();

                    utils.makeRequest(
                            _url,
                            'POST',
                            _data,
                            function (d, e) {
                                $("#myaddr-new-save-btn2").removeAttr("disabled").removeClass('btn_loader');
                                var _path = secure_url + '/customer/address_book';
                                window.location = _path;
                            },
                            function (_x, _y, _z) {
                                $("#myaddr-new-save-btn2").removeAttr("disabled").removeClass('btn_loader');
                                PF.ERROR.raiseError(_x, _y, _z);
                            },
                            '',
                            {
                            },
                            {
                                dataType: 'json'
                            }
                    );
                }

                return false;
            },
            countryChange: function () {
                var id = $(this).val();
                if (id !== 'IN' && id !== '') {
                    $('#region_select2').hide();
                    $("#region_input").val('').attr("name", "region");
                    $("#region_txtbox2").show();
                    $("#region").attr("name", "region_select").addClass('disabled').val('').select2();
                    $('#city').val('');
                } else if (id === 'IN' || id === '') {
                    $("#region_txtbox2").hide();
                    $("#region_input").attr("name", "region_input");
                    $('#region_select2').show();
                    $("#region").attr("name", "region").removeClass('disabled');
                }
            },
            editAddressModal: function () {
                var _modal = $(this).attr('modal-val');
                $('#my-addr-book-newaddr-popup').attr('data-modalname', _modal).find('div.popup-title').html('Edit Address');

                var id = $(this).attr('data-id');
                $("#update_id").val(id);

                $("#address_form #firstname").val($.trim($("#fname-" + id).val()));
                $("#address_form #lastname").val($.trim($("#lname-" + id).val()));
                $("#address_form #mobile").val($.trim($("#mobile-" + id).val()));
                $("#address_form #street").val($.trim($("#street-" + id).val()));
                $("#address_form #area").val($.trim($("#street1-" + id).val()));
                $("#address_form #landmark").val($.trim($("#landmark-" + id).val()));
                $("#address_form #city").val($.trim($("#city-" + id).val()));

                var state = $.trim($("#state-" + id).val());
                if ($.trim($("#countryid-" + id).val()) === "IN" || $.trim($("#countryid-" + id).val()) === "") {
                    $("#address_form #region").val(state).select2().removeClass('disabled');
                    $("#region_txtbox2").hide();
                } else {
                    $("#region_input").attr("name", "region").val(state);
                    $("#region_select2").hide();
                    $("#region_txtbox2").show();
                    $("#address_form #region").hide().attr("name", "region_select").addClass('disabled');
                }

                $("#address_form #postcode").val($.trim($("#postcode-" + id).val()));
                $("#address_form #country").val($.trim($("#countryid-" + id).val())).select2();

                $('.input-field').each(function () {
                    if ($(this).val() !== '')
                    {
                        $(this).parent('.input-effect').addClass('input-filled');
                    }
                    else
                    {
                        $(this).parent('.input-effect').removeClass('input-filled');
                    }
                });

                $('#popup_overlay').fadeIn(function () {
                    $('[data-modalname=' + _modal + ']').fadeIn();
                    $('body').addClass('active');
                });
                $(document).on('click', '.popup-close,#popup_overlay', function (e) {
                    $('[data-modalname=' + _modal + ']').fadeOut(function () {
                        $('#my-addr-book-newaddr-popup').attr('data-modalname', 'add-address').find('div.popup-title').html('Enter a New Address');
                        $('#popup_overlay').fadeOut();
                        $('body').removeClass('active');
                    });
                    e.preventDefault();
                });
                $(document).keyup(function (e) {
                    if (e.keyCode === 27) {
                        $('[data-modalname=' + _modal + ']').fadeOut(function () {
                            $('#my-addr-book-newaddr-popup').attr('data-modalname', 'add-address').find('div.popup-title').html('Enter a New Address');
                            $('#popup_overlay').fadeOut();
                            $('body').removeClass('active');
                        });
                    }
                });
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
                            var trackHtml = '<div class="tyo_popup_box" id="tyo_signupBox">' + d + '</div>';
                            $(e.container).append(trackHtml);
                            $('#popup_overlay').fadeIn(function () {
                                $('#tyo_signupBox').fadeIn();
                                $('body').addClass('active');
                            });
                            $(document).on('click', '.popup-close,#popup_overlay', function (e) {
                                $('#tyo_signupBox').fadeOut(function () {
                                    $('#popup_overlay').fadeOut();
                                    $('body').removeClass('active');
                                });
                                e.preventDefault();
                            });
                            $(document).keyup(function (e) {
                                if (e.keyCode === 27) {
                                    $('#tyo_signupBox').fadeOut(function () {
                                        $('#popup_overlay').fadeOut();
                                        $('body').removeClass('active');
                                    });
                                }
                            });
                            $(e.container).find('a[data-id=' + e.id + ']').removeAttr('disabled');
                        },
                        PF.ERROR.raiseError,
                        '',
                        {
                            id: id,
                            container: _container
                        }
                );
            },
            saveRating: function (e) {
                e.preventDefault();
                e.stopPropagation();

                var $this = $(this);
                var rating = $this.attr('value');
                var order_id = $this.attr('order_id');
                var item_id = $this.attr('item_id');
                var rating_type = $this.attr('rating_type');

                var slide_count = 1;
                if (rating_type == 'over_all_rating') {
                    slide_count = 1;
                } else if (rating_type == 'delivery_time_rating') {
                    slide_count = 2;
                } else if (rating_type == 'item_quality_rating') {
                    slide_count = 3;
                } else {
                    slide_count = 4;
                }

                var comment = '';
                if (rating_type == 'comment') {
                    comment = $("#feedback_text_" + order_id + "_" + item_id).val();
                }

                var _url = secure_url + '/customer/save_rating';

                utils.makeRequest(
                        _url,
                        'POST',
                        {
                            rating: rating,
                            comment: comment,
                            order_id: order_id,
                            item_id: item_id,
                            rating_type: rating_type
                        },
                function (d, e) {
                    var json_data = $.parseJSON(d);
                    if (json_data.status == '1') {
                        var parent = $this.closest('li');
                        if (!parent.hasClass('final-feedback')) {
                            $this.prevAll().andSelf().addClass('star-selected');
                            $this.closest(parent).animate({'marginLeft': -1 * parent.outerWidth(true)});
                            if (slide_count < 4) {
                                $this.closest('.order-rating-feature-wrap').siblings('.order-rating-header').find('.rating-current-step').text(slide_count + 1);
                            }
                        }
                    } else if (json_data.status == '2') {
                        window.location.reload();
                    }
                },
                        PF.ERROR.raiseError,
                        '',
                        {
                            //id : id,
                            //container : _container
                        }
                );
            },
            deleteFESKU: function (sku_code) {
                var response = confirm('Do you want to remove this exchange item?');
                if (response === false)
                {
                    return false;
                }
                else
                {
                    var _url = secure_url + "/customer_furnitureexchange/deletePoints";
                    utils.makeRequest(
                            _url,
                            'POST',
                            {
                                itemToDelete: sku_code
                            },
                    function (d) {
                        d = parseInt(d);
                        if (d === 1)
                            window.location.reload();
                    },
                            PF.ERROR.raiseError
                            );
                }
            },
            resetForm: function () {
                $('.input-field').each(function () {
                    if ($(this).val() !== '')
                    {
                        $(this).parent('.input-effect').addClass('input-filled');
                    }
                    else
                    {
                        $(this).parent('.input-effect').removeClass('input-filled');
                    }
                });
                $('div.error-text').parent().removeClass('input-error');
                $('div.error-text').remove();
                o.lastEnteredPin = '';
                $("#form-area .ui-autocomplete,#form-area .ui-helper-hidden-accessible").remove();
            },
            pinAutoComplete: function () {
                var pin = parseInt($(this).val());
                if (pin.toString().length === 6 && pin > 0 && o.lastEnteredPin !== pin) {
                    o.lastEnteredPin = pin;

                    var country = $("#country").val();
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
                        if( $( '#region option[value="' + d.state + '"]' ).length > 0 ) {
                            $("#region").val(d.state).select2().removeClass('disabled');
                        } else {
                            $( '#region' ).select2( 'val', $( '#region option:first' ).val() );
                        }
                    } else {
                        $( '#region' ).select2( 'val', $( '#region option:first' ).val() );
                    }

                    if (d.locality) {
                        var locality = $.parseJSON(d.locality);

                        if (Object.keys(d.locality).length > 0) {
                            $("#area").autocomplete({source: locality, appendTo: "#form-area"});
                            //for perfect autocomplete, it will search string that starts with typed character
                            $.ui.autocomplete.filter = function (array, term) {
                                var matcher = new RegExp("^" + $.ui.autocomplete.escapeRegex(term), "i");
                                return $.grep(array, function (value) {
                                    return matcher.test(value.label || value.value || value);
                                });
                            };
                        }
                    }
                } else {
                    $("#form-area .ui-autocomplete,#form-area .ui-helper-hidden-accessible").remove();
                    $('#city').val('').removeClass('input-filled');
                    $("#region").val('').select2().removeClass('disabled');
                }
            },
            loadReturnItemForm: function (e) {
                e.preventDefault();
                if ($(this).siblings('.return-reason-form').length > 0) {
                    $(this).closest('.return-order-product').addClass('return-order-form-open');
                    $(this).hide();
                    $(this).siblings('.return-reason-form').slideDown();
                }
            },
            hideReturnForm: function (e) {
                e.preventDefault();
                var item_id = $(this).attr('itemid');
                $(this).closest('.return-reason-form').slideUp(function () {
                    $(this).closest('.return-order-product').removeClass('return-order-form-open');
                    $(this).closest('.return-order-product').find('.return-item-button').show();
                    $('#return-item-form-'+item_id)[0].reset();
                    $("div.error-text").hide();
                });
            },
            submitReturnFrom: function (e) {
                //$('div.error-text').remove();
                e.preventDefault();
                // Validation
                var is_valid = true;
                var $this = $(this);
                var errorHtml;
                var page_type = $this.attr('form-type');
                var reason = $('#reason_select_'+$this.attr('itemid')).val();
                var file = $('#rpImage_'+$this.attr('itemid')+'_1').val();
                var file_extension = $('#rpImage_'+$this.attr('itemid')+'_1').val().split('.').pop().toLowerCase();
                if($('#rpImage_'+$this.attr('itemid')+'_1').val() != ''){
                    var fileSize = $('#rpImage_'+$this.attr('itemid')+'_1')[0].files[0].size;
                }
                var comments = $('#ws_comments_'+$this.attr('itemid')).val();
                $('#return-item-form-'+$this.attr('itemid')+' #invalid_size').html('');
                $("div.error-text").hide();
                
                if(reason == '') {
                    var reason_warp = $("#reason-wrap-"+$this.attr('itemid'));
                    if (!reason_warp.hasClass('input-error')) {
                        errorHtml = o.formErrorHtml.replace('{{ERROR}}', o.formErrorMsg.reason);
                        reason_warp.addClass('input-error').append(errorHtml);
                    }
                    reason_warp.find('div.error-text').show();
                    is_valid = false;
                }
                if(file === '' && is_valid === true && reason!='Incomplete items or contents missing') {
                    var file_warp = $("#file-wrap-"+$this.attr('itemid'));
                    $('div.error-text').remove();
                    if(o.formErrorMsg.file_noselect_flag){
                        errorHtml = o.formErrorHtml.replace('{{ERROR}}', o.formErrorMsg.file_error.file);
                    }else{
                        errorHtml = o.formErrorHtml.replace('{{ERROR}}', o.formErrorMsg.file_error.file_extension);
                    }
                    
                    file_warp.addClass('input-error').append(errorHtml);
                    file_warp.find('div.error-text').show();
                    is_valid = false;
                }
                if($.inArray(file_extension, ['doc','docx','jpg','jpeg','bmp','png']) === -1 && is_valid === true) {
                    var file_warp = $("#file-wrap-"+$this.attr('itemid'));
                    $('div.error-text').remove();
                    errorHtml = o.formErrorHtml.replace('{{ERROR}}', o.formErrorMsg.file_error.file_extension);
                    file_warp.addClass('input-error').append(errorHtml);
                    file_warp.find('div.error-text').show();
                    is_valid = false;
                }
                
                if(file != '' && fileSize>1049576*5 && is_valid === true) {
                    var file_warp = $("#file-wrap-"+$this.attr('itemid'));
                    $('div.error-text').remove();
                    errorHtml = o.formErrorHtml.replace('{{ERROR}}', o.formErrorMsg.file_error.file_size);
                    file_warp.addClass('input-error').append(errorHtml);
                    file_warp.find('div.error-text').show();
                    is_valid = false;
                }
                
                if(comments === '' && is_valid === true) {
                    var comments_warp = $("#comment-error-wrap-"+$this.attr('itemid'));
                    $('div.error-text').remove();
                    errorHtml = o.formErrorHtml.replace('{{ERROR}}', o.formErrorMsg.comments);
                    comments_warp.addClass('input-error').append(errorHtml);
                    comments_warp.find('div.error-text').show();
                    is_valid = false;
                }
                
                if(is_valid) {
                    $this.attr('disabled', 'disabled').addClass('btn-blue btn-loader');
                    var formData = $('#return-item-form-'+$this.attr('itemid')).serialize();//new FormData($('#return-item-form-'+$this.attr('itemid'))[0]);
                    //if(file === ''){
                        o.callBack(formData, $this, page_type);
                    //}else{
                      //  o.getReturnItemImageInChunk(file, file_extension, $this, '#rpImage_'+$this.attr('itemid'),formData, page_type);
                    //}
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
                    current_element.remove();
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
            switchTab : function(e) {
                e.preventDefault();

                var tab = $(this).data('rel');
                $('.cs-return-tabs ul li').removeClass('active');
                $(this).addClass('active');
                $('.cs-return-tabcontent-wrapper > div').hide();
                $('.cs-return-tabcontent-wrapper').find('#' + tab).show();
            },
            openReturnItemModal : function(e) {
                e.preventDefault();
                
            },
            getDataFeedback : function(type,currentId,formId){
                if(typeof(currentId)=='undefined'){
                    currentId='';
                }
                var i =1;
                var loaded = 0;
                var step = 1048576;
                var total =$('#rpImage_'+currentId)[0].files[0].size;
                var totalRequest = 5;//Math.ceil(total/step);
                var start = 0;
                var name = encodeURIComponent( $('#rpImage_'+currentId)[0].files[0].name );
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
                                                $('#invalid_size').html('Max 5Mb allowed!');
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
                                                $('#feddback_rpImage_'+currentId).html($('#rpImage_'+currentId).val().replace(/C:\\fakepath\\/i, ''));
                                                $('#fileContaier_'+currentId).show();
                                            }else{
                                                $('#feddback_rpImage_'+currentId).html('Choose File');
                                            }
                                        }
                                }
                        }
                        upload.addEventListener('load',function(){
                                loaded += step;
                                var _p = (loaded/total) * 100;
                                if( _p > 100 ) {
                                        _p = 100;
                                }
                                                uploaded.innerHTML = 'Please Wait....('+Math.floor(_p)+')%';
//                              uploaded.style.width = _p+'%';
//                              uploaded.style.backgroundColor = 'lightgreen';

                                if(loaded <= total){
                                        blob = $('#rpImage_'+currentId)[0].files[0].slice(loaded,loaded+step);

                                        reader.readAsBinaryString(blob,o.log);
                                }else{
                                        loaded = total;
                                }
                        },false);
                        //console.log(totalRequest);
                        //console.log(++i);
                        if(resFlag){
                            xhr.open("POST", root_url+"/customer/feedbackFileUpload?fileName="+name+"&fileType="+type+"&fileSize="+total+"&nocache="+new Date().getTime()+"&totalRequest="+totalRequest+"&currentId="+currentId+"&count="+i++);
                            xhr.overrideMimeType("application/octet-stream");
                            xhr.sendAsBinary(e.target.result);
                        }
                };

                var blob = $('#rpImage_'+currentId)[0].files[0].slice(start,step);
                reader.readAsBinaryString(blob,o.log);
            },
            getReturnItemImageInChunk : function(name, type, btn, imageId, f, page_type){
                var i =1;
                var loaded = 0;
                var step = 1048576;
                var total =$(imageId)[0].files[0].size;
                var totalRequest = Math.ceil(total/step);
                var start = 0;
                //var name = encodeURIComponent( $('#file')[0].files[0].name );
                //var uploaded = document.getElementById(imageId);

                var reader = new FileReader();

                reader.onload = function(e){
                        var xhr = new XMLHttpRequest();
                        var upload = xhr.upload;

                        upload.addEventListener('load',function(){
                                loaded += step;
                                var _p = (loaded/total) * 100;
                                if( _p > 100 ) {
                                        _p = 100;
                                }
                                                $(imageId).innerHTML = 'Please Wait....('+Math.floor(_p)+')%';
//                              uploaded.style.width = _p+'%';
//                              uploaded.style.backgroundColor = 'lightgreen';

                                if(loaded <= total){
                                        blob = $(imageId)[0].files[0].slice(loaded,loaded+step);

                                        reader.readAsBinaryString(blob,o.log);
                                        btn.attr('disabled', 'disabled').addClass('btn-blue btn-loader');

                                }else{
                                        loaded = total;
                                        o.callBack(f, btn, page_type);
                                }
                        },false);
                        //console.log(totalRequest);
                        //console.log(++i);
                        xhr.open("POST", root_url+"/customer/feedbackFileUpload?fileName="+name+"&fileType="+type+"&fileSize="+total+"&nocache="+new Date().getTime()+"&totalRequest="+totalRequest+"&count="+i++);
                        xhr.overrideMimeType("application/octet-stream");
                        xhr.sendAsBinary(e.target.result);
                };

                var blob = $(imageId)[0].files[0].slice(start,step);
                reader.readAsBinaryString(blob,o.log);
            },
            log : function(e){
                console.log(e);
            },
            loadlmreturn : function(e){
                
                //Get Page URL
                var temp = window.location.href; 
                if(temp != ''){
                    //get # string
                    var result = temp.split('#');
                    if(result[1] !== undefined && result[1] == 'returnlearnmore'){
                       
                        $("li[data-rel='learnMoreReturn']").addClass('active');
                        $('.cs-return-tabcontent-wrapper > div').hide();
                        $('.cs-return-tabcontent-wrapper').find('#learnMoreReturn').show();
                        $('#initiateReturn').css('display', 'none');
                        $('#learnMoreReturn').css('display', 'block');                        
                    }else{

                        $("li[data-rel='initiateReturn']").addClass('active');
                        $('.cs-return-tabcontent-wrapper > div').hide();
                        $('.cs-return-tabcontent-wrapper').find('#initiateReturn').show();
                        $('#learnMoreReturn').css('display', 'none');
                        $('#initiateReturn').css('display', 'block');                        
                    }
                }
                /*Display third row, hidden for styling purpose*/
                $('#returnInitiate .row-thirds').show();                
            }
        };
        z.MYACCOUNT = o;
    }(PF, $));

    $(document).ready(function () {
        PF.MYACCOUNT.init();

        /* Show Learn more tab selected to link easy returns across the site*/        
        PF.MYACCOUNT.loadlmreturn();        

    });
}