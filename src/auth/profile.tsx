import React from "react";
import Menu from "../mainPages/menu.tsx";
import {useDispatch, useSelector} from 'react-redux';
import { useNavigate } from "react-router-dom";
import { setLoginUser } from "../slice.ts";
import { toast } from "react-toastify";
import TurnLeftIcon from '@mui/icons-material/TurnLeft';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import EastIcon from '@mui/icons-material/East';
import axios from "axios";

const Profile:React.FC = ()=>{
    const {profile,cart,favorites} = useSelector((state:any)=> state.slice);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [showCart,setShowCart] = React.useState<boolean>(false);
    const [showFavorites,setShowFavorites] = React.useState<boolean>(false);
    const logOut = ()=>{
        localStorage.removeItem('token'); 
        dispatch(setLoginUser(false));
        toast.success('Вы успешно вышли из аккаунта'); 
        navigate('/')
    }
    return(
        <div className="flex flex-col gap-12">
            <Menu></Menu>
            <div className="w-full flex flex-col gap-8 px-20">
                <div className="w-full flex justify-between">
                    <button className="text-xl flex items-center gap-3" onClick={()=>{navigate('/')}}><TurnLeftIcon></TurnLeftIcon> Назад</button>
                    <p className="text-4xl">Профиль</p>
                </div>
                <div className="flex flex-col gap-8">
                    <p className="text-xl">Имя Пользователя: {profile.username}</p>
                    <p className="text-xl">Email Пользователя: {profile.email}</p>
                </div>
                <p className="text-xl" onClick={()=>{setShowCart((prev)=> !prev)}}>Корзина {!showCart ? <KeyboardArrowDownIcon></KeyboardArrowDownIcon> : <KeyboardArrowUpIcon></KeyboardArrowUpIcon>}</p>
                {showCart && <div>{cart.length > 0 ? <div className="pl-4">{cart.map((el)=>{
                    return(
                        <p>{el.name}</p>
                    )
                })}</div> : <p>Ваша корзина пуста</p>}</div>}
                <p className="text-xl" onClick={()=>{setShowFavorites((prev)=> !prev)}}>Избранное {!showFavorites ? <KeyboardArrowDownIcon></KeyboardArrowDownIcon> : <KeyboardArrowUpIcon></KeyboardArrowUpIcon>}</p>
                {showFavorites && <div>{favorites.length > 0 ? <div className="pl-4">{favorites.map((el)=>{
                    return(
                        <p>{el.name}</p>
                    )
                })}</div> : <p>У вас нет избранных товаров</p>}</div>}
                <p onClick={()=>{navigate('/orders')}} className="text-xl">История заказов <EastIcon></EastIcon></p>
                <p onClick={logOut} className="cursor-pointer text-xl">Выйти из акаунта</p>
            </div>
        </div>
    )
}

export default Profile;