$(function() {
  function buildHTML(message){
    var insertImage = message.image.url?  `<img src=${message.image.url} >` : "";
      var html =
        `<div class="message" data-message-id=${message.message_id} >
          <div class="upper-message">
            <div class="upper-message__user-name">
              ${message.user_name}
            </div>
            <div class="upper-message__date">
              ${message.date}
            </div>
          </div>
          <div class="lower-message">
            <p class="lower-message__content">
              ${message.content}
            </p>
          </div>
          ${insertImage}
        </div>`
      return html;
      };
    
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
      $('.form__submit').prop('disabled', false);
      $(".messages").scrollTop($(".messages")[0].scrollHeight);
      $('form')[0].reset();
    })

    .fail(function(){
      alert('error');
    })
    return false;
  });

    var reloadMessages = function() {
      var last_message_id = $('.message').last().data('message-id');
      var group_id = $('.chat').data('group-id')
      $.ajax({
        url: '/groups/'+ group_id +'/api/messages',
        type: 'get',
        dataType: 'json',
        data: {id: last_message_id}
      })
      .done(function(messages) {
          messages.forEach(function(message){
          var insertHTML = buildHTML(message);
          $('.messages').append(insertHTML);
          $(".messages").animate({scrollTop: $(".messages")[0].scrollHeight}, 'fast');
          });
      })
      .fail(function() {
      });
    };
      setInterval(reloadMessages, 5000);
});
