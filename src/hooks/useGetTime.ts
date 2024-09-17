import React from "react";

export const useGetTime = ()=>{
    const getTime = ()=>{
        const now = new Date();
        const year = now.getFullYear();
        const month = String(now.getMonth() + 1).padStart(2, '0');
        const day = String(now.getDate()).padStart(2, '0');
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
        const seconds = String(now.getSeconds()).padStart(2, '0');
        const dateTimeString = `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
        return dateTimeString;
    }
    return getTime;
}