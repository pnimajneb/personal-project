import React from "react";
import { Message } from "../MessageList";
import { notFound } from "next/navigation";
import { createClient } from "@supabase/supabase-js";

export const dynamicParams = true;

// export async function generateMetadata({ params }: SingleMessagePageProps) {
//   const id = params.id;

//   const res = await fetch(`http://localhost:4000/messages/${id}`);
//   const message = await res.json();

//   return {
//     title: `Personal Page | ${message.name}`,
//   };
// }

async function getMessage(id: number): Promise<Message> {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  const { data } = await supabase
    .from("messages")
    .select()
    .eq("id", id)
    .single();

  if (!data) {
    notFound();
  }

  return data;
}

export type SingleMessagePageProps = {
  params: {
    id: number;
  };
};

async function MessageDetails({ params }: SingleMessagePageProps) {
  const message = await getMessage(params.id);

  return (
    <main>
      <nav>
        <h2>Message Details</h2>
      </nav>
      <div>
        <h3>{message.name}</h3>
        <small>Created by {message.email}</small>
        <p>{message.message}</p>
      </div>
    </main>
  );
}

export default MessageDetails;
