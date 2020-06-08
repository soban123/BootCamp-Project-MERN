import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { connect } from 'react-redux';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope } from '@fortawesome/free-regular-svg-icons';

import { AuthAction } from '../store/Actions';
import { TextInput } from '../components';
import '../styles/signup.css';

const SignUp = (props) => {
	const [email, setEmail] = useState('');
	const [firstName, setFirstName] = useState('');
	const [lastName, setLastName] = useState('');
	const [password, setPassword] = useState('');
	const history = useHistory()

	const handleSubmit = async () => {
		var obj = {
			email,
			password,
			name: `${firstName} ${lastName}`
		};
		const response = await props.ADD(obj);
		console.log("response", response);
		if (response) { history.push('/') }
	};

	return (
		<div
			className="signup-main"
		>
			<div className="div-icon">
				<FontAwesomeIcon className="env-icon" icon={faEnvelope} />
			</div>
			<div className="login-heading" >Sign Up</div>
			<div className="form-container">
				<TextInput
					name="firstName"
					title="First name"
					type="text"
					id="firstName"
					onChange={ev => { setFirstName(ev.target.value) }}
				/>
				<TextInput
					name="lastName"
					title="Last name"
					type="text"
					id="lastName"
					onChange={ev => { setLastName(ev.target.value) }}
				/>
				<TextInput
					name="email"
					title="Email address"
					type="email"
					id="email"
					onChange={ev => { setEmail(ev.target.value) }}
				/>
				<TextInput
					name="password"
					title="Password"
					type="password"
					id="password"
					onChange={ev => { setPassword(ev.target.value) }}
				/>

				<button onClick={handleSubmit} className="btn btn-block signup-btn">
					SUBMIT
				</button>
				<div className="btn-login">
					Already have an account ?
					<Link to="/"> Login</Link>
				</div>
			</div>
		</div>
	);
};

function mapDispatchToProps(dispatch) {
	return {
		ADD: (obj) => dispatch(AuthAction.add(obj))
	};
}

export default connect(null, mapDispatchToProps)(SignUp);
