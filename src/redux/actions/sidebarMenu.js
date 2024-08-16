export function setMenu(value) {
  return {
    type: "SET_MENU_SIDEBAR",
    payload: value,
  };
}

export function setLogin(value) {
  return {
    type: "SET_LOGIN",
    payload: value,
  };
}
