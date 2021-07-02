/*초기 이벤트 세팅*/
let eventListSetting = function(info){
    $.each(info, function(num, item){
        item.eventInit();
        eventListAction(getEventList());
    });
}

/*이벤트리스트 작동*/
let eventListAction = function(info){
    $.each(info, function(num, item){
        // console.log(item.sectName);
        // console.log(item.actionOn);
        //존재여부 체크
        if($(".wrap-main "+ item.className).length == 0){
            return true;
        }
        
        //var bottom_of_object = $(this).position().top + $(this).outerHeight(); //outerHeight() : border를 포함한 높이

        //var bottom_of_window = $(window).scrollTop() + $(window).height();

        //scrollTop : 스크롤되어 올라가있는 만큼의 높이 , $(window).height() : 브라우저 창높이

        if(item.oneActionOn != true){
            let correct = Math.abs(window.innerHeight/3);
            let itemPos = $(".wrap-main "+ item.className).offset().top - correct;
            let scrollPos = window.scrollY;
            // console.log(scrollPos);
            // console.log(window.innerHeight);
            // console.log(correct);
            if(itemPos < scrollPos){
                // console.log(item.className+":" + itemPos);
                item.eventFunc();
                item.oneActionOn = true;
            }
        }
        
    });

}

let getEventList = function(){
    return eventList;
}


let eventList = [
    {
        className:".sect-intro",
        eventInit:function(){
            $(".sect-intro .intro-area>*").css("opacity",0);
            $(".sect-intro .intro-over-cont .txt-area").css("opacity",0);
        },
        eventFunc:function(){
            setDelayShowAni(".sect-intro .intro-area .intro-logo",400);
            setDelayShowAni(".sect-intro .intro-area .title",500);
            setDelayShowAni(".sect-intro .intro-area .intro-subment",600);
            setDelayShowAni(".sect-intro .intro-area .img-car",700);
            setDelayShowAni(".sect-intro .intro-over-cont .txt-area",800);
        }
    },
    {
        className:".sect-advantage01",
        eventInit:function(){
            $(".sect-advantage01 .sect-container").css("opacity",0);
        },
        eventFunc:function(){
            setShowAni(".sect-advantage01 .sect-container",700);
        }
    },
    {
        className:".sect-advantage02",
        eventInit:function(){
            $(".sect-advantage02 .sect-container").css("opacity",0);
        },
        eventFunc:function(){
            setShowAni(".sect-advantage02 .sect-container",700);
        }
    },
    {
        className:".sect-advantage03",
        eventInit:function(){
            $(".sect-advantage03 .sect-container").css("opacity",0);
        },
        eventFunc:function(){
            setShowAni(".sect-advantage03 .sect-container",700);
        }
    },
    {
        className:".sect-advantage04",
        eventInit:function(){
            $(".sect-advantage04 .sect-container").css("opacity",0);
        },
        eventFunc:function(){
            setShowAni(".sect-advantage04 .sect-container",700);
        }
    },
    {
        className:".sect-advantage05",
        eventInit:function(){
            $(".sect-advantage05 .sect-container").css("opacity",0);
        },
        eventFunc:function(){
            setShowAni(".sect-advantage05 .sect-container",700);
        }
    },
    {
        className:".sect-benefit",
        eventInit:function(){
            $(".sect-benefit .sect-container").css("opacity",0);
        },
        eventFunc:function(){
            setShowAni(".sect-benefit .sect-container",700);
        }
    }
    // {
    //     sectClassName:"sect-invest",
    //     eventFunc:function(){
    //         setMoveUpAni('.sect-invest .title-area *',-500, 500, 250);
    //         setMoveUpAni('.sect-invest .invest-ul li',150, 500, 100);
    //         setMoveUpAni('.sect-invest .btn-go-invest',400, 800);
    //     }
    // },
    // {
    //     sectClassName:"sect-service",
    //     eventFunc:function(){
    //         setMoveUpAni('.sect-service .title-area *',-800, 700, 150);
    //         setMoveUpAni('.sect-service .service-ul>li', -120, 600, 100);
    //         setMoveUpAni('.sect-service .btn-go-guide',400, 800);
    //     }
    // },
    // {
    //     sectClassName:"sect-advantage",
    //     eventFunc:function(){
    //         setMoveUpAni('.sect-advantage .title-area *',-300, 500, 150);
    //         setMoveUpAni('.sect-advantage .contents-area', -180, 600, 200);
    //         // setMoveUpAni('.sect-advantage .btn-go-guide',400, 800);
    //     }
    // }
];


let setDelayShowAni = function(name, delay, speed = 800){
    $(name).each(function(index,item){    

        //초기세팅
        // $(item).animate({opacity:0},delay);
        setTimeout(function(){
            $(item).animate({opacity:1}, speed);
        },delay);
    });
}

let setShowAni = function(name, delay, speed = 800){
    $(name).each(function(index,item){    
        //초기세팅
        // $(item).animate({opacity:0},delay);
        $(item).animate({opacity:1}, speed);
    });
}



let setMoveUpAni = function(name, start, delay, oderDelay = 0){
    $(name).each(function(index,item){    

        //초기세팅
        let box = $(this);
        box.css({"transform":"translateY("+(start)+"%)"});

        box.css({'opacity':0.2})
        box.fadeTo(delay,1.0,function(){});

        $({boxPos: start}).animate({
            boxPos: 0
        },
        {
            duration: delay + (index*oderDelay),
            easing:'swing',
            step: function() {
                box.css({"transform":"translateY(" + this.boxPos+"%)"});

                    // console.log("이벤트");
            },
            complete: function() {
                box.css({"transform":"translateY("+(0)+"%)"});
            }
        });


    });
}


$(document).ready(function(){
    eventListSetting(getEventList());
    $(window).on("scroll", function(){
        eventListAction(getEventList());
    })
});