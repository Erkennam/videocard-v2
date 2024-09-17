import React from "react";
import Menu from "./menu.tsx";
import TurnLeftIcon from '@mui/icons-material/TurnLeft';
import TuneIcon from '@mui/icons-material/Tune';
import { videocard, videocards } from "../products/videocards.ts";
import ProductComponent from "../products/productComponent.tsx";
import { useNavigate,useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setFilterModal, setPageProduct, setPage, fetchVideocards} from "../slice.ts";
import { useSetFilters } from "../hooks/useSetFilter.ts";

const Products:React.FC = ()=>{
    const navigate = useNavigate();
    const {category} = useParams();
    const page = useSelector((state:any)=> state.slice.page);
    const dispatch = useDispatch();
    const [value,setvalue] = React.useState<string>('');
    const fetchData = async ()=>{
        await dispatch(fetchVideocards(page));
    }
    React.useEffect(() => {
        fetchData();
    }, [page, dispatch]);
    const data:any = useSetFilters();
    let dats:any  = Array.isArray(data) ? (category ? data.filter((el: videocard) => el.brand === category) : data) : [];
    const searchedProducts = Array.isArray(dats) ? dats.filter((el: videocard) => el.name.toLowerCase().includes(value.toLowerCase())) : [];
    return(
        <div className="w-full flex flex-col gap-8 items-center">
            <Menu></Menu>
            <div className="w-4/5 flex flex-col gap-12">
                <div className="w-full flex justify-between">
                    <button className="text-xl flex items-start gap-3" onClick={()=>{navigate('/')}}><TurnLeftIcon></TurnLeftIcon> Назад</button>
                    <p className="text-4xl">{!category ? 'Все товары' : `Все товары ${category}`}</p>
                </div>
                <div className="w-full flex justify-between">
                    <input type="text" className="bg-[#ebedee] p-2 outline-none" value={value} onChange={(e:React.ChangeEvent<HTMLInputElement>)=>{setvalue(e.target.value)}} placeholder="Поиск товаров"></input>
                    <button className="p-2 border-2 border-black text-xl rounded-lg" onClick={()=>{dispatch(setFilterModal())}}>Фильтры <TuneIcon></TuneIcon></button>
                </div>
                {searchedProducts.length > 0 ? <div className="flex flex-wrap gap-7">{searchedProducts.map((el:any)=>{
                    return(
                        <ProductComponent product={el}></ProductComponent>
                    )
                })}</div> : <p>нет товаров подходящие под ваши параметры</p>}
                <div className="w-full flex justify-center gap-6">
                    {Array.from({length: 2}, (_,i)=> i + 1).map((el)=>{
                        return (
                            <div className={`${page == el && 'text-[#726bfe]'}`} onClick={()=>{dispatch(setPage(el))}}>{el}</div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

export default Products;