import React from "react";
import { cartItem } from "./cartPage";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
interface props {
    index:number,
    orderInfo: any,
}

const Order:React.FC<props> = ({index,orderInfo}:props)=>{
    const [show,setShow] = React.useState<boolean>(false);
    const {orders} = orderInfo;
    const sum = orders.reduce((acc:number,el:cartItem)=> acc + (el.price * el.count),1500);
    return(
        <div>
            <div className="w-full flex gap-6 text-lg">
                <p>Дата {orderInfo.date}</p>
                <p>{index + 1} заказ</p>
                <p>кол-во товаров: {orders.length}</p>
                <p>сумма заказов: {sum} тг</p>
                <p onClick={()=>{setShow((prev)=> !prev)}}>посмотреть {!show ? <KeyboardArrowDownIcon></KeyboardArrowDownIcon> : <KeyboardArrowUpIcon></KeyboardArrowUpIcon>}</p>
            </div>
            {show && <div className="pl-6 pt-4">{orders.length && orders.map((el:cartItem)=>{
                return(
                    <p>{el.name}</p>
                )
            })}</div>}
        </div>
    )
}

export default Order;