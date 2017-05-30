/**
 * Created by ling on 06/04/2017.
 */

$.lingsPlugin = {
    //trim left space
    lTrim:function (str) {
        return str.replace(/^\s+/,"");
    },

    //trim right space
    rTrim:function (str) {
        return str.replace(/\s*$/,"");
    },

    //trim all space
    allTrim:function (str) {
        return str.replace(/\s+/g,"");
    },

    //light box function
    lightBox:function (arg) {
        var $option = $("*[data-role='light-box']");

        //get alert window
        var $alertWindow = $(".light-box-alert");
		
		//get model
		var $model = $(".light-box-model");
		
        var $allImg = $option.find("img");
        
		
		//记录当前组图片总数量
		var currPicNum = 0;
		//获取当前图片索引
		var currIdx = 0;
		//获取当前组
		var $currGrop = null;

        $allImg.click(function () {
        	
        	currPicNum = $(this).parents(".light-box-group").find("img").length;
        	$currGrop = $(this).parents(".light-box-group");
        	var $currLi = $(this).parent("li");
        	currIdx = $currLi.index();
        	
            $alertWindow.find("img").attr("src",$(this).attr("data-source"));
            $alertWindow.find(".desc .title").text($(this).attr("data-title"));
            $alertWindow.find(".desc .intro").text($(this).attr("data-desc"));
            
            $alertWindow.addClass("light-box-alert-show");
            $model.addClass("light-box-model-show");
            
			//获取当前显示窗口
//          var $alertWindowShow = $(".light-box-alert-show");
//          var h = $alertWindowShow.height()/2;
//      	var w = $alertWindowShow.width()/2;
//      	$alertWindowShow.css({
//      	marginTop:-h+"px",
//      	marginLeft:-w+"px"
//      	});
//      	console.log(w,h);
        });
           
   	 	//双击弹出框中间区域关闭
        $(".light-box-alert").on('dblclick',function(){
        	$(this).removeClass("light-box-alert-show");
            $model.removeClass("light-box-model-show");  
        })
        //点击关闭按钮关闭弹出窗
        $(".light-box-alert").on('click',".close",function () {
            $(this).parent(".light-box-alert").removeClass("light-box-alert-show");
            $model.removeClass("light-box-model-show");  
        });
        
        //图片点击切换上一张/下一张
        $(".light-box-alert .pre-pic").click(function(e){
        	e.stopPropagation();
        	//获取上一张的data-source
        	if(currIdx>=1){
        		//获取前一张图片图片地址
        		var preDateSource = $currGrop.find("li").eq(currIdx-1).find("img").attr("data-source");
        		//获取前一张图片标题
        		var preTitle = $currGrop.find("li").eq(currIdx-1).find("img").attr("data-title");
        		//获取前一张图片描述
        		var preDesc = $currGrop.find("li").eq(currIdx-1).find("img").attr("data-desc");
        		
        		currIdx = currIdx -1;
        		//给当前弹窗框图片地址重新赋值
        		$alertWindow.find("img").attr("src",preDateSource);
        		//给当前弹窗框图片标题重新赋值
        		$alertWindow.find(".desc .title").text(preTitle);
        		//给当前弹窗框图片描述重新赋值
        		$alertWindow.find(".desc .intro").text(preDesc);
        		
        	}else if(currIdx==0){
        		alert("当前已是这一组第一张图片。");
        	}
        });
         $(".light-box-alert .next-pic").click(function(e){
         	e.stopPropagation();
         	//获取下一张的data-source
        	if(currIdx<currPicNum-1){
        		//获取下一张图片图片地址
        		var nextDateSource = $currGrop.find("li").eq(currIdx+1).find("img").attr("data-source");
        		//获取下一张图片标题
        		var nextTitle = $currGrop.find("li").eq(currIdx+1).find("img").attr("data-title");
        		//获取下一张图片描述
        		var nextDesc = $currGrop.find("li").eq(currIdx+1).find("img").attr("data-desc");
        		
        		currIdx = currIdx + 1;
        		
        		//给当前弹窗框图片地址重新赋值
        		$alertWindow.find("img").attr("src",nextDateSource);
        		//给当前弹窗框图片标题重新赋值
        		$alertWindow.find(".desc .title").text(nextTitle);
        		//给当前弹窗框图片描述重新赋值
        		$alertWindow.find(".desc .intro").text(nextDesc);
        		
        	}else if(currIdx == currPicNum-1){
        		alert("当前已是这一组最后一张图片。");
        	}
        });
        
        //获取弹出窗口的高和宽的一半
       
        
        
    },

    //get random word from string
    getTextRandom:function(str,num,flag) {
        var i = 0;
        var arr = [];
        // console.log(flag);
        (flag == null)?flag =false:flag=flag;
        // console.log(flag);

        while(i<3){
            var r = Math.floor(Math.random()*str.length);
            var randomWord = str.substring(r,r+1);
            if(flag){
                i++;
                console.log(randomWord);
            }else{
                var reg = /[《》，。]+/;
                if(reg.test(randomWord)){
                    console.log("不取标点符号");
                }else{
                    if(i<1){
                        arr.push(randomWord);
                        i++;
                        console.log("添加了："+randomWord);
                    }else{
                        for(x in arr){
                            if(arr[x] !== randomWord){
                                arr.push(randomWord);
                                console.log("添加了:"+randomWord);
                                console.log("test:"+arr);
                                i++;
                                console.log(i);
                            }
                        }
                    }
                }
            }
        }
        console.log(arr);
    }
}