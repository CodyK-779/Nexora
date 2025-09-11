"use client";

import Image from "next/image";
import { useState, useRef } from "react";
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight, ZoomIn } from "lucide-react";

interface Props {
  images: string[];
}

const ImageDetailSection = ({ images }: Props) => {
  const [currentImg, setCurrentImg] = useState(images[0]);
  const [showZoomModal, setShowZoomModal] = useState(false);
  const thumbnailsRef = useRef<HTMLDivElement>(null);

  const handleNext = () => {
    const currentIndex = images.indexOf(currentImg);
    const nextIndex = (currentIndex + 1) % images.length;
    setCurrentImg(images[nextIndex]);
  };

  const handlePrev = () => {
    const currentIndex = images.indexOf(currentImg);
    const prevIndex = (currentIndex - 1 + images.length) % images.length;
    setCurrentImg(images[prevIndex]);
  };

  return (
    <>
      <div className="flex flex-col gap-6">
        {/* Main Image Container */}
        <div className="relative w-full aspect-square rounded-xl overflow-hidden border-2 border-neutral-300 bg-gray-50 group cursor-zoom-in">
          <Image
            src={currentImg}
            alt="Selected product image"
            fill
            className="w-full h-auto object-contain transition-transform duration-300 group-hover:scale-105"
            // sizes="(max-width: 768px) 100vw, 50vw"
            priority
            onClick={() => setShowZoomModal(true)}
          />

          {/* Zoom indicator */}
          <div className="absolute top-4 right-4 bg-white/80 backdrop-blur-sm p-2 rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity">
            <ZoomIn size={20} className="text-gray-700" />
          </div>

          {/* Navigation arrows (only show if multiple images) */}
          {images.length > 1 && (
            <>
              <button
                onClick={handlePrev}
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 backdrop-blur-sm p-2 rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity"
                aria-label="Previous image"
              >
                <ChevronLeft size={24} className="text-gray-700" />
              </button>
              <button
                onClick={handleNext}
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 backdrop-blur-sm p-2 rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity"
                aria-label="Next image"
              >
                <ChevronRight size={24} className="text-gray-700" />
              </button>
            </>
          )}
        </div>

        {/* Thumbnails */}
        {images.length > 1 && (
          <div className="relative w-full">
            <div ref={thumbnailsRef} className="flex items-center gap-4 pb-2">
              {images.map((image, idx) => {
                const isActive = currentImg === image;
                return (
                  <button
                    key={idx}
                    onClick={() => setCurrentImg(image)}
                    className={cn(
                      "relative flex-shrink-0 min-[400px]:size-20 min-[350px]:size-16 size-14 rounded-lg overflow-hidden border-2 transition-all hover:scale-105",
                      isActive
                        ? "border-blue-500 ring-2 ring-blue-400 shadow-md"
                        : "border-gray-300 hover:border-gray-500"
                    )}
                    aria-label={`View image ${idx + 1}`}
                    aria-current={isActive ? "true" : "false"}
                  >
                    <Image
                      src={image}
                      alt={`Thumbnail ${idx + 1}`}
                      fill
                      sizes="80px"
                      className="object-cover w-full h-auto"
                    />
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* Zoom Modal */}
      {showZoomModal && (
        <div
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center px-4 pt-4 cursor-zoom-out"
          onClick={() => setShowZoomModal(false)}
        >
          <div className="relative max-w-4xl max-h-full w-full h-full">
            <Image
              src={currentImg}
              alt="Zoomed product image"
              fill
              className="object-contain"
              sizes="100vw"
            />

            {/* Close button */}
            <button
              className="absolute top-4 right-4 bg-white/20 text-white p-2 rounded-full backdrop-blur-sm hover:bg-white/30 transition-colors"
              onClick={() => setShowZoomModal(false)}
              aria-label="Close zoom view"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>

            {/* Navigation in modal */}
            {images.length > 1 && (
              <>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handlePrev();
                  }}
                  className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 text-white p-3 rounded-full backdrop-blur-sm hover:bg-white/30 transition-colors"
                  aria-label="Previous image"
                >
                  <ChevronLeft size={28} />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleNext();
                  }}
                  className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 text-white p-3 rounded-full backdrop-blur-sm hover:bg-white/30 transition-colors"
                  aria-label="Next image"
                >
                  <ChevronRight size={28} />
                </button>
              </>
            )}
          </div>
        </div>
      )}
      <hr className="min-[864px]:hidden border border-gray-300 dark:border-gray-600" />
    </>
  );
};

export default ImageDetailSection;
