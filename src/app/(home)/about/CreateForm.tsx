// needs hydrating in the browser with javascript
"use client";

import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  FormSchema,
  FormSchemaType,
} from "@/app/lib/validation/formValidation";
import { Button } from "../../components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../components/ui/form";
import { Input } from "../../components/ui/input";
import { Textarea } from "@/app/components/ui/textarea";

export function CreateForm() {
  const router = useRouter();
  const form = useForm<FormSchemaType>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });

  const [isLoading, setIsLoading] = useState(false);

  const onHandleSubmit = async (formData: FormSchemaType) => {
    setIsLoading(true);

    const message = {
      name: formData.name,
      email: formData.email,
      message: formData.message,
    };

    // sending the stuff to the route handler
    const res = await fetch("http://localhost:3001/api/messages", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(message),
    });

    const json = await res.json();

    if (json.error) {
      console.log(error.message);
    }

    if (json.data) {
      router.refresh();
      router.push("/messages");
    }
    // TODO - possibly delete this line - depending on where the user needs to be pished after sending a message successfully
    // router.push("/messages");
  };

  return (
    <div className="flex justify-end">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onHandleSubmit)} className="w-1/2">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem className="mt-4">
                <FormLabel>Your Name</FormLabel>
                <FormControl>
                  <Input placeholder="Your Name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="mt-4">
                <FormLabel>Your Email</FormLabel>
                <FormControl>
                  <Input placeholder="Your Email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="message"
            render={({ field }) => (
              <FormItem className="mt-4">
                <FormLabel>Your Message</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="What's on your mind?"
                    rows={5}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="mt-4" disabled={isLoading}>
            {isLoading && <span>Sending...</span>}
            {!isLoading && <span>Send Message</span>}
          </Button>
        </form>
      </Form>
    </div>
  );
}
