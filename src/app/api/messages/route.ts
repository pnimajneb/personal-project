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

   // send email to site owner
   const emailToOwner = {
    to: 'bpeters@posteo.de',
    from: 'bpeters@posteo.de',
    subject: 'New Message Received',
    text: `Name: ${message.name}\nEmail: ${message.email}\nMessage: ${message.message}`,
    html: `<strong>Name:</strong> ${message.name}<br><strong>Email:</strong> ${message.email}<br><strong>Message:</strong> ${message.message}`,
   };

   // send confirmation email to site user
   const confirmationEmail = {
    to: message.email, // the user's mail
    from: 'bpeters@posteo.de',
    subject: 'Your message has been received',
    text: `Hello ${message.name},\n\nThank you for your message! We have received your message and will get back to you shortly.\n\nBest regards,\nYour Name`,
    html: `<p>Hello ${message.name},</p><p>Thank you for your message! We have received your message and will get back to you shortly.</p><p>Best regards,<br>Your Name</p>`,
   }

try {
    await sgMail.send(emailToOwner)
    await sgMail.send(confirmationEmail)
    return new Response(JSON.stringify({ data: "Emails sent successfully"}), {
        status: 200,
        headers: {'Content-Type': 'application/json'}
    })
} catch (emailError: any) { // specify the type as any
    console.error('Failed to send email', emailError);
    if (emailError.response) {
        console.error(emailError.response.body)
    }

   return new Response(JSON.stringify({ error: "Failed to send email", details: emailError.response.body }), {
       status: 500,
       headers: {'Content-Type': 'application/json'}
   });
}
}