import { createSlice } from '@reduxjs/toolkit';

let postSlicer = createSlice({
    name: "post",
    initialState: {
        allPost: "",
        refresh: true,
        selectedPost:null,
    },
    reducers: {
        setAllPost: (state, action) => {
            state.allPost = action?.payload
        },
        setRefresh: (state) => {
            state.refresh = !state?.refresh
        },
        setSelectedPost:(state, action) =>{
            state.selectedPost = action?.payload
        }

    }
})

export default postSlicer.reducer
export let { setAllPost, setRefresh, setSelectedPost } = postSlicer.actions