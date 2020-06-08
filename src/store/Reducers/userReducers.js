import ActionTypes from '../Actions/ActionsTypes';
const INITIAL_STATE = {
    users: [],
    user: {},
};

function userReducer(state = INITIAL_STATE, action) {
    switch (action.type) {
        case ActionTypes.ADD_USER_SUCCESS: {
            return {
                ...state,
                users: [...state.users, action.payload]
            };
        }
        case ActionTypes.GET_USER_SUCCESS: {
            return {
                ...state,
                user: action.payload
            };
        }
        case ActionTypes.GET_USERS_SUCCESS: {
            return {
                ...state,
                users: action.payload
            };
        }
        default:
            return state;
    }
}

export { userReducer };
