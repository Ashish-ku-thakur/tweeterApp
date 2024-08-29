import { useSelector } from "react-redux"
import OtherUser from "./OtherUser"

const OtherUsers = () => {


    let { otherUsers } = useSelector((store) => store?.user)
    return (
        <div className="overflow-y-hidden h-full">
            <div className="h-full overflow-y-scroll">
                {
                    otherUsers?.map((el) => <OtherUser key={el?._id} data={el} />)
                }
            </div>
        </div>
    )
}

export default OtherUsers