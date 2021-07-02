setSizeWidthCheck = function(info){
    let sizeWidth = info.moveBox.outerWidth();
   
    info.setOn = false;
    
    if(sizeWidth <= info.startSize){
        // console.log(sizeWidth);
        info.setOn = false;
        info.moveBox.removeAttr("style");
        $("html,body").removeClass("overflow-hidden");
        let topPos = info.selectBox.eq(info.index).position().top;
        let correntPos = info.selectBox.eq(0).position().top + 1;
        // console.log(correntPos);
        window.scrollTo(0,(topPos - correntPos));
        // console.log(info.index);
    }
    else{        
        window.scrollTo(0,0);
        $("html,body").addClass("overflow-hidden");
        info.setOn = true;
    }
    
}

resizeWidthCheck = function(info){
    let timer = null;
    
    $(window).resize(function(){
        info.resizing = true;
        clearTimeout(timer);
	    timer = setTimeout(function(){
            info.resizing = false;
        }, 20);
        setSizeWidthCheck(info);
    });
    
}


moveBoxAni = function(info){
    //움직임 체크(휠 중복 방지)
    info.moveOn = true;
    if(info.setOn == false) {return}
    // window.scrollTo(0,0);
    //슬라이더 선택버튼 활성화
    info.controlBoxList.children(".btn-active").removeClass("btn-active");
    info.controlBoxList.children("li").eq(info.index).addClass("btn-active");

    if(info.lastBoxOn === true && info.index === info.selectBox.length -1){
        //마지막 박스 위치 계산
        let lastTopPos = info.selectBox.eq(info.index -1).position().top + info.selectBox.last().outerHeight();
        // console.log(info.selectBox.eq(info.index -1).position().top);
        //박스 이동
        info.moveBox.stop().animate({"top": -lastTopPos}, info.speed, function(){info.moveOn = false;});
        //슬라이더 이동 숨기기
        // info.btnSlider.stop().animate({"right":-20,"opacity":0.0},400,function(){});
    }
    else{
        //셀렉터 박스 탑 위치값 가져오기
        let topPos = info.selectBox.eq(info.index).position().top;
        //박스 이동
        info.moveBox.stop().animate({"top": -topPos}, info.speed, function(){info.moveOn = false;});
        //슬라이더 보이기
        // info.btnSlider.stop().animate({"right": info.btnSliderPos,"opacity":1.0},400,function(){});
    }
    
}


moveBoxAniMobile = function(info){

    setIndex(info);
    //위치
    let topPos = info.selectBox.eq(info.index).position().top;
    let correntPos = info.selectBox.eq(0).position().top;
    $("html").stop().animate({scrollTop: topPos - correntPos}, info.speed, function(){info.clickMove = false});
        
}

setIndex = function(info){
    info.controlBoxList.children(".btn-active").removeClass("btn-active");
    info.controlBoxList.children("li").eq(info.index).addClass("btn-active");
}


setControlBox = function(info){
    
    //슬라이더 버튼박스 생성
    info.controlBox.addClass("page-control-box");
    info.controlBox.append("<ul class='page-control-ul'></ul>");
    info.controlBoxList = $('.page-control-ul');
    

    //슬라이더 위치 계산
    // info.btnSliderPos = $(window).outerWidth() - (info.controlBoxList.position().left + info.controlBoxList.outerWidth());

    //슬라이더 버튼 생성
    info.selectBox.each(function(i){
        if(i == 0){
            info.controlBoxList.append("<li class='btn-active'></li>");
        }
        else{
            info.controlBoxList.append("<li></li>");
        }
    })

    info.clickMove = false;
    //클릭시 이벤트
    let btnList = info.controlBoxList.children("li");
    btnList.on("click",function(e){
        info.clickMove = true;
        //움직임체크 
        // if(info.moveOn === true) {return};
        info.index = $(this).index();
        // console.log(info.index);
        let sizeWidth = info.moveBox.outerWidth();
        if(sizeWidth <= info.startSize){
            moveBoxAniMobile(info);
            clickOn = false;
        }
        else{
            //이동
            moveBoxAni(info);
        }
        // e.stopImmediatePropagation();
        
    });


    $(window).scroll(function(e){
        if(info.setOn === true) {return}
        console.log("11")
        if(info.clickMove === true) {return}
        console.log("22")
        if(info.resizing === true) {return}
        console.log("작동");

        let sizeWidth = info.moveBox.outerWidth();
        if(sizeWidth <= info.startSize){

            let scrollPos = window.scrollY;
            //높이 보정값 적용(헤더 높이와 같음)
            let correntPos = info.selectBox.eq(0).position().top + 1;
            let scrollIndex = null;
            $.each(info.selectBox, function(num, item){
                let topPos = $(item).position().top - correntPos;

                if(scrollPos >= topPos){
                    scrollIndex = num;
                    // console.log(topPos);
                }
            });
            info.index = scrollIndex;

            setIndex(info);

        }

        // console.log(info.selectBox.eq(info.index).position().top);
        
    });

    

}


