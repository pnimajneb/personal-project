import React, { Suspense } from "react";
import TicketList from "./ImageList";
import Loading from "../../loading";
import ImageList from "./ImageList";

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
        <ImageList />
      </Suspense>
    </main>
  );
}

export default Messages;
