import React from "react";
import { useParams,useNavigate } from "react-router-dom";
import {useDispatch,useSelector} from 'react-redux';
import { videocard } from "./videocards.ts";
import TurnLeftIcon from '@mui/icons-material/TurnLeft';
import TuneIcon from '@mui/icons-material/Tune';
import Menu from "../mainPages/menu.tsx";
import ProductComponent from "./productComponent.tsx";
import { useSetFilters } from "../hooks/useSetFilter.ts";
import { fetchBrandVideocards,setFilterModal } from "../slice.ts";

const ProductsCategory:React.FC = ()=>{
    const {category} = useParams();
    const navigate = useNavigate();
    const brandProducts = useSelector((state:any)=> state.slice.brandProducts);
    const dispatch = useDispatch();
    const [value,setvalue] = React.useState<string>('');
    React.useEffect(() => {
        dispatch(fetchBrandVideocards(category))
    }, [category, dispatch]);
    const data:any = useSetFilters();
    let dats:any  = data.filter((el:videocard | any) => el.brand === category);
    const searchedProducts = dats.filter((el:videocard | any) => el.name.toLowerCase().includes(value.toLowerCase()));
    return (
        <div className="w-full flex flex-col gap-8 items-center">
            <Menu></Menu>
            <div className="w-4/5 flex flex-col gap-12">
                <div className="w-full flex justify-between">
                    <button className="text-xl flex items-center gap-3" onClick={()=>{navigate('/')}}><TurnLeftIcon></TurnLeftIcon> Назад</button>
                    <p className="text-4xl">{`Все товары ${category}`}</p>
                </div>
                <div className="w-full flex justify-between">
                    <input type="text" className="bg-[#ebedee] p-2 outline-none" value={value} onChange={(e:React.ChangeEvent<HTMLInputElement>)=>{setvalue(e.target.value)}} placeholder="Поиск товаров"></input>
                    <button className="p-2 border-2 border-black text-xl rounded-lg" onClick={()=>{dispatch(setFilterModal())}}>Фильтры <TuneIcon></TuneIcon></button>
                </div>
                {searchedProducts.length > 0 ? <div className="flex flex-wrap gap-105">{searchedProducts.map((el:any)=>{
                    return(
                        <ProductComponent product={el}></ProductComponent>
                    )
                })}</div> : <p>нет товаров подходящие под ваши параметры</p>}
            </div>
        </div>
    )
}

export default ProductsCategory;