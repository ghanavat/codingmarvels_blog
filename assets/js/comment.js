var emailRegEx = /[^@\s]+@[^@\s]+\.[^@\s]+$/;

function changedAvatar() {
  var image = document.getElementById('avatarPreview');
  image.default = image.default || image.src;
  image.possible = buildPossibleAvatars(document.getElementById('identity').value);
  image.currentIndex = 0;
  setAvatar(image);
}

function buildPossibleAvatars(identity) {
    var possibleAvatars = [];
  
    if (identity.match(emailRegEx)){
      possibleAvatars.push('https://secure.gravatar.com/avatar/' + md5(identity) + '?s=80&d=identicon&r=pg');
    }
  
    if (identity.indexOf('@') < 0){
      possibleAvatars.push('https://github.com/' + identity + '.png');
    }      
  
    possibleAvatars.push('https://avatars.io/twitter/' + identity + '/medium');
  
    return possibleAvatars;
}

function setAvatar(image, increment) {
    if (increment){
      image.currentIndex += increment;
    }
  
    image.src = image.currentIndex < image.possible.length
      ? image.possible[image.currentIndex]
      : image.default;
  
    document.getElementById('avatar').value = image.src;
}

function ConfirmComment() {
  if (!validateFields()) {
    return;
  }

  var button = document.getElementById('commentbutton');
  if (button.innerText != 'Confirm comment') {
    button.innerText = 'Confirm comment';
    return;
  }

  var form = document.getElementById('commentform');
  form.action = form.getAttribute('action2');
  button.innerText = 'Posting...';
  button.disabled = true;
  form.submit();
  var fields = document.getElementById('commentfields');
  fields.disabled = true;
}

function validateFields(){
  var status = document.getElementById('commentstatus');
  status.innerText = '';
  var invalidFields = [];
  
  var requiredFields = document.getElementById('commentfields').querySelectorAll('[required]');

  for (let index = 0; index < requiredFields.length; index++) {    
    if (requiredFields[index].value.length == 0) {
      invalidFields.push(requiredFields[index].name);
    }
  }

  if (invalidFields.length > 0) {
      status.classList.remove('hidden');
      status.innerText = 'Some required fields are missing - (' + invalidFields.join(', ') + ')';
      return false;
  }
}