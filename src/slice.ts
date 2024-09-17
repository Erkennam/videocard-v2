import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import { videocard } from "./products/videocards";
import axios from "axios";
import { cartItem } from "./cart/cartPage";
interface initialState{
    dark: boolean,
    filterModal: boolean,
    cart: cartItem[] | any,
    favorites: videocard[],
    containFavorite: boolean,
    filterParams: any,
    registrationModal: boolean,
    loginModal: boolean,
    profile: any | boolean,
    succes: boolean,
    product: boolean | videocard,
    page: number,
    pageProduct: videocard [] | any,
    token: string | boolean,
    brandProducts: videocard[] | any,
}

const initialState:initialState = {
    dark: false,
    filterModal: false,
    cart: [],
    favorites: [],
    containFavorite: false,
    filterParams: {
        brand: [],
        price: 0,
        sort: '',
        memory: [],
        videoFrequency: [],
        frequency: 0,
        energy: 0,
    },
    registrationModal: false,
    loginModal: false,
    profile: false,
    succes: false,
    product: false,
    page: 1,
    pageProduct: 1,
    token: false,
    brandProducts: [],
}

export const fetchVideocards:any = createAsyncThunk<videocard[], number, { rejectValue: string }>(
    'videocards/fetchVideocards',
    async (page: number, { rejectWithValue }) => {
      const pageSize = 12;
      try {
        const response = await axios.get(`http://localhost:3001/api/videocards/${page}/${pageSize}`);
        return response.data;
      } catch (err) {
        return rejectWithValue('Ошибка при загрузке данных');
      }
    }
);

export const fetchBrandVideocards:any = createAsyncThunk<videocard[], number, { rejectValue: string }>(
    'videocards/fetchBrandVideocards',
    async (brand:string | any, { rejectWithValue }) => {
        try {
          const response = await axios.get(`http://localhost:3001/api/videocards/${brand}`);
          return response.data;
        } catch (err) {
          return rejectWithValue('Ошибка при загрузке данных');
        }
    }
)

export const fetchIdVideocard:any = createAsyncThunk<videocard[], number, { rejectValue: string }>(
    'videocards/fetchIdVideocards',
    async (id:string | any, { rejectWithValue }) => {
        try {
          const response = await axios.get(`http://localhost:3001/api/videocards/${id}`);
          console.log(response.data.find);
          return response.data.find;
        } catch (err) {
          return rejectWithValue('Ошибка при загрузке данных');
        }
    }
)

export const fetchUser:any = createAsyncThunk<any, number, { rejectValue: string }>(
    'user/fetchUser', async (token, { rejectWithValue }) => {
    try {
      const response = await axios.get('http://localhost:3001/api/users/me', {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data.user;
    } catch (err) {
      return rejectWithValue('Ошибка при проверке токена');
    }
});

const slice = createSlice({
    name: 'slice',
    initialState: initialState,
    reducers: {
        setFilterModal: (state)=>{
            state.dark = !state.dark;
            state.filterModal = !state.filterModal;
        },
        addToCart: (state,{payload})=>{
            const find = state.cart.find((el:videocard)=> el.id == payload.id);
            if(find){
                if(find.count !== 3){
                    state.cart = state.cart.map((el)=>{
                        if(el.id == find.id){
                            return {...el,count: el.count + 1}
                        } else {
                            return el;
                        }
                    })
                } else {
                    alert('максимальное количество товара достигнуто')
                }
            } else {
                state.cart = [...state.cart,payload];
            }
        },
        deleteFromCart: (state,{payload})=>{
            state.cart = state.cart.filter((el:videocard)=> el.id !== payload);
        },
        toggleFavorite: (state,{payload})=>{
            const find = state.favorites.some((el:videocard)=> el.id == payload.id);
            if(find){
                state.favorites = state.favorites.filter((el:videocard)=> el.id != payload.id);
            } else {
                state.favorites = [...state.favorites,payload];
            }
        },
        setFilterParam: (state,{payload})=>{
            let arr = Object.keys(state.filterParams).filter((el)=> Array.isArray(state.filterParams[el]));
            if(arr.includes(payload[0])){
                state.filterParams = {...state.filterParams,[payload[0]]: state.filterParams[payload[0]].includes(payload[1]) ? state.filterParams[payload[0]].filter((el)=> el !== payload[1]) : [...state.filterParams[payload[0]],payload[1]]};
            } else {
                state.filterParams = {...state.filterParams,[payload[0]]: payload[1]}
            }
        },
        setRegistrationModal: (state)=>{
            state.dark = !state.dark;
            state.registrationModal = !state.registrationModal;
        },
        setLoginModal: (state)=>{
            state.dark = !state.dark;
            state.loginModal = !state.loginModal;
        },
        setSuccesModal: (state)=>{
            state.dark = !state.dark;
            state.succes = !state.succes;
        },
        setLoginUser: (state,{payload})=>{
            state.profile = payload[0];
            state.token = payload[1]
        },
        setCountOfItem: (state,{payload})=>{
            let items = state.cart[payload[0]];
            let copy = [...state.cart];
            if(payload[1] == 'increment'){
                if(items.count >= 3){
                    alert('кол-во должно быть меньше 3');
                } else {
                    items = {...items,count: items.count + 1};
                }
            } else {
                if(items.count == 1){
                    alert('вы не можете убрать последний экземпляр')
                } else {
                    items = {...items,count: items.count - 1};
                }
            }
            copy[payload[0]] = items;
            state.cart = copy;
        },
        setProduct: (state,{payload})=>{
            state.product = payload;
        },
        setPageProduct: (state,{payload})=>{
            state.pageProduct = payload;
        },
        setPage: (state,{payload})=>{
            state.page = payload;
        }
    },
    extraReducers: (builder) => {
        builder
          .addCase(fetchVideocards.fulfilled, (state, action) => {
            state.pageProduct = action.payload;
          })
          .addCase(fetchUser.fulfilled, (state, action) => {
            state.profile = action.payload;
          })
          .addCase(fetchBrandVideocards.fulfilled, (state, action) => {
            state.profile = action.payload;
          })
      },
})

export const {setFilterModal,setProduct,setPage,setPageProduct,setCountOfItem,addToCart,deleteFromCart,toggleFavorite,setFilterParam,setRegistrationModal,setSuccesModal,setLoginModal,setLoginUser} = slice.actions;
export default slice.reducer;