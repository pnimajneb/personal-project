import React from "react";
import { getImages } from "../../../../lib/imageService";

export default async function ImageList() {
  const imagesGallery = await getImages();
  return (
    <>
      {imagesGallery.map(
        (img, index) =>
          img.name.includes("gallery1") && (
            <div key={index} className="my-5">
              <img src={img.url} alt={img.name} />
            </div>
          )
      )}
      {imagesGallery.length === 0 && (
        <p className="text-center">There are no images here!</p>
      )}
    </>
  );
}
