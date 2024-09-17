import React from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { videocard } from '../products/videocards.ts';

export const useSetFilters = () => {
    const {category} = useParams();
    const { filterParams: param,} = useSelector((state: any) => state.slice);
    const {pageProduct: videocards = [],brandProducts = []} = useSelector((state:any)=> state.slice); 
    const [data, setData] = React.useState<videocard[]>(category ? videocards : brandProducts);
    const { sort, ...params } = param;
    delete params.sort;
    const applyFilters = () => {
        let filteredData: videocard[] = Array.isArray(videocards) ? videocards : [];
        Object.keys(params).forEach((param) => {
            if (Array.isArray(params[param])) {
                filteredData = filteredData.filter((item) => {
                    if (params[param].length === 0) {
                        return true;
                    } else {
                        return params[param].includes(item[param]);
                    }
                });
            } else {
                filteredData = filteredData.filter((item) => {
                    if (params[param] === '') {
                        return true;
                    } else {
                        return item[param] >= params[param];
                    }
                });
            }
        });
        if (sort === 'по возрастанию') {
            filteredData.sort((a, b) => a.price - b.price);
        } else if (sort === 'по убыванию') {
            filteredData.sort((a, b) => b.price - a.price);
        }

        setData(filteredData);
    };

    React.useEffect(() => {
        applyFilters();
    }, [params, sort, videocards]);
    if(!videocards){
        return 'ошибка'
    }
    return data;
};
