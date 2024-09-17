import React from "react";
import CloseIcon from '@mui/icons-material/Close';
import { useDispatch } from "react-redux";
import { setFilterModal } from "../slice.ts";
import FilterComponent from "./filterComponent.tsx";
import { useParams } from "react-router-dom";
interface difference{
    min: number,
    max: number,
}
export interface filterOption{
    name:string,
    value: any[] | difference | any,
    key: string,
}

const filtersOption:filterOption[] = [
    {name: 'Бренды',value: ['colorful','asus','AMD Radeon','gigabyte','palit','peladn','zotac'],key: 'brand'},
    {name: 'Цена', value: {max: 541767,min: 135000},key: 'price'},
    {name: 'Сортировка', value: ['по умолчанию', 'по возрастанию', 'по убыванию'],key: 'sort'},
    {name: 'по памяти', value: [8192, 6144, 12288, 16384],key: 'memory'},
    {name: 'частота видео', value: [14000, 16000, 21000, 15000],key: 'videoFrequency'},
    {name: 'производительность', value: {max: 2670,min: 1552},key: 'frequency'},
    {name: 'потребление энергии', value: {max: 265,min: 115},key: 'energy'},
]

const FilterModal:React.FC = ()=>{
    const dispatch = useDispatch();
    const {category} = useParams();
    return(
        <div className="w-1/3 h-full capitalize bg-white absolute right-0 overflow-auto scrollbar-hide">
            <div className="w-full flex justify-between border-b-2 p-3 border-[#d0d5db99]">
                <p className="text-2xl">фильтры</p>
                <button onClick={()=>{dispatch(setFilterModal())}}><CloseIcon></CloseIcon></button>
            </div>
            <div className="w-full flex flex-col p-3 gap-6">{filtersOption.map((el:filterOption)=>{
                return(
                    <FilterComponent filterParam={el}></FilterComponent>
                )
            })}</div>
        </div>
    )
}

export default FilterModal;