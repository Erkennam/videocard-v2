import React from "react";
import Menu from "../mainPages/menu.tsx";
import TurnLeftIcon from '@mui/icons-material/TurnLeft';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Order from "./order.tsx";

const Orders:React.FC = ()=>{
    const [orders,setOrders] = React.useState([]);
    const navigate = useNavigate();
    const profile = useSelector((state:any)=> state.slice.profile);
    const fetchData = async ()=>{
        try{
            const response = await axios.get(`http://localhost:3001/api/orders/${profile.email}`);
            setOrders(response.data);
        } catch (err) {
            console.log(err.data);
        }
    }
    React.useEffect(()=>{
        fetchData();
    },[])
    return(
        <div className="flex flex-col gap-12">
            <Menu></Menu>
            <div className="w-full flex flex-col gap-10 px-20">
                <div className="w-full flex justify-between">
                    <button className="text-xl flex items-center" onClick={()=>{navigate('/profile')}}><TurnLeftIcon></TurnLeftIcon> назад</button>
                    <p className="text-4xl">История заказов</p>
                </div>
                <div className="flex flex-col gap-4">{orders.map((el:any,i)=>{
                    return (
                        <Order index={i} orderInfo={el}></Order>
                    )
                })}</div>
            </div>
        </div>
    )
} 

export default Orders;