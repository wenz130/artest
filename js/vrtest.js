var optionArr = new Array();


// 옵션 텍스트명
/*
옵션 목록 옵션 제목
*/
var optionText = ['칼라 선택', '사이즈 선택'];

// 옵션 종류
/*
옵션 종류 key 값
*/
var optionName = ['color', 'size'];

// 옵션 별 리스트
/*
각 옵션에 대한 리스트
*/
var optionList = [
    ['blue', 'gray', 'brown'], /* color 에 대한 옵션 */
    ['1000', '1500', '1900']   /* size에 대한 옵션 */
];

// 옵션별 이미지
/*
옵션리스트 만큼 추가해서 표시
ex)
옵션 종류가 2개일 경우
[option1, option2, img.gltf, img.usdz]
옵션 종류가 3개일 경우
[option1, option2, option3, img.gltf, img.usdz]
*/
var optionImg = [
    ['blue','1000','https://hellovr.s3.ap-northeast-2.amazonaws.com/Rugs_Minimal/Circle_blue_1000.gltf','https://hellovr.s3.ap-northeast-2.amazonaws.com/Rugs_Minimal/Circle_blue_1000.usdz'],
    ['blue','1500','https://hellovr.s3.ap-northeast-2.amazonaws.com/Rugs_Minimal/Circle_blue_1500.gltf','https://hellovr.s3.ap-northeast-2.amazonaws.com/Rugs_Minimal/Circle_blue_1500.usdz'],
    ['blue','1900','https://hellovr.s3.ap-northeast-2.amazonaws.com/Rugs_Minimal/Circle_blue_1900.gltf','https://hellovr.s3.ap-northeast-2.amazonaws.com/Rugs_Minimal/Circle_blue_1900.usdz'],
    ['gray','1000','https://hellovr.s3.ap-northeast-2.amazonaws.com/Rugs_Minimal/Circle_grey_1000.gltf','https://hellovr.s3.ap-northeast-2.amazonaws.com/Rugs_Minimal/Circle_grey_1000.usdz'],
    ['gray','1500','https://hellovr.s3.ap-northeast-2.amazonaws.com/Rugs_Minimal/Circle_grey_1500.gltf','https://hellovr.s3.ap-northeast-2.amazonaws.com/Rugs_Minimal/Circle_grey_1500.usdz'],
    ['gray','1900','https://hellovr.s3.ap-northeast-2.amazonaws.com/Rugs_Minimal/Circle_grey_1900.gltf','https://hellovr.s3.ap-northeast-2.amazonaws.com/Rugs_Minimal/Circle_grey_1900.usdz'],
    ['brown','1000','https://hellovr.s3.ap-northeast-2.amazonaws.com/Rugs_Minimal/Circle_brown_1000.gltf','https://hellovr.s3.ap-northeast-2.amazonaws.com/Rugs_Minimal/Circle_brown_1000.usdz'],
    ['brown','1500','https://hellovr.s3.ap-northeast-2.amazonaws.com/Rugs_Minimal/Circle_brown_1500.gltf','https://hellovr.s3.ap-northeast-2.amazonaws.com/Rugs_Minimal/Circle_brown_1500.usdz'],
    ['brown','1900','https://hellovr.s3.ap-northeast-2.amazonaws.com/Rugs_Minimal/Circle_brown_1900.gltf','https://hellovr.s3.ap-northeast-2.amazonaws.com/Rugs_Minimal/Circle_brown_1900.usdz'],
];




$(function () {
    $.each(optionName, function (i, v) {
        var optHtml = '';
        optHtml += '        <div class="perOpt">';
        optHtml += '            <p class="optTitle">'+optionText[i]+'</p>';
        optHtml += '            <ul id="ul_'+optionName[i]+'" class="sel_ul">';
        $.each(optionList[i], function (j, v) {
            optHtml += '                <li><a href="javascript:void(0);" data-value="'+optionList[i][j]+'">'+optionList[i][j]+'</a></li>';
        });
        optHtml += '            </ul>';
        optHtml += '        </div>';
        console.log(optHtml);
        $("#div_Option").append(optHtml);
    });

    // 옵션 선택하기
    $(".openOpt a").click(function () {
        $(".optWrap").addClass("on");
        $(".fixFunc.inner").show();
    });

    // 확인
    $(".btnConfirm a").click(function () {
        $(".optWrap").removeClass("on");
        $(".fixFunc.inner").hide();

        if(chkOption()) {
            $("#div_Cover").hide();
            $("#ar-button").show();
            var optTxt = '';
            $.each(optionArr, function (i, v) {
                if(i!=0) {
                    optTxt += ','+v;
                }else {
                    optTxt += v;
                }
            });

            $(".openOpt a").html('옵션: '+optTxt);
        }
    });

    $(".sel_ul a").on('click', function() {
        $(this).parents('ul').find('a').removeClass("on");
        $(this).toggleClass("on");
        if(chkOption()){
            setSrc(optionArr);
            $("#div_Cover").hide();
        }
    });

	var tt = $("#duck")[0].shadowRoot;
	tt.querySelector('.container').querySelector('div .ar-button').style.display='block';
	// tt.querySelector('#default-ar-button').style.bottom='80px';
	tt.querySelector('#default-ar-button').style.right='1%';

});

function setSrc(arrValue) {
    for(var i=0; i<optionImg.length; i++) {
        var tmpArr = optionImg[i];
        var resultCnt = 0;
        for(var j=0; j<optionName.length; j++) {
            if(tmpArr[j] == arrValue[j]){
                resultCnt = resultCnt+1;
            }
        }
        if(resultCnt==optionName.length) {
            console.log(optionImg[i][optionName.length]);
            console.log(optionImg[i][optionName.length+1]);
            $("#duck").attr("src", optionImg[i][optionName.length]);
            $("#duck").attr("iosSrc", optionImg[i][optionName.length]+1);
        }
    }
}

function chkOption() {
    var optionCnt = 0;
    optionArr = new Array();
    $.each(optionName, function(i, v){
        if($("#ul_"+optionName[i]).find("a[class=on]").length>0) {
            optionCnt = optionCnt+1;
            optionArr.push($("#ul_"+optionName[i]).find("a[class=on]").data("value"));
        }
    });

    if(optionCnt==optionName.length){
        return true;
    } else {
        return false;
    }
}