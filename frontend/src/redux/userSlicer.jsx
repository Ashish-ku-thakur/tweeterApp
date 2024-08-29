import { createSlice } from '@reduxjs/toolkit';

let userSlicer = createSlice({
    name: "user",
    initialState: {
        authUser: null,
        otherUsers: null,
    },
    reducers: {
        setAuthUser: (state, action) => {
            state.authUser = action?.payload
        },
        setOtherUsers: (state, action) => {
            state.otherUsers = action?.payload
        },
        setFollowId: (state, action) => {
            if (state?.authUser?.followings?.includes(action?.payload)) {
                //pull
                state.authUser.followings = state.authUser.followings.filter((ids) => ids != action?.payload)
            } else {
                //push
                state.authUser.followings.push(action?.payload)
            }
        }
    }

})

export default userSlicer.reducer
export let { setAuthUser, setOtherUsers, setFollowId } = userSlicer.actions
