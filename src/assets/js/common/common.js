//input 자동완성 기능끄기
$('input').attr('autocomplete', 'off');

/*메뉴*/
$(document).ready(function () {
    //fixed 헤더
    var secHead = $('.sect-header');
    secHeadTop = secHead.offset().top;

    $(window).scroll(function () {
        var win = $(this).scrollTop();
        if (secHeadTop <= win) {
            secHead.addClass('fixed');
        } else {
            secHead.removeClass('fixed');
        }
    });

    //first load popup
    $('.agreement .btn-more').click(function () {
        $('.pop-policy-wrap').show();
    });
    $('.btn-close-policy').click(function () {
        $('.pop-policy-wrap').hide();
    });
    $('.popup-staria .btn-close').click(function () {
        $('.popup-staria').hide();
    });
    $('.popup-staria .btn-request').click(function () {
        $('.modal-complete-request').show();
    });
    $('.top-banner .banner-box').click(function () {
        $('.popup-starbucks').show();
    });
    $('.top-banner .btn-close').click(function () {
        $('.top-banner').hide();
    });
    $('.btn-request').click(function () {
        $('.pop-complete').show();
    });

    //banner popup
    var banner = $('.banner_long-term .banner-box'),
        banClose = $('.banner_long-term .btn-close'),
        banPopup = $('.banner-popup'),
        popupBox = $('.banner-popup .banner-box'),
        popClose = $('.popup-box .btn-close'),
        sidePopup = $('.side-item .btn-event'),
        slidePopup = $('.pop-area .event-rentcar'),
        eventPop = $('.new-button .btn-event'),
        rentBanner = $('.btn-rent'),
        rentPopup = $('.popup-starbucks'),
        btnClose2 = rentPopup.find('.btn-close');

    /* starbucks pop */
    $('.btn-esti').click(function () {
        $('body').addClass('overflow-hidden');
        $('.pop-consult').show();
    });

    rentBanner.click(function () {
        rentPopup.show();
    });
    btnClose2.click(function () {
        rentPopup.hide();
    });
    /* //starbucks pop */
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

    //메뉴 관련
    let anchorOn = false;
    let anchorList = $('.header .main-menu-ul>li>a');
    anchorList.on('click', function (e) {
        let anchorName = $(this).data('move-anchor');
        if (anchorName == undefined) {
            return false;
        }
        let correctPos = 83;
        if (window.innerWidth <= 900) {
            correctPos = 0;
        }

        anchorOn = true;
        let anchorBox = document.getElementsByClassName(anchorName);
        let anchorTop = $(anchorBox).offset().top - correctPos;
        $('html').animate(
            {
                scrollTop: anchorTop,
            },
            600,
            function () {
                // setMenuActiveCheck();
                anchorOn = false;
            }
        );
    });
});

/*qna 작동*/
$(document).ready(function () {
    $('.sect-qna .qna-ul .qna-title').on('click', function () {
        let state = $(this).siblings('.txt-area').css('display');
        // console.log(state);
        if (state == 'none') {
            $('.sect-qna .qna-ul .txt-area').hide();
            $(this).siblings('.txt-area').show();
        } else {
            $('.sect-qna .qna-ul .txt-area').hide();
        }
    });
});

/*스크롤 업*/
$(document).ready(function () {
    $('.fn-up-wrap').hide();
    $('.fn-up-wrap').css('oparcity', '0');

    //상담신청바 추가 2021.05.25
    $('.consult-bar').hide();
    $('.consult-bar').css('oparcity', '0');

    //스크롤시 적용
    $(window).scroll(function () {
        var winTop = $(window).scrollTop(),
            sideBanner = $('.side-sect-right .side-area'),
            sideFirstTop = '130px',
            sideScrollTop = '180px',
            topBtn = $('.fn-up-wrap');

        if (winTop > 700) {
            sideBanner.css({ top: sideFirstTop });
            topBtn.show();
            topBtn.stop().animate({ opacity: '1' }, 200);
            $('.consult-bar').show();
            $('.consult-bar').stop().animate({ opacity: '1' }, 200);
        } else {
            sideBanner.css({ top: sideScrollTop });
            topBtn.hide();
            topBtn.stop().animate({ opacity: '0' }, 200);
            $('.consult-bar').hide();
            $('.consult-bar').stop().animate({ opacity: '0' }, 200);
        }
        if (window.matchMedia('(max-width: 900px)').matches) {
            $('.consult-bar').hide();
        }
    });

    $('.fn-scroll-up').on('click', function () {
        $('html, body').animate({ scrollTop: '0' }, 300);
    });
});

//공용팝업(닫기)
$(document).ready(function () {
    $('.fn-pop-close').on('click', function () {
        $('body').removeClass('overflow-hidden');
        //부모찾기로 타겟클래스 찾아 닫기
        $(this).closest('.fn-pop-target').hide();
    });
});

/*스크롤 이동관련*/
$(document).ready(function () {
    let btnScrollOn = false;
    let btnScrollList = $('.wrap *[data-move-scroll]');
    btnScrollList.on('click', function (e) {
        let anchorName = $(this).data('move-scroll');
        if (anchorName == undefined) {
            return false;
        }
        let correctPos = 83;
        if (window.innerWidth <= 900) {
            correctPos = 0;
        }

        btnScrollOn = true;
        let anchorBox = document.getElementsByClassName(anchorName);
        let anchorTop = $(anchorBox).offset().top - correctPos;
        $('html').animate(
            {
                scrollTop: anchorTop,
            },
            600,
            function () {
                btnScrollOn = false;
            }
        );
    });
});
