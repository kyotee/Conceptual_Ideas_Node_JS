import C from '../../actions/signupSigninFormTypes.js';

const initalState = {
  name: '',
  email: '',
  password: '',
  verifyPassword: '',
  nameCurrentColor: 'Grey',
  emailCurrentColor: 'Grey',
  passCurrentColor: 'Grey',
  vPassCurrentColor: 'Grey'
};

export default function counter(state = initalState, action) {
  switch (action.type) {
  case C.SET_NAME:
    return { ...state, name: action.name };
  case C.SET_EMAIL:
    return { ...state, email: action.email };
  case C.SET_PASSWORD:
    return { ...state, password: action.password };
  case C.SET_VERIFY_PASSWORD:
    return { ...state, verifyPassword: action.verifyPassword };
  case C.CHANGE_NAME_COLOR:
    return { ...state, nameCurrentColor: action.nameCurrentColor };
  case C.CHANGE_EMAIL_COLOR:
    return { ...state, emailCurrentColor: action.emailCurrentColor };
  case C.CHANGE_PASS_COLOR:
    return { ...state, passCurrentColor: action.passCurrentColor };
  case C.CHANGE_VPASS_COLOR:
    return { ...state, vPassCurrentColor: action.vPassCurrentColor };
  case C.ERASE_CREDENTIALS:
    return { ...state, name: '', email: '', password: '', verifyPassword: '', nameCurrentColor: 'Grey', emailCurrentColor: 'Grey', passCurrentColor: 'Grey', vPassCurrentColor: 'Grey'};
  default:
    return state;
  }
}
