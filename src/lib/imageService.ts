import Image from "next/image";
import { supabase } from "./supabaseClient";

export type Image = {
    name: string;
    url: string;
  };

export async function getImages(): Promise<Image[]> {
    const { data, error } = await supabase.storage.from('photography').list();

    if (error) {
        console.log(error.message);
        return [];
      }
    
    return await Promise.all(
        data.map(async(file) => {
            const response = await supabase.storage.from('photography').getPublicUrl(file.name);
            if(!response.data.publicUrl) {
                console.error("Failed to get a public URL for", file.name);
                return null;
            }
            return { name: file.name, url: response.data.publicUrl};
        })
    ).then(images => images.filter((image): image is Image => image !== null))
}

export async function getSpecificImage(imageName: string): Promise<Image | null> {
    const { data, error } = await supabase.storage.from("photography").list();
    if (error) {
      console.error(error.message);
      return null;
    }
  
    const file = data.find(file => file.name === imageName);
    if (!file) {
      console.error("Image not found");
      return null;
    }
  
    const response = await supabase.storage.from("photography").getPublicUrl(file.name);
    if (response.data.publicUrl) {
      console.error("Failed to get a public URL for", file.name);
      return null;
    }
    return { name: file.name, url: response.data.publicUrl };
  }