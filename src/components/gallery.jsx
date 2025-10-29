import { IconHeart, IconHeartFilled } from "@tabler/icons-react";
import React from "react";
import { useFavContext } from "../App"; // 👈 import the context hook from App.jsx

export default function Gallery() {
  const { addToFav, removeFromFav, favourites } = useFavContext();

  const images = [
    { id: 1, src: "./assets/img1.jpg" },
    { id: 2, src: "./assets/img2.jpg" },
    { id: 3, src: "./assets/img3.jpg" },
    { id: 4, src: "./assets/img4.jpg" },
    { id: 5, src: "./assets/img5.jpg" },
    { id: 6, src: "./assets/img6.jpg" },
    { id: 7, src: "./assets/img7.jpg" },
    { id: 8, src: "./assets/img8.jpg" },
    { id: 9, src: "./assets/img9.jpg" },
    { id: 10, src: "./assets/img10.jpg" },
    { id: 11, src: "./assets/img11.jpg" },
    { id: 12, src: "./assets/img12.jpg" },
  ];

  const toggleFav = (image) => {
    const alreadyFav = favourites.some((fav) => fav.id === image.id);
    if (alreadyFav) removeFromFav(image.id);
    else addToFav(image);
  };

  return (
<div className="grid gap-4 justify-center p-5 sm:p-[30px] pt-0 pb-0 2xl:grid-cols-4 xl:grid-cols-3 lg:grid-cols-2 sm:grid-cols-2">
      {images.map((image) => {
        const isFav = favourites.some((fav) => fav.id === image.id);
        return (
          <div className="relative group" key={image.id}>
            <img
              className="w-[500px] h-[280px] rounded-2xl object-cover transition duration-500 cursor-pointer group-hover:scale-102"
              src={image.src}
              alt=""
            />
            <div className="absolute inset-0 bg-[#5353536b] rounded-2xl opacity-0 group-hover:opacity-100 transition duration-500 flex items-center justify-center group-hover:scale-102">
              <div
                onClick={(e) => {
                  e.stopPropagation();
                  toggleFav(image);
                }}
                className="cursor-pointer hover:scale-110 transition duration-300"
              >
                {isFav ? (
                  <IconHeartFilled size={50} color="red" />
                ) : (
                  <IconHeart size={50} color="white" stroke={1.5} />
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
