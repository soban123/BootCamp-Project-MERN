import ActionTypes from '../Actions/ActionsTypes';
const INITIAL_STATE = {
	user: {},
	token: ''
};

function authReducer(state = INITIAL_STATE, action) {
	switch (action.type) {
		case ActionTypes.LOGIN: {
			return {
				...state,
				user: action.payload,
				token: action.payload.token
			};
		}
		default:
			return state;
	}
}

export { authReducer };
