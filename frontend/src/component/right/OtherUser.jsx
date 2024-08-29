import axios from "axios"
import toast from "react-hot-toast"
import { useDispatch, useSelector } from "react-redux"
import { USER_URL } from "../constant/RestApis"
import { setFollowId } from "../../redux/userSlicer"
import { setRefresh } from "../../redux/postSlicer"

const OtherUser = ({ data }) => {
  let { authUser } = useSelector((store) => store?.user)
  let dispatch = useDispatch()

  // follower handler
  let followHandler = async (user) => {
    try {
      axios.defaults.withCredentials = true
      let res = await axios.patch(`${USER_URL}/follow/${user?._id}`)
      dispatch(setFollowId(user?._id))
      dispatch(setRefresh())

      if (res?.data?.success) {
        toast?.success(res?.data?.massage)
      }

    } catch (error) {
      toast.error(error?.code)
    }
  }

  // unfollow handler
  let unfollowHandler = async (user) => {
    try {

      axios.defaults.withCredentials = true
      let res = await axios.patch(`${USER_URL}/unfollow/${user?._id}`)
      dispatch(setFollowId(user?._id))
      dispatch(setRefresh())


      if (res?.data?.success) {
        toast?.success(res?.data?.massage)
      }
    } catch (error) {
      toast.error(error?.code)
    }
  }

  return (
    <div className="flex items-center gap-3 w-full my-3">
      <div className='w-[18%]'>
        <img src={data?.profilePhoto} alt="" />
      </div>

      <div className="flex items-center justify-between w-full">

        <div>
          <h2>{data?.fullname}</h2>
          <h2>{data?.email}</h2>
        </div>

        {
          authUser.followings.includes(data?._id) ?
            <div className="px-4 py-2 bg-blue-500 rounded-full cursor-pointer" onClick={() => unfollowHandler(data)}>
              <h3>unfollow</h3>
            </div>
            :
            <div className="px-4 py-2 bg-blue-500 rounded-full cursor-pointer" onClick={() => followHandler(data)}>
              <h3>follow</h3>
            </div>
        }
      </div>


    </div>
  )
}

export default OtherUser