import Link from "next/link";
import React from "react";

export type Ticket = {
  id: number;
  title: string;
  body: string;
  priority: string;
  user_email: string;
};

async function getTickets(): Promise<Ticket[]> {
  // imitate delay
  // await new Promise((resolve) => setTimeout(resolve, 3000));
  const res = await fetch("http://localhost:4000/tickets", {
    // next: {
    //   revalidate: 30,
    // },
  });

  return res.json();
}

async function TicketList() {
  const tickets = await getTickets();
  return (
    <>
      {tickets.map((ticket) => (
        <div key={ticket.id} className="card my-5">
          <Link href={`/tickets/${ticket.id}`}>
            <h3>{ticket.title}</h3>
            <p>{ticket.body.slice(0, 200)}...</p>
            <div className={`pill ${ticket.priority}`}>
              {ticket.priority} priority
            </div>
          </Link>
        </div>
      ))}
      {tickets.length === 0 && (
        <p className="text-center">There are no open tickets!</p>
      )}
    </>
  );
}

export default TicketList;
