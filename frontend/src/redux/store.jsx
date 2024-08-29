import {configureStore} from '@reduxjs/toolkit';
import userSlicer from './userSlicer';
import postSlicer from './postSlicer';
import commentSlicer from './commentSlicer';

let store = configureStore({
    reducer:{
        // actions
        user:userSlicer,
        post:postSlicer,
        comment:commentSlicer
    }
})

export default store