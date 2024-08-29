import { CiLogout } from "react-icons/ci";
const Logout = () => {
  return (
    <div className="h-full flex gap-5 items-center text-2xl cursor-pointer bg-blue-500 w-full rounded-full">
        <div className="h-full">
            <CiLogout size={"50px"}/>
        </div>

        <div>
            <h2>Logout</h2>
        </div>
    </div>
  )
}

export default Logout