import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { AuthAction } from '../store/Actions';
import { Link, useHistory } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope } from '@fortawesome/free-regular-svg-icons';

import '../styles/login.css';
import { TextInput } from '../components';

const Login = (props) => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const history = useHistory()

	useEffect(() => {
		saveDateToStoreAndNav();
	}, [props.user])
	const saveDateToStoreAndNav = () => {
		const data = props.user;
		if (data.user) {
			if (data.user.role === "S")
				history.push('/home');
			else
				history.push('/dashboard');
		}
	}

	const handleSumbit = async () => {
		props.login({ email, password });
	};

	return (
		<div
			className="login-main"
		>
			<div className="div-icon">
				<FontAwesomeIcon className="env-icon" icon={faEnvelope} />
			</div>
			<div className="login-heading" >Login</div>
			<div className="login-form-container">
				<TextInput
					name="email"
					title="Email address"
					type="email"
					id="email"
					value={email}
					onChange={ev => { setEmail(ev.target.value) }}
				/>
				<TextInput
					name="password"
					title="Password"
					type="password"
					id="password"
					value={password}
					onChange={ev => { setPassword(ev.target.value) }}
				/>

				<div className="form-group">
					<div className="custom-control custom-checkbox">
						<input
							type="checkbox"
							className="custom-control-input"
							id="customCheck1"
						/>
					</div>
				</div>

				<button onClick={handleSumbit} className="btn btn-block login-btn">
					SUBMIT
				</button>
				<div className="btn-signup">
					Haven't account ?
				<Link to="/signup"> Sign Up</Link>
				</div>
			</div>
		</div>
	);
};

function mapStateToProps(state) {
	return {
		user: state.authReducer.user
	};
}

function mapDispatchToProps(dispatch) {
	return {
		login: (obj) => dispatch(AuthAction.login(obj))
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
