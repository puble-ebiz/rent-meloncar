$(document).ready(function(){
    setCounter('.fn-counter', 1200);
});


//카운트 이벤트
let setCounter = function(name, time, startNum = 0){

    $(name).each(function(index,item) {
        let countStr = $(item).text();
        // countStr = countStr.replace(/만/,'');
        countStr = countStr.replace(/\s+$/g, "");;
        let countInt = extractStrToInt(countStr);

        let el = $(item);
        el.text(startNum)            
        let countTo = countInt;

        el.css({'opacity':0.2})
        el.fadeTo(time/2,1.0,function(){});
        
        $({ countNum: el.text()}).animate({
            countNum: countTo
        },
        {
            duration: time,
            easing:'swing',
            step: function() {
                let currentCount = CountNumToStr(this.countNum)
                el.text(currentCount);
            },
            complete: function() {
                countStr = countStr.replace(/\s+$/g, "");
                el.text(countStr);
            
            }

        });  
    });
}

let CountNumToStr = function(countNum){

    let num = Math.floor(countNum);
    let str = num.toString();
    // str = str.replace(/(\d)(?<=(억 0+))/,' ');
    str = str.replace(/(\d)(?=(\d{3})$)/,'$1,');
    // console.log(str);

    return str;
}

let extractStrToInt = function(str){
    // console.log(str);
    
    // let str2 = str;

    let result = str.replace(/[^0-9]/g,"");
    result = parseInt(result);
    
    return result;
}

