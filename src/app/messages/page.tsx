import React, { Suspense } from "react";
import TicketList from "./MessageList";
import Loading from "../loading";
import MessageList from "./MessageList";

function Messages() {
  return (
    <main>
      <nav>
        <div>
          <h2>Tickets</h2>
          <p>
            <small>Currently open tickets</small>
          </p>
        </div>
      </nav>

      <Suspense fallback={<Loading />}>
        <MessageList />
      </Suspense>
    </main>
  );
}

export default Messages;
