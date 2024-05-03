import { createClient } from "@supabase/supabase-js"
import { NextRequest, NextResponse } from "next/server"
import sgMail from '@sendgrid/mail'


// ensure that environment variables are set
if(!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || !process.env.SENDGRID_API_KEY) {
    throw new Error ("Supabase or SendGrid configuration is missing in environment variables")
}

// set SendGrid API Key
sgMail.setApiKey(process.env.SENDGRID_API_KEY)

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
)

export async function POST(request: NextRequest) {
    const message = await request.json()
    
   // Insert the data into Supabase
   const { data, error } = await supabase.from('messages').insert([message]);

   if (error) {
       return new Response(JSON.stringify({ error: error.message }), {
           status: 500,
           headers: {'Content-Type': 'application/json'}
       });
   }

   const email = {
    to: 'bpeters@posteo.de',
    from: 'bpeters@posteo.de',
    subject: 'New Message Received',
    text: `Name: ${message.name}\nEmail: ${message.email}\nMessage: ${message.message}`,
    html: `<strong>Name:</strong> ${message.name}<br><strong>Email:</strong> ${message.email}<br><strong>Message:</strong> ${message.message}`,
   };

   try {
    await sgMail.send(email)
   } catch (emailError: unknown) { // specify the type as unknown
    console.error('Failed to send email');
    if (emailError instanceof Error) {
        console.error(emailError.message)
    }
   }

   return new Response(JSON.stringify({ data }), {
       status: 200,
       headers: {'Content-Type': 'application/json'}
   });
}