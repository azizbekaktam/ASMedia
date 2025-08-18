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
  className="px-4 py-2 rounded font-medium 
             bg-red-600 text-white hover:bg-red-500 
             dark:bg-red-700 dark:hover:bg-red-600 
             transition-colors"
>
  Logout
</button>

  )
}

export default LogOut
