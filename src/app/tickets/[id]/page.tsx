import React from "react";
import { Ticket } from "../TicketList";
import { notFound } from "next/navigation";

export const dynamicParams = true;

export async function generateStaticParams(): Promise<{ id: number }[]> {
  const res = await fetch("http://localhost:4000/tickets/");

  const tickets: Ticket[] = await res.json();

  return tickets.map((ticket) => ({
    id: ticket.id,
  }));
}

async function getTicket(id: number): Promise<Ticket> {
  const res = await fetch(`http://localhost:4000/tickets/${id}`);

  if (!res.ok) {
    notFound();
  }

  return res.json();
}

type SingleTicketPageProps = {
  params: {
    id: number;
  };
};

async function TicketDetails({ params }: SingleTicketPageProps) {
  const ticket = await getTicket(params.id);

  return (
    <main>
      <nav>
        <h2>Ticket Details</h2>
      </nav>
      <div>
        <h3>{ticket.title}</h3>
        <small>Created by {ticket.user_email}</small>
        <p>{ticket.body}</p>
        <div className={`pill ${ticket.priority}`}>
          {ticket.priority} priority
        </div>
      </div>
    </main>
  );
}

export default TicketDetails;
