function bodyScale(){
var devicewidth=document.documentElement.clientWidth;
	var scale=devicewidth/640;
	document.body.style.zoom=scale;
}
window.onload=window.onresize=function(){
	bodyScale();
}
