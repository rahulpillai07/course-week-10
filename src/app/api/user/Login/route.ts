import { connect } from "@/dbConfig/dbConfig";
import { User } from "@/models/user";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import jwt from"jsonwebtoken";

connect();

const parsedBody = z.object({
  email: z.string(),
  password: z.string(),
});

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    console.log(reqBody);

    const validatedData = parsedBody.safeParse(reqBody);
    console.log(validatedData);
  
    if (validatedData.success) {
      const { email, password } = validatedData.data;

      const checkUser = await User.findOne({ email: email });

      if (checkUser) {
        // User found, check the password
        if (checkUser.password === password) {
          console.log('User successfully logged in');
          const payload={
            email: checkUser.email,
            password: checkUser.password
          }
          const token = jwt.sign(payload, process.env.SECRET!, { expiresIn: '1h' });
        
          return NextResponse.json({ message: "User successfully logged in",token });
        } else {
          return NextResponse.json({ message: "Invalid password" }, { status: 400 });
        }
      } else {
        // User not found
        return NextResponse.json({ message: "User not found" }, { status: 404 });
      }
    } else {
      // Return a response when validation fails
      return NextResponse.json({ message: "Invalid input data", errors: validatedData.error }, { status: 400 });
    }
  } catch (err) {
    // Handle unexpected errors
    console.error("Error:", err);

    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}
