import C from './signupSigninFormTypes.js';

export function setName(name) {
  return {
    type: C.SET_NAME,
    name: name
  };
}

export function setEmail(email) {
  return {
    type: C.SET_EMAIL,
    email: email
  };
}

export function setPassword(password) {
  return {
    type: C.SET_PASSWORD,
    password: password
  };
}

export function setVerifyPassword(verifyPassword) {
  return {
    type: C.SET_VERIFY_PASSWORD,
    verifyPassword: verifyPassword
  };
}

export function changeNameColor(nameCurrentColor) {
  return {
    type: C.CHANGE_NAME_COLOR,
    nameCurrentColor: nameCurrentColor
  };
}

export function changeEmailColor(emailCurrentColor) {
  return {
    type: C.CHANGE_EMAIL_COLOR,
    emailCurrentColor: emailCurrentColor
  };
}

export function changePassColor(passCurrentColor) {
  return {
    type: C.CHANGE_PASS_COLOR,
    passCurrentColor: passCurrentColor
  };
}

export function changeVpassColor(vPassCurrentColor) {
  return {
    type: C.CHANGE_VPASS_COLOR,
    vPassCurrentColor: vPassCurrentColor
  };
}

export function eraseCredentials() {
   return {
    type: C.ERASE_CREDENTIALS
  }; 
}
