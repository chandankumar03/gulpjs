/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
 /*$(function(){
      SyntaxHighlighter.all();
    });*/
    $(window).load(function(){
      $('.flexslider').flexslider({
        animation: "slide",
        animationLoop: true,
        itemWidth: 250,
        itemMargin: 0,
        minItems: 4,
        maxItems: 4,
        start: function(slider){
          $('body').removeClass('loading');
        }
      });
      
      $('.flexslider1').flexslider({
        animation: "slide",
        animationLoop: false,
        itemWidth: 250,
        itemMargin: 0,
        minItems: 1,
        maxItems: 1,
        start: function(slider){
          $('body').removeClass('loading');
        }
      });

    });