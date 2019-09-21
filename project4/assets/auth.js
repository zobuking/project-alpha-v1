const signupForm=document.querySelector('#signup-form');

signupForm.addEventListener('submit',function (e) {
  e.preventDefault();

  const email=signupForm['signup-email'].value;
  const password=signupForm['signup-password'].value;

auth.createUserWithEmailAndPassword(email,password);


});
