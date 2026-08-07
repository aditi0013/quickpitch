import { NextResponse } from "next/server";
import { generatePitch } from "@/lib/ai";
import { searchBreeth, storeBreethMemory } from "@/lib/breeth";


export async function POST(request: Request) {
  try {
    const body = await request.json();
    const idea = body?.idea;

    if (typeof idea !== "string" || !idea.trim()) {
      return NextResponse.json(
        { error: "Please provide a business idea." },
        { status: 400 }
      );
    }

    if (idea.length > 1000) {
      return NextResponse.json(
        { error: "Business idea must be 1000 characters or less." },
        { status: 400 }
      );
    }

    const cleanIdea = idea.trim();

    const previousMemory = await searchBreeth(cleanIdea);

   const pitch = await generatePitch(
  cleanIdea,
  JSON.stringify(previousMemory)
);

    await storeBreethMemory(
    `Business idea: ${cleanIdea}\nGenerated pitch:\n${JSON.stringify(pitch)}`
    );

    return NextResponse.json(pitch);
  } catch (error) {
    console.error("Pitch generation error:", error);

    return NextResponse.json(
      { error: "Unable to generate your pitch. Please try again." },
      { status: 500 }
    );
  }
}