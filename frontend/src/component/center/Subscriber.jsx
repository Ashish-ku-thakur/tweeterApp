import { useSelector } from "react-redux"
import Post from "./Post"

const Subscriber = () => {
    let { authUser } = useSelector((store) => store?.user)
    let { allPost } = useSelector((store) => store?.post)

    if (!allPost) {
        return null
    }

    return (
        <div className="m-3">
            {
                allPost?.map((post) => post?.senderId[0] != authUser?._id && <Post key={post?._id} data={post} />)
            }
        </div>
    )
}

export default Subscriber