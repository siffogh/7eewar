
function activateTab(obj) {

  obj.className = 'active';
  oldTab.className = ''  ;
  oldTab = obj;

}


//******Search******//

function showSearch(){
  var bar = document.getElementById('search-bar');
  if(bar.style.display != 'block')
  {
    bar.style.display = 'block';
  }
  else
  {
    bar.style.display = 'none';
  }
}

function showFull(index)
{
  window.location.replace('/post/'+index);

}

function showImgContainer()
{
  document.getElementById('img-container').style.maxHeight='100px';
  document.getElementById('img-container').style.padding='5px';

}

function readURL(input,pid) {
  if (input.files && input.files[0]) {
    var reader = new FileReader();

    reader.onload = function (e) {
      document.getElementById(pid).src = e.target.result;
    }

    reader.readAsDataURL(input.files[0]);
  }
}


document.getElementById('post-file').onchange = function(){
  readURL(this,"post-preview");
  document.getElementById("post-preview").style.height = '100px';
  document.getElementById("post-preview").style.width = '100px';
  document.getElementById('post-input').style.borderBottom = "1px solid rgba(0, 0, 0, .2)";
  document.getElementById('close').style.display = 'inherit';
}

function hidePostPreview(){
  document.getElementById("post-preview").style.height = '0px';
  document.getElementById('close').style.display = 'none';
  document.getElementById('post-file').value='';
  document.getElementById('post-input').style.borderColor = 'white';
}

function addTag(value){
  $('#stags-input').tagsManager('pushTag',value);
}

function toTag(tag){
  window.location.replace('/tag/' + tag.replace('#',''));
}

function controlSubmitButton(obj)
{
  var btn = document.getElementById('submit-btn');
  if(obj.value.length > 0)
    btn.disabled = false;
  else
    btn.disabled = true;
}


function submitForm()
{

      var arr = [];
      var lines = $('#post-input').val().split('\n');
      lines.forEach(function(line,index){
        arr = arr.concat(line.split(' '));
      });

      arr.forEach(function(a,index){
        if(a.indexOf('#') == 0)
        {
          document.getElementById('tags-input').value += a;
          if(index != arr.length -1)
            document.getElementById('tags-input').value += ',';
        }
          
      });


        document.getElementById('post-form').submit();
      
}


document.getElementById('modal-pic-input').onchange = function(){
  readURL(this,"modal-pic");
}

// function makeModalEditable(){
//   document.getElementById('modal-username').style.display = 'none';
//   document.getElementById('modal-username-input').style.display = 'inline';
//   document.getElementById('modal-username-input').focus();
//   document.getElementById('modal-btn-group').style.display = 'inline';
//   document.getElementById('modal-edit-btn').style.display = 'none';
//   document.getElementById('modal-photo-icon').style.display='inline';
//   document.getElementById('modal-pic').style.opacity = '0.7';
//   document.getElementById('modal-link').style.cursor = 'pointer';
//   document.getElementById('modal-link').onclick = function(){
//   document.getElementById("modal-pic-input").click();
//   }
// }

function makeModalEditable(){
  document.getElementById('modal-username').style.display = 'none';
  document.getElementById('modal-username-input').style.display = 'inline';
  document.getElementById('modal-username-input').focus();
  document.getElementById('modal-btn-group').style.display = 'inline';
  document.getElementById('modal-edit-btn').style.display = 'none';
  document.getElementById('modal-photo-icon').style.display='inline';
  document.getElementById('modal-pic').style.opacity = '0.7';
  document.getElementById('modal-link').style.cursor = 'pointer';
  document.getElementById('modal-link').onclick = function(){
  document.getElementById("modal-pic-input").click();
  }
}


function undoEditable(){
  document.getElementById('modal-username').style.display = 'inline';
  document.getElementById('modal-username-input').style.display = 'none';
  document.getElementById('modal-btn-group').style.display = 'none';
  document.getElementById('modal-edit-btn').style.display = 'inline';
  document.getElementById('modal-photo-icon').style.display='none';
  document.getElementById('modal-link').style.cursor = 'default';
  document.getElementById('modal-pic').style.opacity = '1';
    document.getElementById('modal-link').onclick = function(){
  }
}


function openModal(username,profilePic,debates,participations,comments){
  document.getElementById('omodal-username').innerHTML = username;
  document.getElementById('omodal-pic').src = '/public/uploads/profile-pics/'+profilePic+'.png';
  document.getElementById('omodal-debates').innerHTML = debates;
  document.getElementById('omodal-comments').innerHTML = comments;
  document.getElementById('omodal-participations').innerHTML = participations;
  $("#profileModal").modal("show");
}

function incrementNotif(){
  document.getElementById('badge').innerHTML = parseInt(document.getElementById('badge').innerHTML) +1 ;
}



////////////////******Notifications******///////////////////////////

var socket = io.connect('http://localhost');
socket.on('notify',function(data){
  document.getElementById('badge').innerHTML = parseInt(document.getElementById('badge').innerHTML) +1 ;
  document.getElementById('badge').className = 'badge';
  var str = "<li class='unchecked-notif'><a href="+data.link+" id='notification'><img id='notif-img' src='/public/uploads/profile-pics/"+data.author.local.profilePic+".png' alt='profile icon' height='45px'><span> <strong>&bull; "+ data.author.local.username+"</strong> "+data.title+".</span><br></span>";
  if (moment().diff(moment(data.date),'hours') < 10)
  str += "<span id='notif-date'>"+moment(data.date).lang('en').fromNow()+"</span></a></li>";
  else
  str += "<span id='notif-date'>"+moment(data.date).lang('en').format('MMMM D [at] LT')+"</span></a></li>";
  document.getElementById('notification-menu').innerHTML = str+ document.getElementById('notification-menu').innerHTML;

});

socket.on('checkedNotifs',function(){  //when notifications are checked, we uncheck them in the client side
  checkAll();
});

function checkNotifs(){
  socket.emit('checkNotifs',{id:myid});
}

function checkAll(){
  document.getElementById('badge').className = 'hidden-badge';
}



