import { useState } from 'react';
import '../css/Register.css'
import axios from 'axios';
import { useMutation } from '@tanstack/react-query';
import { useDispatch } from 'react-redux';
import { getUser } from '../../store/userSlice';
import { Link, useNavigate } from 'react-router-dom';
import {useFormik} from 'formik'
import { userValidationSchema } from '../../utils/userValidationSchema';

const Register =()=>{
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [err, setErr] = useState('')
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

    const {mutate, isPending} = useMutation({
        mutationFn:({username,password})=>{
            return axios.post(`${import.meta.env.VITE_API_URL}/auth/register`,{username,password},{withCredentials:true})
        },
        onSuccess: ()=>{
            dispatch(getUser())
            navigate('/')
        },
        onError:(err)=>{
            typeof(err.response.data.message)==='object'? setErr(err.response.data.message[0].msg):setErr(err.response.data.message)
        }
    })
    return(
        <div className="authForm">
            <h1>One step process.</h1>
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
                    <button className='formButton' type='submit' disabled={isPending}>Register</button>
                    </div>
                    {err && <span className='form-error'>{err}</span>}
                </div>
                <div>
                    Already in the club? <Link to={'/login'}>Login</Link>
                </div>
            </form>
        </div>
    )
}

export default Register;