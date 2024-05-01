import React from "react";
import { Message } from "../MessageList";
import { notFound } from "next/navigation";

export const dynamicParams = true;

// export async function generateMetadata({ params }: SingleMessagePageProps) {
//   const id = params.id;

//   const res = await fetch(`http://localhost:4000/messages/${id}`);
//   const message = await res.json();

//   return {
//     title: `Personal Page | ${message.name}`,
//   };
// }

export async function generateStaticParams(): Promise<{ id: number }[]> {
  const res = await fetch("http://localhost:4000/messages/");

  const messages: Message[] = await res.json();

  return messages.map((message) => ({
    id: message.id,
  }));
}

async function getMessage(id: number): Promise<Message> {
  const res = await fetch(`http://localhost:4000/messages/${id}`);

  if (!res.ok) {
    notFound();
  }

  return res.json();
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
