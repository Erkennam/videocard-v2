import React from "react";
import { useSelector,useDispatch } from "react-redux";
import Menu from "../mainPages/menu.tsx";
import { deleteFromCart,setSuccesModal,setCountOfItem } from "../slice.ts";
import DeleteIcon from '@mui/icons-material/Delete';
import { toast } from "react-toastify";
import { videocard } from "../products/videocards.ts";
import { useNavigate } from "react-router-dom";
export interface cartItem extends videocard {
    count: number
}

const CartPage:React.FC = ()=>{
    const {cart,profile} = useSelector((state:any)=> state.slice);
    const navigate = useNavigate();
    let sum = cart.reduce((acc:{[key:string]: number},el:cartItem)=> {
        acc.sum+= el.count * el.price;
        acc.count += el.count;
        return acc;
    },{sum:0,count:0});
    const dispatch = useDispatch();
    const submit = ()=>{
        if(cart.length == 0) {
            toast("ваша корзина пуста");
        } else if (!profile){
            toast("вы не авторизованы");
        } else {
            navigate('/delivery');
        }
    }
    return(
        <div className="w-full flex flex-col gap-10">
            <Menu></Menu>
            <div className="px-20 flex w-full justify-between gap-10">
                <div className="w-3/4">
                    <div className="w-full flex justify-between border-b-2 text-xl pb-4 border-[#d0d5db99]">
                        <p>Корзина</p>
                        {cart.length > 0 && <p>Товары {cart.length}</p>}
                    </div>
                    {cart.length > 0 ? <div className="w-full flex flex-col gap-5 pt-4">{cart.map((el:cartItem,i:number)=>{
                        return(
                            <div className="w-full flex items-center">
                                <div className="flex gap-12">
                                    <img src={el.img[0]} className="w-34 h-20"></img>
                                    <div className="w-1/3 text-wrap">
                                        <p>{el.name.length > 50 && el.name.slice(0,50) + '...'}</p>
                                        <p>{el.brand}</p>
                                    </div>
                                    <div className="w-full flex gap-20">
                                        <div className="flex flex-col items-center gap-3">
                                            <p>Кол-во</p>
                                            <div className="flex gap-2 cursor-pointer">
                                                <p onClick={()=>{dispatch(setCountOfItem([i,'decrement']))}}>-</p>
                                                <p>{el.count}</p>
                                                <p onClick={()=>{dispatch(setCountOfItem([i,'increment']))}}>+</p>
                                            </div>
                                        </div>
                                        <div className="flex flex-col items-center gap-3">
                                            <p>Цена</p>
                                            <p>{String(el.price).substring(0,3) + '.' + String(el.price).substring(3)} ₸</p>
                                        </div>
                                        <div className="flex flex-col items-center gap-3">
                                            <p>Итого</p>
                                            <p>{String(el.price * el.count).substring(0,3) + '.' + String(el.price * el.count).substring(3)} ₸</p> 
                                        </div>
                                        <button className="h-0 p-2" onClick={()=>{dispatch(deleteFromCart(el.id))}}>
                                            <DeleteIcon></DeleteIcon>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )
                    })}</div> : <p className="pt-4">Ваша корзина пуста</p>}
                </div>
                <div className={`w-1/4 ${cart.length > 0 ? 'h-[15rem]' : 'h-[10rem]'} border-2 border-[#d0d5db99] p-3 flex flex-col gap-4`}>
                    <p>Итоги</p>
                    {cart.length > 0 ? <div className="w-full flex justify-between">
                        <p>Кол во товаров:</p>
                        <p>{sum.count}</p>
                    </div> : <p>Ваша корзина пуста</p>}
                    {cart.length > 0 && <div className="w-full flex justify-between">
                        <p>Доставка:</p>
                        <p>1.500 ₸</p>                        
                    </div>}
                    {cart.length > 0 && <div className="w-full flex justify-between">
                        <p>Итоги</p>
                        <p>{sum.sum + 1500} ₸</p>                   
                    </div>}
                    <button className="w-full p-2 bg-[#726bfe] text-white" onClick={submit}>Оплатить</button>
                </div>
            </div>
        </div>
    )
}

export default CartPage;