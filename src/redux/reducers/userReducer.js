const INITIAL_STATE = {
  userEmail: "",
  isSignin: 0,
  search: "",
};

function userReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case "LOG_IN":
      return { ...state, isSignin: 1, userEmail: action.userEmail };
    case "LOG_OUT":
      return { ...state, isSignin: 0, userEmail: "" };
    case "SEARCH":
      return { ...state, search: action.search };
    default:
      return state;
  }
}

export default userReducer;
