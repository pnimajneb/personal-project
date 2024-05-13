import { createClient } from "@supabase/supabase-js";
import React from "react";

export type Image = {
  name: string;
  url: string;
};

async function getImages(): Promise<Image[]> {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  const { data, error } = await supabase.storage.from("photography").list();

  console.log("Fetched data:", data); // Log the data received from Supabase
  console.log("Error:", error); // Log any errors during the fetch

  if (error) {
    console.log(error.message);
    return [];
  }

  const images = await Promise.all(
    data.map(async (file) => {
      const response = supabase.storage
        .from("photography")
        .getPublicUrl(file.name);
      if (!response.data.publicUrl) {
        console.error("Failed to get a public URL for", file.name);
        return null;
      }
      console.log("Image URL:", response.data.publicUrl); // Log each URL
      return { name: file.name, url: response.data.publicUrl };
    })
  );

  return images.filter((image): image is Image => image !== null); // Filter out any nulls from errors
}

export default async function ImageList() {
  const images = await getImages();
  return (
    <>
      {images.map((image, index) => (
        <div key={index} className="my-5">
          <img src={image.url} alt="image name" />
        </div>
      ))}
      {images.length === 0 && (
        <p className="text-center">There are no images here!</p>
      )}
    </>
  );
}
