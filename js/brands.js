/**
 * brands page script
 */

var PF = PF || {};
(function (a, $) {
    var x = {
        t : a.UTILITIES,
        findBrands: function (t) {
            var brand_filter_letters = $(t).val().toLowerCase();
            if (brand_filter_letters == '' || brand_filter_letters == ' ') {

            } else {

            }
            return false;
        },
        brandSorting: function (element) {
            var q = old_qry, global_sort_option = '';
            q = this.t.replaceQueryString(q, 'p', 1);
            
            
            var gsort = global_sort_option.split('-');
            q = this.t.replaceQueryString(q, 'order', encodeURIComponent(gsort[0]));
            q = this.t.replaceQueryString(q, 'dir', encodeURIComponent(gsort[1]));
            this.t.invoke_p(page_url + q);
            
        }


    };

    a.BRANDS = x;
})(PF, $);