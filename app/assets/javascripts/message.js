$(function(){
  



  function buildHTML(message){
    var image_html ="";
    if (message.image){
      image_html=`<img src=${message.image}></img>`
    }
    var html =
        `<div class="messages__message" data-message_id =  "${message.id}" >
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


  var reloadMessages = function() {
    if (location.href==groups/messages){
      last_message_id = $('.messages__message:last').data("message_id");
      $.ajax({
        url: "api/messages",
        type: 'get',
        dataType: 'json',
        data: {id: last_message_id}
      })
      .done(function(messages) {
        var insertHTML = '';
        $.each(messages, function(i, message) {
          insertHTML += buildHTML(message)
        });
        if (messages.length != 0){
        $('.messages').append(insertHTML);
        $('.messages').animate({ scrollTop: $('.messages')[0].scrollHeight});
        }
      })
      .fail(function() {
        console.log('error');
      });
    }
  };

  setInterval(reloadMessages, 7000);
});