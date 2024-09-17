import React from "react";
import { videocard,videocards } from "./videocards.ts";
import ProductComponent from "./productComponent.tsx";
import { useNavigate } from "react-router-dom";

const BestProducts:React.FC = ()=>{
    const dots = videocards.length / 4;
    const navigate = useNavigate();
    const [num,setnum] = React.useState<number>(1);
    const slice = (x:number)=>{
        return videocards.slice((x-1) * 4, x * 4);
    }
    const current = slice(num);
    return(
        <div className="w-full flex flex-col items-center gap-12 text-white">
            <div className="w-full flex justify-between px-20">
                <p className="text-black text-2xl">Популярные товары</p>
                <button className="p-3 bg-[#7c70e0] text-white rounded-lg hover:bg-custom-gradient" onClick={()=>{navigate('/products')}}>Смотреть все</button>
            </div>
            <div className="w-full flex gap-7 px-20">{current.map((el:videocard)=>{
                return(
                    <ProductComponent product={el}></ProductComponent>
                )
            })}</div>
            <div className="flex gap-4">{Array.from({length: dots},(_,i)=> i + 1).map((el)=>{
                return(
                    <div onClick={()=>{setnum(el)}} className={`rounded-xl ${el === num ? 'border-b-8 border-[#726bfe]' : ' border-b-8 border-black'} px-3`}></div>
                )
            })}</div>
        </div>
    )
}

export default BestProducts;