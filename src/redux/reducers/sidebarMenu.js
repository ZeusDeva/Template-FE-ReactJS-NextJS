export const initialState = {selectedKey: "1"};

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case "SET_MENU_SIDEBAR":
			return { ...state, selectedKey: action?.payload};

		default:
			return state;
	}
};
export default reducer;
