$(function(){
	 var strSearch = location.search;
	 var arrSearch = strSearch.split("=");
	 var id = arrSearch[1];
	$.ajax({
			type:"get",
			url:"  http://datainfo.duapp.com/shopdata/getGoods.php",
			async:true,
			data:{"goodsID":id},
			dataType:"jsonp",
			success:function(data){
				console.log(data)
				var str=data[0].imgsUrl;
				var obj=JSON.parse(str);
				if(obj.length==4){
					var html="";
					html1="<div><img src='"
					+obj[0]+"'/></div>"
					html2="<img src='"
					+obj[1]+"'/>"
				   html3="<img src='"
					+obj[2]+"'/>"
					html4="<img src='"
					+obj[3]+"'/>"
				$(".slide1").html(html1);
				$(".slide2").html(html2);
				$(".slide3").html(html3);
				$(".slide4").html(html4);
				}else{
					var html="";
					html1="<div><img src='"
					+obj[0]+"'/></div>"
					html2="<img src='"
					+obj[1]+"'/>"
				   html3="<img src='"
					+obj[2]+"'/>"
				$(".slide1").html(html1);
				$(".slide2").html(html2);
				$(".slide3").html(html3);
				}
				
			if(data[0].discount!=0 && data[0].buynumber){
				var str="<p class='p1'>"+data[0].goodsName
			+"</p><p class='p2'><span>"+
			Math.floor(data[0].price*(data[0].discount/10))
			+"￥</span><span>￥"+data[0].price
			+"</span></p><p class='p3'>购买人数:"+
			data[0].buynumber+"人</p>"
			$(".cont").html(str)
				}else{
			var str="<p class='p1'>"+data[0].goodsName
			+"</p><p class='p2'><span>￥"+data[0].price
			+"</span></p><p class='p3'>购买人数:"+
			0+"人</p>"
			$(".cont").html(str)
				}
			
			}
			});
		var str=localStorage.getItem("key");
		var obj=JSON.parse(str);
		var str1=obj.name;
		 $("button").on("tap",function(){
		 	$.ajax({
			type:"get",
			url:" http://datainfo.duapp.com/shopdata/updatecar.php",
			async:true,
			data:{"userID":str1,"goodsID":id,number:1},
			success:function(data){
				console.log(data)
			}
		});	
		 })
		 $(".xq").on("tap",function(){
		 	console.log(id)
		 	location.href="spxq.html?id="+id;
		 })
		$("i").on("tap",function(){
		location.href="shouye.html"
	})
			
})
