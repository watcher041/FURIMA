
$(function(){
  
  // プルダウンのHTMLを生成
  function buildHTML(data){

    var html = $("<ul>").addClass("header-bottom-left-category-field-nav")
    var link

    data.forEach(function(value){
      link = $("<a>", { href: "/categories/" + value.id ,
                       "class":"category_name" }).text(value.name)
      link = $("<li>").append(link)

      html.append(link)
    })

    return html
  }
  
  $(document).on({

    // カーソルが乗ったときに起動
    'mouseenter' : function() {

      // カテゴリーのidを取得
      var category_id = $(this).data("category-id")

      // 
      if( category_id != 0 ){
        $.ajax({
          url: $(this).attr("href"),
          type: "GET",
          dataType: "json",
          context:this,
          cache: false,
        })
        .done(function(result){
    
          // 子要素がなければ選択肢を表示しない
          if( result.length != 0 ){
    
            // 選択したフォームの下に新たなフォームを追加
            var html = buildHTML(result)

            // 先に追加されていたリストがあれば削除
            $(this).parents(".header-bottom-left-category-field-nav").nextAll().remove()
            $(".header-bottom-left-category-field").append(html)
            $(".header-bottom-left-category-field-nav").css("display","block")

          } 

        })
      }

      $(".header-bottom-left-category-field-nav").mouseenter(function(eo){ 
        $(this).find("a").css("color","")
      })
      
      // カテゴリーを表示する
      $(".header-bottom-left-category-field").css("display","flex")

    },'mouseleave' : function(){
      $(".header-bottom-left-category-field-nav").mouseleave(function(eo){
        $(eo.fromElement).css("color","orange")
      })
    }
  }, ".category_name")

  // カテゴリーのタイトルに触れたら、一から表示し直す
  $("[data-category-id='0']").mouseenter(function(){
    $(".header-bottom-left-category-field").css("display","none")
    $(".header-bottom-left-category-field-nav").first().nextAll().remove()
  })

   // マウスが離れた時に起動
   $(".header-bottom-left-category").mouseleave(function(){
    $(".header-bottom-left-category-field").css("display","none")
    $(".header-bottom-left-category-field-nav").first().nextAll().remove()
  })

})