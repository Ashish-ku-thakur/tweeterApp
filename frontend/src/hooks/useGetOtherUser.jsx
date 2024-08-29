import axios from "axios"
import { USER_URL } from "../component/constant/RestApis"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { setOtherUsers } from "../redux/userSlicer"
import toast from "react-hot-toast"

let useGetOtherUser = () => {
    let { authUser } = useSelector((store) => store?.user)
    let dispatch = useDispatch()

    useEffect(() => {
        authUser && getOtherUser()
    }, [])

    let getOtherUser = async () => {
        try {
            axios.defaults.withCredentials = true
            let res = await axios.get(`${USER_URL}/allUser`)
            dispatch(setOtherUsers(res?.data))
        } catch (error) {
            toast.error(error?.response?.data?.massage)
        }


    }

}

export default useGetOtherUser