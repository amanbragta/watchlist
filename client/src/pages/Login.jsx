import '../css/Login.css'
import axios from 'axios'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import {Link, useNavigate} from 'react-router-dom'
import { getUser } from '../../store/userSlice'
import {useMutation} from '@tanstack/react-query'
import { useFormik } from 'formik'
import { userValidationSchema } from '../../utils/userValidationSchema'

const Login =()=>{
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [errMessage,setErrMessage] = useState('')
     const formik = useFormik({
            initialValues:{
                username:'',
                password:''
            },
            validationSchema: userValidationSchema,
            onSubmit:(values)=>{
                mutate(values)
                //console.log(values)
            }
        })

    const {mutate,isError, isPending} = useMutation({
        mutationFn: async ({username,password})=>{
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

    return(
        <div className="authForm">
            <h1>Welcome back!</h1>
            <form className="formContent" onSubmit={formik.handleSubmit}>
            <div className='form-inner-div'>
                    <label htmlFor="username">Username</label>
                    <div className='form-text'>
                    <input id="username" type="text" {...formik.getFieldProps('username')} className='textField'/>
                    {formik.touched.username && formik.errors.username && <span className='formErrors'>{formik.errors.username}</span>}
                    </div>
                </div>
                <div className='form-inner-div'>
                    <label htmlFor="password">Password</label>
                    <div className='form-text'>
                    <input id="password" type="password" {...formik.getFieldProps('password')} className='textField'/>
                    {formik.touched.password && formik.errors.password && <span className='formErrors'>{formik.errors.password}</span>}
                    </div>
                </div>
                <div className='formButton-section'>
                    <div>
                    <button className='formButton'type='submit' disabled={isPending}>Login</button>
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