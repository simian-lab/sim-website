jQuery(document).ready(function($) {

    

    $('.burger').click(function() {
        $('.burger').toggleClass('active');
        $('.nav-wrap').toggleClass('active');
    });
});