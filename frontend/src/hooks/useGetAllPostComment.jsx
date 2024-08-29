import axios from "axios";
import { COMMENT_URL } from "../component/constant/RestApis";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { setPostComments } from "../redux/commentSlicer";

let useGetAllPostComment = () => {

    let { selectedPost } = useSelector((store) => store?.post)

    let dispatch = useDispatch()

    useEffect(() => {
        selectedPost && getAllPostComment()
    }, [selectedPost])

    let getAllPostComment = async () => {
        try {
            axios.defaults.withCredentials = true
            let res = await axios.get(`${COMMENT_URL}/showAllComment/${selectedPost?._id}`)
            dispatch(setPostComments(res?.data?.comments))

        } catch (error) {
            console.log(error);
        }
    }
}

export default useGetAllPostComment