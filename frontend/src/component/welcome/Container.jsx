import { useSelector } from "react-redux"
import CenterContainer from "../center/CenterContainer"
import LeftConatiner from "../left/LeftConatiner"
import RightContainer from "../right/RightContainer"
import { Outlet, useNavigate } from "react-router-dom"
import { useEffect } from "react"
import useGetOtherUser from "../../hooks/useGetOtherUser"
import useGetAllPost from "../../hooks/useGetAllPost"

const Container = () => {
    useGetOtherUser()
    useGetAllPost()

    let { authUser } = useSelector((store) => store?.user)
    let navigate = useNavigate()

    useEffect(() => {
        if (!authUser) {
            navigate("/sign")
        } else {
            navigate("/")
        }
    }, [authUser])


    return (
        <div className="flex items-center justify-center h-screen w-full ">
            <div className="w-[80%] h-[70%] flex ">

                <div className="w-[20%] h-full border-black border-[1px]">
                    <LeftConatiner />
                </div>

                <div className=" w-1/2 h-full border-black border-[1px]">
                    <Outlet />
                </div>

                <div className="w-[30%] h-full border-black border-[1px]">
                    <RightContainer />
                </div>
            </div>
        </div>
    )
}

export default Container