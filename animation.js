//var images=["page1.jpg","page2.jpg","page3.jpg","page4.jpg"]


var pageHeight = $(window).height() <800 ? 800 : $(window).height() ; // !!!IMPORTANT PARAMETER
console.log(pageHeight);
$(document).ready(function(){

	$('.page-container').attr("style","height:"+pageHeight+"px;");
})



var imageId = '#background-img';

var shouldScroll=true;

var opaque0=0, number0=1;
var oBackgr=new Array();
$(window).scroll(function(){

	var st=$(this).scrollTop();
	
	changeBackground(st);
	changeCircle(st);
	
});

$(document).ready(function(){
    var a,b,c;
    a = $(window).height();    
    var group = $(".page5part1");
    $(window).scroll(function(){
        b = $(this).scrollTop();  
        c = group.offset().top;    
        if(a+b>c+250){
		document.getElementById("page5-part1").className = "left-part animated fadeIn  col-sm-6 page5-left-part page5part1";
		document.getElementById("page5-part2").className = "right-part animated fadeIn  col-sm-6 page5-right-part page5part2";
		}
        else{
		document.getElementById("page5-part1").className = "left-part animated fadeOut  col-sm-6 page5-left-part page5part1";
		document.getElementById("page5-part2").className = "right-part animated fadeOut  col-sm-6 page5-right-part page5part2";
		}
            });
});

for(var i=1;i<=4;++i)getPreloadImgAttr(i,function(img){
	//alert("done\n");
});

//get the percentage of position of st in any page
function getPercentage(st){
	var curr=st;
	while(curr>=pageHeight)curr-=pageHeight;
	
	return curr/pageHeight;
}

function getPreloadImgAttr(/*url*/ n,callback){
    oBackgr[n] = new Image();	
    oBackgr[n].src = /*url*/ 'images/background'+n+'.jpg';	
    if(oBackgr[n].complete){
      
        if(callback!=null)callback.call(oBackgr[n]);
        return; 
    }
    oBackgr[n].onload = function(){
      
        if(callback!=null)callback.call(oBackgr[n]);   
    };
}
function changeCircle(st){
	var number = st / pageHeight;
	//console.log(number);

			if(number<=0.625){
				c1.className = "circle circle-active";
				c2.className = "circle";
				c3.className = "circle";
				c4.className = "circle";
				c5.className = "circle";
				
			}else if(number<=1.625){

				c1.className = "circle";
				c2.className = "circle circle-active";
				c3.className = "circle";
				c4.className = "circle";
				c5.className = "circle";

			}else if(number<=2.75){


				c1.className = "circle";
				c2.className = "circle";
				c3.className = "circle circle-active";
				c4.className = "circle";
				c5.className = "circle";
				
			}else if(number<=3.75){
				c1.className = "circle";
				c2.className = "circle";
				c3.className = "circle";
				c4.className = "circle circle-active";
				c5.className = "circle";
				
			}
			else{
				c1.className = "circle";
				c2.className = "circle";
				c3.className = "circle";
				c4.className = "circle";
				c5.className = "circle circle-active";

				}
}
function changeBackground(st){
	$('#top-bar').attr('style','width:'+(st/(pageHeight*4)*100)+'%;');

	var number = Math.floor((st+0.5*pageHeight) / pageHeight ) + 1;

	var opaque = getOpaque(st);
	if(number<=4){
		if(number!=number0){
			
			$(imageId).attr('src','images/background'+number+'.jpg');
			
			number0=number;
		}
		if(opaque!=opaque0){
			$(imageId).attr('style','opacity:'+opaque+';');
			opaque0=opaque;
		}
	}else if(number==5){
		$(imageId).attr('src','');
			number0=number;
	}
}

function getOpaque(st){

	/*var number = Math.floor(st / pageHeight);

	var curr = st - number * pageHeight;

	*/
	return f(getPercentage(st));
}





function f(x){
	var result = (1- f2(x) );
	return result>=1 ? 1:result;
}

function f2(x){
	if(0<=x&& x<=1/3){

		return 3*x;

	}else if(x>1/3&&x<=2/3){

		return 1;

	}else if(x>2/3&&x<=1){

		return 3-3*x;

	}else{

		return 0;

	}

}

function backTo(i){
	var position = $('#toPage'+i).offset().top;
	
		$('html,body').animate({scrollTop:position},600);
}



//滑动动效
function pageScrollTo(st){

		shouldScroll=false;
	var percent = getPercentage(st);

	var currPage=Math.floor(st/pageHeight) + 1;

	if(percent<0.4){
		var position = $('#toPage'+currPage).offset().top;
	
		$('html,body').animate({scrollTop:position},600);
		
		
	}else if(percent>=0.4){
		var position = $('#toPage'+(currPage+1)).offset().top;
		
		$('html,body').animate({scrollTop:position},600);
		
	}
}

$(window).scroll(function() {
    clearTimeout($.data(this, 'scrollTimer'));
    $.data(this, 'scrollTimer', setTimeout(function() {
    	
        if(shouldScroll){
        //pageScrollTo($(window).scrollTop());
        shouldScroll=false;
    }else{
    	shouldScroll=true;
    }
    }, 250));
});


