import { FaRegComment } from "react-icons/fa";
import { AiOutlineLike } from "react-icons/ai"; // unfill
import { AiTwotoneLike } from "react-icons/ai";  // fill
import { MdDeleteOutline } from "react-icons/md";
import { CiBookmark } from "react-icons/ci";
import axios from "axios";
import { POST_URL } from "../constant/RestApis";
import { useDispatch, useSelector } from "react-redux";
import { setRefresh, setSelectedPost } from "../../redux/postSlicer";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

const Post = ({ data }) => {

  let dispatch = useDispatch()
  let { authUser } = useSelector((store) => store?.user)

  // likeOrDislike feature
  let likeOrdislikeHandler = async (post) => {
    try {
      let res = await axios.patch(`${POST_URL}/likeOrDislike/${post?._id}`)
      dispatch(setRefresh())

    } catch (error) {
      console.log(error);

    }
  }

  // deleteFeature
  let deletePostHandler = async (post) => {

    try {
      axios.defaults.withCredentials = true
      let res = await axios.delete(`${POST_URL}/deletePost/${post?._id}`)

      if (res?.data?.success) {
        dispatch(setRefresh())
        toast?.success(res?.data?.massage)
      }

    } catch (error) {
      toast.error(error?.code)
    }
  }

  let postSeletorHandler = (post) => {
    dispatch(setSelectedPost(post))
  }

  return (
    <div className="w-full my-6">
      <div className="flex gap-4 w-full border-black border-[1px]">

        <div className="w-[13%] ">
          <img src={data?.profilePhoto} alt="" />
        </div>


        <div className="w-full">
          {/* name email massage */}
          <div className="w-[87%] mb-8">
            <div className="flex gap-5">
              <h3>{data?.fullname}</h3>
              <h3>{data?.email}</h3>
            </div>

            <div>
              <p>{data?.massage}</p>
            </div>
          </div>

          <div className="flex justify-between w-full">

            <Link to={"/comments"} onClick={() => postSeletorHandler(data)} className="cursor-pointer">
              <FaRegComment size={"30px"} />
            </Link>

            <div onClick={() => likeOrdislikeHandler(data)} className="flex gap-4 cursor-pointer">

              {
                data?.likes.includes(authUser?._id) ? <AiTwotoneLike size={"30px"} /> : <AiOutlineLike size={"30px"} />
              }
              <div>{data?.likes.length}</div>
            </div>

            {
              data?.senderId[0] == authUser?._id && <div className="cursor-pointer" onClick={() => deletePostHandler(data)}> <MdDeleteOutline size={"30px"} /></div>
            }

            <div className="cursor-pointer">
              <CiBookmark size={"30px"} />
            </div>

          </div>

        </div>

      </div>
    </div>
  )
}

export default Post