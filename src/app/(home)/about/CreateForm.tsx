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
  const [messageStatus, setMessageStatus] = useState("");

  const onHandleSubmit = async (formData: FormSchemaType) => {
    setIsLoading(true);

    try {
      const message = {
        name: formData.name,
        email: formData.email,
        message: formData.message,
      };

      // sending the stuff to the route handler
      const res = await fetch("api/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(message),
      });

      const json = await res.json();

      if (res.ok) {
        form.reset(); // resets the form to the inital state
        setMessageStatus("Message sent successfully");
        setTimeout(() => setMessageStatus(""), 5000); // hide message after five seconds
      } else {
        console.error("Error sending message:", json.error);
        alert(`Error: ${json.error}`);
      }
    } catch (error) {
      console.error("Network or other error:", error);
      alert("Failed to send message due to a network or other error.");
    } finally {
      setIsLoading(false);
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
          <div className="flex flex-col">
            <Button
              size="default"
              type="submit"
              className="my-4 w-32"
              disabled={isLoading}
            >
              {isLoading && <span>Sending...</span>}
              {!isLoading && <span>Send Message</span>}
            </Button>
            {messageStatus}
          </div>
        </form>
      </Form>
    </div>
  );
}
