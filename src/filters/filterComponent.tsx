import React, { useRef } from "react";
import { filterOption } from "./FilterModal.tsx";
import {useDispatch,useSelector} from 'react-redux'
import { setFilterParam } from "../slice.ts";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { useParams } from "react-router-dom";
interface props{
    filterParam: filterOption,
}

const FilterComponent:React.FC<props> = ({filterParam}:props)=>{
    const [open,setopen] = React.useState<boolean>(false);
    const dispatch = useDispatch();
    const arr = Array.isArray(filterParam.value);
    const [range,setrange] = React.useState(0);
    const param = useSelector((state:any)=> state.slice.filterParams);
    const changesFilterParam = (val:string | any)=>{
        setrange(val);
        dispatch(setFilterParam([filterParam.key,val]));
    }
    return(
        <div className="w-full">
            <div className="w-full flex justify-between">
                <p className="text-lg cursor-pointer">{filterParam.name}</p>
                <button onClick={()=>{setopen((prev)=> !prev)}}>{open ? <KeyboardArrowUpIcon></KeyboardArrowUpIcon> : <KeyboardArrowDownIcon></KeyboardArrowDownIcon>}</button>
            </div>
            {open && <div className="flex flex-col gap-2 pt-5">
                {arr ? filterParam.value.map((el)=>{
                    return(
                        <div className="flex items-center gap-4 cursor-pointer" onClick={()=>{changesFilterParam(el)}}>{el} {param[filterParam.key].includes(el) && <div className="w-2 h-2 bg-black rounded-full"></div> || param[filterParam.key] == filterParam.value  && <div className="w-4 h-4 bg-black rounded-full"></div>}</div>
                    )
                }) : <div>
                    <p>{range}</p>
                    <input type="range" max={filterParam.value.max} min={filterParam.value.min} value={range} onChange={(e:React.ChangeEvent<HTMLInputElement>)=>{changesFilterParam(e.target.value)}}></input>
                </div>}
            </div>}
        </div>
    )
}

export default FilterComponent;