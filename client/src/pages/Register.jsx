import { useState } from 'react';
import '../css/Register.css'
import axios from 'axios';
import { useMutation } from '@tanstack/react-query';
import { useDispatch } from 'react-redux';
import { getUser } from '../../store/userSlice';
import { Link, useNavigate } from 'react-router-dom';

const Register =()=>{
    const [username,setUsername] = useState('')
    const [password,setPassword] = useState('')
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [errMessage,setErrMessage] = useState('')

    const {mutate,isError} = useMutation({
        mutationFn:()=>{
            return axios.post(`${import.meta.env.VITE_API_URL}/auth/register`,{username,password},{withCredentials:true})
        },
        onSuccess: ()=>{
            dispatch(getUser())
            navigate('/')
        },
        onError: (err)=>{
            if(err.response.data.code===11000) setErrMessage("Username already exists")
        }
    })
    async function registerUser(e){
        e.preventDefault()
        mutate()
    }
    return(
        <div className="authForm">
            <h1>One step process.</h1>
            <form className="formContent">
                <div className='form-inner-div'>
                    <label htmlFor="username">Username</label>
                    <input id="username" type="text" value={username} onChange={e=>setUsername(e.target.value)} className='textField'/>
                </div>
                <div className='form-inner-div'>
                    <label htmlFor="password">Password</label>
                    <input id="password" type="password" value={password} onChange={e=>setPassword(e.target.value)} className='textField'/>
                </div>
                <div className='formButton-section'>
                    <div>
                    <button className='formButton' onClick={registerUser}>Register</button>
                    </div>
                    {isError && <span className='form-error'>{errMessage}</span>}
                </div>
                <div>
                    Already in the club? <Link to={'/login'}>Login</Link>
                </div>
            </form>
        </div>
    )
}

export default Register;