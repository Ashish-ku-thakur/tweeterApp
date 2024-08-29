import axios from "axios"
import toast from "react-hot-toast"
import { POST_URL } from "../component/constant/RestApis"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { setAllPost } from "../redux/postSlicer"

let useGetAllPost = () => {

    let { authUser } = useSelector((store) => store?.user)
    let { refresh } = useSelector((store) => store?.post)
    let dispatch = useDispatch()

    useEffect(() => {
        authUser && getAllPost()
    }, [refresh])

    let getAllPost = async () => {
        try {
            axios.defaults.withCredentials = true
            let res = await axios.get(`${POST_URL}/getFollowersPost`)
            // console.log(res?.data);

            res?.data == 0 ? dispatch(setAllPost("")) : dispatch(setAllPost(res?.data))


        } catch (error) {
            toast.error(error?.code)
        }
    }

}

export default useGetAllPost