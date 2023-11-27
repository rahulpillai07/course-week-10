import { connect } from "@/dbConfig/dbConfig";
import { User } from "@/models/user";
import jwt from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

connect();

const parsedbody = z.object({
  email: z.string(),
  password: z.string(),
});

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    console.log(reqBody);

    const validatedData = parsedbody.safeParse(reqBody);
    console.log(validatedData);
  
    if (validatedData.success) {
      const { email, password } = validatedData.data;

      const existingUser = await User.findOne({ email: email });

      if (existingUser) {
        return NextResponse.json({ message: "User already exists" }, { status: 400 });
      } else {
        const newUser = new User({
          email: email,
          password: password,
        });

        await newUser.save();
        console.log("New user saved successfully");
        const payload={
            email:newUser.email,
        }
        const token = jwt.sign(payload, process.env.SECRET!, { expiresIn: '1h' });
        


        return NextResponse.json({ message: "User created successfully",token:token }, { status: 200 });
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
