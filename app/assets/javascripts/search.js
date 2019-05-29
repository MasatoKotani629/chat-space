$(function() {

  var user_list = $("#user-search-result");
  function appendUser(user) {
    var html = `<div class="chat-group-user clearfix">
                  <p class="chat-group-user__name">${ user.name }</p>
                  <div class="user-search-add chat-group-user__btn chat-group-user__btn--add" id="user_info" data-user-id="${ user.id }" data-user-name="${ user.name }">追加</div>
                </div>`
    user_list.append(html);            
    }

  var user_list = $("#user-search-result");
  function appendErrMsgToHTML(msg) {
    var html = `<div class="chat-group-user clearfix">
                  <p class="chat-group-user__name">${ msg }</p>
                </div>`
    user_list.append(html);                   
    }

  var group_user_list = $("#chat-group-users");  
  function appendUserInGroup(user_id, user_name) {
    var html = `<div class='chat-group-user clearfix js-chat-member' id='chat-group-user-8'>
                  <input name='group[user_ids][]' type='hidden' value='${user_id}'>
                  <p class='chat-group-user__name'>${user_name}</p>
                  <div class='user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn'>削除</div>
                </div>`
    group_user_list.append(html); 
    }

  $('#user-search-field').on("keyup", function() {
    var input = $('#user-search-field').val();
    console.log(input);
    if (input != "") {
      $.ajax( {
        type: 'GET',
        url: ' /users',
        data: { name : input },
        dataType: 'json'
      })
      .done(function(users) {
        if (users.length !== 0) {
          $('#user-search-result').empty();
          users.forEach(function(user){
            appendUser(user);
          });
        }
        else {
          $('.chat-group-user').remove();
          appendErrMsgToHTML("一致する名前はありません");
        };
      })
      .fail(function(){
        alert('error');
      })
      return false;
    }
  }); 
  $(document).on('click', '.user-search-add', function() {
    $(this).parent().remove();
    var user_id =  $(this).attr('data-user-id');
    var user_name = $(this).attr('data-user-name');
    console.log(user_id)
    appendUserInGroup(user_id, user_name)
  });
  $(document).on('click', '.user-search-remove', function() {
    $(this).parent().remove();
  });
});

