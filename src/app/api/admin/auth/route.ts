import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const usersFilePath = path.join(process.cwd(), "src", "data", "admin-users.json");

function getUsers() {
  if (!fs.existsSync(usersFilePath)) {
    const defaultUser = [
      {
        id: "admin-1",
        name: "Super Admin",
        email: "admin@freshceramics.com",
        password: "Fresh2026!",
        role: "Chief Administrator",
        createdAt: new Date().toISOString()
      }
    ];
    fs.writeFileSync(usersFilePath, JSON.stringify(defaultUser, null, 2), "utf-8");
    return defaultUser;
  }
  return JSON.parse(fs.readFileSync(usersFilePath, "utf-8"));
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { action, email, password, name, role } = body;
    const users = getUsers();

    if (action === "login") {
      const user = users.find(
        (u: any) =>
          u.email.toLowerCase() === email.trim().toLowerCase() &&
          u.password === password
      );

      if (!user) {
        return NextResponse.json(
          { error: "Invalid email or password" },
          { status: 401 }
        );
      }

      return NextResponse.json({
        success: true,
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role
        }
      });
    }

    if (action === "register") {
      if (!email || !password || !name) {
        return NextResponse.json(
          { error: "Name, email, and password are required" },
          { status: 400 }
        );
      }

      const existing = users.find(
        (u: any) => u.email.toLowerCase() === email.trim().toLowerCase()
      );
      if (existing) {
        return NextResponse.json(
          { error: "An administrator with this email already exists" },
          { status: 409 }
        );
      }

      const newUser = {
        id: `admin-${Date.now()}`,
        name: name.trim(),
        email: email.trim().toLowerCase(),
        password: password,
        role: role || "Editor",
        createdAt: new Date().toISOString()
      };

      users.push(newUser);
      fs.writeFileSync(usersFilePath, JSON.stringify(users, null, 2), "utf-8");

      return NextResponse.json({
        success: true,
        user: {
          id: newUser.id,
          name: newUser.name,
          email: newUser.email,
          role: newUser.role
        }
      });
    }

    return NextResponse.json({ error: "Invalid action" }, { status: 400 });
  } catch (error) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
