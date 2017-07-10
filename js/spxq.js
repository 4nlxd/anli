$(function(){
	 var strSearch = location.search;
	 var arrSearch = strSearch.split("=");
	 var id = arrSearch[1];
	$.ajax({
		type:"get",
		url:"http://datainfo.duapp.com/shopdata/getGoods.php",
		data:{"goodsID":id},
		dataType:"jsonp",
		async:true,
		success:function(data){
		 setdata(data);
			
		}
	});
	function setdata(data){
		var html="";
		var str="<p class='p1'><img src='"+
		data[0].goodsListImg+"'/></p><p class='p2'>"+
		data[0].goodsName+"</p><p class='p3'>"+data[0].detail+"</p>"
		$(".box").html(str);	
	}
	$("i").on("tap",function(){
		location.href="xinxi.html?id="+id
	})
})
