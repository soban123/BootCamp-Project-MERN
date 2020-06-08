import ActionTypes from '../Actions/ActionsTypes';

const INITIAL_STATE = {
    Data: [],
    receipts: [],
    userReceipts: []

}

function receiptReducer(state = INITIAL_STATE, action) {
    switch (action.type) {

        case 'ADD': {
            return {
                ...state,
                Data: [...state.Data, action.payload]
            }
        }
        case ActionTypes.ADD_RECEIPT: {
            return {
                ...state,
                lodding: true
            }
        }
        case ActionTypes.ADD_RECEIPT_SUCCESS: {
            return {
                ...state,
                lodding: false,
                status: true,
                receipts: [...state.receipts, action.payload]
            }
        }

        case ActionTypes.ADD_RECEIPT_FAIL: {
            return {
                ...state,
                lodding: false,
                error: true,
            }
        }
        case ActionTypes.GET_USER_RECEIPTS_SUCCESS: {
            return {
                ...state,
                lodding: false,
                status: true,
                userReceipts: action.payload
            }
        }

        default: return state;
    }
}

export { receiptReducer };