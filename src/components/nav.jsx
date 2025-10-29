import { IconHeart } from "@tabler/icons-react";
import React from "react";

export default function Nav({ onShowFav, favourites }) {
  const NameArray = ["My Gallery", "Image Hub", "PicSpot", "SnapSpace", "FotoFlow","abbas's Gallery"];
  const appName = NameArray[Math.floor(Math.random() * NameArray.length)];
  return (
    <div className=" flex align-middle justify-between w-full bg-[#ffffff00] p-1.5 mb-2">
<h2 className="text-[30px] sm:text-[40px] mb-1 font-bold text-gray-100 ml-2">
  {appName}
</h2>
      <button
  id="favButton"
  onClick={onShowFav}
  className="
    backdrop-blur-2xl
    gap-1 font-medium
    bg-[#8888885d] border border-[#cfcfcf52] rounded-3xl
    text-[#ffffffcc] text-[15px] sm:text-[17px] md:text-[19px]
    hover:bg-[#8b8b8b2d] hover:text-white
    transition cursor-pointer flex items-center justify-center
    px-2 py-0.5 sm:px-3 sm:py-0.5 md:px-4 md:py-1
    mr-2 mt-2 sm:mr-4
  "
>
  <IconHeart className="text-[18px] sm:text-[20px] md:text-[22px]" />
  <span className="ml-1">Favourite{favourites.length > 0 && ` (${favourites.length})`}</span>
</button>

    </div>
  );
}
