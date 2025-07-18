
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Basic type check (optional)
    if (!body.make || !body.model || !body.year) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // Optional: Save to DB logic (if using Prisma or MongoDB)

    return NextResponse.json({ message: "Car created successfully", car: body }, { status: 201 });
  } catch (error) {
    console.error("Error in POST /api/cars:", error);
    return NextResponse.json({ error: "Failed to create car" }, { status: 500 });
  }
}
