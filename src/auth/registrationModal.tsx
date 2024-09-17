import React from "react";
import CloseIcon from '@mui/icons-material/Close';
import { useForm } from "react-hook-form";
import {useDispatch} from 'react-redux';
import { setRegistrationModal,setLoginModal } from "../slice.ts";
import axios from "axios";
import { toast } from "react-toastify";
export interface user{
    username: string,
    password: string,
    email: string,
}

const RegistrationModal:React.FC = ()=>{
    const {register,handleSubmit,formState: {errors},reset} = useForm<user>();
    const dispatch = useDispatch();
    const redirect = ()=>{
        dispatch(setRegistrationModal());
        dispatch(setLoginModal());
    }
    const submit = (data)=>{
        axios.post('http://localhost:3001/api/users',data)
        .then((resp)=> toast.success('успешно зарегестрированно'))
        .catch((err)=> toast.error('ошибка регистрации'))
    }
    return(
        <div className="w-3/6 bg-white h-65 rounded-xl flex overflow-hidden">
            <img className="w-1/2 h-65 object-cover" src="https://a-static.besthdwallpaper.com/asus-rog-republic-of-gamers-rog-strix-wallpaper-3840x2160-63805_54.jpg"></img>
            <div className="w-1/2 h-full overflow-auto">
                <div className="w-full flex justify-between items-center p-4 px-5">
                    <p className="text-3xl">Регистрация</p>
                    <button onClick={()=>{dispatch(setRegistrationModal())}}><CloseIcon></CloseIcon></button>
                </div>
                <form onSubmit={handleSubmit(submit)} className="w-full p-4 pl-5 flex flex-col gap-7 pr-8">
                    <div>
                        <input {...register('username',{required: 'это поле обязательно',minLength: {
                            value: 4,
                            message: 'минимальное кол-во символов'
                        }})} placeholder='Введите имя' className="p-2 w-full border-2 border-[#d0d5db99] rounded-md outline-[#726bfe]"></input>
                        {errors.username && <span className="text-red-500">{errors.username.message}</span>}
                    </div>
                    <div>
                        <input {...register('password',{required: 'пароль обязателен', minLength: {
                            value: 5,
                            message: 'минимальное количество символов 5'
                        }})} placeholder='Введите пароль' className="p-2 w-full border-2 border-[#d0d5db99] rounded-md outline-[#726bfe]"></input>
                        {errors.password && <span className="text-red-500">{errors.password.message}</span>}
                    </div>
                    <div>
                        <input {...register('email',{required: 'поле email обязателен',pattern:{
                            value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                            message: 'email неправильный'
                        }})} placeholder='Введите email' className="p-2 w-full border-2 border-[#d0d5db99] rounded-md outline-[#726bfe]"></input>
                        {errors.email && <span className="text-red-500">{errors.email.message}</span>}
                    </div>
                    <div className="flex flex-col gap-3">
                        <input type="submit" className="w-2/3 p-2 bg-[#726bfe] text-white border-2 border-[#726bfe] rounded-lg transition duration-150 hover:bg-transparent hover:text-[#726bfe]"></input>
                        <p onClick={redirect} className="mb-5">если у вас есть аккаунт <span className="text-[#726bfe]">Авторизуйтесь</span></p>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default RegistrationModal;