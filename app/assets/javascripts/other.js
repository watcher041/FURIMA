
$(function(){

  // 親カテゴリーをクリックするとスクロールする
  $("a[data-category-index]").on("click",function(){
    let num = $(this).data("category-index");
    $("html,body").animate({scrollTop:$('#'+ num).offset().top});
  })

})