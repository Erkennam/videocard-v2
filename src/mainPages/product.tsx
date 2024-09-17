import React from "react";
import { useParams } from "react-router-dom";
import { videocard } from "../products/videocards.ts";
import { useDispatch,useSelector } from "react-redux";
import { addToCart,toggleFavorite,fetchIdVideocard } from "../slice.ts";
import { useGetTime } from "../hooks/useGetTime.ts";
import StarBorderOutlinedIcon from '@mui/icons-material/StarBorderOutlined';
import StarIcon from '@mui/icons-material/Star';
import Menu from "./menu.tsx";
import DeleteIcon from '@mui/icons-material/Delete';
import axios from "axios";
import { useGetVideocards } from "../hooks/useGetVideocards.ts";
import { toast } from "react-toastify";

const Product:React.FC = ()=>{
    const {id} = useParams();
    const dispatch = useDispatch();
    const {data:videocards,loading} = useGetVideocards();
    const {profile,product} = useSelector((state:any)=> state.slice);
    const containFavorite = useSelector((state:any)=> state.slice.favorites).some((el:videocard)=> el.id == product.id);
    const [review,setReview] = React.useState({
        product_Id: id,
        sender_Id: '',
        time: '',
        message: '',
        rating: 1
    })
    const [text,setText] = React.useState('');
    const onChangeReview = (field:string,value:any)=>{
        setReview((prev)=> ({...prev,[field]:value}));
    }
    const addToCarts:any = ()=>{
        dispatch(addToCart({...product,count: 1}));
        toast('товар добавлен в корзину');
    }
    const [reviews,setReviews] = React.useState<any>([]);
    const fetchData = async () => {
        try {
            const response = await axios.get(`http://localhost:3001/api/reviews/${product.id}`);
            setReviews(response.data);
        } catch (error) {
            console.log('ошибка');
        }
    };
    React.useEffect(()=>{
        dispatch(fetchIdVideocard(product._id));
        fetchData();
    },[]);
    const deleteReview = async (id)=>{
        try {
            axios.delete(`http://localhost:3001/api/reviews/${id}`);
            setReviews((prev) => prev.filter((el)=> el._id != id));
            toast.success('отзыв удален')
        } catch {
            toast.error('ошибка удаления отзыва')
        }
    }
    const getTime = useGetTime();
    const sendReview = ()=>{
        if(profile.username){
            if(text.length !== 0){
                const updatedReview = {
                    ...review,
                    sender_Id: profile.username,
                    time: getTime(), 
                    message: text,
                };
                axios.post('http://localhost:3001/api/reviews',updatedReview)
                .then((resp)=>{
                    toast('ваш отзыв отправлен');
                    setReviews((prev)=> [...prev,updatedReview]);
                })
                .catch((err)=> alert(err.message));
                fetchData();
            } else {
                toast('ваш отзыв пустой')
            }
        } else {
            toast('вы не зарегестрированы')
        }
    }
    const [num,setnum] = React.useState<number>(0);
    const current =  Array.isArray(product.img) ? product?.img[num] : '';
    if (loading) {
        return <div>Loading...</div>;
    }
    if (product === false) {
        return <div>Product not found</div>;
    }
    return(
        <div className="w-full flex flex-col gap-12 justify-between">
            <Menu></Menu>
            <div className="w-full flex justify-between px-14">
                <div className="w-1/2 pt-16">
                    <img src={current} className="w-3/4 h-72 object-contain"></img>
                </div>
                <div className="w-1/2 text-wrap flex flex-col gap-7">
                    <p className="text-3xl">{product.name}</p>
                    <div className="text-lg flex flex-col items-end gap-4 px-8">
                        <p className="text-xl">Описание</p>
                        <p>Бренд: {product.brand}</p>
                        <p>Частота: {product.frequency} мгц</p>
                        <p>Потребление: {product.energy} tdp</p>
                        <p>Разрешение: {product.video}</p>
                        <div className="flex gap-6">
                            {product.img && product.img.map((el,i:number)=>{
                                return(
                                    <img src={el} onClick={()=>{setnum(i)}} className={`w-20 h-16 p-2 object-contain border-4 rounded-xl ${num == i && 'border-black'}`}></img>
                                )
                            })}
                        </div>
                    </div>
                    <div className="w-full flex gap-4 justify-end px-8">
                        <button onClick={addToCarts} className=" w-1/4 p-3 text-xl border-2 border-[#726bfe] text-white bg-[#726bfe] rounded-md transition duration-150 hover:bg-transparent hover:text-[#726bfe]">в корзину</button>
                        <button onClick={()=>{dispatch(toggleFavorite(product))}} className={`w-2/6 p-3 text-xl ${containFavorite ? 'bg-transparent text-[#726bfe]' : 'bg-[#726bfe] text-white'} border-2 border-[#726bfe] transition duration-150 rounded-md hover:bg-transparent hover:text-[#726bfe]`}>{!containFavorite ? 'в избранное' : 'из избранного'}</button>
                    </div>
                </div>
            </div>
            <div className="w-full px-14 flex flex-col gap-7">
                <p className="text-3xl">Отзывы</p>
                <div>{Array.from({length: 5},(_,i)=> i + 1).map((el)=>{
                    return(
                        <button onClick={()=>{onChangeReview('rating',el)}}>{review.rating >= el ? <StarIcon></StarIcon> : <StarBorderOutlinedIcon></StarBorderOutlinedIcon>}</button>
                    )
                })}</div>
                <div className="flex gap-3">
                    <input value={text} onChange={(e:React.ChangeEvent<HTMLInputElement>)=>{setText(e.target.value)}} type="text" placeholder="напишите отзыв" className="p-2 w-1/4 border-2 border-[#d0d5db99] rounded-md"></input>
                    <button onClick={sendReview} className="bg-[#726bfe] p-2 px-3 text-white rounded-md">отправить</button>
                </div>
                <div className="w-full flex flex-col gap-6 border-2 border-t-[#d0d5db9] p-3">
                    {reviews.length > 0 ? reviews.map((el:any)=>{
                        return (
                            <div key={el._id} className="flex flex-col gap-1 text-wrap">
                                <div className="w-full flex justify-between">
                                    <div className="flex gap-12">
                                        <p>{el.sender_Id}</p>
                                        <p>оценка: {el.rating}</p>
                                    </div>
                                    <div className="flex gap-4">
                                        <p>{el.time}</p>
                                        {el.sender_Id == profile.username && <button onClick={()=>{deleteReview(el._id)}}><DeleteIcon></DeleteIcon></button>}
                                    </div>
                                </div>
                                <p>{el.message}</p>
                            </div>
                        )
                    }) : <p>отзывов нету</p>}
                </div>
            </div>
        </div>
    )
}

export default Product;