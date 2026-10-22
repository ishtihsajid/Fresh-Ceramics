import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const dataFilePath = path.join(process.cwd(), "src", "data", "showrooms.json");

export async function GET() {
  try {
    const raw = fs.readFileSync(dataFilePath, "utf-8");
    return NextResponse.json(JSON.parse(raw));
  } catch (error) {
    return NextResponse.json({ error: "Failed to read showrooms" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const updatedShowrooms = await req.json();
    fs.writeFileSync(dataFilePath, JSON.stringify(updatedShowrooms, null, 2), "utf-8");
    return NextResponse.json({ success: true, count: updatedShowrooms.length });
  } catch (error) {
    return NextResponse.json({ error: "Failed to save showrooms" }, { status: 500 });
  }
}
