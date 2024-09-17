import React from "react";
import Menu from "../mainPages/menu.tsx";
import TurnLeftIcon from '@mui/icons-material/TurnLeft';
import { useNavigate } from "react-router-dom";
import { videocards,videocard } from "../products/videocards.ts";
import DoneAllIcon from '@mui/icons-material/DoneAll';
interface competition {
    compare1: videocard | any,
    compare2: videocard | any,
}

const Competition:React.FC = ()=>{
    const navigate = useNavigate();
    const [compare,setcompare] = React.useState<competition>({
        compare1: '',
        compare2: '',
    })
    const findElement = (val:string)=>{
        return videocards.find((el:videocard)=> el.name == val);
    }
    const empty = Object.values(compare).some((el)=> el == '');
    const {compare1,compare2} = compare;
    const compareList = ()=>{
        const compares = {
            price: compare1.price < compare2.price ? compare1.price : compare2.price,
            frequency: compare1.frequency < compare2.frequency ? compare2.frequency : compare1.frequency,
            memory: compare1.memory < compare2.memory ? compare2.memory : compare1.memory,
            videoFrequency: compare1.videoFrequency < compare2.videoFrequency ? compare2.videoFrequency : compare1.videoFrequency,
            energy: compare1.energy < compare2.energy ? compare2.energy : compare1.energy,
        }
        return compares;
    }
    const progressBar:any = (compare:any)=>{
        let properties = ['frequency', 'memory', 'videoFrequency', 'energy'];
        let maxed = properties.reduce((acc:any,el:any)=>{
            acc[el] = Math.max(...videocards.reduce((acc:any,le:any)=> [...acc,le[el]],[]));
            return acc;
        },{});
        const sum = properties.reduce((acc,el)=> {
            acc[el] = Math.floor((compare[el] / maxed[el]) * 100);
            return acc;
        },{});
        let per:number | any = Object.values(sum).reduce((acc: any, el: any) => acc + el, 0);
        return Math.floor(per / properties.length);
    }
    let compares = compareList();
    console.log(Object.values(compare))
    return(
        <div className="w-full flex flex-col gap-6">
            <Menu></Menu>
            <div className="px-20 flex flex-col w-full gap-10">
                <div className="w-full flex justify-between">
                    <button className="text-xl flex items-center gap-3" onClick={()=>{navigate('/')}}><TurnLeftIcon></TurnLeftIcon> Назад</button>
                    <p className="text-4xl">Cравнение</p>
                </div>
                <div className="w-full flex gap-6">
                    {Object.keys(compare).map((el)=>{
                        return(
                            <select onChange={(e:React.ChangeEvent<HTMLSelectElement>)=>{setcompare((prev)=> ({...prev,[el]: findElement(e.target.value)}))}} className="w-1/2 p-2 border-2 rounded-md border-[#7c70e0] outline-none" name={el}>
                                {videocards.map((el:videocard)=>{
                                    return(
                                        <option>{el.name}</option>
                                    )
                            })}</select>
                        )
                    })}
                </div>
                <div className="w-full">
                    {!empty ? <div className="w-full flex justify-between">{Object.values(compare).map((el)=>{
                        return(
                            <div className="flex flex-col gap-6">
                                <div className="text-xl flex flex-col capitalize gap-2">
                                    <p className="flex gap-8">цена: {el.price} {el.price == compares.price && <DoneAllIcon></DoneAllIcon>}</p>
                                    <p className="flex gap-8">частота: {el.frequency} {el.frequency == compares.frequency && <DoneAllIcon></DoneAllIcon>}</p>
                                    <p className="flex gap-8">память: {el.memory} {el.memory == compares.memory && <DoneAllIcon></DoneAllIcon>}</p>
                                    <p className="flex gap-8">видео частота: {el.videoFrequency} {el.videoFrequency == compares.videoFrequency && <DoneAllIcon></DoneAllIcon>}</p>
                                    <p className="flex gap-8">потребление энергии: {el.energy} {el.energy == compares.energy && <DoneAllIcon></DoneAllIcon>}</p>
                                </div>
                                <div className="w-full flex flex-col gap-3">
                                    <div className="flex gap-3 text-xl">
                                        <p>Процент эффективнности:</p>
                                        <p>{progressBar(el)} %</p>
                                    </div>
                                    <div className="w-full h-6 border-2 rounded-lg border-[#7c70e0] overflow-hidden">
                                        <div className="bg-[#7c70e0] h-full" style={{width: `${progressBar(el)}%`}}></div>
                                    </div>
                                </div>
                            </div>
                        )
                    })}</div>
                    : <p>Выберите видеокарты для сравнения</p>}
                </div>
            </div>
        </div>
    )
}

export default Competition;