$(function(){
	$(".btn1").on('tap',function(){
		var dl=$(".text-1").val();
	    var ma=$(".text-2").val();
	    var qa=$(".text-3").val();
		if(dl==""){
		  $(".i1").css('display',"block")
		  return;
		}else{
			$(".i1").css('display',"none")
		}
		if(ma==""){
		  $(".i2").css('display',"block")
		   return;
		}else{
			$(".i2").css('display',"none")
		}
		if(qa!=ma){
		  $(".i3").css('display',"block")
		   return;
		}else{
			$(".i3").css('display',"none")
		}
		$.ajax({
			type:"get",
			url:"http://datainfo.duapp.com/shopdata/userinfo.php",
			async:true,
			data:{status:"register",userID:dl,password:ma},
			success:function(data){
				if(data==0){
					$(".p2").css("display","block");
				}else{
					
					location.href="login.html"
				}
			}
		});
	})
		
	
})