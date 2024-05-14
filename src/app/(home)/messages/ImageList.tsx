import React from "react";
import { getImages } from "../../../../lib/imageService";

export default async function ImageList() {
  const images = await getImages();
  return (
    <>
      {images.map((image, index) => (
        <div key={index} className="my-5">
          <img src={image.url} alt={image.name} />
        </div>
      ))}
      {images.length === 0 && (
        <p className="text-center">There are no images here!</p>
      )}
    </>
  );
}
