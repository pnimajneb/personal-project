// needs hydrating in the browser with javascript
"use client";

import { useRouter } from "next/router";
import React, { FormEvent, useState } from "react";
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

  const onHandleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    // const message = {
    //   title,
    // };

    const res = await fetch("http://localhost:4000/tickets", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(message),
    });

    if (res.status === 201) {
      router.push("/tickets");
    }
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
                <FormLabel>Name</FormLabel>
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
                <FormLabel>Email</FormLabel>
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
                <FormLabel>Message</FormLabel>
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
