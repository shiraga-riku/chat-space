$(function(){
  function buildHTML(message){
    if (message.image){
      var html =
        `
          <div class="messages__message">
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
              <img class="messages__message__text__image" src=${message.image}>
            </div>
          </div>`
      return html;
    } else {
      var html=
        `
          <div class="messages__message">
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
            </div>
          </div>`
      return html;
    };
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
      $('.form__message').val('');
      $('.messages').animate({ scrollTop: $('.messages')[0].scrollHeight});
      $('.form__submit').prop('disabled', false);
    })
    .fail(function(){
      alert("メッセージ送信に失敗しました");
    });
  });
});