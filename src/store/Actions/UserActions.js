import ActionTypes from './ActionsTypes';

const UsersAction = {
    Add: (obj) => {
        return (dispatch, getState) => {
            dispatch({ type: ActionTypes.ADD })
            const url = process.env.REACT_APP_ENDPOINT + 'api/users';
            const token = getState().authReducers.token

            fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                    'origin': '',
                },
                body: JSON.stringify(obj)
            })
                .then(async (response) => {
                    if (response.status === 401) {
                        localStorage.clear()
                    } else if (response.status === 200)
                        return response.json()
                    throw response
                })
                .then((data) => {
                    dispatch({ type: ActionTypes.ADD_USER_SUCCESS, payload: data })
                })
                .catch((error) => {
                    console.log({ error })
                })
        }

    },
    edit: (obj) => {
        return () => {
            let url = process.env.REACT_APP_DASHBOARDAPI;
            fetch(url, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                },
                body: JSON.stringify({
                    name: obj.name,
                    email: `${obj.email}`,
                    password: `${obj.password}`
                })
            })
                .then((resposne) => resposne.json())
                .then((data) => {
                    console.log(data);
                });
        };
    },
    getUsers: () => {
        return (dispatch, getState) => {
            const token = getState().authReducer.token
            const urlReceipt = process.env.REACT_APP_ENDPOINT + 'api/users';
            fetch(urlReceipt, {
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
                    dispatch({ type: ActionTypes.GET_USERS_SUCCESS, payload: res.data.user });
                })
                .catch((error) => {
                    console.log({ error });
                });
        };
    },
    getUser: (id) => {
        return (dispatch, getState) => {
            const token = getState().authReducer.token
            const url = `${process.env.REACT_APP_ENDPOINT}api/users/${id}`;
            fetch(url, {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            })
                .then(response => {
                    if (response.status === 401) {
                        localStorage.clear()
                    } else if (response.status === 200) {
                        return response.json();
                    }
                    throw response
                })
                .then(data => {
                    dispatch({ type: ActionTypes.GET_USER_SUCCESS, payload: data.data.user });
                })
                .catch(error => alert(error))

        };
    },

};

export { UsersAction };
