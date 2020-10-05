$(function(){
   function getMenuList(){
    $.ajax({
        url:'/getMenuList',
        dataType:'json',
        success:function(res){
            $('.header >ul').html(template('template',res))
            $('.topnav >ul').html(template('template',res))
        }
    })
   }
   getMenuList()

   function getSlider(){
    $.ajax({
        url:'/getSlider',
        dataType:'json',
        success:function(res){
            console.log(res);
            
            $('.content .swipe-wrapper').html(template('sliderTemp',res))
            // $('.topnav >ul').html(template('template',res))
        }
    })
   }
   getSlider()
})