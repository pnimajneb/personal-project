import React from "react";
import { getImages } from "../../../../lib/imageService";

export async function Content() {
  const aboutImage = await getImages();
  return (
    <>
      {aboutImage.map(
        (img, index) =>
          img.name.includes("aboutme") && (
            <div key={index}>
              <img
                className="max-w-[200px] w-full rounded-[4px]"
                src={img.url}
                alt={img.name}
              />
            </div>
          )
      )}
    </>
  );
}
