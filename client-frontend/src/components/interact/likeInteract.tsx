import { PayloadAction, configureStore, createSlice } from '@reduxjs/toolkit';
import API_URL from '../../api/apiConfig';
import Cookies from 'js-cookie';

interface Action {
    index: number;
}

interface LikeState {
    value: number[];
}


const initialState: LikeState = {
    value: [-1]
};

const LikeSlice = createSlice({
    name: "like",
    initialState,
    reducers: {
        like: (state, action: PayloadAction<Action>) => {
            if (state.value.find(id => id === action.payload.index) !== undefined) return;

            state.value.push(action.payload.index);
            localStorage.setItem("likes", JSON.stringify(state.value));
        },
        unlike: (state, action: PayloadAction<Action>) => {
            state.value = state.value.filter(id => id !== action.payload.index);
            localStorage.setItem("likes", JSON.stringify(state.value));
        },
        reset: (state) => {
            state.value = initialState.value;
        }
    }
});

const LikeStore = configureStore({
    reducer: {
        like: LikeSlice.reducer
    }
});

export const SubmitLikes = async (callback: Function) => {    
    const likeStore = localStorage.getItem("likes");

    const likes = likeStore?.substring(1, likeStore.length - 1).split(",")
                            .map(id => parseInt(id))
                            .filter(id => id !== undefined && id !== null && !isNaN(id));    
    
    localStorage.removeItem("likes");

    if(likes === undefined || likes === null) return;

    await fetch(`${API_URL}like/${Cookies.get("Authorization")}`, {
        method: "PUT",
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            likes: likes,
        })
    })

    callback();
}

export const { like, unlike, reset } = LikeSlice.actions;
export type RootState = ReturnType<typeof LikeStore.getState>;
export type AppDispatch = typeof LikeStore.dispatch;
export default LikeStore;