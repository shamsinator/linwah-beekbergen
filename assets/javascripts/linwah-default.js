$(document).ready(function () {

    'use strict'; 

    commonFunctions.scrollToContent();
    commonFunctions.scrollToAnchor();
    commonFunctions.initSliders();
    commonFunctions.onScrollNavbarEffect();
    commonFunctions.isoTope();
    commonFunctions.initFancyBox();

});

$(window).on('load', function () {

    'use strict'; 

    commonFunctions.preloaderInit();

    $(function () {

        commonFunctions.verticalScrollNewsSticker();
    
    }());

});