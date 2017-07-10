$(function(){
	var str=localStorage.getItem("key");
	var obj=JSON.parse(str);
	var str1=obj.name;
	$.ajax({
		type:"get",
		url:"http://datainfo.duapp.com/shopdata/getCar.php",
		dataType:"jsonp",
		data:{"userID":str1},
		async:true,
		success:function(data){
			setdata(data);
		},
		
	});
	var html="";
	function setdata(data){
		for(var i=0;i<data.length;i++){
			html+="<li><div class='d1'><img src='"+
			data[i].goodsListImg
			+"'></div><div class='d2'><p class='p1'>"+
			data[i].goodsName+"</p><p class='p3'>单价:"
			+data[i].price+"</p><p class='p2'>"+
			"<strong>数量:</strong><span class='span1'>-</span>"+
		    "<input id='btn'type='text' value='"+data[i].number
		     +"'><span class='span2'>+</span></p></div></li>"
		}
		$(".box ul").html(html);
		$(".box ul").css("height",data.length*2.5+"rem")
		$(".span1").each(function(){
		$(this).on("tap",function(){
		var num=("#btn").val();
		if(num>1){
			num--;
			$("#btn").val(num);
		}
		})
	})
		$(".span2").each(function(){
			$(".span2").on("tap",function(){
		var num=$("#btn").val();
		num++
		$("#btn").val(num);
	})
		})
		
	}
	
})
