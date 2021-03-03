$(function(){
getUserInfo()
var layer=layui.layer
$('#btuLogout').on('click',function(){
    console.log(123);
    layer.confirm('确定要退出吗?', {icon: 3, title:'提示'},
     function(index){
        localStorage.removeItem('token')
        location.href='/login.html'
        layer.close(index);
      });

})
})
//获取用户基本信息
function getUserInfo(){
    $.ajax({
        method: "GET",
        url: "/my/userinfo",
        // headers:{
        //     Authorization: localStorage.getItem('token')||''
        // },
        success: function (res) {
            if(res.status!==0){
                return layui.layer.msg('获取用户信息失败!')
            }
            randerAvatar(res.data)
        },
    complete: function(res){
        console.log(res);
        //为什么不能用&&
        if(res.responseJSON.status===1||res.responseJSON.message==='身份认证失败!'){
            localStorage.removeItem('token')
            location.href='/login.html'
        }
        
    }
    });
   
}
function randerAvatar(user){
var name = user.nickname||user.username
$('.welcome').html('欢迎'+name)
console.log("------------")
if(user.user_pic!==null){
    
    //有图片渲染图片
    $('.text-avatar').hide()
    $('.layui-nav-img').attr('src',user.user_pic).show()
}else{
    var frist=name[0].toUpperCase()
    $('.text-avatar').html(frist).show()
    $('.layui-nav-img').hide()
}
}

