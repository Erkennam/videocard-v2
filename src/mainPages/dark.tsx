import React from "react";
import { useSelector } from "react-redux";
import FilterModal from "../filters/FilterModal.tsx";
import RegistrationModal from "../auth/registrationModal.tsx";
import LoginModal from "../auth/loginModal.tsx";
import SuccessModal from "../delivery/succesModal.tsx";

const Dark:React.FC = ()=>{
    const {filterModal,registrationModal,loginModal,succes,gallery} = useSelector((state:any)=> state.slice);
    return(
        <div className="fixed w-full h-full flex justify-center items-center bg-black bg-opacity-60 z-50">
            {filterModal && <FilterModal></FilterModal>}
            {registrationModal && <RegistrationModal></RegistrationModal>}
            {loginModal && <LoginModal></LoginModal>}
            {succes && <SuccessModal></SuccessModal>}
        </div>
    )
}

export default Dark;