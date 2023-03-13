const NO_AVATAR_IMG = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT_E6mVH-jjV4_zGfvAaLKnju8nvJ0OV87lpA&usqp=CAU';
const form = document.getElementById('new-comment-form');
const userName = document.getElementById('user-name');
const avatarUrl = document.getElementById('avatarUrl');
const date = document.getElementById('date');
const comment = document.getElementById('comment');
const userNameError = document.getElementById('user-name-error');
const commentError = document.getElementById('comment-error');
const btnSubmit = document.getElementById('btn-submit');

function checkBtnSubmit() {
  if (userName.value && comment.value) {
    btnSubmit.disabled = false;
  } else {
    btnSubmit.disabled = true;
  }
}

function onInputEvent(field, errorElem) {
  if (field.value) {
    field.style.borderColor = 'transparent';
    errorElem.style.display = 'none';
  }

  checkBtnSubmit();
}

function onBlurEvent(field, errorElem) {
  if (!field.value) {
    field.style.borderColor = '#f65281';
    errorElem.style.display = 'block';
  }

  checkBtnSubmit();
}

userName.addEventListener('input', (event) => {
  onInputEvent(event.target, userNameError);
});

userName.addEventListener('blur', (event) => {
  onBlurEvent(event.target, userNameError);
});

comment.addEventListener('input', (event) => {
  onInputEvent(event.target, commentError);
});

comment.addEventListener('blur', (event) => {
  onBlurEvent(event.target, commentError);
});

form.addEventListener('submit', (event) => {
  event.preventDefault();

  let commentDate;
  const inputDate = date.value;
  const currentDate = new Date().toISOString().slice(0, 10);
  const commentsArray = JSON.parse(localStorage.getItem('comments'));

  if (inputDate === currentDate || !inputDate) {
    commentDate = currentDate;
  } else if (inputDate < currentDate || inputDate > currentDate) {
    commentDate = inputDate;
  }

  const newComment = {
    id: Math.floor(Math.random() * Date.now()),
    userName: userName.value,
    avatarUrl: avatarUrl.value ? avatarUrl.value : NO_AVATAR_IMG,
    date: commentDate,
    time: new Date().toTimeString().slice(0, 5),
    text: comment.value,
    isFavorite: false,
  };

  if (!commentsArray) {
    const commentsNewArray = [];
    commentsNewArray.push(newComment);
    localStorage.setItem('comments', JSON.stringify(commentsNewArray));
  } else {
    commentsArray.push(newComment);
    localStorage.setItem('comments', JSON.stringify(commentsArray));
  }

  userName.value = '';
  avatarUrl.value = '';
  date.value = '';
  comment.value = '';
  btnSubmit.disabled = true;

  location.reload();
});


