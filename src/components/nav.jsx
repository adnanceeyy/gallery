import React from "react";


export default function Nav({ onShowFav, favourites }) {
  
  return (
    <div className="flex justify-between w-full bg-[#ffffffd2] p-1.5 mb-5">
      <h2 className="text-[25px] font-semibold text-gray-800">Gallery App</h2>
      <button
        onClick={onShowFav}
        className="bg-transparent border border-pink-600 text-pink-600 py-1 text-2xl rounded hover:bg-pink-300 hover:text-white transition cursor-pointer p-2"
      >
        ❤️‍🩹 Favourite {favourites.length > 0 && `(${favourites.length})`}
      </button>
    </div>
  );
}
