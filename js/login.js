$(function(){
	var str=localStorage.getItem("key")
	var obj=JSON.parse(str);
	if(obj.pssword){
	    $(".text-1").val(obj.name)
	    $(".text-2").val(obj.password)
	}else{
		$(".text-1").val(obj.name)
	}
	$(".btn1").on('tap',function(){
		var dl=$(".text-1").val();
	    var ma=$(".text-2").val();
		if(dl==""){
		  $(".p1").css('display',"block")
		  return;
		}else{
			$(".p1").css('display',"none")
		}
		if(ma==""){
		  $(".p2").css('display',"block")
		   return;
		}else{
			$(".p2").css('display',"none")
		}
		$.ajax({
			type:"get",
			url:" http://datainfo.duapp.com/shopdata/userinfo.php",
			async:true,
			data:{status:"login",userID:dl,password:ma},
			success:function(data){
				if(data==0){
					$(".p3").css("display","block");
				}else if(data==2){
					$(".p4").css("display","block");
				}else{

				   if($('input[name="chk"]').prop("checked"))
                       {
                       var obj={
                       	  "name":dl,
                       	  "password":ma
                       }
                       var obj1=JSON.stringify(obj);
                        localStorage.setItem("key",obj1)
                        	 $(".text-1").val("");
                            $(".text-2").val("");   
                       }else{
                     localStorage.setItem("key",dl)
                 };
				}
			}
		});
	})
		
	$(".btn2").on("tap",function(){
		location.href="register.html"
	})
})
