import React from "react";
import DoneIcon from '@mui/icons-material/Done';
import {useDispatch} from 'react-redux';
import { setSuccesModal } from "../slice.ts";
import { useNavigate } from "react-router-dom";

const SuccessModal:React.FC = ()=>{
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const redirect = ()=>{
        dispatch(setSuccesModal())
        navigate('/');
    }
    return(
        <div className="w-1/4 h-2/6 bg-white rounded-xl flex items-center flex-col gap-5 overflow-hidden px-3">
            <DoneIcon style={{ fontSize: '100px' }}></DoneIcon>
            <p>оплата произведена</p>
            <button className="w-full bg-black p-2 text-white rounded-lg" onClick={redirect}>Подтвердить</button>
        </div>
    )
}

export default SuccessModal;