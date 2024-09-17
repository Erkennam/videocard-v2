import React from "react";
import Menu from "./menu.tsx";
import { brand,brands } from "../products/brands.ts";
import BestProducts from "../products/best.products.tsx";
import { useGetVideocards } from "../hooks/useGetVideocards.ts";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchUser } from "../slice.ts";
import { setPageProduct,fetchVideocards } from "../slice.ts";
import { videocard } from "../products/videocards.ts";

const Main:React.FC = ()=>{
    const navigate = useNavigate();
    const dispatch = useDispatch();
    React.useEffect(()=>{
        dispatch(fetchVideocards(1))
    },[])
    return(
        <div className="flex flex-col gap-12">
            <Menu></Menu>
            <div className="px-20 flex w-full justify-between">
                <div className=" flex flex-col gap-6 w-1/2 text-wrap pt-6">
                    <h1 className="text-5xl font-bold">Исследуйте мир <br></br> видеокарт</h1>
                    <p className="text-lg">Узнайте больше о самых новых моделях видеокарт, их <br></br> характеристиках, производителях и технологиях, которые <br></br> меняют ваш игровой и рабочий опыт.</p>
                    <button onClick={()=>{navigate('/products')}} className="bg-[#726bfe] w-1/3 p-3 text-xl duration-400 transition font-bold text-white rounded-xl hover:bg-custom-gradient">К покупкам</button>
                </div>
                <video className="w-1/2 rounded-2xl" loop autoPlay muted controls={false}>
                    <source src="animation0001-0200.mp4"></source>
                </video>
            </div>
            <div className="w-full px-20 flex flex-col items-center gap-12">
                <h1 className=" text-2xl">Бренды</h1>
                <div className="flex gap-8 w-full">{brands.map((el:brand)=>{
                    return(
                        <div onClick={()=>{navigate(`/products/${el.name}`)}} className=" flex flex-col items-center w-1/4 p-2 border-2 border-black uppercase rounded-lg hover:text-[#726bfe] hover:bg-custom-gradient hover:border-[#726bfe]">
                            <p>{el.name}</p>
                        </div>
                    )
                })}</div>
            </div>
            <BestProducts></BestProducts>
        </div>
    )
}

export default Main