setBtnMenu = function(info){
    if(info.menu === null){
        console.log("버튼메뉴 없음");
        return;
    }
    //클릭시 이벤트
    info.menuList.on("click",function(e){
        //움직임체크
        // if(info.moveOn === true) {return};
        info.index = $(this).index();
        //이동
        moveBoxAni(info);
    });
}



setMousewheel = function(info){
    //마우스휠 작동시 이벤트
    $(window).on("mousewheel DOMMouseScroll",function(e){   
        if(info.setOn === false) {return};
        if(info.moveOn === true) {return};
        //마우스 이벤트
        let mouseEvent = e.originalEvent.wheelDelta;

        //휠업
        if(mouseEvent < 0 && (info.index+1) < info.selectBox.length){
            info.index++;           
        }
        //휠다운
        else if(mouseEvent > 0 && (info.index-1) >= 0){
            info.index--;
        }

        //인덱스에 따른 헤더 스타일 적용
        if(info.index > 0){
            info.headerBox.addClass("nav-white");
        }
        else{
            info.headerBox.removeClass("nav-white");
        }

        moveBoxAni(info);
        e.stopPropagation();
        
    });
}
//리사이즈 체크
fullResizeCheck = function(info){
    $(window).resize(function(){
        if(info.setOn === false) {return};
        
        //사이즈변경으로 인한 무브박스 위치 설정
        if(info.lastBoxOn === true && info.index === info.selectBox.length -1){
            let reLastTopPos = info.selectBox.eq(info.index -1).position().top + info.selectBox.last().outerHeight();
            info.moveBox.css("top",-reLastTopPos);
            console.log(info.selectBox.eq(info.index -1).position().top);
        }
        else{
            let reTopPos = info.selectBox.eq(info.index).position().top;
            info.moveBox.css("top",-reTopPos);
        }

    });
}

// setFullpage = function(moveBoxName, selectBoxName, moveSpeed, lastBoxIs, menuName, menuListName, btnSliderName){

//세팅
setFullpage = function(moveBoxName, selectBoxName, moveSpeed, lastBoxIs, controlBoxName, handerName, fromSize = 720){
    //풀페이지에 필요한 정보
    let fullPageInfo = {
        setOn:true,
        moveOn:false,
        index:0,
        moveBoxClassName: moveBoxName,
        moveBox: $(moveBoxName),    //움직일 상위 태그박스
        selectBox: $(moveBoxName).children(selectBoxName),   //실제 보일 화면요소들
        speed: moveSpeed,   //애니속도
        lastBoxOn:lastBoxIs,
        // menu: $(menuName),
        // menuList: $(menuName).children(menuListName),
        controlBox: $(controlBoxName),
        btnSliderBox: null,
        btnSliderPos: null,
        headerBox: $(handerName),
        startSize: fromSize,
        clickMove: false,
        resizing: false,
    }

    //처음 사이즈 체크
    setSizeWidthCheck(fullPageInfo);
    //크기체크
    resizeWidthCheck(fullPageInfo); 
    
    //작동중일 때
    fullResizeCheck(fullPageInfo);
    setMousewheel(fullPageInfo);
    //setBtnMenu(fullPageInfo);
    setControlBox(fullPageInfo);
    // setIndex(fullPageInfo);

    // $(window).resize(function(){
    //     console.log(fullPageInfo.setOn);
    // });


    //새로고침시 위에 고정
    window.onload = function(){
        setTimeout(function(){scrollTo(0,0);},10);
    }

    this.getInfo = function(){
        return fullPageInfo;
    }
    this.setInfo = function(setInfo){
        fullPageInfo = setInfo;
    }
}


