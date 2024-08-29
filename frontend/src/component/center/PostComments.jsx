const PostComments = ({comment}) => {

    if (!comment) {
        return null
    }
    return (
        <div className="flex gap-4 w-full my-3 shadow-lg">

            <div className="w-[13%] ">
                <img src={comment?.profilePhoto} alt="" />
            </div>


            <div className="w-full">
                {/* name email massage */}
                <div className="w-[87%]">
                    <div className="flex gap-5">
                        <h3>{comment?.fullname}</h3>
                        <h3>{comment?.email}</h3>
                    </div>

                    <div className="mt-5">
                        <p>{comment?.text}</p>
                    </div>
                </div>

            </div>

        </div>
    )
}

export default PostComments