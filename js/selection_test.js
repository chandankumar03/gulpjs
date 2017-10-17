var PF = PF || {};

(function (a, $) {
    var utils = a.UTILITIES;
    var x = {
        init: function () {
            var _binder = binder();
            $.each(_binder, function (key, value) {
                utils.addListener(
                        $(value[ 'selector' ]),
                        value[ 'event' ],
                        value[ 'callback' ]
                        );
            });

        },
        callback1: function () {
            alert($(this).attr('id'))
        },
        callback2: function () {
            alert(11111)
        },
        mycallbackSuccess: function () {

        },
        mycallbackError: function () {

        }
    };

    a.SELECTION = x;
})(PF, $);

function binder() {
    return bind = [{
            selector: "#main_click",
            event: "click",
            callback: PF.SELECTION.callback1
        },
        {
            selector: "#main_click1",
            event: "click",
            callback: PF.SELECTION.callback2
        }
    ];
}


$(document).ready(function () {
    PF.SELECTION.init();
});