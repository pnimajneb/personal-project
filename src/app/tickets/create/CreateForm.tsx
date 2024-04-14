// needs hydrating in the browser with javascript
"use client";

import { useRouter } from "next/router";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  FormSchema,
  FormSchemaType,
} from "@/app/lib/validation/formValidation";

export function CreateForm() {
  const router = useRouter();
  const form = useForm<FormSchemaType>({
    resolver: zodResolver(FormSchema),
  });

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  return <form action="w-1/2"></form>;
}
