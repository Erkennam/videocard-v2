import React from "react";
import { videocard } from "./videocards.ts";
import { useNavigate } from "react-router-dom";
import { setProduct } from "../slice.ts";
import { useDispatch, useSelector } from "react-redux";
import { useGetVideocards } from "../hooks/useGetVideocards.ts";
export interface Idvideocard extends videocard {
    _id?: string
}
interface props{
    product:Idvideocard;
}

const ProductComponent:React.FC<props> = ({product}:props)=>{
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {data} = useGetVideocards();
    let find = data.find((el)=> el.id == product.id);
    let price = product.price > 100000 ? String(product.price).substring(0,3) + '.' + String(product.price).substring(3) : String(product.price).substring(0,2) + '.' + String(product.price).substring(2);
    const redirect = ()=>{
        dispatch(setProduct(find));
        navigate(`/product/${product.id}`);
    }
    return(
        <div 
            onClick={redirect} 
            className='w-23 flex flex-col gap-1 shadow-sm pb-2 transition duration-300 rounded-md text-black hover:shadow-lg hover:-translate-y-2' 
            key={product.id}>
            <img className="w-full h-40 object-contain" src={product.img[0]}></img>
            <div className='flex flex-col gap-2 p-2'>
                <p>{product.name.slice(0,70)}</p>
                <div className="w-full flex justify-between">
                    <p className="text-gray-500">{product.brand}</p>
                    <p className="font-semibold text-lg">{price} ₸</p>
                </div>
            </div>
        </div>
    )
}
 
export default ProductComponent;