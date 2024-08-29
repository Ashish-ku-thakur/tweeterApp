import {createSlice} from '@reduxjs/toolkit';

let commentSlicer = createSlice({
    name:"comment",
    initialState:{
        postComments:"",

    },
    reducers:{
        setPostComments:(state, action) =>{
            state.postComments = action?.payload
        }
    }
})

export default commentSlicer.reducer
export let {setPostComments} = commentSlicer.actions