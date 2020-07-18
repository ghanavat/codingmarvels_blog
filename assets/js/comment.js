var emailRegEx = /[^@\s]+@[^@\s]+\.[^@\s]+$/

function changedAvatar() {
  var image = document.getElementById('avatarPreview')
  image.default = image.default || image.src
  image.possible = buildPossibleAvatars(document.getElementById('identity').value);
  image.currentIndex = 0;
  setAvatar(image);
}

function buildPossibleAvatars(identity) {
    var possibleAvatars = []
  
    if (identity.match(emailRegEx))
      possibleAvatars.push('https://secure.gravatar.com/avatar/' + md5(identity) + '?s=80&d=identicon&r=pg')
  
    if (identity.indexOf('@') < 0)
      possibleAvatars.push('https://github.com/' + identity + '.png')
  
    possibleAvatars.push('https://secure.gravatar.com/avatar/twitter/' + identity + '/medium')
  
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

function prepareCommitForm() {
  var status = document.getElementById('commentstatus')
  status.innerText = ''

  var requiredIds = [ 'message', 'identity', 'name']
  var missing = requiredIds.filter(id => document.getElementById(id).value.length < 3)
  if (missing.length > 0) {
    status.innerText = 'Some required fields are missing - (' + missing.join(', ') + ')'
    return
  }

  var button = document.getElementById('commentbutton')
  if (button.innerText != 'Confirm comment') {
    button.innerText = 'Confirm comment'
    return
  }

  var form = document.getElementById('commentform')
  form.action = form.getAttribute('action2')
  button.innerText = 'Posting...'
  button.disabled = true
  form.submit()
  var fields = document.getElementById('commentfields')
  fields.disabled = true
}