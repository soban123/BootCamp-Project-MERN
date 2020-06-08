import ActionTypes from './ActionsTypes';
import EmailJsServive from '../../Services/EmailJS';

const AuthAction = {
	login: (obj) => {
		return (dispatch) => {
			const url = process.env.REACT_APP_ENDPOINT + 'auth/signin';
			fetch(url, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(obj)
			})
				.then((response) => {
					if (response.status === 200) {
						return response.json()
					}
					throw response
				})
				.then((data) => {
					if (data.data.token) {
						localStorage.setItem("token", data.data.token)
						localStorage.setItem("userId", data.data.user._id)
						dispatch({ type: ActionTypes.LOGIN, payload: data.data });
						return (data.data);
					}
				})
				.catch((error) => {
					alert('Login Fail');
				});
		};
	},
	add: (obj) => {
		return async (dispatch) => {
			let url = process.env.REACT_APP_ENDPOINT + 'auth/signup';
			return await fetch(url, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(obj)
			})
				.then((resposne) => {
					if (resposne.status === 200) {
						return resposne.json()
					}
					throw resposne
				})
				.then(async () => {
					var templateParams = {
						senderEmail: process.env.REACT_APP_EMAIL_JS,
						receiverEmail: obj.email,
						toName: obj.name,
						password: obj.password
					};

					await EmailJsServive.sendEmailJsServive(
						process.env.REACT_APP_TEMPLATE_ID,
						templateParams,
						process.env.REACT_APP_USER_ID
					);
					return true;

				})
				.catch((error) => {
					console.log(error)
					return false;
				})
		};
	},
	autoLogin: (obj) => {
		return async (dispatch) => {
			let url = process.env.REACT_APP_ENDPOINT + 'api/users/' + obj._id;
			return await fetch(url, {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${obj.token}`

				}
			})
				.then((resposne) => {
					if (resposne.status === 401) {
						localStorage.clear()
					} else if (resposne.status === 200) {
						return resposne.json()
					}
					throw resposne
				})
				.then(({ data }) => {
					dispatch({ type: ActionTypes.LOGIN, payload: { token: obj.token, user: data.user } });
					return true;
				})
				.catch((error) => {
					console.log(error)
					return false
				})
		};
	},
	edit: (obj) => {
		return (dispatch) => {
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
	}

};

export { AuthAction };
