$(function(){
	$.ajax({
		type:"get",
		url:"http://datainfo.duapp.com/shopdata/getclass.php",
		async:true,
		success:function(data){
			var data=JSON.parse(data);
			console.log(data)
			html="";
			for(var i=0;i<data.length;i++){
				html+="<li dataid='"+data[i].classID+"'>"+
				data[i].icon+"</li>"
			}
			$(".box1 ul").html(html)
			$(".box1 li").each(function(){
				$(this).on('tap',function(){
					$(this).addClass("active").siblings().removeClass("active");
				var str=$(this).attr("dataid")
				$.ajax({
				type:"get",
				url:"http://datainfo.duapp.com/shopdata/getGoods.php",
				dataType:"jsonp",
				data:{classID:str},
				async:true,
				success:function(data){
		         setdata(data);
				}
			});
					
				})
			})
		}
	});
	$.ajax({
		type:"get",
		url:"http://datainfo.duapp.com/shopdata/getGoods.php",
		dataType:"jsonp",
		async:true,
		success:function(data){
         setdata(data);
		}
	});
    function setdata(data){
    	  html="";
			for(var i=0;i<data.length;i++){
				if(data[i].discount!=0){
			
			html+="<dl class='d1'><dt data-id='"+
			data[i].goodsID+"'><img src='"+
			data[i].goodsListImg+"'/><dd>"
			+data[i].goodsName+"</dd><p><span>￥"+
			Math.floor(data[i].price*(data[i].discount/10))
			+"</span><span>￥"
			+data[i].price+"</span></p></dl>"
			}else{
			html+="<dl class='d1'><dt data-id='"+
			data[i].goodsID+"'><img src='"+
			data[i].goodsListImg+"'/><dd>"
			+data[i].goodsName+"</dd><p><span>￥"+
			+data[i].price+"</span></p></dl>"
			}
			}
			$(".box21").html(html);
		$(".box21 dl dt").each(function(){
    	$(this).on("tap",function(){
    	var id=$(this)[0].getAttribute("data-id");
    	location.href="xinxi.html?id="+id
    	})
    })
    }
})
