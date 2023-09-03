import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import OpenAI from "openai"


const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});


export async function POST(request: Request) {
    console.log(openai.apiKey)
    try{
        const { userId } = auth();
        const body = await request.json();
        const { messages } = body;

        console.log("POST messages", messages)

        if(!userId){
            return new NextResponse("Unauthorized", {status: 401});
        }
        if(!openai.apiKey){
            return new NextResponse("OpenAI API key not configured", {status: 500});
        }
        if(!messages){
            return new NextResponse("No messages provided", {status: 400});
        }

        const response: any = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: messages,
            // temperature: 0.5,
            // max_tokens: 256,         
        })

        return NextResponse.json(response.choices[0].message);
    }catch(error){
        console.log("[CONVERSATION_ERROR]", error);
        return new NextResponse("Server Error", {status: 500});
    }
}


