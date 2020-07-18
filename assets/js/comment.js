$(document).ready(function(){
    var controls = {
      email: null,
      status: null,
      submitButton: null,
      fields: null,
      avatarPreview: null
    };

    var globalVariables = {
      emailRegEx: /[^@\s]+@[^@\s]+\.[^@\s]+$/
    };
    
    controls.email = $('#email');
    controls.status = document.getElementById('commentstatus');
    controls.status.innerText = '';

    controls.submitButton = document.getElementById('commentbutton');
    controls.submitButton.onclick = (e) => { validateFields() }

    controls.fields = document.getElementById('commentfields');

    controls.avatarPreview = document.getElementById('avatarPreview');
    controls.avatarPreview.onerror = (e) => { setAvatar(e.target, 1) }

    function changedAvatar() {
      let image = controls.avatarPreview;
      image.default = image.default || image.src
      image.possible = buildPossibleAvatars(document.getElementById('identity').value);
      image.currentIndex = 0;
      setAvatar(image);
    }

    function buildPossibleAvatars(identity) {
        var possibleAvatars = []
      
        if (identity.match(globalVariables.emailRegEx))
          possibleAvatars.push('https://secure.gravatar.com/avatar/' + md5(identity) + '?s=80&d=identicon&r=pg')
      
        if (identity.indexOf('@') < 0)
          possibleAvatars.push('https://github.com/' + identity + '.png')
      
        possibleAvatars.push('https://avatars.io/twitter/' + identity + '/medium')
      
        return possibleAvatars
      }

    function setAvatar(image, increment) {
        if (increment)
          image.currentIndex += increment
      
        image.src = image.currentIndex < image.possible.length
          ? image.possible[image.currentIndex]
          : image.default
      
        document.getElementById('avatar').value = image.src
      }

    // function setAvatar(image, increment) {
    //   if (increment) {
    //     image.currentIndex += increment;
    //   }

    //   if (image.currentIndex < image.possible.length) {
    //     image.src = image.possible[image.currentIndex]
    //   }
    // }

    // function buildPossibleAvatars(identity) {
    //   var possibleAvatars = [];      
      
    //   if (identity.match(globalVariables.emailRegEx)) {
    //     possibleAvatars.push('https://secure.gravatar.com/avatar/' + md5(identity) + '?s=80&d=identicon&r=pg');
    //   }
    //   else{
    //     if (identity.length == 0){
    //         possibleAvatars.push('\\assets\\imgs\\generic-avatar.png')
    //     }
    //     else{            
    //         possibleAvatars.push('https://github.com/' + identity + '.png')
    //         possibleAvatars.push('https://avatars.io/twitter/' + identity + '/medium')            
    //     }        
    //   }

    //   return possibleAvatars;
    // }

    function validateFields(){
        var requiredIds = [ 'message', 'name', 'identity'];
        var missing = requiredIds.filter(id => document.getElementById(id).value.length < 3);
        if (missing.length > 0) {
        controls.status.innerText = 'Some required fields are missing - (' + missing.join(', ') + ')';    
        return;
        }

        if (controls.submitButton.innerText != 'Confirm comment') {
        controls.submitButton.innerText = 'Confirm comment';
        return;
        }

        var form = document.getElementById('commentform');
        form.action = '{{ site.comments.receiver }}';
        controls.submitButton.innerText = 'Posting...';
        controls.submitButton.disabled = true;
        form.submit();
        
        controls.fields.disabled = true;
    }    

    document.getElementById('identity').onchange = () => {
      changedAvatar()
    }    
  })