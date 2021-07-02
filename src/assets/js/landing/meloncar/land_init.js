//input 자동완성 기능끄기
$('input').attr('autocomplete', 'off');

$(function () {
    var btnRequest = $('.btn-request'),
        contRequest = $('.sect-write'),
        btnEstimate = $('.top-estimate');

    btnRequest.click(function (e) {
        e.preventDefault();
        var target = contRequest;
        $('html,body').animate(
            {
                scrollTop: target.offset().top,
            },
            500
        );
    });
    btnEstimate.click(function (e) {
        e.preventDefault();
        var target = contRequest;
        $('html,body').animate(
            {
                scrollTop: target.offset().top,
            },
            500
        );
    });

    //popup
    var btnConsult = $('.btn-estimate'),
        estimate = $('.popup-estimate'),
        btnClose = estimate.find('.btn-close');
    // btnConsult.click(function () {
    //     estimate.show();
    // });
    // btnClose.click(function () {
    //     estimate.hide();
    // });

    //banner popup
    var banner = $('.banner_long-term .banner-box'),
        banClose = $('.banner_long-term .btn-close'),
        banPopup = $('.banner-popup'),
        popupBox = $('.banner-popup .banner-box'),
        popClose = $('.popup-box .btn-close'),
        sidePopup = $('.side-item .btn-event'),
        slidePopup = $('.pop-area .event-rentcar'),
        eventPop = $('.new-button .btn-event'),
        eventRent = $('.rent-event'),
        popEvent = $('.popup-event'),
        btnClose = $('.popup-event .btn-close');

    eventRent.click(function () {
        popEvent.show();
    });
    btnClose.click(function () {
        popEvent.hide();
    });

    banner.click(function () {
        banPopup.addClass('active');
    });

    banClose.click(function () {
        $(this).parent().addClass('none');
    });

    popClose.click(function () {
        $(this).parent().parent().removeClass('active');
    });

    sidePopup.click(function () {
        banPopup.addClass('active');
    });

    slidePopup.click(function () {
        banPopup.addClass('active');
        banPopup.css({ 'z-inde': 100 });
    });

    eventPop.click(function () {
        banPopup.addClass('active');
    });
    //==스타벅스 아메리카노==
    $('.btn-stabucks').on('click', function () {
        $('body').addClass('overflow-hidden');
        $('.stabucks-amricano').show();
    });

    $('.btn-close-pop').on('click', function () {
        $('body').removeClass('overflow-hidden');
        $('.stabucks-amricano').hide();
    });
    //.//==스타벅스 아메리카노==
});
