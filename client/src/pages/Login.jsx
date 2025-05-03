import '../css/Login.css'
import axios from 'axios'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import {Link, useNavigate} from 'react-router-dom'
import { getUser } from '../../store/userSlice'
import {useMutation} from '@tanstack/react-query'

const Login =()=>{
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [username,setUsername] = useState('')
    const [password,setPassword] = useState('')
    const [errMessage,setErrMessage] = useState('')

    const {mutate,isError, isPending} = useMutation({
        mutationFn: async ()=>{
            await axios.post(`${import.meta.env.VITE_API_URL}/auth/login`,{username,password},{withCredentials:true})
        },
        onSuccess: ()=>{
            dispatch(getUser())
            navigate('/')
        },
        onError: (err)=>{
            setErrMessage(err.response.data.message)
        }
    })

    async function login(e){
        e.preventDefault()
        mutate()
    }
    return(
        <div className="authForm">
            <h1>Welcome back!</h1>
            <form className="formContent">
                <div className='form-inner-div'>
                    <label htmlFor="username">Username</label>
                    <input id="username" value={username} onChange={e=>setUsername(e.target.value)} type="text" className='textField'/>
                </div>
                <div className='form-inner-div'>
                    <label htmlFor="password">Password</label>
                    <input id="password" value={password} onChange={e=>setPassword(e.target.value)} type="password" className='textField'/>
                </div>
                <div className='formButton-section'>
                    <div>
                    <button className='formButton' onClick={login} disabled={isPending}>Login</button>
                    </div>
                    {isError && <span className='form-error'>{errMessage}</span>}
                </div>
                <div>
                    New here? <Link to={'/register'}>Register</Link>
                </div>
            </form>
        </div>
    )
}

export default Login;