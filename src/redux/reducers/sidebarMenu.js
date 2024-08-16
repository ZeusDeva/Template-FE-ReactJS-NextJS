export const initialState = { selectedKey: "1", page: false };

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_MENU_SIDEBAR":
      return { ...state, selectedKey: action?.payload };

    case "SET_LOGIN":
      return { ...state, page: action?.payload };

    default:
      return state;
  }
};
export default reducer;
