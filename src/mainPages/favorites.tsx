import React from "react";
import Menu from "./menu.tsx";
import { videocard } from "../products/videocards.ts";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import TurnLeftIcon from '@mui/icons-material/TurnLeft';
import ProductComponent from "../products/productComponent.tsx";
import { Idvideocard } from "../products/productComponent.tsx";

const Favorites:React.FC = ()=>{
    const {favorites} = useSelector(({slice}:any)=> slice);
    const navigate = useNavigate();
    return(
        <div className="w-full flex flex-col gap-6">
            <Menu></Menu>
            <div className="px-20 flex w-full flex-col gap-8">
                <div className="w-full flex justify-between">
                    <button className="text-xl flex gap-3 items-center" onClick={()=>{navigate('/')}}><TurnLeftIcon></TurnLeftIcon> Назад</button>
                    <p className="text-4xl">Избранное</p>
                </div>
                <div className="w-full flex flex-wrap gap-105">
                    {favorites.length > 0 ? favorites.map((el:Idvideocard)=>{
                        return(
                            <ProductComponent product={el}></ProductComponent>
                        )
                    }) : <p>У вас нет избранных товаров</p>}
                </div>
            </div>
        </div>
    )
}

export default Favorites;