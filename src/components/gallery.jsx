import {
  IconHeart,
  IconHeartFilled,
  IconMaximize,
  IconMinimize,
  IconX,
  IconDownload,
} from "@tabler/icons-react";
import React, { useState, useRef } from "react";
import { useFavContext } from "../App";

export default function Gallery() {
  const { addToFav, removeFromFav, favourites } = useFavContext();
  const [floatingHearts, setFloatingHearts] = useState([]);
  const [fullscreenImg, setFullscreenImg] = useState(null); // 🔍 fullscreen state
  const containerRef = useRef(null);

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

  const toggleFav = (image, e) => {
    const alreadyFav = favourites.some((fav) => fav.id === image.id);

    if (alreadyFav) {
      removeFromFav(image.id);
      return;
    }

    const favBtn = document.getElementById("favButton");
    if (!favBtn) return;

    const favRect = favBtn.getBoundingClientRect();
    const favX = favRect.left + favRect.width / 2;
    const favY = favRect.top + window.scrollY + favRect.height / 2;

    const rect = e.currentTarget.getBoundingClientRect();
    const imgX = rect.left + rect.width / 2;
    const imgY = rect.top + window.scrollY + rect.height / 2;

    addToFav(image);

    const id = Date.now();
    setFloatingHearts((prev) => [
      ...prev,
      { id, startX: imgX, startY: imgY, endX: favX, endY: favY },
    ]);

    setTimeout(() => {
      setFloatingHearts((prev) => prev.filter((h) => h.id !== id));
    }, 1200);
  };

  const bigSize = (image) => {
    setFullscreenImg(image);
    // Request fullscreen immediately after state update (zero delay preserves user gesture for mobile)
    requestAnimationFrame(() => {
      if (containerRef.current && !document.fullscreenElement) {
        containerRef.current.requestFullscreen().catch(err => {
          console.error('Error attempting to enable fullscreen:', err);
        });
      }
    });
  };

  const closeFullscreen = () => {
    setFullscreenImg(null);
    if (document.fullscreenElement) {
      document.exitFullscreen();
    }
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      containerRef.current?.requestFullscreen().catch(err => {
        console.error('Error attempting to enable fullscreen:', err);
      });
    } else {
      document.exitFullscreen();
    }
  };

  const downloadImage = (src) => {
    const link = document.createElement("a");
    link.href = src;
    link.download = src.split("/").pop();
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <>
      {floatingHearts.map((heart) => (
        <div
          key={heart.id}
          className="fixed text-red-500 pointer-events-none z-[9999] animate-flyToFav"
          style={{
            left: heart.startX - 20,
            top: heart.startY - 20,
            "--end-x": `${heart.endX - heart.startX}px`,
            "--end-y": `${heart.endY - heart.startY}px`,
          }}
        >
          <IconHeartFilled size={40} />
        </div>
      ))}

      <div className="grid gap-4 justify-center p-[30px] sm:p-2.5 pt-0 pb-0 2xl:grid-cols-4 xl:grid-cols-3 lg:grid-cols-2 sm:grid-cols-2 xs:grid-cols-1">
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
                    toggleFav(image, e);
                  }}
                  className="cursor-pointer hover:scale-110 transition duration-300"
                >
                  {isFav ? (
                    <IconHeartFilled size={50} color="red" />
                  ) : (
                    <IconHeart size={50} color="white" stroke={1.5} />
                  )}
                </div>

                <IconMaximize
                  onClick={() => bigSize(image)}
                  className="absolute text-gray-300 opacity-70 bottom-0 right-0 m-2 cursor-pointer hover:opacity-100 hover:scale-110 hover:text-white transition duration-300"
                />
              </div>
            </div>
          );
        })}
      </div>

      {fullscreenImg && (
        <div
          ref={containerRef}
          className="fixed inset-0 bg-black flex items-center justify-center z-[99999] transition duration-500"
        >
          {/* All buttons hidden in fullscreen - show only when not in fullscreen */}
          {!document.fullscreenElement && (
            <div className="absolute top-6 right-6 flex space-x-2 z-10">
              <IconX
                onClick={closeFullscreen}
                className="text-white cursor-pointer hover:scale-110 transition duration-300"
                size={40}
              />

              <IconDownload
                onClick={() => downloadImage(fullscreenImg.src)}
                className="text-white cursor-pointer hover:scale-110 transition duration-300"
                size={35}
              />

              <IconMaximize
                onClick={toggleFullscreen}
                className="text-white cursor-pointer hover:scale-110 transition duration-300"
                size={35}
              />
            </div>
          )}

          <img
            src={fullscreenImg.src}
            alt=""
            className="w-full h-full object-contain transition duration-500"
          />
        </div>
      )}
    </>
  );
}