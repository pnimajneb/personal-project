// needs hydrating in the browser with javascript
"use client";

import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  FormSchema,
  FormSchemaType,
} from "../../../../lib/validation/formValidation";
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
    <div className="min-w-[800px]">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onHandleSubmit)}
          className="bg-[#0f172a] border-b-4 border-r-4 border-primary pl-16 pr-32 pb-40 pt-8 rounded-[2px]"
        >
          <h2 className="pb-4">GET IN TOUCH</h2>
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-xl text-[#a0aec0]">
                  Your Name
                </FormLabel>
                <FormControl>
                  <Input className="text-xl text-[#a0aec0]" {...field} />
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
                <FormLabel className="text-xl text-[#a0aec0]">
                  Your Email
                </FormLabel>
                <FormControl>
                  <Input className="text-xl text-[#a0aec0]" {...field} />
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
                <FormLabel className="text-xl text-[#a0aec0]">
                  Your Message
                </FormLabel>
                <FormControl>
                  <Textarea
                    className="text-xl text-[#a0aec0]"
                    rows={5}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex flex-col pl-4">
            <Button
              variant="link"
              size="default"
              type="submit"
              className="my-4 w-32"
              disabled={isLoading}
            >
              {isLoading && <span>SENDING...</span>}
              {!isLoading && <span>SEND MESSAGE</span>}
            </Button>
            {messageStatus}
          </div>
        </form>
      </Form>
    </div>
  );
}
