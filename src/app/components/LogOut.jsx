import React from 'react'

const LogOut = () => {
      const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("username");
        window.location.reload();
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
  <span>Logout</span>
  <span
    className="absolute right-3 opacity-0 group-hover:opacity-100 
               translate-x-1 group-hover:translate-x-0 
               transition-all duration-300"
  >
    🚪
  </span>
</button>


  )
}

export default LogOut
