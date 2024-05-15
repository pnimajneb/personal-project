import React from "react";
import { CreateForm } from "./create-form";
import { Content } from "./content";

function SendMessage() {
  return (
    <main>
      <div className="flex justify-between">
        <Content />
        <CreateForm />
      </div>
    </main>
  );
}

export default SendMessage;
