import React from "react"
import axios from "axios";
import { videocard } from "../products/videocards.ts";

export const useGetVideocards = ()=>{
    const [data, setData] = React.useState<videocard[]>([]);
    const [loading, setLoading] = React.useState<boolean>(true);
    React.useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:3001/api/videocards');
                console.log('Videocards loaded:', response.data); 
                setData(response.data);
                setLoading(false);
            } catch (err) {
                console.error('Ошибка при загрузке видеокарт:', err);
                setLoading(false);
            }
        };
        fetchData();
    }, []);
    return { data, loading };
}