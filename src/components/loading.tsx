import React from "react";
export const LoadingSpin = () => {
    return (
        <div id="" className="inline-flex items-center px-4 py-2 font-medium leading-6 text-xl shadow rounded-md text-white bg-slate-400 hover:bg-slate-300 transition ease-in-out duration-150 cursor-not-allowed">
          <svg className="animate-spin -ml-1 mr-3 h-12 w-12 text-white" fill="none" viewBox="0 0 24 24" >
            <circle className="opacity-25" cx="12" cy="12" r="10" strokeWidth="4" stroke="currentColor"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          Loading...
        </div>
    )
  }