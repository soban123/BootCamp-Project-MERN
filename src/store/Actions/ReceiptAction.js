
import ActionTypes from './ActionsTypes';
const ReceiptAction = {
    getRecipts: () => {
        return (dispatch, getState) => {
            const token = getState().authReducer.token
            const url = process.env.REACT_APP_ENDPOINT + 'api/receipt';
            fetch(url, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            })
                .then((data) => {
                    if (data.status === 401) {
                        localStorage.clear()
                    } else if (data.status === 200) {
                        return data.json();
                    }
                    throw data
                })
                .then((res) => {
                    dispatch({
                        type: ActionTypes.GET_RECEIPT_SUCCESS,
                        payload: res.data.receipt
                    });
                })
                .catch((error) => {
                    console.log({ error });
                });
        };
    },
    getReceiptByUserId: (id) => {
        return (dispatch, getState) => {
            const token = getState().authReducer.token
            const url = process.env.REACT_APP_ENDPOINT + 'api/receipt' + id;

            fetch(url, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    "Authorization": "Bearer " + token
                }
            })
                .then((resposne) => resposne.json())
                .then((data) => {
                    dispatch({ type: ActionTypes.GET_USER_RECEIPTS_SUCCESS, payload: data });
                })
                .catch((error) => {
                    console.log({ error });
                    alert('please log in again');
                })
        }
    },
    addReceipt: (obj) => {
        return async (dispach, getState) => {
            const token = getState().authReducer.token
            dispach({
                type: ActionTypes.ADD_RECEIPT
            })
            try {
                const url = process.env.REACT_APP_ENDPOINT + 'api/receipt';
                const response = await fetch(url, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        "Authorization": `Bearer ${token}`
                    },
                    body: JSON.stringify(obj)
                })
                const data = await response.json();
                dispach({
                    type: ActionTypes.ADD_RECEIPT_SUCCESS,
                    payload: data
                })
            } catch (err) {
                console.log(err)
                dispach({ type: ActionTypes.ADD_RECEIPT_FAIL })
            }
        }
    }
}

export { ReceiptAction } 