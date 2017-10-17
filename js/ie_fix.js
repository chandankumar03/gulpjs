/*
 * Purpose : To resolve the issues in IE8 and IE9
 * Date    : 18-06-2015
 */


/*
 * Function to align and setting margin to the nth element of the row
 * Affected pages - Home Page, Studio Page.
 * Input - class name, no. of columns in a row.
 * output - setting the margin to the last element of the row
 */
function rowAlign(className, col){
    var colLength = $(className).length;
    var colRow = colLength/col;
    if(colRow > 0){
        for(i=1; i<=colRow; i++){
            var colchild = col*i;
            $(className+":nth-child("+ colchild +")").attr('style','margin-right:0 !important');
        }
    }
}

$(function() {	
    //Home Page UI - Category Listing -- Begins
    if($.find(".four_column").length){
        rowAlign(".four_column .one_column", 4);
    }
    if($.find(".five_column").length){
        rowAlign(".five_column .one_column", 5);
    }
    //Home Page UI - Category Listing -- Ends
    
    //studio page - Product Listing UI
    if($.find(".productSlider").length){
        rowAlign(".productSlider .clip_box", 4);
    }
    
    //studio page - news tab UI
    if($.find(".about_news_tab").length){
        rowAlign(".about_news_tab ul li", 5);
    }
});