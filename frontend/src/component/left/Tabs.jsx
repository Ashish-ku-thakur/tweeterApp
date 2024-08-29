import { CiHome } from "react-icons/ci";
import { CgProfile } from "react-icons/cg";
import { CiCircleMore } from "react-icons/ci";
import { MdOutlineSubscriptions } from "react-icons/md";
import { Link } from 'react-router-dom';

const Tabs = () => {
  return (
    <div className="h-full">
      <div className="flex flex-col justify-between h-full">

        {/* home */}
        <Link to={"/"} className="flex items-center gap-4 cursor-pointer hover:bg-blue-400 rounded-full py-2 w-[80%]">
          <CiHome size={"40px"} />

          <div>
            Home
          </div>
        </Link>

        {/* profile */}
        <div className="flex items-center gap-4 cursor-pointer hover:bg-blue-400 rounded-full py-2 w-[80%]">
          <CgProfile size={"40px"} />

          <div>
            Profile
          </div>
        </div>

        {/* more */}
        <div className="flex items-center gap-4 cursor-pointer hover:bg-blue-400 rounded-full py-2 w-[80%]">
          <CiCircleMore size={"40px"} />

          <div>
            More
          </div>
        </div>

        {/* Subscriber */}
        <Link to={"/subscriber"} className="flex items-center gap-4 cursor-pointer hover:bg-blue-400 rounded-full py-2 w-[80%]">
          <MdOutlineSubscriptions size={"40px"} />

          <div>
            Subscriber
          </div>
        </Link>

      </div>
    </div>
  )
}

export default Tabs