import React from "react";
import { CreateForm } from "./CreateForm";

function SendMessage() {
  return (
    <main>
      <h2 className="text-center text-primary">Drop me a message</h2>
      <CreateForm />
    </main>
  );
}

export default SendMessage;
