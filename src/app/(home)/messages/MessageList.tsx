import { createClient } from "@supabase/supabase-js";
import Link from "next/link";
import React from "react";

export type Message = {
  id: number;
  name: string;
  email: string;
  message: string;
};

async function getMessages(): Promise<Message[]> {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  const { data, error } = await supabase.from("messages").select();

  if (error) {
    console.log(error.message);
    return [];
  }

  return data || [];
}

async function MessageList() {
  const messages = await getMessages();
  return (
    <>
      {messages.map((message) => (
        <div key={message.id} className="card my-5">
          <Link href={`/messages/${message.id}`}>
            <p>{message.name}</p>
            <p>{message.email}</p>
            <p>
              {message.message.length > 200
                ? `${message.message.slice(0, 200)}...`
                : message.message}
            </p>
          </Link>
        </div>
      ))}
      {messages.length === 0 && (
        <p className="text-center">There are no messages here!</p>
      )}
    </>
  );
}

export default MessageList;
