$(function(){
  function buildHTML(message){
    
    var image_html ="";
    if (message.image){
      image_html=`<img src=${message.image}></img>`
    }
    var html =
        `<div class="messages__message">
          <div class="messages__message__info">
            <div class="messages__message__info__talker">
              ${message.user_name}
            </div>
            <div class="messages__message__info__date">
              ${message.date}
            </div>
          </div>
          <div class="messages__message__text">
            <p class="messages__message__text__content">
              ${message.content}
            </p>
              ${image_html}
          </div>
        </div>`
    return html;
  }
  $('#new_message').on('submit', function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action');
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      var html = buildHTML(data);
      $('.messages').append(html);
      $('form')[0].reset();
      $('.messages').animate({ scrollTop: $('.messages')[0].scrollHeight});
      $('.form__submit').prop('disabled', false);
    })
    .fail(function(){
      alert("メッセージ送信に失敗しました");
    });
  });
});