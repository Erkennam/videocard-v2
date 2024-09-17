import React from "react";
import { useNavigate } from "react-router-dom";
import { useSelector,useDispatch } from "react-redux";
import TurnLeftIcon from '@mui/icons-material/TurnLeft';
import Menu from "../mainPages/menu.tsx";
import { useGetTime } from "../hooks/useGetTime.ts";
import { cities } from "../products/videocards.ts";
import { expirationDates } from "../products/videocards.ts";
import { setSuccesModal } from "../slice.ts";
import { useForm } from "react-hook-form";
import axios from "axios";
import { toast } from "react-toastify";
interface options{
    fullname: string,
    phone: string,
    email: string,
    city: string,
    address: string,
    cardHolder: string,
    cardNumber: string,
    cvv: string,
    expire: string,
}

const DeliveryOptions:React.FC = ()=>{
    const {cart,profile} = useSelector((state:any)=> state.slice);
    const getTime = useGetTime();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {handleSubmit,register,formState:{errors}} = useForm<options>();
    const submit = (data)=>{
        console.log(data);
        const order = {
            username: profile.email,
            orders: cart,
            date: getTime(),
        }
        axios.post('http://localhost:3001/api/orders',order)
        .then((resp)=> console.log(resp.data))
        .catch((err)=> toast('ошибка'));
        toast('заказ успешно принят');
        dispatch(setSuccesModal());
    }
    const [current,setCurrent] = React.useState<string | any>(cities[0].city);
    const {addresses}:any = cities.find((el:any)=> el.city == current);
    return(
        <div className="w-full flex flex-col gap-10">
            <Menu></Menu>
            <div className="px-20 w-full gap-10 flex flex-col">
                <div className="w-full flex justify-between">
                    <button className="text-xl flex items-center gap-3" onClick={()=>{navigate('/')}}><TurnLeftIcon></TurnLeftIcon> Назад</button>
                    <p className="text-4xl">Оплата и Доставка</p>
                </div>
                <form className="w-full flex gap-16" onSubmit={handleSubmit(submit)}>
                    <div className="w-2/6 flex flex-col gap-6">
                        <p className="text-3xl">Адрес</p>
                        <input {...register('fullname',{minLength:{
                            value: 4,
                            message: 'минимум 4 символа',
                        }})} className="w-full p-2 border-2 border-[#d0d5db99]" type="text" placeholder="Введите имя"></input>
                        {errors.fullname && <p>{errors.fullname.message}</p>}
                        <input {...register('phone',{pattern:{
                            value: /^((\+7|8)(7|6)\d{9})$/,
                            message: 'не правильно написанный номер'
                        }})} className="w-full p-2 border-2 border-[#d0d5db99]" type="text" placeholder="Введите номер телефона"></input>
                        {errors.phone && <p>{errors.phone.message}</p>}
                        <input {...register('email',{pattern:{
                            value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                            message: 'не валидный email'
                        }})} className="w-full p-2 border-2 border-[#d0d5db99]" type="text" placeholder="Введите email"></input>
                        {errors.email && <p>{errors.email.message}</p>}
                        <div className="w-full flex gap-3">
                            <select {...register('city')} onChange={(e:React.ChangeEvent<HTMLSelectElement>)=>{setCurrent(e.target.value)}} className="w-1/2 p-2 border-2 border-[#d0d5db99]">{cities.map((el)=>{
                                return (
                                    <option>{el.city}</option>
                                )
                            })}</select>
                            <select {...register('address')} className="w-1/2 p-2 border-2 border-[#d0d5db99]">{addresses.map((el)=>{
                                return(
                                    <option>{el}</option>
                                )
                            })}</select>
                        </div>
                        <input type="submit" className="w-2/4 p-2 bg-[#726bfe] text-white" value={'Подтвердить'}></input>
                    </div>
                    <div className='w-4/6 flex flex-col gap-6'>
                        <p className="text-3xl">Метод оплаты</p>
                        <input {...register('cardHolder',{minLength:{
                            value: 4,
                            message: 'минимум 4 символа'
                        }})} type="text" className="w-full p-2 border-2 border-[#d0d5db99]" placeholder="Имя пользователя карты"></input>
                        {errors.cardHolder && <p>{errors.cardHolder.message}</p>}
                        <input {...register('cardNumber',{pattern:{
                            value: /^\d{4}[\s-]?\d{4}[\s-]?\d{4}[\s-]?\d{4}$/,
                            message: 'не валидный номер карты'
                        }})} type="text" className="w-full p-2 border-2 border-[#d0d5db99]" placeholder="Номер карты"></input>
                        {errors.cardNumber && <p>{errors.cardNumber.message}</p>}
                        <div className="w-full flex gap-3">
                            <input {...register('cvv',{pattern: {
                                value: /^\d{3,4}$/,
                                message: 'не валидный cvv'
                            }})} type="text" className="w-1/3 p-2 border-2 border-[#d0d5db99]" placeholder="CVV"></input>
                            {errors.cvv && <p>{errors.cvv.message}</p>}
                            <select {...register('expire')} className="w-2/3 p-2 border-2 border-[#d0d5db99]">{expirationDates.map((el)=>{
                                return(
                                    <option>{el}</option>
                                )
                            })}</select>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default DeliveryOptions;