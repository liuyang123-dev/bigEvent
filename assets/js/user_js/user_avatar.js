$(function(){
 // 1.1 获取裁剪区域的 DOM 元素
 var $image = $('#image')
 // 1.2 配置选项
 const options = {
   // 纵横比
   aspectRatio: 1,
   // 指定预览区域
   preview: '.img-preview'
 }

 // 1.3 创建裁剪区域
 $image.cropper(options)
 $('#userChooseImage').on('click',function(e){
   
     $('#file').click()
 })
 $('#file').on('change',function(e){
    var fileList=e.target.files
    if(fileList.length===0){
        return layui.layer.msg('尚未选择图片');
        
    }
    
    var file=fileList[0]
    var newImgURL=URL.createObjectURL(file)
    $('#image').cropper('destroy').attr('src',newImgURL).cropper(options)

     
 })
 $('#btuImgSure').on('click',function(){
    var dataURL = $image
    .cropper('getCroppedCanvas', { // 创建一个 Canvas 画布
      width: 100,
      height: 100
    })
    .toDataURL('image/png')       // 将 Canvas 画布上的内容，转化为 base64 格式的字符串
    $.ajax({
        method: "post",
        url: "/my/update/avatar",
        data: {
            avatar: dataURL
        },
        success: function (res) {
            if(res.status!==0){
                return layui.layer.msg('更换头像失败'); 
            }
            layui.layer.msg('更换头像成功');
            
            window.parent.getUserInfo()
        }
    });
 })

})