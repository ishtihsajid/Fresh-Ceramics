import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const contentFilePath = path.join(process.cwd(), "src", "data", "site-content.json");

export async function GET() {
  try {
    if (!fs.existsSync(contentFilePath)) {
      return NextResponse.json({ error: "Content file not found" }, { status: 404 });
    }
    const raw = fs.readFileSync(contentFilePath, "utf-8");
    return NextResponse.json(JSON.parse(raw));
  } catch (error) {
    return NextResponse.json({ error: "Failed to read site content" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const updatedContent = await req.json();
    fs.writeFileSync(contentFilePath, JSON.stringify(updatedContent, null, 2), "utf-8");
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "Failed to save site content" }, { status: 500 });
  }
}
