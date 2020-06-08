import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux'
import { useHistory, useParams, useLocation } from 'react-router-dom';

import './index.css'
import { UsersAction } from './store/Actions';
import { TextInput } from './components';

const Input = (props) => {
    console.log(props)
    const [name, setName] = useState("")
    const params = useParams()
    const history = useHistory()
    const location = useLocation()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState("")
    const [isEdit, setIsEdit] = useState(false)

    const dispatch = useDispatch();

    useEffect(() => {
        if (location.state) {
            setEmail(location.state.email)
            setName(location.state.name)
            setIsEdit(true)
        }
    }, [])

    return <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
        <div id="input" className="abc">
            <TextInput
                name="Name"
                title="name"
                type="text"
                id="name"
                value={name}
                onChange={ev => { setName(ev.target.value) }}
            />
            <TextInput
                name="Email"
                title="Email"
                type="email"
                id="Email"
                value={email}
                onChange={ev => { setEmail(ev.target.value) }}
            />
            <TextInput
                name="Password"
                title="Password"
                type="password"
                id="Password"
                value={password}
                onChange={ev => { setPassword(ev.target.value) }}
            />

            <br></br>


            <button className="btn btn-block signup-btn" onClick={() => {
                if (!isEdit) {
                    dispatch(UsersAction.Add({ name, email, password }))
                    // let to = '/'+ 'dashboard' ;
                    history.push('/dashboard');

                } else {
                    dispatch(UsersAction.edit({ name, email, password }))
                    history.push('/dashboard')
                }
            }}> {isEdit ? <>Edit</> : <>Add</>} </button>


        </div >
    </div >

}
export default Input