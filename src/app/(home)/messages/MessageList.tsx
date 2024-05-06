import Link from "next/link";
import React from "react";

export type Message = {
  id: number;
  name: string;
  email: string;
  message: string;
};

async function getMessages(): Promise<Message[]> {
  // imitate delay
  // await new Promise((resolve) => setTimeout(resolve, 3000));
  const res = await fetch("http://localhost3001/messages", {
    next: {
      revalidate: 0,
    },
  });

  return res.json();
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
