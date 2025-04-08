import React from "react";

function Unauthorized() {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-300">
      {/* Outer Window Border */}
      <div className="w-[380px] bg-gray-200 border-[3px] border-gray-800 shadow-[inset_-2px_-2px_0px_#fff,inset_2px_2px_0px_#000]">
        
        {/* Title Bar */}
        <div className="flex items-center justify-between bg-red-600 text-white px-3 py-2 font-bold text-lg border-b-[2px] border-black">
          <span>Access Denied - Unauthorized</span>
          <button className="w-6 h-6 bg-gray-300 text-black border border-black flex items-center justify-center text-sm hover:bg-red-500 hover:text-white">
            ✕
          </button>
        </div>

        {/* Inner Content */}
        <div className="p-5 text-center">
          <p className="text-black text-lg mb-5">
            You do not have permission to access this page.
          </p>
          <p className="text-black text-sm">
            Please contact your system administrator if you believe this is an error.
          </p>

          {/* Button to redirect or close */}
          <div className="mt-5">
            <button
              onClick={() => window.location.href = '/'}
              className="py-2 px-4 bg-gray-200 text-black border border-gray-800 shadow-[inset_-2px_-2px_0px_#fff,inset_2px_2px_0px_#000] hover:bg-gray-300 active:shadow-[inset_2px_2px_0px_#fff,inset_-2px_-2px_0px_#000]"
            >
              Go Back to Home
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Unauthorized;
