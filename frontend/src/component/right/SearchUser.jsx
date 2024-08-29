import { CiSearch } from "react-icons/ci";

const SearchUser = () => {
  return (
    <div className="">

      <div className="w-full flex items-center">

        <div className="w-[80%]">
          <input type="search" name="search" placeholder="search" 
          className="border-black border-[1px] outline-none px-3 w-full py-2 rounded-l-full" />
        </div>

        <div className="w-[20%] border-black border-[1px] py-[5px] bg-blue-500 hover:py-[2px] rounded-r-full cursor-pointer ">
          <CiSearch size={"30px"} className="" />
        </div>
      </div>

      <hr className='border-black my-3' />

      <div className="w-full text-center ">
        <h2 className="font-semibold text-xl my-2">Who to Follow</h2>
      </div>

    </div>
  )
}

export default SearchUser