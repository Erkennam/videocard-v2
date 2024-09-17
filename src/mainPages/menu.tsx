import React from "react";
import { useNavigate } from "react-router-dom";
import {useDispatch,useSelector} from 'react-redux';
import { setRegistrationModal } from "../slice.ts";
interface menuComponent {
    name: string,
    path: string,
    func?: ()=> void | any,
}

const Menu:React.FC = ()=>{
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {profile} = useSelector((state:any)=> state.slice);
    const menucomponents:menuComponent[] = [
        {
            name: 'главная',
            path: 'main',
            func: ()=>{navigate('/')},
        },
        {
            name: 'купить',
            path: 'products',
            func: ()=>{navigate('/products')},
        },
        {
            name: 'избранное',
            path: 'favorites',
            func: ()=>{navigate('/favorites')},
        },
        {
            name: 'сравнение',
            path: 'competition',
            func: ()=>{navigate('/competition')},
        },
        {
            name: 'корзина',
            path: 'cart-page',
            func: ()=>{navigate('/cart')},
        },
        {
            name: profile ? 'профиль' : 'регистрация',
            path: 'tech',
            func: profile ? ()=>{navigate('/profile')} : ()=>{dispatch(setRegistrationModal())},
        },
        ]
    return(
        <nav className="p-4 px-12 w-full flex justify-between ">
            <h1 className="text-2xl font-semibold cursor-pointer hover:text-[#726bfe]" onClick={()=>{navigate('/')}}>Frame Forge</h1>
            <ul className="flex gap-6">{menucomponents.map((el)=>{
                return(
                    <li className="cursor-pointer text-lg capitalize hover:text-[#726bfe]" onClick={el.func} key={el.name}>{el.name}</li>
                )
            })}
            </ul>
        </nav>
    )
}

export default Menu