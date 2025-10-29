// Fav.jsx
import React from "react";
import { IconX, IconTrash } from "@tabler/icons-react";
import { useFavContext } from "../App";

export default function Fav() {
  const { favourites, removeFromFav, setShowFav } = useFavContext();

  return (
    <div className="favbox w-[80%] h-[800px] bg-[#4e4e4ec2] border-[#d8d8d891] fixed z-50 top-[50%] left-[50%] -translate-y-1/2 -translate-x-1/2 transform-translate-x-1/2 rounded-4xl border overflow-y-auto p-5">
      <IconX
        size={35}
        onClick={() => setShowFav(false)}
        className="absolute top-4 right-5 cursor-pointer text-gray-400 hover:text-white transition"
      />
      <h2 className="text-3xl font-semibold text-white text-center p-5">
        Your Favourite Images
      </h2>

      <div className="grid gap-5 p-15 2xl:grid-cols-4 xl:grid-cols-3 lg:grid-cols-2 sm:grid-cols-2 xs:grid-cols-1 justify-center">
        {favourites.length > 0 ? (
          favourites.map((image) => (
            <div
              key={image.id}
              className="relative h-[250px] object-cover rounded-2xl overflow-hidden border border-gray-600"
            >
              <img
                src={image.src}
                alt=""
                className="w-full h-[250px] object-cover"
              />
              <button
                onClick={() => removeFromFav(image.id)}
                className="absolute top-3 right-3 bg-[#ff000070] text-white p-2 rounded-full hover:bg-red-700 transition"
              >
                <IconTrash size={18} />
              </button>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-300 mt-[100px] ml-[160px] w-full col-span-3 text-xl">
            No favourite images yet 💔
          </p>
        )}
      </div>
    </div>
  );
}
