import React from "react";
import VisibilityIcon from '@mui/icons-material/Visibility';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import {useDispatch} from 'react-redux';
import { useForm } from "react-hook-form";
import { setLoginModal,setRegistrationModal,setLoginUser,fetchUser } from "../slice.ts";
import { user } from "./registrationModal.tsx";
import CloseIcon from '@mui/icons-material/Close';
import axios from "axios";
import { toast } from "react-toastify";

const LoginModal:React.FC = ()=>{
    const [show,setshow] = React.useState<boolean>(false);
    const {register,handleSubmit,formState:{errors}} = useForm<user>();
    const dispatch = useDispatch();
    const redirect = ()=>{
        dispatch(setLoginModal());
        dispatch(setRegistrationModal());
    };
    const submit = (data)=>{
        axios.post('http://localhost:3001/api/users/login',data)
        .then((resp)=> {
            dispatch(setLoginUser(resp.data.user));
            const token = resp.data.token;
            localStorage.setItem('token', token);
            dispatch(fetchUser(token));
            toast.success('пользователь успешно авторизован')
        })
        .catch((err)=> toast.error('ошибка авторизации'));
        dispatch(setLoginModal());

    }
    return(
        <form onSubmit={handleSubmit(submit)} className=" w-1/4 bg-white rounded-xl flex flex-col gap-6 items-center py-6 px-6">
            <div className="w-full flex justify-between items-center">
                <CloseIcon onClick={()=>{dispatch(setLoginModal())}}></CloseIcon>
                <p className="text-2xl">Войдите в свой <span className="text-[#726bfe]">Аккаунт</span></p>
            </div>
            <div className="w-full">
                <div className="w-full border-2 border-[#d0d5db99] p-2 flex gap-4 rounded-md">
                    <MailOutlineIcon></MailOutlineIcon>
                    <input {...register('email',{required: 'поле email обязателен',pattern:{
                        value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                        message: 'email неправильный'
                    }})} type='text' placeholder="введите email" className="outline-none"></input>
                </div>
                {errors.email && <span className="text-red-500">{errors.email.message}</span>}
            </div>
            <div className="w-full">
                <div className="w-full border-2 border-[#d0d5db99] p-2 flex gap-4 rounded-md">
                    <VisibilityIcon onClick={()=>{setshow((prev)=> !prev)}}></VisibilityIcon>
                    <input {...register('password',{required: 'пароль обязателен', minLength: {
                        value: 5,
                        message: 'минимальное количество символов 5'
                    }})} type={!show ? 'password' : 'text'} placeholder="введите пароль" className="outline-none"></input>
                </div>
                {errors.password && <span className="text-red-500">{errors.password.message}</span>}
            </div>
            <button className="p-2 bg-[black] text-white w-full text-lg rounded-md">Вход</button>
            <p onClick={redirect} className=" text-sm">Если у вас нет аккаунта <span className="text-[#726bfe]">зарегестрируйтесь</span></p>
        </form>
    )
}

export default LoginModal;