import { createClient } from "@supabase/supabase-js"
import { NextRequest, NextResponse } from "next/server"

// ensure that environment variables are set
if(!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
    throw new Error ("Supabase URL or Anon Key is missing in environment variables")
}

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
)

export async function POST(request: NextRequest) {
    const message = await request.json()
    
   // Insert the data
   const { data, error } = await supabase.from('messages').insert([message]);

   if (error) {
       return new Response(JSON.stringify({ error: error.message }), {
           status: 500,
           headers: {'Content-Type': 'application/json'}
       });
   }

   return new Response(JSON.stringify({ data }), {
       status: 200,
       headers: {'Content-Type': 'application/json'}
   });
}