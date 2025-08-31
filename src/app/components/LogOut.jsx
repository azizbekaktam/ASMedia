import { useRouter } from "next/navigation";
import React from "react";
import { HiOutlineLogin } from "react-icons/hi";

const LogOut = () => {
  const router = useRouter();
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    router.push("/");
  };
  return (
    <button
      onClick={handleLogout}
      className="group relative inline-flex items-center gap-2 px-5 py-2.5 
             rounded-xl font-semibold tracking-wide 
             bg-gradient-to-r from-red-600 to-red-500 
             hover:from-red-500 hover:to-red-400 
             text-white shadow-md hover:shadow-lg 
             transition-all duration-300 ease-out"
    >
      <span>
        <HiOutlineLogin />
      </span>
    </button>
  );
};

export default LogOut;
